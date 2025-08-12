/**
 * Post Single Component
 * @package Nice 2B
 * 2025
 */
import React from "react";
import PropTypes from "prop-types";
import PostLink from "../pebbles/post-link";
import CatLink from "../pebbles/category-link";
import TagLink from "../pebbles/tag-link";
import Image from "../pebbles/image";
import Placeholder from "../n2b_placeholder1.jpg";
import { cleanText } from "../helpers";


const PostSingle = ({ post }) => {
  // debug
  // console.log("JokeSingle post:", post);

  const titleSafe = cleanText(post.title.rendered);
  const categories = post.post_category || [];
  const categorySlugs = post.post_category_slug || [];
  const tags = post?.post_tag || [];
  const tagSlugs = post?.post_tag_slug || [];

  return (
    <div className="row post-container">
      <div className="col">
        <article className="card mb-5 rounded-bottom-3 fade-in">
          {/* Header image with Title overlay */}
          <Image  
            image={post.featured_image_src}
            className="card-img"
            alt={titleSafe}
            title={titleSafe}
            fallback={Placeholder} 
            eager
          />
          <div className="card-img-overlay text-center d-flex flex-column justify-content-center">
            <h1
              className="card-title mx-auto"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>

          {/* Body */}
          <div className="card-body py-5 px-4">
            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
            />
          </div>

          {/* Meta */}
          <div className="card-footer card-meta">

            <p className="post-meta p-1 text-muted d-flex">
              <span className="card-author">
                <i className="fas fa-pen-fancy" title="penned by" />
                {post.author_name}
              </span>
              <span className="card-published">
                <i className="far fa-calendar-alt" title="dated" />
                {post.published_date}
              </span>
            </p>
            
            <div className="entry-info p-1">
              {/* Categories */}
              <span className="me-3">
                <i className="fas fa-folder-open" aria-hidden="true" />{" "}
                {categories.length > 0 ? (
                  categories.map((name, i) => {
                    const slug = categorySlugs[i] || name;
                    return (
                      <CatLink key={slug} slug={slug}>
                        {name}
                        {i < categories.length - 1 && ", "}
                      </CatLink>
                    );
                  })
                ) : (
                  <span className="text-muted">Uncategorised</span>
                )}
              </span>

              {/* Tags */}
              <span>
                <i className="fas fa-tag" aria-hidden="true" />{" "}
                {tags.length > 0 ? (
                  tags.map((name, i) => {
                    const slug = tagSlugs[i] || name;
                    return (
                      <TagLink key={slug} slug={slug}>
                        {name}
                        {i < tags.length - 1 && ", "}
                      </TagLink>
                    );
                  })
                ) : (
                  <span className="text-muted">No tags</span>
                )}
              </span>
            </div>
          </div>

          {/* Optional footer actions (hook up when ready) */}
          <div className="card-footer py-3 text-center bg-dark rounded-bottom-3">
            <PostLink slug="./"><i className="fas fa-left-long"></i> Previous Post</PostLink>
            <a href="/" className="btn btn-primary mx-4">Back to Posts</a>
            <PostLink slug="./">Next Post <i className="fas fa-right-long"></i> </PostLink>
          </div>
        </article>
      </div>
    </div>
  );
};

PostSingle.propTypes = {
  post: PropTypes.object, // HOC handles loading/empty state
};

export default PostSingle;
