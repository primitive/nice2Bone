/**
 * The Post List Component
 * @package Nice2B One
 * 2023
 */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../pebbles/loader";
import Placeholder from "../n2b_placeholder1.jpg";

const PostList = ({ posts }) => {
  const renderPosts = () => {
    return posts.map((post, i) => {
      return (
        <article className="col-md-4 card-outer" key={i}>
          <div className="card">
            <Link to={PrimitiveSettings.path + "posts/" + post.slug + "/"}>
              <img
                src={
                  post.featured_image_src
                    ? post.featured_image_src
                    : Placeholder
                }
                className="card-img-top"
                alt={post.title.rendered}
                title={post.title.rendered}
              />
            </Link>

            <div className="card-body post-article post-details">
              <h3 className="card-title">
                <Link
                  to={PrimitiveSettings.path + "posts/" + post.slug + "/"}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></Link>
              </h3>

              <div className="card-meta">
                <p className="card-author text-muted">
                  <i className="fas fa-pen-fancy" title="penned by"></i>
                  {post.author_name} &ndash; {post.published_date}
                </p>

                <p className="post-tax">
                  <i className="fas fa-cat" title="cat-egories"></i>
                  {post.post_category.length
                    ? post.post_category.map((item, index) => (
                        <a
                          key={item.toString()}
                          href={
                            PrimitiveSettings.path +
                            "category/" +
                            post.post_category_slug[index] +
                            "/"
                          }
                        >
                          {item + " "}
                        </a>
                      ))
                    : ", "}
                </p>
              </div>

              <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

              <div className="buttons">
                <Link
                  className="btn btn-primary"
                  to={PrimitiveSettings.path + "posts/" + post.slug + "/"}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </article>
      );
    });
  };

  const renderEmpty = () => {
    return (
      <div className="row">
        <div className="col text-center">
          <Preloader />
          <p className="display-font fs-2 blink">Loading</p>
        </div>
      </div>
    );
  };

  return (
    <div className="row posts-container">
      {posts.length ? renderPosts() : renderEmpty()}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
