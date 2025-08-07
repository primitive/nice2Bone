/**
 * JokeCard Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import PropTypes from "prop-types";
import JokeLink from "../pebbles/joke-link";

const JokeCard = ({ post }) => {
  const collapseId = `jk-${post.slug}`;

  return (
    <article className="col-md-4 card-outer">
      <div className="card">
        <div className="card-body post-article post-details">
          <h2 className="card-title">
            <JokeLink
              slug={post.slug}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </h2>

          <div className="collapse" id={collapseId}>
            <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>

          <div className="buttons">
            <button
              className="btn btn-switch"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded="false"
              aria-controls={collapseId}
            >
              Go on...
            </button>

            <JokeLink className="btn btn-switch2" slug={post.slug}>
              Go on, go on...
            </JokeLink>
          </div>

          <div className="card-meta">
            <p className="text-muted text-center">
              <i className="fas fa-grin-squint-tears" title="jokes" /> {post.type}
            </p>

            <p className="text-muted text-center post-tax">
              <i className="fas fa-cat" title="cat-egories" />{" "}
              {post.fun_category?.length > 0
                ? post.fun_category.map((item) => (
                    <a
                      key={item}
                      href={`${PrimitiveSettings.path}category/${item}/`}
                    >
                      {item}{" "}
                    </a>
                  ))
                : "None"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

JokeCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default JokeCard;
