/**
 * The Main App
 * @package Nice2B One
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet, Link } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";
import Page from "./page";
import Post from "./post";
import Posts from "./posts";
import Categories from "./categories";
import Tags from "./tags";
import Jokes from "./jokes";
import Joke from "./joke";
import JokeTags from "./joke-tags";
import JokeCats from "./joke-categories";

import ReactGA from "react-ga";
ReactGA.initialize("UA-7143300-34");

// Load the Sass file
require("./style.scss");

function App() {
  // console.log(process.env.NODE_ENV);

  return (
    <main id="content">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. */}
      <Routes>
        <Route path={PrimitiveSettings.path} element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path="posts/:slug" element={<Post />} />
          <Route path={"category/"} element={<Categories />} />
          <Route path={"category/:slug"} element={<Categories />} />
          <Route path={"tag/"} element={<Tags />} />
          <Route path={"tag/:slug"} element={<Tags />} />

          <Route path={"jokes/"} element={<Jokes />} />
          <Route path={"jokes/:slug"} element={<Joke />} />
          <Route path={"jokes/about/:slug"} element={<JokeTags />} />
          <Route path={"jokes/by-type/:slug"} element={<JokeCats />} />

          <Route path={"think/:slug"} element={<Page />} />
          <Route path={"life/:slug"} element={<Page />} />
          <Route path={":slug"} element={<Page />} />

          {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs 
            that we don't have explicit routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </main>
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
