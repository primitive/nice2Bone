import React from "react";
import { useNavigate } from "react-router-dom";

const JokeLink = ({ slug, children, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/jokes/${slug}`);
  };

  return (
    <a href={`/jokes/${slug}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
export default JokeLink;