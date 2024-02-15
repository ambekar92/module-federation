import React from "react";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <div>
      {/* <h1>Header</h1>
      <h3 className="site-preview-heading">Default</h3>
<button type="button" className="usa-button">Default</button>
<Button variant="contained">Hello world</Button>
<button type="button" className="usa-button usa-button--hover">Hover</button> */}
      <div className="usa-overlay"></div>
      <header className="usa-header usa-header--basic">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo">
              <em className="usa-logo__text">
                <a href="/" title="<Project title>">
                  Header
                </a>
              </em>
            </div>
            <button type="button" className="usa-menu-btn">
              Menu
            </button>
          </div>
          <nav aria-label="Primary navigation" className="usa-nav">
            <button type="button" className="usa-nav__close">
              <img
                src="/assets/img/usa-icons/close.svg"
                role="img"
                alt="Close"
              />
            </button>
            <ul className="usa-nav__primary usa-accordion">
              <li className="usa-nav__primary-item">
                <button
                  type="button"
                  className="usa-accordion__button usa-nav__link usa-current"
                  aria-expanded="false"
                  aria-controls="basic-nav-section-one"
                >
                  <span>&lt;Current section&gt;</span>
                </button>

                {/* <ul id="basic-nav-section-one" className="usa-nav__submenu">
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                </ul> */}
              </li>
              <li className="usa-nav__primary-item">
                <button
                  type="button"
                  className="usa-accordion__button usa-nav__link"
                  aria-expanded="false"
                  aria-controls="basic-nav-section-two"
                >
                  <span>&lt;Section&gt;</span>
                </button>
                
                {/* <ul id="basic-nav-section-two" className="usa-nav__submenu">
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                  <li className="usa-nav__submenu-item">
                    <a href="#">
                      <span>&lt;Navigation link&gt;</span>
                    </a>
                  </li>
                </ul> */}


              </li>
              <li className="usa-nav__primary-item">
                <a href="#" className="usa-nav-link">
                  <span>&lt;Simple link&gt;</span>
                </a>
              </li>
            </ul>
            <section aria-label="Search component">
              <form className="usa-search usa-search--small" role="search">
                <label className="usa-sr-only" htmlFor="search-field">
                  Search
                </label>
                <input
                  className="usa-input"
                  id="search-field"
                  type="search"
                  name="search"
                />
                <button className="usa-button" type="submit">
                  <img
                    src="/assets/img/usa-icons-bg/search--white.svg"
                    className="usa-search__submit-icon"
                    alt="Search"
                  />
                </button>
              </form>
            </section>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
