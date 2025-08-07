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

  // initial setup
  // sk-dev: task redo set title and body class on mount
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      setPosts([]);
      pageNo.current = 1;
      setGetMorePosts(true);
      setLoading(true);

      document.title = "Jokes | Nice2b.me";
      document.body.className = "";
      document.body.classList.add("jokes-list");
      // ReactGA.pageview(window.location.pathname + window.location.search);

      await fetchPosts(isMounted, true);
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, []);

  // inView to trigger infinite load
  useEffect(() => {
    if (inView && !fetching.current && getMorePosts) {
      console.log("📦 Loading more jokes");
      fetchPosts(true);
    }
  }, [inView, getMorePosts]);

  const fetchPosts = async (isMounted = true, isInitial = false) => {
    if (fetching.current) return;
    fetching.current = true;

    if (!isInitial && !getMorePosts) {
      fetching.current = false;
      return;
    }

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
        document.title = `${response.statusText} | ${siteConfig.siteName}`;
        throw new Error(response.statusText);
      }

      // save total pages (once)
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

      // extra check: deduplicate by ID before appending
      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = results.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });

      setLoading(false);
      pageNo.current += 1;

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
        <div className="row">
          <div className="col text-center">
            <h1 className="text-center">
              {siteConfig.jokesHeader}
            </h1>
          </div>
        </div>

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
      <div className="row">
        <div className="col text-center">
          <h1 className="text-center">
            {siteConfig.jokesHeader}
          </h1>
        </div>
      </div>

      <JokeList posts={posts} />
      <div ref={loadMoreRef} style={{ minHeight: "1px" }} />
    </div>
  );
};

export default Jokes;
