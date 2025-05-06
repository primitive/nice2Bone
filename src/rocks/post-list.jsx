/**
 * The Post List Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../pebbles/loader";
import PostLink from "../pebbles/post-link";
import CatLink from "../pebbles/category-link";
import Placeholder from "../n2b_placeholder1.jpg";


const PostList = ({ posts }) => {

  const renderPosts = () => {
    return posts.map((post, i) => {
      return (
        <article className="col-md-4 card-outer" key={post.id || post.slug}>
          <div className="card">
            <PostLink slug={post.slug}>
              <img
                src={post.featured_image_src || Placeholder}
                className="card-img-top"
                alt={post.title.rendered}
                title={post.title.rendered}
              />
            </PostLink>

            <div className="card-body post-article post-details">
              <h2 className="card-title">
                <PostLink
                  slug={post.slug}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></PostLink>
              </h2>

              <div className="card-meta">

                <p className="post-meta text-muted d-flex">
                  <span className="card-author">
                    <i className="fas fa-pen-fancy" title="penned by"></i>
                    {post.author_name}
                  </span>
                  <span className="card-published">
                    <i className="far fa-calendar-alt" title="dated"></i>
                    {post.published_date}
                  </span>
                </p>

                <p className="post-tax">
                  <i className="fas fa-cat" title="cat-egories"></i>
                  {post.post_category?.length
                    ? post.post_category.map((item, index) => (
                        <CatLink
                          key={item.toString()}
                          slug={`${post.post_category_slug[index]}`}
                        >
                          {item}
                          {index < post.post_category.length - 1 && ", "}
                        </CatLink>
                      ))
                    : ", "}
                </p>
              </div>

              <div className="card-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

              <div className="buttons">
                <PostLink
                  slug={post.slug}
                  className="btn btn-sketch"
                  alt={`Read post: ${post.title.rendered}`}
                >
                  Read More
                </PostLink>
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
