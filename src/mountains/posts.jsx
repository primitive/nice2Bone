/**
 * The Posts Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";

import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import { initFadeInScrollMagic } from "../utils/initScrollFadeIn";
import siteConfig from "../utils/siteConfig";
// import ReactGA from "react-ga4";

const Posts = (props) => {

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [getPosts, setGetPosts] = useState(true);









  // ScrollMagic + Infinite scroll fetch setup
  useEffect(() => {


    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", () => {
        //console.log("getPosts", getPosts);
        if (getPosts) {
          getMorePosts();
        }
      });

    document.title = `${siteConfig.postsHeader} | ${siteConfig.siteName}`;
    document.body.className = "";
    document.body.classList.add("posts-list");

    //ReactGA.pageview(window.location.pathname + window.location.search);

    return () => {
      controller.destroy();
    };
  }, [pageNo]);

  useEffect(() => {
    const fadeInController = initFadeInScrollMagic();
    return () => fadeInController.destroy();
  }, [posts]);

  const getMorePosts = () => {
    const endpoint = `${siteConfig.apiURL}posts/?page=${pageNo}`;

    fetch(endpoint)
      .then((response) => {
        const totalPages = parseInt(response.headers.get("x-wp-totalpages"), 10) || 1;
        console.log("totalPages", totalPages);

        if (pageNo >= totalPages) {
          setGetPosts(false);
        }
        else {
          setPageNo((prev) => prev + 1);
        }
        
        if (!response.ok) {
          document.title = `${response.statusText} | Nice2b.me`;
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then((results) => {
        setPosts((prev) => [...prev, ...results]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("There has been a problem with your fetch operation: " + error.message);
        setLoading(false);
      });
  };

  if (!posts.length) {
    return (
      <div className="container">

          <div className="row">
            <div className="col text-center">
              <h1 className="text-center">
                {siteConfig.postsHeader}
              </h1>
            </div>
          </div>

        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">{siteConfig.postsPreloadText}</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col text-center">
              <p className="display-font fs-1 p-5">{siteConfig.postsNoneText}</p>
              <a href="/" className="btn btn-primary btn-lg">
                Start over
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
              {siteConfig.postsHeader}
            </h1>
          </div>
        </div>

        <PostList posts={posts} />
    </div>
  );
};

export default Posts;