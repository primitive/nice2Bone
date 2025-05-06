import React from "react";
import { useNavigate } from "react-router-dom";

const PostLink = ({ slug, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/posts/${slug}`);
  };

  return (
    <a href={`/posts/${slug}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
export default PostLink;