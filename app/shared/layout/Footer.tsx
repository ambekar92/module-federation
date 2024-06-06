import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { GridContainer } from '@trussworks/react-uswds'
import { SBA_LOGO_CIRCLE_URL } from '../../constants/icons'
import styles from './layout.module.scss'
import { StyleSetting } from './Navbar'

export default function Footer() {
  const [styleSettings, setStyleSettings] = useState<StyleSetting>({
    bg: '',
    textColor: '',
    logo: SBA_LOGO_CIRCLE_URL,
    hoverColor: ''
  })

  const lineItemStyle =
    'mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content'
  const footerLinkStyle = 'usa-footer__primary-link'

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      setStyleSettings({
        bg: 'bg-primary-darker',
        textColor: 'text-white',
        logo: SBA_LOGO_CIRCLE_URL,
        hoverColor: 'hover:text-primary'
      })
    }
  }, [status])

  return (
    <div className={styles.layoutFooter}>
      <div className="usa-footer usa-footer--slim">
        <div className={`${styleSettings.bg} usa-footer__primary-section`}>
          <div className="usa-footer__primary-container maxw-full width-full border-left-0 border-right-0">
            <GridContainer
              className="height-full maxw-full width-full"
              containerSize="widescreen"
            >
              <div className="mobile-lg:grid-col-12">
                <div
                  className="usa-footer__nav maxw-full width-full"
                  aria-label="Footer navigation"
                >
                  <ul className="grid-row grid-gap display-flex flex-row flex-justify">
                    <div className="display-flex flex-row flex-justify-start grid-row grid-gap">
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>Documentation</span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>
													Features
                          </span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>Getting Started {session && 'Session'}</span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>About Us</span>
                        </a>
                      </li>
                    </div>
                    <div className="display-flex flex-row flex-justify-end grid-row grid-gap">
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} text-light ${footerLinkStyle} ${styleSettings.hoverColor}`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>(800) CALL-GOVT</span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor} text-light ${footerLinkStyle} ${styleSettings.hoverColor}`}
                          href="javascript:void(0);"
                        >
                          <span className='text-underline'>info@agency.gov</span>
                        </a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className=" margin-top-1 usa-footer__nav grid-row grid-gap display-flex flex-row flex-justify">
                <div className="display-flex flex-align-center grid-row margin-bottom-3">
                  <img
                    className="position-relative margin-right-105"
                    src={styleSettings.logo}
                    alt="logo"
                    height={50}
                  />
                  <h3 className={`${styleSettings.textColor} margin-y-0`}>
                      U.S. Small Business Administration
                  </h3>
                </div>
              </div>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
