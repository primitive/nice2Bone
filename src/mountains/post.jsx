/**
 * The Post Component
 * @package Nice2B One
 */
import React, { useState, useEffect } from "react";
import PostSingle from "../rocks/post-single";
// import ReactGA from "react-ga";

//import { handleBeforeUnload } from "../helpers";
import { Rings as Loader } from "react-loader-spinner";

// import LoadingIcon from "./loading-icon.gif";
import { isEmpty } from "../helpers";
// import NotFound from "../not-found";
import He from "he";

const Post = (props) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});

  useEffect(() => {

    console.log("fetch");
    fetchData();
    // ReactGA.pageview(window.location.pathname + window.location.search);
    document.body.className = "";
    document.body.classList.add("single-post");
  }, [loading]); // The empty array ensures that the effect only runs on mount and not on every render

  const fetchData = () => {
    let url = window.location.href.split("/");
    let slug = url.pop() || url.pop();

    console.log("slug", slug);

    fetch(PrimitiveSettings.URL.api + "posts?slug=" + slug)
      .then((response) => {
        if (!response.ok) {
          document.title = response.statusText + "| Nice2b.me";
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        setPost(res[0]);
        console.log("response", res[0]);
        
        document.title = isEmpty(res[0])
          ? "404 Post Not Found | Nice2b.me"
          : He.decode(res[0].title.rendered) + " | Nice2b.me";
        setLoading(false);
      });
  };

  if (!post.length) {
    //if (1==1) {
    return (
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col text-center">
              <Loader
                height="100"
                width="100"
                wrapperClass="justify-content-center"
              />
              <p className="display-font fs-2 blink">Thinking (stand back)...</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col text-center">
              <p className="display-4">No matching posts</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
        <h1 className="text-center">{PrimitiveSettings.theme_posts_title}</h1>
        <PostSingle post={post} />
    </div>
  );












  // const renderPosts = () => {

  //   console.log("post", post);
  //   return (

  //   );
  // };

  // const renderEmpty = () => {
  //   if (isLoading) {
  //     return (
  //       <img
  //         src={LoadingIcon}
  //         alt="loader gif"
  //         className="active"
  //         id="loader"
  //       />
  //     );
  //   } else if (isEmpty(post)) {
  //     return <NotFound />;
  //   }
  // };

  // return (
  //   <div>
  //     {renderEmpty()}
  
  //   </div>
  // );



  // const renderEmpty = () => {
  //   return <img src={LoadingIcon} alt="Loading Posts" className="active" id="loader" />;
  // };

  // if (!post) {
  //   return null;
  // }

  // return (
  //   <div className="row post-container">
  //     {post.length ? renderPosts() : renderEmpty()}
  //   </div>
  // );
};

export default Post;
