/**
 * The Header Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.jsx";

const Header = () => (
  <div className="container">
    <div id="header-wrapper" className="header d-none d-md-block">
      <header id="masthead" className="site-header" role="banner">
        <div className="row">
          <div className="col-md-12">
            <div className="site-brand">
              <Link
                className="site-logo"
                to="/"
                target="_self"
                alt={ PrimitiveSettings.title }
                title={ PrimitiveSettings.title }
              >
                <Logo />
              </Link>

              {/* <Link
                className="brand-font mx-auto d-block site-title"
                to={PrimitiveSettings.path}
                target="_self"
                dangerouslySetInnerHTML={{ __html: PrimitiveSettings.title }}
              ></Link> */}

              <p
                className="site-description"
                dangerouslySetInnerHTML={{
                  __html: PrimitiveSettings.description,
                }}
              ></p>

            </div>
          </div>
        </div>
      </header>
    </div>

    <nav id="main-nav" className="navbar navbar-expand-lg">
      <Link
        className="navbar-brand brand-font fs-1 d-block d-lg-none"
        to="/"
      >
        {PrimitiveSettings.title}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <div className="container-fluid">
          <ul className="navbar-nav mr-auto justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                a blog <span className="visually-hidden">(current)</span>
              </Link>
            </li>

            {/* THINK dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="thinkDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                about
              </a>
              <div className="dropdown-menu" aria-labelledby="thinkDropdown">
                <Link
                  className="dropdown-item"
                  to="think/about-what/"
                >
                  What?
                </Link>
                <Link
                  className="dropdown-item"
                  to="think/about-who/"
                  >
                    Who?
                  </Link>
                <Link
                  className="dropdown-item"
                  to="think/about-where/"
                  >
                    Where?
                </Link>
                <Link
                  className="dropdown-item"
                  to="think/about-when/"
                  >
                    When?
                </Link>
                <Link
                  className="dropdown-item"
                  to="think/about-why/"
                >
                  Why?
                </Link>
                <div className="dropdown-divider">And</div>
                <Link
                  className="dropdown-item"
                  to="think/about-how/"
                  >
                    How?
                </Link>
                <div className="dropdown-divider">And</div>
                <Link
                  className="dropdown-item" 
                  to="think/analysis-of-images/"
                  >
                    Analysing Images
                </Link>
                <Link 
                  className="dropdown-item" 
                  to="think/analysis-of-text/"
                  >
                    Analysing Text
                </Link>
              </div>
            </li>

            {/* LIFE dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="lifeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Life
              </a>
              <div className="dropdown-menu" aria-labelledby="lifeDropdown">
                <Link
                  className="dropdown-item"
                  to="life/inspiration/"
                  >
                    Inspiration
                  </Link>
                <Link
                  className="dropdown-item"
                  to="life/heros-and-heroines/"
                >
                  Heros &amp; Heroines
                </Link>
                <Link
                  className="dropdown-item"
                  to="life/quotes/"
                  >
                    Quotes
                </Link>
                <Link
                  className="dropdown-item"
                  to="life/bucket-list/"
                  >
                    Bucket List
                  </Link>
              </div>
            </li>

            {/* LOVES dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="loveDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Loves
              </a>
              <div className="dropdown-menu" aria-labelledby="loveDropdown">
                <Link 
                className="dropdown-item" 
                to="category/mind/"
                >
                  Mind
                </Link>
                <Link
                  className="dropdown-item" 
                  to="category/consciousness/"
                  >
                    Consciousness
                  </Link>
                  <Link className="dropdown-item" 
                  to="category/perception/"
                  >
                    Perception
                </Link>
                <Link 
                  className="dropdown-item" 
                  to="category/philosophy/"
                  >
                    Philosophy
                </Link>
                <Link 
                  className="dropdown-item" 
                  to="category/social-sciences/"
                  >
                    Social Sciences
                </Link>
                <Link 
                  className="dropdown-item"
                  to="category/psychology/"
                >
                  Psychology
                </Link>
                <Link 
                  className="dropdown-item" 
                  to="category/web-design/"
                  >
                    Web Design
                </Link>
              </div>
            </li>

            <li className="navbar-text">and</li>

            {/* LAUGHTER dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="laughDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Laughter
              </a>
              <div className="dropdown-menu" aria-labelledby="laughDropdown">
                <Link 
                  className="dropdown-item" 
                  to="jokes/"
                  >
                    Jokes
                  </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;
