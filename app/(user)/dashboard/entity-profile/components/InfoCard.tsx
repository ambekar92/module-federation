import React from 'react'
import { Card, Grid } from '@trussworks/react-uswds'
import { IPersonInfo } from './utils/constants'

interface InfoCardProps {
  infoData: IPersonInfo[]
}
const InfoCard: React.FC<InfoCardProps> = ({ infoData }) => {
  return (
    <>
      <div className="padding-top-3">
        <Card>
          <div
            className="padding-left-2"
            style={{
              boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Grid>
              <span
                style={{ fontSize: '12px', font: 'roboto', fontWeight: 400 }}
              >
                [TYPE]
              </span>
            </Grid>
            <Grid>
              <span>
                <h3 style={{ marginTop: '.7rem' }}>
                  [Controlling Entity Name]
                </h3>
              </span>
            </Grid>
            <Grid row>
              <Grid className="padding-right-1 padding-bottom-1">
                <img src="/EntityProfileIcons/person.svg" />
              </Grid>
              {infoData.length > 0 ? (
                <Grid className="flex-3">{infoData[0]?.name}</Grid>
              ) : (
                <Grid className="flex-3">Mr. John James Doe III</Grid>
              )}
              <Grid className="padding-right-1">
                <img src="/EntityProfileIcons/email.svg" />
              </Grid>
              {infoData.length > 0 ? (
                <Grid className="flex-2">{infoData[0]?.email}</Grid>
              ) : (
                <Grid className="flex-2">address@domain.ext</Grid>
              )}
            </Grid>
            <Grid row>
              <Grid className="padding-right-1">
                <img src="/EntityProfileIcons/store.svg" />
              </Grid>
              {infoData.length > 0 ? (
                <Grid className="flex-3">
                  <Grid>{infoData[0]?.firstLineAddress} </Grid>
                  <Grid>{infoData[0]?.secondLineAddress}</Grid>
                </Grid>
              ) : (
                <Grid className="flex-3">
                  <Grid> 123 Main Street </Grid>
                  <Grid>Baltimore, MD 21201</Grid>
                </Grid>
              )}
              <Grid className="padding-right-1 padding-top-3">
                <img src="/EntityProfileIcons/phone.svg" />
              </Grid>
              {infoData.length > 0 ? (
                <Grid className="flex-2 padding-top-3">
                  {infoData[0]?.phoneNumber}
                </Grid>
              ) : (
                <Grid className="flex-2 padding-top-3">(000)000 - 000</Grid>
              )}
            </Grid>
          </div>
        </Card>
      </div>
    </>
  )
}
export default InfoCard
