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
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setJoke(null);

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
        const joke = data && data.length ? data[0] : null;

        setPost(joke);
        console.log("Joke", joke);

        document.title = joke
          ? `${cleanText(joke.title?.rendered)} | ${siteConfig.siteName}`
          : `404 Joke Not Found | ${siteConfig.siteName}`;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Single joke fetch error:", err.message);
          setJoke(null);
          document.title = `Error | ${siteConfig.siteName}`;
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  if (!joke) {
    return (
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Preloader />
              <p className="display-font fs-2 blink">Titter, titter, titter...</p>
            </div>
          </div>
        ) : (
          <div className="row ">
            <div className="col text-center">
              <p className="display-font fs-1 p-5">No matching joke</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <JokeSingle post={joke} />
    </div>
  );
};

export default Joke;
