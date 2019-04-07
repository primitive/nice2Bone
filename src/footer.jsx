/**
 * The Footer for our theme.
 *
 * @package WordPress
 * @subpackage Primitive One
 * @since Primitive One 1.0
 */

import React from "react";

const Footer = () => (
  <div className="container">
    <footer id="footer" className="footer-1">

      <div className="row">
      <p className="copyright">Copyright &copy; {PrimitiveSettings.title} {new Date().getFullYear()} - Primitive One Theme by <a href="https://primitivedigital.uk"> Primitive Digital</a></p>
      <p className="colophon">Maintained by the mysterious Mr. K. Crown prince, licensee and proprietor of this unnatural domain.</p>
      </div>

    </footer>
  </div>
);

export default Footer;