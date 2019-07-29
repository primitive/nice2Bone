// External dependencies
import React from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingIcon from "./loading-icon.gif";
// import PreLoader from "./loader";

class JokeList extends React.Component {
  renderPosts() {
    return this.props.posts.map((post, i) => {
      return (
        <article className="col-md-4 card-outer" key={i}>
          <div className="card">
            <div className="card-body post-article post-details">

              <h3 className="card-title">
                <Link to={PrimitiveSettings.path + "jokes/" + post.slug + "/"} dangerouslySetInnerHTML={{ __html: post.title.rendered}}></Link>
              </h3>

              <p className="card-subtext">
                <small className="text-muted">
                  {post.type} &ndash; {post.type}
                </small>
              </p>

              <div className="collapse" id={"jk-" + post.slug}>
              <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
              </div>

            <div className="read-more">

              <span className="button button-punch"> 
                <a className="button" href={"#jk-" + post.slug} data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">Go on...</a>
              </span>

              <span className="button">
                <Link className="button" to={PrimitiveSettings.path + "jokes/" + post.slug + "/"}>Go on, go on...</Link>
              </span>

            </div>
            </div>
          </div>
        </article>
      );
    });
  }

  renderEmpty() {
    return (
      <img src={LoadingIcon} alt="Loading Jokes" className="active" id="loader" />
    );
  }

  render() {
    if (!this.props.posts) {
      return null;
    }

    return (
      <div className="posts-container">
        {this.props.posts.length ? this.renderPosts() : this.renderEmpty()}
      </div>
    );
  }
}

//export default JokeList;
export default withRouter(JokeList)

JokeList.propTypes = {
  posts: PropTypes.array.isRequired
};