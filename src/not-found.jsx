import React from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

const NotFound = () => (
  <div id="content">
    <article className="container post-entry">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">404 Page Not Found!</h1>
          <p className="card-text">The page you requested does not exist.</p>
          <p className="card-text button">
            <Link to={PrimitiveSettings.path}>Return to homepage</Link>
          </p>
        </div>
      </div>
    </article>
  </div>
);

//export default NotFound;
export default withRouter(NotFound)