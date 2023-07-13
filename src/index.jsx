/**
 * The Main App
 * @package Nice2B One
 * 2023
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
// views
import Posts from "./mountains/posts";
import Post from "./mountains/post";
import Categories from "./mountains/categories";
import Tags from "./mountains/tags";
import Page from "./page";

import Jokes from "./jokes";
import Joke from "./joke";
import JokeTags from "./joke-tags";
import JokeCats from "./joke-categories";


// sk-dev: remove or update
// import ReactGA from "react-ga";
// ReactGA.initialize("UA-XXXXX-Y");

// Load the Sass file
require("./style.scss");

function App() {
  // sk-dev: env check
  console.log(process.env.NODE_ENV);

  return (
    <div id="wrapper">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. */}

      <Routes>
        <Route path={PrimitiveSettings.path} element={<Layout />}>
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
          <Route path={"jokes/about/:slug"} element={<JokeTags />} />
          <Route path={"jokes/by-type/:slug"} element={<JokeCats />} />

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

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
