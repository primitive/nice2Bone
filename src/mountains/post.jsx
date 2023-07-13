/**
 * The Post Component
 * @package Nice2B One
 */
import React, { useState, useEffect } from "react";
import PostSingle from "../rocks/post-single";
// import ReactGA from "react-ga";
//import { handleBeforeUnload } from "../helpers";
import Preloader from "../pebbles/loader";
import { isEmpty } from "../helpers";
// import NotFound from "../not-found";
import He from "he";

const Post = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {

    fetchData();
    // ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add("single-post");
  }, []); // The empty array ensures that the effect only runs on mount and not on every render

  const fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();
    //let endpoint = process.env.REACT_APP_API_URL + "/wp-json/wp/v2/posts?slug=" + slug;
    let endpoint = PrimitiveSettings.URL.api + "posts?slug=" + slug

    console.log("fetch slug", slug);
    console.log("fetch post", isEmpty(post));

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        setPost(res[0]);
        console.log("response", res[0]);
        
        document.title = isEmpty(res[0])
          ? "404 Post Not Found | Nice2b.me"
          : He.decode(res[0].title.rendered) + " | Nice2b.me";
        setLoading(false);
      });
  };

  if (isEmpty(post)) {
    //if (1==1) {
    return (
      <div className="container">
        {loading ? (
          <div className="row post-container">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">Thinking (stand back)...</p>
            </div>
          </div>
        ) : (
          <div className="row post-container">
            <div className="col text-center">
              <p className="display-font fs-1 p-5">No matching post</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
        <PostSingle post={post} />
    </div>
  );

};

export default Post;
