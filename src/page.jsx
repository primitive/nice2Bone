/**
 * The Page Component
 * @package Nice2B One
 * 2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import He from "he";
import NotFound from "./not-found";
// import ReactGA from "react-ga4";
import Preloader from "./pebbles/loader";
import { processSmartTags } from "./fire/smartTags";


const Page = () => {
  const { slug } = useParams();
  const [ page, setPage ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if (!slug) return;
    // ReactGA.pageview(window.location.pathname + window.location.search);

    setLoading(true);
    setPage(null);

    document.body.className = "";
    document.body.classList.add("page");

    const apiURL = process.env.REACT_APP_API_URL || "https://nice2b.me/wp-json/wp/v2/";

    fetch(`${apiURL}pages?slug=${slug}`)
      .then((response) => {
        if (!response.ok) {
          document.title = response.statusText + " | Nice2B One";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        const foundPage = res[0] || null;
        setPage(foundPage);
        document.title = foundPage
          ? He.decode(foundPage.title.rendered) + " | Nice2B One"
          : "404 Page Not Found | Nice2B One";
        setLoading(false);
      })
      .catch(() => {
        setPage(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Preloader />
            <p className="display-font fs-2 blink">Thinking (stand back)...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!page || !page.title) {
    return <NotFound />;
  }

  return (
    <div className="container post-entry">
      <article className={`card ${page.page_header ? "hasHeader" : "noHeader"}`}>
        {page.page_header && (
          <img
            className="card-img-top"
            src={page.page_header}
            alt={He.decode(page.title.rendered)}
          />
        )}
        <div className="card-body">
          <h1
            className="card-title"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
          {/* <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: page.content.rendered,
            }}
          /> */}
          <div className="card-text">
            {processSmartTags(page.content.rendered)}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;
