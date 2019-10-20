// External dependencies
import React from "react";
import { Link, withRouter } from "react-router-dom";
import ReactGA from 'react-ga';
import LoadingIcon from "./loading-icon.gif";
import { isEmpty } from './helpers';
import NotFound from "./not-found";
import He from "he";


class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    this.fetchData();
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('single-joke');
    console.log("mount joke");
  }

  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    fetch(PrimitiveSettings.URL.api + "jokes?slug=" + slug)
      .then(response => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(res => {
        this.setState({ post: res[0] });
        console.log("response", res[0] );
        document.title = isEmpty(res[0]) ? "404 Joke Not Found | Nice2b.me" : (He.decode(res[0].title.rendered) + " | Nice2b.me");
      });
  };

  renderJokes() {
    return (
      <article className="card">
        <div className="img-outer">

        </div>

        <div className="card-body">
          <h1 className="card-title" dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }} />
          <p
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: this.state.post.content.rendered
            }}
          />
        </div>
        <div className="card-meta">

          <p>
            <small className="text-muted">
              Post Type &ndash;
               {this.state.post.type}
            </small>
          </p>
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
          </div>
        </div>
      </article>
    );
  }

  renderEmpty() {
    return (
      <img src={LoadingIcon} alt="Loading Joke" className="active" id="loader" />
    );
  }

  render() {
    return (
      <div className="container joke-entry">
        {isEmpty(this.state.post) ? this.renderEmpty() : this.renderJokes()}
      </div>
    );
  }
}

export default withRouter(Joke);
