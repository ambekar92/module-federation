import { useSessionUCMS } from '@/app/lib/auth'
import { GridContainer, Grid } from '@trussworks/react-uswds'
import { SBA_LOGO_CIRCLE_URL } from '../../../../app/constants/icons'
import styles from './Layout.module.scss'

export default function Footer() {
  const lineItemStyle =
    'mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content'
  const footerLinkStyle = 'usa-footer__primary-link'

  const { data: session, status } = useSessionUCMS()

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault() // Prevent default link behavior
  }

  const styleSettings = {
    hoverColor: '',
    bg: 'bg-primary-darker',
    textColor: 'text-white',
    textColor2: 'text-blue',
    backgroundColor: 'white',
    logo: SBA_LOGO_CIRCLE_URL,
  }

  return (
    <div className={styles.layoutFooter}>
      <div className="usa-footer usa-footer--slim">
        <div className={`${styleSettings.bg} usa-footer__primary-section`}>
          <div
            className={`usa-footer__primary-container maxw-full width-full border-left-0 border-right-0 ${styles['topPartLinks']}`}
          >
            <GridContainer
              className={'height-full maxw-full width-full '}
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
                          className={`${styleSettings.textColor2} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">Documentation</span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor2} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">Features</span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor2} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">
                            Getting Started {session && 'Session'}
                          </span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor2} ${footerLinkStyle} ${styleSettings.hoverColor} text-underline`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">About Us</span>
                        </a>
                      </li>
                    </div>
                    <div
                      className="display-flex flex-row flex-justify-end grid-row grid-gap"
                      style={{ backgroundColor: 'white' }}
                    >
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor2} text-light ${footerLinkStyle} ${styleSettings.hoverColor}`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">
                            (800) CALL-GOVT
                          </span>
                        </a>
                      </li>
                      <li className={lineItemStyle}>
                        <a
                          className={`${styleSettings.textColor2} text-light ${footerLinkStyle} ${styleSettings.hoverColor}`}
                          onClick={handleLinkClick}
                        >
                          <span className="text-underline">
                            info@agency.gov
                          </span>
                        </a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </GridContainer>
            <div
              className={`${styleSettings.bg} usa-footer__primary-section maxw-full width-full `}
            >
              <GridContainer
                className={`${styleSettings.bg} height-full maxw-full width-full`}
                containerSize="widescreen"
              >
                <div
                  className={' margin-top-2 usa-footer__nav grid-row grid-gap display-flex flex-row flex-justify'}
                >
                  <div
                    className={' display-flex flex-align-center grid-row margin-bottom-3 padding-top-2'}
                  ><GridContainer>
                      <Grid className={`${styles['grid-container']}`}>
                        <Grid className={`${styles['item1']}`}>
                          <img
                            className="position-relative margin-right-105"
                            src={styleSettings.logo}
                            alt="logo"
                            height={50}
                          />
                        </Grid>
                        <Grid >
                          <div className={`${styleSettings.textColor} `}style={{fontSize: '1.17em', fontWeight: 'bold'}}>
                          U.S. Small Business
                          </div>
                        </Grid>
                        <Grid>
                          <div className={`${styleSettings.textColor} `}style={{fontSize: '1.17em', fontWeight: 'bold'}}>Administration</div>
                        </Grid>
                      </Grid></GridContainer>
                  </div>
                </div>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
