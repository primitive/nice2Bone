/**
 * The Footer
 * @package Nice2B One
 */

import React from "react";

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="colophon">
            Site maintained by the mysterious Mr. K. Crown prince, licensee and
            proprietor of this unnatural domain.
          </p>
          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice2b One Theme by{" "}
            <a href="https://sknow.it"> Primitive Digital</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
