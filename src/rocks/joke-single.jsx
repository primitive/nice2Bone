/**
 * Joke Single Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import PropTypes from "prop-types";
import JokeLink from "../pebbles/joke-link";
import CatLink from "../pebbles/joke-category-link";
import TagLink from "../pebbles/joke-tag-link";
import Placeholder from "../n2b_placeholder1.jpg";
import { cleanText } from "../helpers";


const JokeSingle = ({ post }) => {
  // debug
  // console.log("JokeSingle joke:", joke);

  const titleSafe = cleanText(post.title.rendered);
  const categories = post.fun_category || [];
  const categorySlugs = post.fun_category_slug || [];

  const tags = post?.fun_tag || [];
  const tagSlugs = post?.fun_tag_slug || [];

  //const imgSrc = post?.joke_header || post?.featured_image_src || Placeholder;

  // Taxonomy fields from your Bedrock plugin (fallbacks included)
  // const funCats = post?.fun_category || [];
  // const funCatSlugs = post?.fun_category_slug || [];

  // const structureCats = post?.structure_category || [];
  // const structureSlugs = post?.structure_category_slugs || [];

  // “fun_subject” is what your plugin currently exposes (tags-like)
  // const funTags = post?.fun_subject || [];
  // const funTagSlugs =
  //   post?.fun_subject_slug || post?.fun_tags_slugs || []; // handle either name

  return (
    <div className="row joke-single">
      <div className="col">
        <article className="card mb-5 text-center rounded-bottom-3 fade-in">
          {/* Header image */}
          {/* <img
            src={imgSrc}
            className="card-img"
            alt={titleSafe}
            title={titleSafe}
            loading="lazy"
          /> */}

          {/* Title */}
            <h1
              className="card-title mx-auto ff-sketch"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />


          {/* Body */}
          <div className="card-body pt-1 pb-5 px-4">
            <div
              className="card-text ff-note text-center fs-3"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          {/* Meta */}
          <div className="card-footer card-meta">
            
            <p className="post-meta p-1 text-muted">
              <small>
                Post Type — <span className="text-uppercase">{post.type}</span>
              </small>
            </p>
{/* 
                      <div className="entry-info">
            <span ><i className="fas fa-folder-open"></i>
              {this.state.post.fun_category.length ? this.state.post.fun_category.map((item, index) =>
                (<Link key={item.toString()}
                  rel="category" to={PrimitiveSettings.path + "jokes/by-type/" + item.replace(/\s+/g, '-').toLowerCase() + "/"}>{item + " "}
                </Link>)) : ', '
              }
            </span>
            <span><i className="fas fa-tag"></i>
              {this.state.post.fun_subject.length ? this.state.post.fun_subject.map((item, index) =>
                (<Link key={item.toString()}
                  rel="tag" to={PrimitiveSettings.path + "jokes/about/" + item.replace(/\s+/g, '-').toLowerCase() + "/"}>{item + " "}
                </Link>)) : ', '
              }
            </span>
          </div> */}

            <div className="entry-info p-1">
              {/* Fun categories (by type) */}
              {/* <span className="me-3">
                <i className="fas fa-folder-open" aria-hidden="true" />{" "}
                {funCats.length > 0 ? (
                  funCats.map((name, i) => {
                    const slug = funCatSlugs[i] || slugify(name);
                    return (
                      <Link key={`fun-${slug}`} to={`/jokes/by-type/${slug}/`}>
                        {name}
                        {i < funCats.length - 1 && ", "}
                      </Link>
                    );
                  })
                ) : (
                  <span className="text-muted">No type</span>
                )}
              </span> */}

              {/* Structure categories */}
              {/* <span className="me-3">
                <i className="fas fa-sitemap" aria-hidden="true" />{" "}
                {structureCats.length > 0 ? (
                  structureCats.map((name, i) => {
                    const slug = structureSlugs[i] || slugify(name);
                    return (
                      <Link key={`structure-${slug}`} to={`/jokes/structure/${slug}/`}>
                        {name}
                        {i < structureCats.length - 1 && ", "}
                      </Link>
                    );
                  })
                ) : (
                  <span className="text-muted">No structure</span>
                )}
              </span> */}

              {/* Fun subjects (tags) */}
              {/* <span>
                <i className="fas fa-tag" aria-hidden="true" />{" "}
                {funTags.length > 0 ? (
                  funTags.map((name, i) => {
                    const slug = funTagSlugs[i] || slugify(name);
                    return (
                      <Link key={`tag-${slug}`} to={`/jokes/about/${slug}/`}>
                        {name}
                        {i < funTags.length - 1 && ", "}
                      </Link>
                    );
                  })
                ) : (
                  <span className="text-muted">No tags</span>
                )}
              </span> */}

            </div>
          </div>

          {/* Optional footer actions (hook up when ready) */}
          <div className="card-footer py-3 text-center bg-dark rounded-bottom-3">
            <JokeLink slug="./"><i className="fas fa-left-long"></i> Previous Joke</JokeLink>
            <a href="/jokes/" className="btn btn-primary mx-4">All Jokes</a>
            <JokeLink slug="./">Next Joke <i className="fas fa-right-long"></i> </JokeLink>
          </div>
        </article>
      </div>
    </div>
  );
};

JokeSingle.propTypes = {
  post: PropTypes.object, // parent HOC decides loading/empty
};

export default JokeSingle;
