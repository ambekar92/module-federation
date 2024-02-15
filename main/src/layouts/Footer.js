import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="usa-footer usa-footer--big">
        <div className="grid-container usa-footer__return-to-top">
          <a href="#">Return to top</a>
        </div>
        <div className="usa-footer__primary-section">
          <div className="grid-container">
            <div className="grid-row grid-gap">
              <div className="tablet:grid-col-8">
                <nav className="usa-footer__nav" aria-label="Footer navigation,,">
                  <div className="grid-row grid-gap-4">
                    <div className="mobile-lg:grid-col-6 desktop:grid-col-3">
                      <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                        <h4 className="usa-footer__primary-link">&lt;Topic&gt;</h4>
                        <ul className="usa-list usa-list--unstyled">
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link that&#039;s a bit longer than
                              most of the others&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                    <div className="mobile-lg:grid-col-6 desktop:grid-col-3">
                      <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                        <h4 className="usa-footer__primary-link">&lt;Topic&gt;</h4>
                        <ul className="usa-list usa-list--unstyled">
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link that&#039;s pretty long&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                    <div className="mobile-lg:grid-col-6 desktop:grid-col-3">
                      <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                        <h4 className="usa-footer__primary-link">&lt;Topic&gt;</h4>
                        <ul className="usa-list usa-list--unstyled">
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                    <div className="mobile-lg:grid-col-6 desktop:grid-col-3">
                      <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                        <h4 className="usa-footer__primary-link">&lt;Topic&gt;</h4>
                        <ul className="usa-list usa-list--unstyled">
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                          <li className="usa-footer__secondary-link">
                            <a href="javascript:void(0);">
                              &lt;Secondary link&gt;
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="tablet:grid-col-4">
                <div className="usa-sign-up">
                  <h3 className="usa-sign-up__heading">Sign up</h3>
                  <form className="usa-form">
                    <label className="usa-label" for="email" id="">
                      Your email address
                    </label>
                    <input
                      className="usa-input"
                      id="email"
                      name="email"
                      type="email"
                    />
                    <button className="usa-button" type="submit">
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="usa-footer__secondary-section">
          <div className="grid-container">
            <div className="grid-row grid-gap">
              <div className="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
                <div className="mobile-lg:grid-col-auto">
                  <img
                    className="usa-footer__logo-img"
                    src="/assets/img/logo-img.png"
                    alt=""
                  />
                </div>
                <div className="mobile-lg:grid-col-auto">
                  <p className="usa-footer__logo-heading">&lt;Name of Agency&gt;</p>
                </div>
              </div>
              <div className="usa-footer__contact-links mobile-lg:grid-col-6">
                <div className="usa-footer__social-links grid-row grid-gap-1">
                  <div className="grid-col-auto">
                    <a className="usa-social-link" href="javascript:void(0);">
                      <img
                        className="usa-social-link__icon"
                        src="/assets/img/usa-icons/facebook.svg"
                        alt="Facebook"
                      />
                    </a>
                  </div>
                  <div className="grid-col-auto">
                    <a className="usa-social-link" href="javascript:void(0);">
                      <img
                        className="usa-social-link__icon"
                        src="/assets/img/usa-icons/twitter.svg"
                        alt="Twitter"
                      />
                    </a>
                  </div>
                  <div className="grid-col-auto">
                    <a className="usa-social-link" href="javascript:void(0);">
                      <img
                        className="usa-social-link__icon"
                        src="/assets/img/usa-icons/youtube.svg"
                        alt="YouTube"
                      />
                    </a>
                  </div>
                  <div className="grid-col-auto">
                    <a className="usa-social-link" href="javascript:void(0);">
                      <img
                        className="usa-social-link__icon"
                        src="/assets/img/usa-icons/instagram.svg"
                        alt="Instagram"
                      />
                    </a>
                  </div>
                  <div className="grid-col-auto">
                    <a className="usa-social-link" href="javascript:void(0);">
                      <img
                        className="usa-social-link__icon"
                        src="/assets/img/usa-icons/rss_feed.svg"
                        alt="RSS"
                      />
                    </a>
                  </div>
                </div>
                <p className="usa-footer__contact-heading">
                  &lt;Agency Contact Center&gt;
                </p>
                <address className="usa-footer__address">
                  <div className="usa-footer__contact-info grid-row grid-gap">
                    <div className="grid-col-auto">
                      <a href="tel:1-800-555-5555">&lt;(800) 555-GOVT&gt;</a>
                    </div>
                    <div className="grid-col-auto">
                      <a href="mailto:info@agency.gov">
                        &lt;info@agency.gov&gt;
                      </a>
                    </div>
                  </div>
                </address>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
