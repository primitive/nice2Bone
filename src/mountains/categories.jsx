/**
 * The Categories Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import { initFadeInScrollMagic } from "../utils/initScrollFadeIn";
import siteConfig from "../utils/siteConfig";
// import ReactGA from "react-ga4";

const Categories = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [getPostsWithCategory, setGetPostsWithCategory] = useState(true);

  // Reset when slug changes
  useEffect(() => {
    setPosts([]);
    setPageNo(1);
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
        if (getPostsWithCategory) {
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
  }, [pageNo, slug]);

  useEffect(() => {
    const fadeInController = initFadeInScrollMagic();
    return () => fadeInController.destroy();
  }, [posts]);

  const getMorePosts = () => {
    const endpoint = `${siteConfig.apiURL}posts/?filter[taxonomy]=category&filter[term]=${slug}&page=${pageNo}`;
    //let totalPages;

    fetch(endpoint)
      .then((response) => {
        // for (const pair of response.headers.entries()) {
        //   if (pair[0] === "x-wp-totalpages") {
        //     totalPages = pair[1];
        //     console.log("totalPages", totalPages);
        //   }
        // }

        //const totalPages = response.headers.get("x-wp-totalpages");
        const totalPages = parseInt(response.headers.get("x-wp-totalpages"), 10) || 1;
        console.log("totalPages", totalPages);

        if (pageNo >= totalPages) {
          setGetPostsWithCategory(false);
        }
        else {
          setPageNo((prev) => prev + 1);
        }

        if (!response.ok) {
          document.title = `${response.statusText} | ${siteConfig.siteName}`;
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((results) => {
        setPosts((prev) => [...prev, ...results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        setLoading(false);
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
