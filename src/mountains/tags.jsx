/**
 * The Tags Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import { initFadeInScrollMagic } from "../utils/initFadeInScrollMagic";
import siteConfig from "../utils/siteConfig";
// import ReactGA from "react-ga4";

const Tags = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [getPostsWithTag, setGetPostsWithTag] = useState(true);

  // Reset when slug changes
  useEffect(() => {
    setPosts([]);
    setPageNo(1);
    setGetPostsWithTag(true);
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
        if (getPostsWithTag) {
          getMorePosts();
        }
      });

    document.title = `Posts with tag: ${slug} | ${siteConfig.siteName}`;
    document.body.className = "";
    document.body.classList.add("tag-list");

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
    const endpoint = `${siteConfig.apiURL}posts/?filter[taxonomy]=post_tag&filter[tag]=${slug}&page=${pageNo}`;
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
          setGetPostsWithTag(false);
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
        {loading ? (
          <div className="row post-container">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">I like blinking, I do...</p>
            </div>
          </div>
        ) : (
          <div className="row post-container">
            <div className="col text-center">
              <p className="display-font fs-1 p-5">No posts with tag <em>{slug}</em> - Tag you're it!</p>
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
      <h1 className="text-center">
        {siteConfig.postsHeader} tagged with <em>{slug}</em>
      </h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Tags;
