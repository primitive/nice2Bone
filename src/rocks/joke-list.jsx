/**
 * JokeList Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import PropTypes from "prop-types";
import Preloader from "../pebbles/loader";
import JokeCard from "../rocks/joke-card";

const JokeList = ({ posts }) => {

  console.log(posts);

  return (
    <div className="row posts-container">
      {posts.map((post, i) => (
        <JokeCard key={post.id} post={post} index={i} />
      ))}
    </div>
  );
};

JokeList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default JokeList;
