/**
 * The Jokes CPT Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Preloader from "../pebbles/loader";
import JokeList from "../rocks/joke-list";
import siteConfig from "../utils/siteConfig";
import { handleBeforeUnload } from "../helpers";
// import ReactGA from "react-ga4";

const Jokes = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const pageNo = useRef(1);
  const totalPagesRef = useRef(null);
  const fetching = useRef(false);
  const [getMorePosts, setGetMorePosts] = useState(true);
  const [loadMoreRef, inView] = useInView({
    rootMargin: "200px 0px",
    triggerOnce: false,
  });

  // initial mount setup
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      setPosts([]);
      pageNo.current = 1;
      totalPagesRef.current = null;
      setGetMorePosts(true);
      setLoading(true);

      document.title = "Jokes | Nice2b.me";
      document.body.className = "";
      document.body.classList.add("jokes-list");

      window.onbeforeunload = handleBeforeUnload;
      // ReactGA.pageview(window.location.pathname + window.location.search);

      await fetchPosts(isMounted, true);
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, []);

  // observer trigger
  useEffect(() => {
    if (inView && !fetching.current && getMorePosts) {
      console.log("📦 Loading more jokes");
      fetchPosts(true);
    }
  }, [inView, getMorePosts]);

  const fetchPosts = async (isMounted = true, isInitial = false) => {
    if (!isInitial && (fetching.current || !getMorePosts)) return;
    fetching.current = true;

    if (process.env.NODE_ENV === "development") {
      console.log("fetchPosts CALLED", {
        pageNo: pageNo.current,
        totalPages: totalPagesRef.current,
      });
    }

    if (totalPagesRef.current !== null && pageNo.current > totalPagesRef.current) {
      setGetMorePosts(false);
      fetching.current = false;
      return;
    }

    const currentPage = pageNo.current;
    const perPage = siteConfig.postsPerPage || 12;
    const endpoint = `${siteConfig.apiURL}jokes/?page=${currentPage}&per_page=${perPage}`;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        document.title = `${response.statusText} | Nice2b.me`;
        throw new Error(response.statusText);
      }

      // total pages
      if (totalPagesRef.current === null) {
        const total = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);
        totalPagesRef.current = total;
      }

      const results = await response.json();

      if (!isMounted) return;

      if (!results || results.length === 0) {
        setGetMorePosts(false);
        setLoading(false);
        return;
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = results.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });

      pageNo.current += 1;
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error.message);
      if (isMounted) setLoading(false);
    } finally {
      fetching.current = false;
    }
  };

  // preload and no posts
  if (!posts.length) {
    return (
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">
                Thinking (stand back)...
              </p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col text-center">
              <p className="display-4">No matching jokes</p>
              <a href="/" className="btn btn-primary btn-lg">
                Back to sanity
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // render content
  return (
    <div className="container">
      <h1 className="text-center">Jokes</h1>
      <JokeList posts={posts} />
      <div ref={loadMoreRef} style={{ minHeight: "1px" }} />
    </div>
  );
};

export default Jokes;
