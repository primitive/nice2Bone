// External dependencies
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Placeholder from "./placeholder.jpg";
import LoadingIcon from "./loading-icon.gif";

class CategoryList extends React.Component {
  renderPosts() {
    return this.props.posts.map((post, i) => {
      return (
        <article className="col-md-4 card-outer" key={i}>
          <div className="card">
            <div className="img-outer">
              <Link to={PrimitiveSettings.path + "posts/" + post.slug + "/"}>
                <img
                  className="card-img-top"
                  src={
                    post.featured_image_src
                      ? post.featured_image_src
                      : Placeholder
                  }
                  alt="Featured Image"
                />
              </Link>
            </div>

            <div className="card-body post-article post-details">

              <h3 className="card-title">
                <Link to={PrimitiveSettings.path + "posts/" + post.slug + "/"} dangerouslySetInnerHTML={{ __html: post.title.rendered}}></Link>
              </h3>

              <div className="card-meta"> 
                <div className="entry-info">
                  <span ><i className="fas fa-folder-open"></i>
                    {post.post_category.length ? post.post_category.map((item, index) => (
                    //<Link key={item.toString()} 
                    //    rel="category" to={{ pathname: PrimitiveSettings.path + "category/" + post.post_category_slug[index], state: 'flushDeal'}}>{item + " "}
                    //    </Link>
                    <a key={item.toString()} href={PrimitiveSettings.path + 'category/' + post.post_category_slug[index] + "/"}>{item + " "}</a>) 
                    ) : ', '
                    }
                  </span>        	
                </div>
              </div>
              
              <p className="card-subtext">
                <small className="text-muted">
                  {post.author_name} &ndash; {post.published_date}
                </small>
              </p>
              <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

            <div className="read-more">
              <span className="button default">
                <Link className="button default" to={PrimitiveSettings.path + "posts/" + post.slug + "/"}>Read More</Link>
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
      <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
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

export default CategoryList;

CategoryList.propTypes = {
  posts: PropTypes.array.isRequired
};
