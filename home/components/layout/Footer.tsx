import React from 'react'
import ThemeToggleButton from '../Buttons/theme/ThemeToggleButton'

export default function Footer() {
   return (
      <>
         <div className="layoutFooter">
            <div className="usa-footer usa-footer--slim">
               <div className="usa-footer__primary-section">
                  <div className="usa-footer__primary-container grid-row">
                     <div className="mobile-lg:grid-col-8">
                        <div className="usa-footer__nav" aria-label="Footer navigation,">
                           <ul className="grid-row grid-gap">
                              <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                                 <a className="usa-footer__primary-link" href="javascript:void(0);">
                                    Getting Started
                                 </a>
                              </li>
                              <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                                 <a className="usa-footer__primary-link" href="javascript:void(0);">
                                    Documentation
                                 </a>
                              </li>
                              <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                                 <a className="usa-footer__primary-link" href="javascript:void(0);">
                                    Features
                                 </a>
                              </li>
                              <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                                 <a className="usa-footer__primary-link" href="javascript:void(0);">
                                    Contact Us
                                 </a>
                              </li>
                              <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                                 <a className="usa-footer__primary-link" href="javascript:void(0);">
                                    About Us
                                 </a>
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
