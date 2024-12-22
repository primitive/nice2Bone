/**
 * Footer Component
 * @package Nice2B
 */

import React from "react";

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="colophon">
            Created and curated by the collective of conciousness known as Shaun
            Knowles. Crown prince, licensee and proprietor of this unnatural
            domain. Website maintained by primitiveshaun. Thoughts provided by
            the Mysterious Mr. K, design by Skribble &amp; Sketch.
          </p>
          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice 2B Theme by{" "}
            <a href="https://primitive.industries"> Primitive Digital</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
