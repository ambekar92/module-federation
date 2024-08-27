
import { Grid } from '@trussworks/react-uswds'
import ControllEntitySideBar from './ControllEntitySideBar'
import ControllEntityMainContent from './ControllEntityMainContent'

const EntityOwned = () => {

  return (
    <>
      <section className="height-full border-y border-y-05 border-base-lighter">
        <h1 style={{ fontWeight: '700', fontSize: '40px' }}>
          [Controlling Entity]
        </h1>
      </section>
      <Grid row className="grid-row flex-3">
        <div className="bg-base-lighter" style={{ width: '23rem' }}>
          <div className=" padding-2 display-flex flex-column flex-align-start">
            <Grid row className="grid-row grid-col">
              <Grid className="padding-left-2 padding-right-8">
                <h3 style={{ fontSize: '22px', fontWeight: 700 }}>
                  Firm Notifications
                </h3>
              </Grid>
              <Grid
                className="grid-col padding-right-2"
                style={{ color: 'blue', paddingTop: '26px' }}
              >
                Open <span>{'>'}</span>
              </Grid>
            </Grid>
            <ControllEntitySideBar />
          </div>
        </div>
        <Grid className="grid-col flex-7">
          <div className="grid-col flex-5">
            <ControllEntityMainContent />
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default  EntityOwned;
