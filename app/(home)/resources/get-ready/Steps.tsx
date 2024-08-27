
import React from 'react'
import { Grid, Card } from '@trussworks/react-uswds'
import styles from './steps.module.scss'
import { Cards } from '../utils/constant'
import Link from 'next/link'
import { INITIAL_APPLICATION_LINK  } from '@/app/constants/url'
export default function Steps(): JSX.Element {

  return (
    <div>
      <section className="display-flex flex-justify flex-align-center width-full padding-y-2 border-bottom border-base-lighter"
      >
        <div className="margin-left-3">
          <h1>Prepare for Application</h1>
        </div>
      </section>
      <div className="margin-left-3">
        <h2><Link href={`${INITIAL_APPLICATION_LINK}`} style={{textDecoration: 'none', color: 'black'}}>Initial Application</Link></h2>
        <div style={{ fontSize: '16px' }}>
          Below, you&#39;ll find resources to assist with your initial application.
        </div>
      </div>
      {Cards && Cards.length && (
        Cards.map((item: any, index) => (
          <div key={index} className="margin-left-3">
            <Link href={`${item.linkPath}`} style={{textDecoration: 'none', color: 'black'}}><h3>{item.title}</h3></Link>
            <Grid style={{ font: '16px', fontWeight: '400' }}>
              {item.description}
            </Grid>
            <Grid
              className="margin-top-1 margin-bottom-2"
              style={{ font: '12px', fontWeight: '400', color: '#71767A' }}
            >
              {item.information}
            </Grid>
            <Grid row className={styles['card-container']}>
              {item.cards.map((card: any, index:any) => (
                <div key={index} className={styles['card']}>
                  <>
                    <Card key={card.index}>
                      <div key={card.index}><Link href={`${card.linkPath}`} style={{textDecoration: 'none'}}>
                        <table className={styles['usa-table']}>
                          <tbody>
                            <tr style={{ border: '1px' }}>
                              <td
                                rowSpan={2}
                                className={styles['td']}
                                style={{ paddingRight: '8px' }}
                              >
                                <img src={card.iconName} alt="iconName" />
                              </td>
                              <td
                                style={{
                                  fontSize: '13px',
                                  fontWeight: '300',
                                  color: '#71767A',
                                  paddingRight: '8px',
                                }}
                              >
                                {card.grayText}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  paddingRight: '8px',
                                  color: 'black'
                                }}
                              >
                                <b>{card.boldText}</b>
                              </td>
                            </tr>
                          </tbody>
                        </table></Link>
                      </div>
                    </Card>
                  </>
                </div>
              ))}
            </Grid>
          </div>
        ))
      )}
      <div className="margin-left-3"><a href={'https://www.irs.gov/businesses/small-businesses-self-employed/single-member-limited-liability-companies'} className={styles['usa-caption']}>*LLCs filing taxes as S Corporations or disregarded entities should select the LLC button above</a></div>
    </div>
  )
}
