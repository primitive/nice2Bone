/**
 * JokeCard Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import { motion } from "framer-motion";
import JokeLink from "../pebbles/joke-link";
import CatLink from "../pebbles/joke-category-link";
import Placeholder from "../n2b_placeholder1.jpg";

const JokeCard = ({ post, index }) => {
  const delay = (index % 3) * 0.1;
  const categories = post.fun_category || [];
  const categorySlugs = post.fun_category_slug || [];
  const collapseId = `jk-${post.slug}`;

  return (
    <motion.article
      className="col-md-4 card-outer"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.66, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className="card">
        {/* <JokeLink slug={post.slug}>
          <img
            loading="lazy"
            src={post.featured_image_src || Placeholder}
            className="card-img-top"
            alt={post.title.rendered}
            title={post.title.rendered}
          />
        </JokeLink> */}

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
              Go on
            </button>

            <JokeLink className="btn btn-switch2" slug={post.slug}>
              Go on, go on
            </JokeLink>
          </div>

          <div className="card-meta">
            {/* <p className="text-muted text-center">
              <i className="fas fa-grin-squint-tears" title="jokes" /> {post.type}
            </p> */}

            <p className="post-meta text-muted d-flex justify-content-between">
              <span className="card-author">
                <i className="fas fa-grin-squint-tears" title="submitted by" />
                {post.author_name || "Anonymous"}
              </span>
              {/* <span className="card-published">
                <i className="far fa-calendar-alt" title="dated" />
                {post.published_date}
              </span> */}
            </p>

            <p className="post-tax">
              <i className="fas fa-cat" title="cat-egories" />
              {categories.length
                ? categories.map((name, i) => (
                    <CatLink key={categorySlugs[i]} slug={categorySlugs[i]}>
                      {name}
                      {i < categories.length - 1 && ", "}
                    </CatLink>
                  ))
                : <span className="text-muted">Uncategorised mischief</span>}
            </p>
          </div>

          {/* <div
            className="card-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || "" }}
          />

          <div className="buttons">
            <JokeLink
              slug={post.slug}
              className="btn btn-sketch"
              alt={`Hear joke: ${post.title.rendered}`}
            >
              Go on, go on...
            </JokeLink>
          </div> */}
        </div>
      </div>
    </motion.article>
  );
};

export default JokeCard;
