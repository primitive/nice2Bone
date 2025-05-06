import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryLink = ({ slug, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/category/${slug}/`);
  };

  return (
    <a href={`/category/${slug}/`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default CategoryLink;
