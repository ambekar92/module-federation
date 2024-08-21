import React, { FC } from 'react'
import { Card, Grid } from '@trussworks/react-uswds'
import styles from './Controlling.module.scss'
const ControllEntityMainContent: FC = () => {
  return (
    <>
      <div key={1} className={`padding-left-2 padding-top-1`}>
        <Card className={`${styles['usa-card-no-border']} width-full`}>
          <div
            className={`padding-bottom-1` }
            style={{      
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '20px',
              background: `linear-gradient(to bottom left, #2F426A 120%, #B6D0E2 -80%, #B6D0E2 0%)`,
              height: '13rem',  boxShadow: '4px 6px 3px rgba(128, 128, 128, 0.2)'
            }}
          >
            Connection Requests
            <Grid className="grid-row">
              <Grid className="flex-11">
            <Card
              className={styles['usa-smaller-card']}
              style={{
                height: '8rem',
                width: '8rem',
                paddingTop: '1rem',
              }}
            >
              <span
                className="padding-left-2 padding-top-1"
                style={{ fontSize: '10px', color: 'white' }}
              >
                Requests
              </span>
              <span
                className="padding-left-2"
                style={{ fontSize: '16px', fontWeight: 300, color: 'white' }}
              >
                Pending
              </span>
              <span
                className="padding-left-2 padding-top-2"
                style={{ fontSize: '22px', fontWeight: 200, color: 'white' }}
              >
                3
              </span>
              
            </Card></Grid>
            <Grid className="flex-8"></Grid>
            <Grid className="grid-col flex-align-end padding-top-7 margin-top-7  margin-left-2 padding-left-6"style={{fontSize: '16px', fontWeight: 400, color: 'white'}}>Open</Grid><Grid className="padding-top-9 margin-top-5"> <img src={'/chevron_right.svg'} /></Grid></Grid>
          </div> 
        </Card>

      </div>
      <div key={2} className="padding-left-2 margin-top-neg-2">
        <Card className={`${styles['usa-card-no-border']} width-full`}>
          <div
            className="padding-bottom-1"
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '20px',
              background: `linear-gradient(to bottom left, #2F426A 120%, #B6D0E2 -80%, #B6D0E2 0%)`,
              height: '13rem', boxShadow: '4px 6px 3px rgba(128, 128, 128, 0.2)'
            }}
          >
            Subsidiaries
            <Grid row className="grid-row">
              <Grid>
                <Card
                  className={`${styles['usa-smaller-card']}`}
                  style={{
                    height: '8rem',
                    width: '8rem',
                    paddingTop: '1rem',
                    borderColor: '#73B3E7',
                  }}
                >
                  <span
                    className="padding-left-2 padding-top-1"
                    style={{ fontSize: '10px', color: 'white' }}
                  >
                    Companies
                  </span>
                  <span
                    className="padding-left-2"
                    style={{ fontSize: '16px', fontWeight: 300, color: 'white' }}
                  >
                    Holding
                  </span>
                  <span
                    className="padding-left-2 padding-top-2"
                    style={{ fontSize: '22px', fontWeight: 200, color: 'white' }}
                  >
                    16
                  </span>
                </Card>
              </Grid>
              <Grid className="grid-col flex-align-start flex-6">
                {' '}
                <Card
                  className={`${styles['usa-smaller-card']} grid-col flex-7`}
                  style={{
                    height: '8rem',
                    width: '8rem',
                    paddingTop: '1rem',
                    borderColor: '#73B3E7',
                  }}
                >
                  <span
                    className="padding-left-2 padding-top-1"
                    style={{ fontSize: '10px', color: 'white' }}
                  >
                    Companies
                  </span>
                  <span
                    className="padding-left-2"
                    style={{ fontSize: '16px', fontWeight: 300, color: 'white'}}
                  >
                    Applicants
                  </span>
                  <span
                    className="padding-left-2 padding-top-2"
                    style={{ fontSize: '22px', fontWeight: 200, color: 'white' }}
                  >
                    8
                  </span>
                </Card>
              </Grid>
              <Grid row>
                <Grid className="grid-col flex-1 padding-top-9 margin-top-5 flex-align-end" style={{fontSize: '16px', fontWeight: 400}}>
                  Open
                </Grid>
                <Grid className="padding-top-9 margin-top-5"> <img src={'/chevron_right.svg'} /></Grid>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
      <div key={3} className="padding-left-2 margin-top-neg-2">
        <Card className={`${styles['usa-card-no-border']} width-full`}>
          <div
            className="padding-bottom-1"
            style={{
              marginLeft: '0px',
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '20px',
              background: `linear-gradient(to bottom left, #2F426A 120%, #B6D0E2 -80%, #B6D0E2 0%)`,
              height: '13rem', boxShadow: '4px 6px 3px rgba(128, 128, 128, 0.2)'
            }}
          >
            Contributors
            <Grid className="grid-row">
            <Grid className="flex-11" style={{marginLeft: '0px'}}>
            <Card
              className={styles['usa-smaller-card']}
              style={{
                height: '8rem',
                width: '8rem',
                paddingTop: '1rem',
                borderColor: '#73B3E7',
              }}
            >
              <span
                className="padding-left-2 padding-top-1"
                style={{ fontSize: '10px', color: 'white' }}
              >
                Contributors
              </span>
              <span
                className="padding-left-2"
                style={{ fontSize: '16px', fontWeight: 300, color: 'white' }}
              >
                Total
              </span>
              <span
                className="padding-left-2 padding-top-2"
                style={{ fontSize: '22px', fontWeight: 200, color: 'white' }}
              >
                40
              </span>
            </Card>
            </Grid>
            <Grid className="flex-8"></Grid>
            <Grid className="grid-col flex-align-end padding-top-7 margin-top-7  margin-left-2 padding-left-6"style={{fontSize: '16px', fontWeight: 400}}>Open</Grid><Grid className="padding-top-9 margin-top-5"> <img src={'/chevron_right.svg'} /></Grid></Grid>
          </div>
        </Card>
      </div>
      <div key={4} className="padding-left-2 margin-top-neg-2" >
        <Card className={`${styles['usa-card-no-border']} width-full`}>
          <div
            className="padding-bottom-1"
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              borderRadius: '20px',
              background: `linear-gradient(to bottom left, #2F426A 120%, #B6D0E2 -80%, #B6D0E2 0%)`,
              height: '13rem', boxShadow: '4px 6px 3px rgba(128, 128, 128, 0.2)'
            }}
          >
            Firm Notifications
            <Grid className="grid-row">
            <Grid className="flex-11">
            <Card
              className={styles['usa-smaller-card']}
              style={{
                height: '8rem',
                width: '8rem',
                paddingTop: '1rem',
                borderColor: '#73B3E7',
              }}
            >
              <span
                className="padding-left-2 padding-top-1"
                style={{ fontSize: '10px', color: 'white' }}
              >
                Companies
              </span>
              <span
                className="padding-left-2"
                style={{ fontSize: '16px', fontWeight: 300, color: 'white' }}
              >
                Holding
              </span>
              <span
                className="padding-left-2 padding-top-2"
                style={{ fontSize: '22px', fontWeight: 200, color: 'white' }}
              >
                3
              </span>
            </Card>
            </Grid>
            <Grid className="flex-8"></Grid>
            <Grid className="grid-col flex-align-end padding-top-7 margin-top-7  margin-left-2 padding-left-6"style={{fontSize: '16px', fontWeight: 400}}>Open</Grid><Grid className="padding-top-9 margin-top-5"> <img src={'/chevron_right.svg'} /></Grid></Grid>
          </div>
        </Card>
      </div>
    </>
  )
}

export default ControllEntityMainContent
