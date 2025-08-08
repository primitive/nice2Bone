import React from "react";
import { useNavigate } from "react-router-dom";

const JokeCategoryLink = ({ slug, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/jokes-filter/${slug}/`);
  };

  return (
    <a href={`/jokes-filter/${slug}/`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default JokeCategoryLink;
