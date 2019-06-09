import React from "react";
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";

const Header = () => (
  <div className="container">

    <div id="header-wrapper" className="header header-1">
      <header id="masthead" className="site-header" role="banner">
        <div className="row">
          <div className="col-md-12" >
            <div className="site-brand">
              <span className="site-title">
                <Link className="site-logo" to={PrimitiveSettings.path} target="_self" dangerouslySetInnerHTML={{ __html: PrimitiveSettings.title}}></Link>
              </span>
              <p className="site-description" dangerouslySetInnerHTML={{ __html: PrimitiveSettings.description}}></p>
            </div>
          </div>
        </div>
      </header>
    </div>

      <nav id="main-nav" className="navbar navbar-expand-lg navbar-light ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link
                  className="nav-item nav-link active"
                  to={PrimitiveSettings.path}
                >
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="thinkDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Deep Thought
                </a>
                <div className="dropdown-menu" aria-labelledby="thinkDropdown">
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/about-what/"}
                >
                  What?
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/about-who/"}
                >
                  Who?
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/about-where/"}
                >
                  Where?
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/about-when/"}
                >
                  When?
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/about-why/"}
                >
                  Why?
                </Link>
                <div className="dropdown-divider">And</div>
                  <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "about-how/"}
                >
                  How?
                </Link>
                <div className="dropdown-divider">And</div>
                  <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/analysis-of-images/"}
                >
                  Analysis of Images
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "think/analysis-of-text/"}
                >
                  Analysis of Text
                </Link>
                </div>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="lifeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Life
                </a>
                <div className="dropdown-menu" aria-labelledby="lifeDropdown">
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "life/inspiration/"}
                >
                  Inspiration
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "life/heros-and-heroines/"}
                >
                  Heros &amp; Heroines
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "life/quotes/"}
                >
                  Quotes
                </Link>
                <Link
                  className="dropdown-item"
                  to={PrimitiveSettings.path + "life/bucket-list/"}
                >
                  Bucket List
                </Link>
                </div>
              </li>
              <li className="nav-item d-none">
                <Link
                  className="nav-item nav-link"
                  to={PrimitiveSettings.path + "contact/"}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
  </div>
);

//export default Header;
export default withRouter(Header)