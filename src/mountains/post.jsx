/**
 * The Post Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../utils/siteConfig";
import PostSingle from "../rocks/post-single";
// import ReactGA from "react-ga4";
import Preloader from "../pebbles/loader";
import { isEmpty } from "../helpers";
import He from "he";

const Post = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setPost({});

    fetch(`${siteConfig.apiURL}posts?slug=${slug}`)
      .then((response) => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        const fetchedPost = res[0] || {};
        setPost(fetchedPost);
        console.log("response", res[0]);

        document.title = !isEmpty(fetchedPost)
          ? He.decode(fetchedPost.title.rendered) + " | Nice2B One"
          : "404 Post Not Found | Nice2B One";
        setLoading(false);
      })
      .catch(() => {
        setPost({});
        setLoading(false);
      });

    document.body.className = "";
    document.body.classList.add("single-post");
  }, [slug]);

  if (isEmpty(post)) {
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
