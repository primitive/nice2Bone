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
import Image from "../pebbles/image";
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
          <div className="col pt-5 text-center">
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
            className="card-title p-2 pb-5 mb-5"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
          <div className="card-text">
            {processSmartTags(page.content.rendered)}
          </div>
        </div>

          {/* Meta */}
          <div className="card-footer card-meta">

            <p className="post-meta p-1 text-muted d-flex">
              <span className="card-author">
                <i className="fas fa-pen-fancy" title="penned by" />
                {page.author_name}
              </span>
              <span className="card-published">
                <i className="far fa-calendar-alt" title="dated" />
                {page.published_date}
              </span>
            </p>
            
            <div className="entry-info p-1">
              {/* Categories */}
              {/* <span className="me-3">
                <i className="fas fa-folder-open" aria-hidden="true" />{" "}
                {categories.length > 0 ? (
                  categories.map((name, i) => {
                    const slug = categorySlugs[i] || name;
                    return (
                      <CatLink key={slug} slug={slug}>
                        {name}
                        {i < categories.length - 1 && ", "}
                      </CatLink>
                    );
                  })
                ) : (
                  <span className="text-muted">Uncategorised</span>
                )}
              </span> */}

              {/* Tags */}
              {/* <span>
                <i className="fas fa-tag" aria-hidden="true" />{" "}
                {tags.length > 0 ? (
                  tags.map((name, i) => {
                    const slug = tagSlugs[i] || name;
                    return (
                      <TagLink key={slug} slug={slug}>
                        {name}
                        {i < tags.length - 1 && ", "}
                      </TagLink>
                    );
                  })
                ) : (
                  <span className="text-muted">No tags</span>
                )}
              </span> */}
            </div>
          </div>

          {/* Optional footer actions (hook up when ready) */}
          <div className="card-footer py-3 text-center bg-dark rounded-bottom-3">
            {/* <PostLink slug="./"><i className="fas fa-left-long"></i> Previous Post</PostLink> */}
            <a href="/" className="btn btn-primary mx-4">Back to Posts</a>
            {/* <PostLink slug="./">Next Post <i className="fas fa-right-long"></i> </PostLink> */}
          </div>
      </article>
    </div>
  );
};

export default Page;
