/**
 * The Page Component
 * @package Nice2B One
 */
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { isEmpty } from "./helpers";
import NotFound from "./not-found";
import He from "he";

const Page = (props) => {
  const [page, setPage] = useState({});

  useEffect(() => {
    console.log("unmount page");
  }, []); // The empty array ensures that the effect only runs on unmount

  useEffect(() => {
    fetchData();
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add("page");
  }, []); // The empty array ensures that the effect only runs on mount

  const fetchData = () => {
    const url = window.location.href.split("/");
    const slug = url.pop() || url.pop();

    fetch(`${PrimitiveSettings.URL.api}pages?slug=${slug}`)
      .then((response) => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2B One";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        setPage(res[0]);
        document.title = isEmpty(res[0])
          ? "404 Page Not Found | Nice2B One"
          : He.decode(res[0].title.rendered) + " | Nice2B One";
        //console.log("response", res[0]);
      });
  };

  const renderPage = () => {
    if (page.title) {
      if (page.page_header) {
        return (
          <article className="card hasHeader">
            <img
              className="card-img-top"
              src={page.page_header}
              alt={He.decode(page.title.rendered)}
            ></img>
            <div className="card-body">
              <h1
                className="card-title"
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
              <p
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: page.content.rendered,
                }}
              />
            </div>
          </article>
        );
      } else {
        return (
          <article className="card noHeader">
            <div className="card-body">
              <h1
                className="card-title"
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
              <p
                className="card-text"
                dangerouslySetInnerHTML={{
                  __html: page.content.rendered,
                }}
              />
            </div>
          </article>
        );
      }
    } else {
      renderEmpty();
    }
  };

  const renderEmpty = () => {
    return <NotFound />;
  };

  return (
    <div className="container post-entry">
      {page ? renderPage() : renderEmpty()}
    </div>
  );
};

export default Page;
