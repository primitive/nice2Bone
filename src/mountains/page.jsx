/**
 * The Page Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cleanText } from "../helpers";
import siteConfig from "../utils/siteConfig";
import NotFound from "../not-found";
// import ReactGA from "react-ga4";
import Preloader from "../pebbles/loader";
import { processSmartTags } from "../fire/smartTags";

const Page = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();
    const { signal } = controller;

    // reset state
    setLoading(true);
    setPage(null);

    // body class
    document.body.className = "";
    document.body.classList.add("page");

    (async () => {
      try {
        const url = `${siteConfig.apiURL}pages?slug=${encodeURIComponent(slug)}`;
        const res = await fetch(url, { signal });
        if (!res.ok) {
          document.title = `${res.statusText} | ${siteConfig.siteName}`;
          throw new Error(res.statusText);
        }

        const data = await res.json();
        const foundPage = data && data.length ? data[0] : null;

        setPage(foundPage);
        document.title = foundPage
          ? `${cleanText(foundPage.title?.rendered)} | ${siteConfig.siteName}`
          : `404 Page Not Found | ${siteConfig.siteName}`;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Page fetch error:", err.message);
          setPage(null);
          document.title = `Error | ${siteConfig.siteName}`;
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Preloader />
            <p className="ff-sketch fs-2 blink">Thinking (stand back)...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!page || !page.title) {
    return <NotFound />;
  }

  const titleSafe = cleanText(page.title?.rendered);
  const headerSrc = page.page_header || null;

  return (
    <div className="container post-entry">
      <article className={`card mb-5 rounded-bottom-3 fade-in ${headerSrc ? "hasHeader" : "noHeader"}`}>
        {headerSrc && (
          <img
            className="card-img-top"
            src={headerSrc}
            alt={titleSafe}
            title={titleSafe}
          />
        )}
        <div className="card-body">
          <h1
            className="card-title"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
          <div className="card-text">
            {processSmartTags(page.content.rendered)}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;
