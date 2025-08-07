import React from "react";
import { motion } from "framer-motion";
import PostLink from "../pebbles/post-link";
import CatLink from "../pebbles/category-link";
import Placeholder from "../n2b_placeholder1.jpg";

const PostCard = ({ post, index }) => {
  const delay = index * 0.1;

  return (
    <motion.article
      className="col-md-4 card-outer"
      initial={{ opacity: 0, y: 100 }}
      //animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      //transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      //viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.66, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className="card">
        <PostLink slug={post.slug}>
          <img
            src={post.featured_image_src || Placeholder}
            className="card-img-top"
            alt={post.title.rendered}
            title={post.title.rendered}
          />
        </PostLink>

        <div className="card-body post-article post-details">
          <h2 className="card-title">
            <PostLink
              slug={post.slug}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </h2>

          <div className="card-meta">
            <p className="post-meta text-muted d-flex">
              <span className="card-author">
                <i className="fas fa-pen-fancy" title="penned by" />
                {post.author_name}
              </span>
              <span className="card-published">
                <i className="far fa-calendar-alt" title="dated" />
                {post.published_date}
              </span>
            </p>

            <p className="post-tax">
              <i className="fas fa-cat" title="cat-egories" />
              {post.post_category?.length
                ? post.post_category.map((item, index) => (
                    <CatLink
                      key={item.toString()}
                      slug={post.post_category_slug[index]}
                    >
                      {item}
                      {index < post.post_category.length - 1 && ", "}
                    </CatLink>
                  ))
                : ", "}
            </p>
          </div>

          <div
            className="card-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />

          <div className="buttons">
            <PostLink
              slug={post.slug}
              className="btn btn-sketch"
              alt={`Read post: ${post.title.rendered}`}
            >
              Read More
            </PostLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
