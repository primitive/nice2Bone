// External dependencies
import React from "react";
import { Link } from "react-router-dom";
import withRouter from './withrouter';
import ReactGA from 'react-ga';
import LoadingIcon from "./loading-icon.gif";
import { isEmpty } from './helpers';
import NotFound from "./not-found";
import He from "he";


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('single-post');
  }



  fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(PrimitiveSettings.URL.api + "posts?slug=" + slug)
      .then(response => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ post: res[0] });
        console.log("response", res[0]);
        document.title = isEmpty(res[0]) ? "404 Post Not Found | Nice2b.me" : (He.decode(res[0].title.rendered) + " | Nice2b.me");
        this.setState({ isLoading: false });
      });
  };

  renderPosts() {
    return (
      <article className="card">
        <div className="img-outer">

        </div>

        <div className="card-body">
          <h1 className="card-title" dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }} />
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
                  rel="category" to={PrimitiveSettings.path + "category/" + this.state.post.post_category_slug[index] + "/"}>{item + " "}
                </Link>)) : ', '
              }
            </span>

            <span><i className="fas fa-tag"></i>
              {this.state.post.post_tag.length ? this.state.post.post_tag.map((item, index) =>
                (<Link key={item.toString()}
                  rel="tag" to={PrimitiveSettings.path + "tag/" + this.state.post.post_tag_slug[index] + "/"}>{item + " "}
                </Link>)) : ', '
              }
            </span>
          </div>
        </div>
      </article>
    );
  }

  renderEmpty() {
    if (this.state.isLoading) {
      return (
        <img src={LoadingIcon} alt="loader gif" className="active" id="loader" />
        //<PreLoader
        //height='90'
        //width='10'
        //color='#6b5ce7'
        ///>
      );
    }
    else {
      return <NotFound />;
    }
  }

  render() {
    return (
      <div className="container post-entry">
        {isEmpty(this.state.post) ? this.renderEmpty() : this.renderPosts()}
      </div>
    );
  }
}

export default withRouter(Post);
