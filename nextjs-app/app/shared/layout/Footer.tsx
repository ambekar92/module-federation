import React from 'react'
import styles from './layout.module.scss'

export default function Footer() {
  return (
    <>
      <div className={styles.layoutFooter}>
        <div className="usa-footer usa-footer--slim">
          <div className="usa-footer__primary-section">
            <div className="usa-footer__primary-container grid-row">
              <div className="mobile-lg:grid-col-8">
                <div
                  className="usa-footer__nav"
                  aria-label="Footer navigation,"
                >
                  <ul className="grid-row grid-gap">
                    <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a className="usa-footer__primary-link">
                        Getting Started
                      </a>
                    </li>
                    <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a className="usa-footer__primary-link">Documentation</a>
                    </li>
                    <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a className="usa-footer__primary-link">Features</a>
                    </li>
                    <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a className="usa-footer__primary-link">Contact Us</a>
                    </li>
                    <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                      <a className="usa-footer__primary-link">About Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
