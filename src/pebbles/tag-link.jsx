import React from "react";
import { useNavigate } from "react-router-dom";

const TagLink = ({ slug, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/tag/${slug}/`);
  };

  return (
    <a href={`/tag/${slug}/`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default TagLink;
