import React from "react";
import { Route, Routes, Outlet, Link} from "react-router-dom";

import withRouter from "./withrouter";

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

// console.log(process.env.NODE_ENV);


export default function App() {

  return (
    <main id="content">
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/n2b/" element={<Layout />}>
          {/* <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}

          <Route index element={<Posts />} />

          <Route
            path="posts/:slug"
            element={<Post />}
          />

          <Route
            path={PrimitiveSettings.path + "category/"}
            element={withRouter(Categories)}
          />
          <Route
            path={PrimitiveSettings.path + "category/:slug"}
            element={withRouter(Categories)}
          />

          <Route
            exact
            path={PrimitiveSettings.path + "tag/"}
            element={withRouter(Tags)}
          />
          <Route
            exact
            path={PrimitiveSettings.path + "tag/:slug"}
            element={withRouter(Tags)}
          />

          <Route
            exact
            path={PrimitiveSettings.path + "jokes/"}
            element={withRouter(Jokes)}
          />
          <Route
            exact
            path={PrimitiveSettings.path + "jokes/:slug"}
            element={withRouter(Joke)}
          />
          <Route
            exact
            path={PrimitiveSettings.path + "jokes/about/:slug"}
            element={withRouter(JokeTags)}
          />
          <Route
            exact
            path={PrimitiveSettings.path + "jokes/by-type/:slug"}
            element={withRouter(JokeCats)}
          />

          <Route
            exact
            path={PrimitiveSettings.path + "think/:slug"}
            element={withRouter(Page)}
          />
          <Route
            exact
            path={PrimitiveSettings.path + "life/:slug"}
            element={withRouter(Page)}
          />
          <Route
            path={PrimitiveSettings.path + ":slug"}
            element={withRouter(Page)}
          />

          {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs 
            that we don't have explicit routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </main>
  );
}

function Layout() {

console.log(PrimitiveSettings);

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
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
