// External dependencies					
import React from "react";
import JokeList from "./joke-list";
import LoadingIcon from "./loading-icon.gif";
// import PreLoader from "./loader";
//import Loader from 'react-loader-spinner'
import ReactGA from 'react-ga';

class Jokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 0,
      getPosts: true,
      controller: false
    };
    this.getMoreJokes = this.getMoreJokes.bind(this);
  }

  componentWillUnmount() {
    this.getMoreJokes = null;
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
        if (this.state.getPosts && this.getMoreJokes !== null) {
          this.getMoreJokes();
        }
      });

    document.title = "Nice2b.me - Jokes. Both Funny HaHa and Funny Peculiar varieties stocked. ";
    ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add('jokes-list');
  }

  getMoreJokes() {
    let totalPages;

    this.setState({ page: this.state.page + 1 });

    // fetch( 'jokes?filter[meta_key]=currency&filter[meta_value]=AUD'); // here 'cars' is the endpoint for CPT

    fetch(PrimitiveSettings.URL.api + "jokes/?page=" + this.state.page)
      .then(response => {
        for (const pair of response.headers.entries()) {
          // getting the total number of pages
          if (pair[0] == "x-wp-totalpages") {
            totalPages = pair[1];
          }

          if (this.state.page >= totalPages) {
            this.setState({ getPosts: false });
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
      return (
        <>

          <Loader type="Circles" color="#00BFFF" height={80} width={80} />

          <p>No matching posts</p>
        </>
      );
    }

    return (
      <div className="container">
        <h1 className="posts-title">Jokes</h1>
        <JokeList posts={this.state.posts} />
      </div>

    );
  }
}

export default Jokes;