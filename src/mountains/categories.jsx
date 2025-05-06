/**
 * The Categories Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import { handleBeforeUnload } from "../helpers";
// import ReactGA from "react-ga4";

const Categories = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [getPostsInCat, setGetPostsInCat] = useState(true);

  // Reset state when category slug changes
  useEffect(() => {
    setPosts([]);
    setPageNo(1);
    setGetPostsInCat(true);
    setLoading(true);
  }, [slug]);

  // ScrollMagic + fetch next page on scroll
  useEffect(() => {
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", () => {
        if (getPostsInCat) {
          getMorePostsInCat();
        }
      });

    document.title = PrimitiveSettings.theme_name + " - " + PrimitiveSettings.theme_posts_title;
    document.body.className = "";
    document.body.classList.add("category-list");

    //ReactGA.pageview(window.location.pathname + window.location.search);

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      controller.destroy();
    };
  }, [pageNo, getPostsInCat, slug]);

  // Animate posts
  useEffect(() => {
    const FadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".posts-container .col-md-4.card-outer")
      .forEach((item) => {
        // build a scene
        const FadeInScene = new ScrollMagic.Scene({
          triggerElement: item.children[0],
          reverse: false,
          triggerHook: 1,
        })
          .setClassToggle(item, "fade-in")
          .addTo(FadeInController);
      });

    return () => {
      FadeInController.destroy();
    };
  }, [posts]);

  const getMorePostsInCat = () => {
    const endpoint = `${PrimitiveSettings.URL.api}posts/?filter[taxonomy]=category&filter[term]=${slug}&page=${pageNo}`;
    console.log("Fetching category:", slug);

    fetch(endpoint)
      .then((response) => {
        const totalPages = response.headers.get("x-wp-totalpages");

        if (pageNo >= totalPages) {
          setGetPostsInCat(false);
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
        setPosts((prevPosts) => [...prevPosts, ...results]);
        setLoading(false);
        document.title = `Category: ${slug} | Nice2b.me`;
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
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">I like blinking, I do...</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col text-center">
              <p className="display-4">No posts found</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center">
        {PrimitiveSettings.theme_posts_title} about {slug}
      </h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Categories;
