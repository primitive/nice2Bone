/**
 * The Categories Component
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

const Categories = () => {
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
      setGetMorePosts(true);
      setLoading(true);

      document.title = `Category: ${slug} | ${siteConfig.siteName}`;
      document.body.className = "";
      document.body.classList.add("category-list");

      await getPosts(isMounted, true);
    };

    fetchInitial();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // named scroll observer handler
  useEffect(() => {
    if (inView && !fetching.current && getMorePosts) {
      console.log("📦 Loading more posts");
      getPosts(true);
    }
  }, [inView, getMorePosts]);

  // main fetch function
  const getPosts = async (isMounted = true, isInitial = false) => {
    if (!isInitial && (fetching.current || !getMorePosts)) return;

    if (process.env.NODE_ENV === "development") {
      console.log("getPosts CALLED", {
        fetching: fetching.current,
        pageNo: pageNo.current,
        totalPages: totalPagesRef.current,
      });
    }

    if (fetching.current || !getMorePosts) return;
    if (totalPagesRef.current !== null && pageNo.current > totalPagesRef.current) {
      setGetMorePosts(false);
      return;
    }

    const currentPage = pageNo.current;
    const perPage = siteConfig.postsPerPage || 12;
    const endpoint = `${siteConfig.siteURL}wp-json/bedrock/v1/posts-by-category/${slug}?page=${currentPage}&per_page=${perPage}`;
    fetching.current = true;

    // You can also pass per_page, like:
    // https://nice2b.me/wp-json/bedrock/v1/posts-by-category/general?page=2&per_page=6


    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        document.title = `${response.statusText} | ${siteConfig.siteName}`;
        throw new Error(response.statusText);
      }

      // Save total pages (once)
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
        <div className="row">
          <div className="col text-center">
            <h1 className="text-center">
              {slug
                ? <>{siteConfig.postsHeader} about <em>{slug}</em></>
                : <>No category selected</>
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
                  ? <>No posts in category <em>{slug}</em></>
                  : <>No category selected</>
                }
              </p>
              <a href="/" className="btn btn-primary btn-lg">
                Run away Home...
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
            {siteConfig.postsHeader} about <em>{slug}</em>
          </h1>
        </div>
      </div>
      <PostList posts={posts} />
      <div ref={loadMoreRef} style={{ minHeight: "1px" }} />
    </div>
  );
};

export default Categories;
