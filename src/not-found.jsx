/**
 * The Not Found Component
 * @package Nice2B One
 * 2023
 */
import React from "react";
// import withRouter from './withrouter';
import { Link } from "react-router-dom";

const NotFound = () => (
  <div id="row">
    <div className="col">
      <article className="card fade-in fill-w">
        <div className="card-body text-center pb-5">
          <h1 className="card-title">404 Page Not Found!</h1>
          <p className="card-text display-font fs-3 p-4">
            The page you requested does not exist.
          </p>
          <p className="card-text justify-content-center">
            <Link to={PrimitiveSettings.path} className="btn btn-primary">
              Return to homepage
            </Link>
          </p>
        </div>
      </article>
    </div>
  </div>
);

export default NotFound;
// export default withRouter(NotFound)