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

            <small>This site was created and is curated by the collective unconscious community that resides within the being commonly known as Shaun.
            <br/>Crown prince, licensee and proprietor of this unnatural domain.</small>
            
            <br/>

            Website crafted by the digital alchemy of primitiveshaun. <br/>

            Words and thoughts, welcomed and otherwise, provided by the mysterious mind of the illusive Mr. K.<br/>

            Beautiful stuff designed by Scibble &amp; Sketch.
          </p>
          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice 2B One by{" "}
            <a href="https://primitive.industries"> Primitive Industries</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
