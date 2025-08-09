/**
 * The Joke Component (single)
 * @package Nice2B One
 * 2025
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import siteConfig from "../utils/siteConfig";
import { cleanText } from "../helpers";
import JokeSingle from "../rocks/joke-single";
// import ReactGA from "react-ga4";
import Preloader from "../pebbles/loader";

const Joke = () => {
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
    document.body.classList.add("single-joke");
    //ReactGA.pageview(window.location.pathname + window.location.search);

    (async () => {
      try {
        // Your CPT endpoint
        const url = `${siteConfig.apiURL}jokes?slug=${encodeURIComponent(slug)}`;
        const res = await fetch(url, { signal });

        if (!res.ok) {
          document.title = `${res.statusText} | ${siteConfig.siteName}`;
          throw new Error(res.statusText);
        }

        const data = await res.json();
        const post = data && data.length ? data[0] : null;

        setPost(post);
        console.log("Joke", post);

        document.title = post
          ? `${cleanText(post.title?.rendered)} | ${siteConfig.siteName}`
          : `404 Joke Not Found | ${siteConfig.siteName}`;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Single joke fetch error:", err.message);
          setPost(null);
          document.title = `Error | ${siteConfig.siteName}`;
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  if (!post) {
    return (
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="ff-sketch fs-2 blink">Titter, titter, titter...</p>
            </div>
          </div>
        ) : (
          <div className="row ">
            <div className="col text-center">
              <p className="ff-sketch fs-1 p-5">No matching joke</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <JokeSingle post={post} />
    </div>
  );
};

export default Joke;
