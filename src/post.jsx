/**
 * The Post Component
 * @package Nice2B One
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import LoadingIcon from "./loading-icon.gif";
import { isEmpty } from "./helpers";
import NotFound from "./not-found";
import He from "he";

const Post = (props) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add("single-post");
  }, []); // The empty array ensures that the effect only runs on mount and not on every render

  const fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(PrimitiveSettings.URL.api + "posts?slug=" + slug)
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
        setIsLoading(false);
      });
  };

  const renderPosts = () => {
    return (
      <article className="card">
        <div className="img-outer"></div>

        <div className="card-body">
          <h1
            className="card-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {/*
          {this.state.post.featured_image_src ? (
            <img
              className="featured-image"
              src={this.state.post.featured_image_src}
              alt="featured image"
            />
          ) : null}
*/}

          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
        <div className="card-meta">
          <p className="card-text">
            <small className="text-muted">
              {post.author_name} &ndash; {post.published_date}
            </small>
          </p>
          <div className="entry-info">
            <span>
              <i className="fas fa-folder-open"></i>
              {post.post_category.length
                ? post.post_category.map((item, index) => (
                    <Link
                      key={item.toString()}
                      rel="category"
                      to={
                        PrimitiveSettings.path +
                        "category/" +
                        post.post_category_slug[index] +
                        "/"
                      }
                    >
                      {item + " "}
                    </Link>
                  ))
                : ", "}
            </span>{" "}
            <span>
              <i className="fas fa-tag"></i>
              {post.post_tag.length
                ? post.post_tag.map((item, index) => (
                    <Link
                      key={item.toString()}
                      rel="tag"
                      to={
                        PrimitiveSettings.path +
                        "tag/" +
                        post.post_tag_slug[index] +
                        "/"
                      }
                    >
                      {item + " "}
                    </Link>
                  ))
                : ", "}
            </span>
          </div>
        </div>
      </article>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <img
          src={LoadingIcon}
          alt="loader gif"
          className="active"
          id="loader"
        />
      );
    } else if (isEmpty(post)) {
      return <NotFound />;
    }
  };

  return (
    <div>
      {renderEmpty()}
      {renderPosts()}
    </div>
  );
};

export default Post;
