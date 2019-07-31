// External dependencies
import React from "react";
import { withRouter } from 'react-router';
import PostList from './post-list';
import LoadingIcon from "./loading-icon.gif";
import ReactGA from 'react-ga';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tag: "",
      page: 0,
      getPostsWithTag: true,
      controller: false
    };
    this.getMorePostsWithTag = this.getMorePostsWithTag.bind(this);
  }

  componentWillUnmount() {
    this.getMorePostsWithTag = null;
  }

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };

    // init ScrollMagic Controller
    this.controller = new ScrollMagic.Controller();

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: "#footer",
      triggerHook: "onEnter"
    })
      .addTo(this.controller)
      .on("enter", e => {
        if (this.state.getPostsWithTag && this.getMorePostsWithTag !== null) {
          this.getMorePostsWithTag();
        }
      });
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('tag-list');
  }

  getMorePostsWithTag() {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();
    let totalPages;
    this.setState({
      page: this.state.page + 1,
      tag: slug
    });

    //fetch(PrimitiveSettings.URL.api + "posts?filter[tag]=philosophy&page=" + this.state.page)
    fetch("https://nice2b.me/wp-json/wp/v2/posts/?filter[tag]=" + this.state.tag + "&page=" + this.state.page)
      .then(response => {
        console.log("tags response", response);
        for (const pair of response.headers.entries()) {
          // getting the total number of pages
          if (pair[0] == "x-wp-totalpages") {
            totalPages = pair[1];
          }

          if (this.state.page >= totalPages) {
            this.setState({ getPostsWithTag: false });
          }
        }
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(results => {
        const allPosts = this.state.posts.slice();
        results.forEach(single => {
          allPosts.push(single);
        });
        this.setState({ posts: allPosts });
      })
      .catch(error => {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  }

  componentDidUpdate() {
    // use ScrollMagic for infinite scrolling
    const FadeInController = new ScrollMagic.Controller();
    document
      .querySelectorAll(".posts-container .col-md-4.card-outer")
      .forEach(function (item) {
        // build a scene
        const FadeInScene = new ScrollMagic.Scene({
          triggerElement: item.children[0],
          reverse: false,
          triggerHook: 1
        })
          .setClassToggle(item, "fade-in")
          .addTo(FadeInController);
      });
  }

  render() {
    if (!this.state.posts.length === 0) {
      return <img src={LoadingIcon} alt="loading Tags" className="active" id="loader" />;
    }
    return (

      <div>
        <div className="container">
          <h1 className="posts-title">Posts with Tag: {this.state.tag}</h1>
          <PostList posts={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default withRouter(Tags);
