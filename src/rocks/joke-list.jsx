/**
 * The Jokes CPT List Component
 * @package Nice2B One
 * 2023
 */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Preloader from "../pebbles/loader";
// import Placeholder from "./n2b_placeholder1.jpg";

const JokeList = ({ posts }) => {
  const renderPosts = () => {
    return posts.map((post, i) => {
      return (
        <article className="col-md-4 card-outer" key={i}>
          <div className="card">
            <div className="card-body post-article post-details">
              <h3 className="card-title">
                <Link
                  to={PrimitiveSettings.path + "jokes/" + post.slug + "/"}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></Link>
              </h3>



              <div className="collapse" id={"jk-" + post.slug}>
                <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </div>

              <div className="buttons">

                <button className="btn btn-danger" type="button" href={"#jk-" + post.slug} data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls={"jk-" + post.slug}>Go on...</button>
                <Link className="btn btn-info" to={PrimitiveSettings.path + "jokes/" + post.slug + "/"}>Go on, go on...</Link>


              </div>
              <div className="card-meta">
                <p className="text-muted">
                  <i className="fas fa-face-grin-tongue-wink" title="jokes"></i>
                  {post.type}
                </p>

                <p className="post-tax">
                  <i className="fas fa-cat" title="cat-egories"></i>
                  {post.fun_category.length
                    ? post.fun_category.map((item, index) => (
                        <a
                          key={item.toString()}
                          href={
                            PrimitiveSettings.path +
                            "category/" +
                            post.fun_category[index] +
                            "/"
                          }
                        >
                          {item + " "}
                        </a>
                      ))
                    : ", "}
                </p>



              </div>
            </div>
          </div>
        </article>
      );
    });
  };

  const renderEmpty = () => {
    return (
      <div className="row">
        <div className="col text-center">
          <Preloader />
          <p className="display-font fs-2 blink">Did I tell you the one about...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="row posts-container">
      {posts ? renderPosts() : renderEmpty()}
    </div>
  );
};

JokeList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default JokeList;
