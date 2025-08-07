/**
 * The Header Component
 * @package Nice2B One
 * 2025
 */
import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "./utils/siteConfig";
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
                title={siteConfig.siteName}
                aria-label={siteConfig.siteName}
              >
                <Logo />
              </Link>
              
              <p className="site-description">
                {siteConfig.description || "A WordPress Blog"}
              </p>

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
        {siteConfig.siteName}
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
          <ul className="navbar-nav me-auto justify-content-center">

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
                aria-expanded="false"
              >
                about
              </a>
              <ul className="dropdown-menu" aria-labelledby="thinkDropdown">
                <li>
                  <Link className="dropdown-item" to="think/about-what/">What?</Link></li>
                <li><Link className="dropdown-item" to="think/about-who/">Who?</Link></li>
                <li><Link className="dropdown-item" to="think/about-where/">Where?</Link></li>
                <li><Link className="dropdown-item" to="think/about-when/">When?</Link></li>
                <li><Link className="dropdown-item" to="think/about-why/">Why?</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="think/about-how/">How?</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="think/analysis-of-images/">Analysing Images</Link></li>
                <li><Link className="dropdown-item" to="think/analysis-of-text/">Analysing Text</Link></li>
              </ul>
            </li>

            {/* LIFE dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="lifeDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Life
              </a>
              <ul className="dropdown-menu" aria-labelledby="lifeDropdown">
                <li><Link className="dropdown-item" to="life/inspiration/">Inspiration</Link></li>
                <li><Link className="dropdown-item" to="life/heros-and-heroines/">Heros &amp; Heroines</Link></li>
                <li><Link className="dropdown-item" to="life/quotes/">Quotes</Link></li>
                <li><Link className="dropdown-item" to="life/bucket-list/">Bucket List</Link></li>
              </ul>
            </li>

            {/* LOVES dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="loveDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Loves
              </a>
              <ul className="dropdown-menu" aria-labelledby="loveDropdown">
                <li><Link className="dropdown-item" to="category/mind/">Mind</Link></li>
                <li><Link className="dropdown-item" to="category/consciousness/">Consciousness</Link></li>
                <li><Link className="dropdown-item" to="category/perception/">Perception</Link></li>
                <li><Link className="dropdown-item" to="category/philosophy/">Philosophy</Link></li>
                <li><Link className="dropdown-item" to="category/social-sciences/">Social Sciences</Link></li>
                <li><Link className="dropdown-item" to="category/psychology/">Psychology</Link></li>
                <li><Link className="dropdown-item" to="category/web-design/">Web Design</Link></li>
              </ul>
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
                aria-expanded="false"
              >
                Laughter
              </a>
              <ul className="dropdown-menu" aria-labelledby="laughDropdown">
                <li><Link className="dropdown-item" to="jokes/">Jokes</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;
