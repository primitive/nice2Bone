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
      {posts.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
