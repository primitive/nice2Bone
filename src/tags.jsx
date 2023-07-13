/**
 * The Tags Component
 * @package Nice2B One
 * 2023
 */
import React, { useState, useEffect } from "react";
import { Rings as Loader } from "react-loader-spinner";
import PostList from "../rocks/post-list";
import { handleBeforeUnload } from "../helpers";
// import ReactGA from "react-ga";
// import { useNavigate } from "react-router";

// import ReactGA from 'react-ga';


const Tags = (props) => {
  const [posts, setPosts] = useState([]);
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(0);
  const [getPostsWithTag, setGetPostsWithTag] = useState(true);
  const [controller, setController] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    // init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter"
    })
      .addTo(controller)
      .on("enter", e => {
        if (getPostsWithTag) {
          getMorePostsWithTag();
        }
      });
    // ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('tag-list');

    return () => {
      // clean up on unmount
      window.onbeforeunload = null;
      controller.destroy();
      document.body.classList.remove('tag-list');
    };
  }, []);

  useEffect(() => {
    // use ScrollMagic for infinite scrolling
    const FadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".posts-container .col-md-4.card-outer")
      .forEach(function (item) {
        // build a scene
        const FadeInScene = new ScrollMagic.Scene({
          triggerElement: item.children[0],
          reverse: false,
          triggerHook: 1
        })
          .setClassToggle(item, "fade-in")
          .addTo(FadeInController);
      });
  }, [posts]);

  const getMorePostsWithTag = async () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();
    let totalPages;
    setPage(page + 1);
    setTag(slug);

    try {
      const response = await fetch(`https://nice2b.me/wp-json/wp/v2/posts/?filter[tag]=${tag}&page=${page}`);
      console.log("tags response", response);

      for (const pair of response.headers.entries()) {
        // getting the total number of pages
        if (pair[0] == "x-wp-totalpages") {
          totalPages = pair[1];
        }

        if (page >= totalPages) {
          setGetPostsWithTag(false);
        }
      }

      if (!response.ok) {
        document.title = response.statusText + "| Nice2b.me";
        throw Error(response.statusText);
      }

      const results = await response.json();
      const allPosts = posts.slice();
      results.forEach(single => {
        allPosts.push(single);
      });
      setPosts(allPosts);
    } catch (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
    }
  };

  useEffect(() => {
    if (getPostsWithTag) {
      getMorePostsWithTag();
    }
  }, [getPostsWithTag]);

  useEffect(() => {
    // init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter"
    })
      .addTo(controller)
      .on("enter", e => {
        if (getPostsWithTag) {
          getMorePostsWithTag();
        }
      });

    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('tag-list');

    return () => {
      controller.destroy();
      document.body.classList.remove('tag-list');
    }
  }, []);

  useEffect(() => {
    // use ScrollMagic for infinite scrolling
    const FadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".posts-container .col-md-4.card-outer")
      .forEach(function (item) {
        // build a scene
        const FadeInScene = new ScrollMagic.Scene({
          triggerElement: item.children[0],
          reverse: false,
          triggerHook: 1
        })
          .setClassToggle(item, "fade-in")
          .addTo(FadeInController);
      });

    return () => {
      FadeInController.destroy();
    }
  }, [posts]);

  if (!posts.length === 0) {
    return <img src={LoadingIcon} alt="loading Tags" className="active" id="loader" />;
  }
  return (

    <div>
      <div className="container">
        <h1 className="posts-title">Posts with Tag: {tag}</h1>
      </div>
      <div className="container posts-container">
        <div className="row">
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default Tags;
