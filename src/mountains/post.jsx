/**
 * The Post Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../utils/siteConfig";
import { cleanText } from "../helpers";
import PostSingle from "../rocks/post-single";
// import ReactGA from "react-ga4";
import Preloader from "../pebbles/loader";
import { isEmpty } from "../helpers";

const Post = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setPost(null);

    // Body class
    document.body.className = "";
    document.body.classList.add("single-post");
    // ReactGA.pageview(window.location.pathname + window.location.search);

    (async () => {
      try {
        const url = `${siteConfig.apiURL}posts?slug=${encodeURIComponent(slug)}`;
        const res = await fetch(url, { signal });

        if (!res.ok) {
          document.title = `${res.statusText} | ${siteConfig.siteName}`;
          throw new Error(res.statusText);
        }

        const data = await res.json();
        const fetchedPost = data && data.length ? data[0] : null;

        setPost(fetchedPost);
        console.log("fetchedPost", fetchedPost);

        document.title = fetchedPost
          ? `${cleanText(foundPage.title?.rendered)} | ${siteConfig.siteName}`
          : `404 Post Not Found | ${siteConfig.siteName}`;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Single post fetch error:", err.message);
          setPost(null);
          document.title = `Error | ${siteConfig.siteName}`;
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [slug]);

  const noPost = !post || isEmpty(post);

  if (noPost) {
    return (
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">Thinking (stand back)...</p>
            </div>
          </div>
        ) : (
          <div className="row">
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
