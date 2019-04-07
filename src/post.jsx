// External dependencies
import React from "react";
import { Link } from "react-router-dom";
import LoadingIcon from "./loading-icon.gif";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(PrimitiveSettings.URL.api + "posts?slug=" + slug)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ post: res[0] });
      });
  };

  renderPosts() {
    return (
      <article className="card">
        <div className="img-outer">

        </div>

        <div className="card-body">
          <h1 className="card-title">{this.state.post.title.rendered}</h1>
{/*
          {this.state.post.featured_image_src ? (
            <img
              className="featured-image"
              src={this.state.post.featured_image_src}
              alt="featured image"
            />
          ) : null}
*/}
          
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: this.state.post.content.rendered
            }}
          />
        </div>
        <div className="card-meta"> 
        
        <p className="card-text">
            <small className="text-muted">
              {this.state.post.author_name} &ndash;{" "}
              {this.state.post.published_date}
            </small>
          </p>
          <div className="entry-info">
            <span ><i className="fas fa-folder-open"></i>
              {this.state.post.post_category.length ? this.state.post.post_category.map((item, index) =>
                (<Link key={item.toString()} 
                  rel="category" to={"category/" + this.state.post.post_category_slug[index]}>{item + " "}
                  </Link>)) : ', '
              }
            </span>   
            
            <span><i className="fas fa-tag"></i>
              {this.state.post.post_tag.length ? this.state.post.post_tag.map((item, index) =>
                (<Link key={item.toString()} 
                  rel="tag" to={"tag/" + this.state.post.post_tag_slug[index]}>{item + " "}
                  </Link>)) : ', '
              }
              </span>        	
          </div>
          </div>
      </article>
    );
  }

  renderEmpty() {
    return (
      <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
    );
  }

  render() {
    return (
      <div className="container post-entry">
        {this.state.post.title ? this.renderPosts() : this.renderEmpty()}
      </div>
    );
  }
}

export default Post;
