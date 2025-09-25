/**
 * PostCard Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import { motion } from "framer-motion";
import PostLink from "../pebbles/post-link";
import CatLink from "../pebbles/category-link";
import Image from "../pebbles/image";
import Placeholder from "../n2b_placeholder1.webp";

const PostCard = ({ post, index }) => {
  const delay = (index % 3) * 0.1;
  const categories = post.post_category || [];
  const categorySlugs = post.post_category_slug || [];

  return (
    <motion.article
      className="col-md-4 card-outer pb-4"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.66, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className="card">
        <PostLink slug={post.slug}>
          <Image  
            image={post.featured_image_src}
            className="card-img-top"
            alt={post.title.rendered}
            title={post.title.rendered}
            fallback={Placeholder} 
            eager={index < 3}
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
              {categories.length
                ? categories.map((name, i) => (
                    <CatLink key={categorySlugs[i]} slug={categorySlugs[i]}>
                      {name}
                      {i < categories.length - 1 && ", "}
                    </CatLink>
                  ))
                : <span className="text-muted">No cats here</span>}
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
