/**
 * The Footer
 * @package Nice2B One
 */

import React from "react";

const Footer = () => (
  <div className="container">
    <footer id="footer">
      <p className="copyright">
        Copyright &copy; {PrimitiveSettings.title} {new Date().getFullYear()} -
        Nice2b One Theme by{" "}
        <a href="https://primitivedigital.uk"> Primitive Digital</a>
      </p>
      <p className="colophon">
        Site maintained by the mysterious Mr. K. Crown prince, licensee and
        proprietor of this unnatural domain.
      </p>
    </footer>
  </div>
);

export default Footer;