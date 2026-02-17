/**
 * The Main App
 * @package Nice2B One
 * 2025
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";
import siteConfig from "./utils/siteConfig";
import Header from "./header";
// import Header from "./header2";
import Footer from "./footer";

// views
import Posts from "./mountains/posts";
import Post from "./mountains/post";
import Categories from "./mountains/categories";
import Tags from "./mountains/tags";

import Page from "./mountains/page";

import Jokes from "./mountains/jokes";
import Joke from "./mountains/joke";

// sk-dev: TODO
// import JokeTags from "./joke-tags";
// import JokeCats from "./joke-categories";


// sk-dev: ga4 update untested

//import ReactGA from 'react-ga4';
//ReactGA.initialize('G-XXXXXXXXXX');

import { usePageView } from './utils/ga4'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Load the Sass file
//require("./style.scss");
import "./style.scss";

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // includes Popper sk-dev: to move

function App() {

  // sk-dev: env check + debug
  //console.log('PrimitiveSettings.root:', PrimitiveSettings.root);
  //console.log('PrimitiveSettings:', PrimitiveSettings);
  //console.log('PrimitiveSettings.path:', PrimitiveSettings.path); // Should be /n2b/
  //console.log(window.location.pathname);


    // sk-dev: env check + debug
    if (process.env.NODE_ENV === "development") {
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('VITE_API_URL:', process.env.VITE_API_URL);
    }

    // sk-dev to-do GA4: track page views on route change
    // usePageView();

  return (
    <div id="wrapper">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. */}

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* A route with no path displays all posts: updated */}
          <Route index element={<Posts />} />
          {/* single post */}
          <Route path="posts/:slug" element={<Post />} />
          {/* category list */}
          <Route path={"category/"} element={<Categories />} />
          {/* all posts in a category */}
          <Route path={"category/:slug"} element={<Categories />} />
          {/* tag list */}
          <Route path={"tag/"} element={<Tags />} />
          {/* all posts by tag */}
          <Route path={"tag/:slug"} element={<Tags />} />

          {/* custom post types */}
          <Route path={"jokes/"} element={<Jokes />} />
          <Route path={"jokes/:slug"} element={<Joke />} />

          {/* <Route path={"jokes-about/:slug"} element={<JokeTags />} />
          <Route path={"jokes/by-type/:slug"} element={<JokeCats />} /> */}

          {/* nested pages (grouped sections) */}
          <Route path={"think/:slug"} element={<Page />} />
          <Route path={"life/:slug"} element={<Page />} />

          {/* top level page */}
          <Route path={":slug"} element={<Page />} />

          {/* path="*" means "match anything" used as a catch-all fallback: e.g. /banana */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div id="page-inner">
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page </Link>
      </p>
    </div>
  );
}

{/* <BrowserRouter basename={PrimitiveSettings.path}></BrowserRouter> */}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter basename={siteConfig.basePath}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
