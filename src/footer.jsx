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
            Site created &amp; curated by the collective unconscious community that resides within the entity commonly known as Shaun. <br/>Crown prince, licensee and proprietor of this unnatural domain.<br />
            Website built and maintained by primitiveshaun. <br/>
            Thoughts provided by the Mysterious Mind of Mr. K. <br/>
            Design by Skribble &amp; Sketch.
          </p>
          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice 2B Theme by{" "}
            <a href="https://primitive.industries"> Primitive Industries</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
