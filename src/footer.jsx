/**
 * Footer Component
 * @package Nice2B
 * 2025
 */

import React from "react";

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-md-10">
          <p className="colophon mb-2">
            Created and curated by the collective community that resides within the being that is <a href="https://shaunknowles.uk" className="ff-sketch">S.P.K.</a> <br />
            Crown prince, licensee and proprietor of this unnatural domain.
          </p>

          <p className="small mb-1">
            Website crafted by the digital alchemy of <a href="https://primitiveweb.dev" className="ff-sketch">primitiveshaun.</a>
          </p>

          <p className="small mb-1">
            Words and thoughts, welcomed or otherwise, provided by the mysterious minds of the magical Mr Nice &amp; Mr Know.
          </p>

          <p className="colophon small mb-2">
              Beautiful stuff designed by <a href="" className="ff-sketch">Scibble &amp; Sketch</a>.
          </p>

          <p className="copyright">
            Copyright &copy; {PrimitiveSettings.title}{" "}
            {new Date().getFullYear()} - Nice 2B One by{" "}
            <a href="https://primitive.industries" className="ff-sketch">Primitive Industries</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
