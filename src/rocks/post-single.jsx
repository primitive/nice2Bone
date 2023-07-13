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

const PostSingle = ({ post }) => {
  const renderPosts = () => {

    // sk-dev: debug 
    console.log(post);
    
      return (
        <div className="col">
        <article className="card fade-in">
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
      </div>
      );

  };

  const renderEmpty = () => {
    return (
      <div className="row">
        <div className="col text-center">
          <Preloader />
          <p className="display-font fs-2 blink">Loading</p>
        </div>
      </div>
    )
  };

  // if (!posts) {
  //   return null;
  // }

  return (
    <div className="row post-container">
      {post ? renderPosts() : renderEmpty()}
    </div>
  );
};

PostSingle.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostSingle;