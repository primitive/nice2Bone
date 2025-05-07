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

            Website crafted by the digital alchemy of <a href="" className="display-font">primitiveshaun.</a><br/>

            Words and thoughts, welcomed or otherwise, provided by the mysterious mind of the magical Mr. K.<br/>

            Beautiful stuff designed by <a href="" className="display-font">Scibble &amp; Sketch</a>.
          </p>
          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice 2B One by{" "}
            <a href="https://primitive.industries" className="display-font"> Primitive Industries</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
