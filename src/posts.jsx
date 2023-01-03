/**
 * The Posts Component
 * @package Nice2B One
 */
import React, { useState, useEffect } from "react";
import PostList from "./post-list";
import LoadingIcon from "./loading-icon.gif";
// import PreLoader from "./loader";
// import { Rings as Loader } from "react-loader-spinner";
import ReactGA from "react-ga";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [getPosts, setGetPosts] = useState(true);
  const [controller, setController] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);

          //console.log("this.state.posts", this.state.posts);

    console.log("version", props);
    };

    // init ScrollMagic Controller
    const controller = new ScrollMagic.Controller();

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter",
    })
      .addTo(controller)
      .on("enter", (e) => {
        if (getPosts) {
          getMorePosts();
        }
      });

    document.title = "Nice2b.me - Posts and Articles";
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add("blog");

    return () => {
      controller.destroy();
    };
  }, []);

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

    setPage((prevPage) => prevPage + 1);

    fetch(PrimitiveSettings.URL.api + "posts/?page=" + page)
      .then((response) => {
        for (const pair of response.headers.entries()) {
          // getting the total number of pages
          if (pair[0] === "x-wp-totalpages") {
            totalPages = pair[1];
          }

          if (page >= totalPages) {
            setGetPosts(false);
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((results) => {
        const allPosts = [...posts];
        results.forEach((single) => {
          allPosts.push(single);
        });
        setPosts(allPosts);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  // componentDidUpdate() {
  //   // use ScrollMagic for infinite scrolling
  //   const FadeInController = new ScrollMagic.Controller();
  //   document
  //     .querySelectorAll(".posts-container .col-md-4.card-outer")
  //     .forEach(function (item) {
  //       // build a scene
  //       const FadeInScene = new ScrollMagic.Scene({
  //         triggerElement: item.children[0],
  //         reverse: false,
  //         triggerHook: 1,
  //       })
  //         .setClassToggle(item, "fade-in")
  //         .addTo(FadeInController);
  //     });
  // }


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
        <div className="container">
          <h1 className="posts-title">All Posts &amp; Ramblings</h1>
          <PostList posts={posts} />
        </div>
      </div>
    );
}

export default Posts;