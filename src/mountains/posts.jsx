/**
 * The Posts Component
 * @package Nice2B One
 * 2023
 */
import React, { useState, useEffect } from "react";
import PostList from "../post-list";
import LoadingIcon from "../loading-icon.gif";

// import PreLoader from "./loader";
// import { Rings as Loader } from "react-loader-spinner";
// import ReactGA from "react-ga";

const Posts = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [getPosts, setGetPosts] = useState(true);

  useEffect(() => {

    // init ScrollMagic Controller + build scene
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", () => {
        console.log("getPosts", getPosts);
        if (getPosts) {
          getMorePosts();
        }
      });

    document.title = PrimitiveSettings.theme_name + " - " + PrimitiveSettings.theme_posts_title;
    document.body.className = "";
    document.body.classList.add("blog");

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
      console.log("before unload");
    };
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      controller.destroy();
    };
  }, [getPosts, page]);

  useEffect(() => {
    const FadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".posts-container .col-md-4.card-outer")
      .forEach(function (item) {
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

  const getMorePosts = () => {
    let totalPages;
    console.log("page", page);

    fetch(PrimitiveSettings.URL.api + "posts/?page=" + page)
      .then((response) => {
        for (const pair of response.headers.entries()) {
          // get total number of pages
          if (pair[0] === "x-wp-totalpages") {
            totalPages = pair[1];
            console.log("totalPages", totalPages);
          }

          if (page >= totalPages) {
            setGetPosts(false);
          }
          else {
            setPage(page + 1);
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((results) => {

        setPosts((prevPosts) => [...prevPosts, ...results]);
      })
      .catch((error) => {
        console.log("There has been a problem with your fetch operation: " + error.message);
      });
  };

  if (!posts.length) {
    return (
      <>
        <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
        <p>No matching posts</p>
      </>
    );
  }

  return (
    <div>
      <div className="container posts-container ">
        <h1 className="text-center">{PrimitiveSettings.theme_posts_title}</h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Posts;