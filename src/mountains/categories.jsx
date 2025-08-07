/**
 * The Categories Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
//import { initFadeInScrollMagic } from "../utils/initScrollFadeIn";
import siteConfig from "../utils/siteConfig";
// import ReactGA from "react-ga4";

const Categories = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  //const [pageNo, setPageNo] = useState(1);
  const pageNo = useRef(1);
  const totalPagesRef = useRef(null);
  const fetching = useRef(false);
  const [getPostsWithCategory, setGetPostsWithCategory] = useState(true);

  // Reset when slug changes
  useEffect(() => {
    setPosts([]);
    pageNo.current = 1;
    setGetPostsWithCategory(true);
    setLoading(true);
  }, [slug]);

  // ScrollMagic + Infinite scroll fetch setup
  useEffect(() => {
    if (!slug) return;

    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", () => {
        if (!fetching.current && getPostsWithCategory) {
          getMorePosts();
        }
      });

    document.title = `Category: ${slug} | ${siteConfig.siteName}`;
    document.body.className = "";
    document.body.classList.add("category-list");

    //ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      controller.destroy();
    };
  //}, [pageNo, slug]);
  }, [slug]); // ✅ Only run once per slug change

  // useEffect(() => {
  //   const fadeInController = initFadeInScrollMagic();
  //   return () => fadeInController.destroy();
  // }, [posts]);

  const getMorePosts = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("getMorePosts CALLED", {
        fetching: fetching.current,
        pageNo: pageNo.current,
        totalPages: totalPagesRef.current,
      });

      if (totalPagesRef.current !== null && pageNo.current > totalPagesRef.current) {
        console.log("🧱 Page limit hit");
        setGetPostsWithCategory(false);
        return;
      }
    }

    // Stop if already fetching or past final page
    if (fetching.current || !getPostsWithCategory) return;
    if (totalPagesRef.current !== null && pageNo.current > totalPagesRef.current) {
      setGetPostsWithCategory(false);
      return;
    }

    const currentPage = pageNo.current;
    const endpoint = `${siteConfig.siteURL}wp-json/bedrock/v1/posts-by-category/${slug}?page=${currentPage}`;
    fetching.current = true;

    // You can also pass per_page, like:
    // https://nice2b.me/wp-json/bedrock/v1/posts-by-category/general?page=2&per_page=6


    fetch(endpoint)
     .then((response) => {
      if (!response.ok) {
        document.title = `${response.statusText} | ${siteConfig.siteName}`;
        throw Error(response.statusText);
      }

      // Save total pages (once)
      if (totalPagesRef.current === null) {
        const total = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);
        totalPagesRef.current = total;
      }

      return response.json();
    })
    .then((results) => {
      if (!results || results.length === 0) {
        setGetPostsWithCategory(false);
        return;
      }

      setPosts((prev) => [...prev, ...results]);

      // Only update if new posts are different
      // setPosts((prev) => {
      //   const existingIds = new Set(prev.map((p) => p.id));
      //   const newPosts = results.filter((post) => !existingIds.has(post.id));
      //   if (newPosts.length === 0) return prev; // No change, avoid triggering useEffect
      //   return [...prev, ...newPosts];
      // });
      setLoading(false);
      pageNo.current += 1;
    })
    .catch((error) => {
      console.error("Fetch error:", error.message);
      setLoading(false);
    })
    .finally(() => {
      fetching.current = false;
    });
  };

  if (!posts.length) {
    return (
      <div className="container">

        <div className="row">
          <div className="col text-center">
            <h1 className="text-center">
              {siteConfig.postsHeader} about <em>{slug}</em>
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
              <p className="display-font fs-1 p-5">No posts in category <em>{slug}</em></p>
              <a href="/" className="btn btn-primary btn-lg">
                Run away Home...
              </a>
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
              {siteConfig.postsHeader} about <em>{slug}</em>
            </h1>
          </div>
        </div>
      <PostList posts={posts} />
    </div>
  );
};

export default Categories;
