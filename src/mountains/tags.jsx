/**
 * The Tags Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import siteConfig from "../utils/siteConfig";
// import ReactGA from "react-ga4";

const Tags = () => {
  const { slug } = useParams();
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

  // slug change effect
  // sk-dev: task redo set title and body class on mount
  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      setPosts([]);
      pageNo.current = 1;
      totalPagesRef.current = null;
      setGetMorePosts(true);
      setLoading(true);

      document.title = `Tagged: ${slug} | ${siteConfig.siteName}`;
      document.body.className = "";
      document.body.classList.add("tag-list");
      //ReactGA.pageview(window.location.pathname + window.location.search);

      await fetchPosts(isMounted, true);
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // inView to trigger infinite load
  useEffect(() => {
    if (inView && !fetching.current && getMorePosts) {
      console.log("📦 Loading more posts");
      fetchPosts(true);
    }
  }, [inView, getMorePosts]);

  // main fetch function
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
    const endpoint = `${siteConfig.siteURL}wp-json/bedrock/v1/posts-by-tag/${slug}?page=${currentPage}&per_page=${perPage}`;

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
              {slug
                ? <>{siteConfig.postsHeader} tagged <em>{slug}</em></>
                : <>No tag selected</>
              }
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">{siteConfig.postTaxPreloadText}</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col text-center">
              <p className="display-font fs-1 p-5">
                {slug
                  ? <>No posts with tag <em>{slug}</em></>
                  : <>No tag selected</>
                }
              </p>
              <a href="/" className="btn btn-primary btn-lg">Run away Home…</a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1 className="text-center">
            {siteConfig.postsHeader} tagged <em>{slug}</em>
          </h1>
        </div>
      </div>
      <PostList posts={posts} />
      <div ref={loadMoreRef} style={{ minHeight: "1px" }} />
    </div>
  );
};

export default Tags;
