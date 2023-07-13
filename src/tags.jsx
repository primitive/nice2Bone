/**
 * The Tags Component
 * @package Nice2B One
 * 2023
 */
import React, { useState, useEffect } from "react";
import Preloader from "../pebbles/loader";
import PostList from "../rocks/post-list";
import { handleBeforeUnload } from "../helpers";
// import ReactGA from "react-ga";

const Tags = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [getPostsWithTag, setGetPostsWithTag] = useState(true);

  useEffect(() => {

    // init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", (e) => {
        if (getPostsInCat) {
          getMorePostsInCat();
        }
      });

    document.title = PrimitiveSettings.theme_name + " - " + PrimitiveSettings.theme_posts_title;
    document.body.className = "";
    document.body.classList.add("tag-list");

    //ReactGA.pageview(window.location.pathname + window.location.search);

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      controller.destroy();
    };
  }, [pageNo]);

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

  //const getMorePostsWithTag = async () => {
  const getMorePostsWithTag = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();
    let totalPages;
    let endpoint = PrimitiveSettings.URL.api + "posts/?filter[taxonomy]=category&filter[tag]=" + slug + "&page=" + pageNo;

    console.log(slug);

    setTag(slug);

    fetch(endpoint)
      .then((response) => {
        for (const pair of response.headers.entries()) {
          if (pair[0] === "x-wp-totalpages") {
            totalPages = pair[1];
            console.log("totalPages", totalPages);
          }

          if (pageNo >= totalPages) {
            setGetPostsWithTag(false);
          }
          else {
            setPageNo(pageNo + 1);
          }
        }
        if (!response.ok) {
          document.title = `${response.statusText} | Nice2b.me`;
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((results) => {
        setPosts((prevPosts) => [...prevPosts, ...results]);
        document.title = `Tag: ${tag} | Nice2b.me`;
      })
      .catch((error) => {
        console.log("There has been a problem with your fetch operation: " + error.message);
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
        <h1 className="text-center">{PrimitiveSettings.theme_posts_title} about {category}</h1>
        <PostList posts={posts} />
    </div>
  );
};

export default Categories;
