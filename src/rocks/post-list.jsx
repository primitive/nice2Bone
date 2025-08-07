/**
 * The Post List Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import PropTypes from "prop-types";
import Preloader from "../pebbles/loader";
import PostCard from "../rocks/post-card";

const PostList = ({ posts }) => {

  console.log(posts);
  
  return (
    <div className="row posts-container">
      {posts.length ? (
        posts.map((post, i) => (
          <PostCard key={post.id || post.slug} post={post} index={i} />
        ))
      ) : (
        <div className="col text-center">
          <Preloader />
          <p className="display-font fs-2 blink">Loading</p>
        </div>
      )}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
