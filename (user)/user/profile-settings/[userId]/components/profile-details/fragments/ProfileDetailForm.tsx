import { Grid, GridContainer, Label } from '@trussworks/react-uswds'
import { Divider } from '@mui/material'
import styles from './ProfileSettings.module.scss'

function ProfileDetailForm({ userProfileData }: any) {
  console.log(">> userProfileData", userProfileData);

  return (
    <GridContainer containerSize="widescreen">
      <Grid row col={12} className="padding-right-2">
        <Grid col={7}>
          <h1 className="underline-heading top-3">Profile Settings</h1>
        </Grid>
        <Grid col={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid col={12}>
          <h1 className="text-bold">User Info</h1>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid row col={12} className={styles['formSection']}>
          <Grid row col={12}>
            <Grid mobile={{ col: 12 }} desktop={{ col: 10 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Full Name
              </Label>
              <Label
                className="text-normal margin-left-2 margin-top-2"
                htmlFor="name-label"
              >
                User Full Name
              </Label>
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 2 }} className="text-right">
              <Label className={styles['displayUserName']} htmlFor="name-label">
                {userProfileData?.first_name} {userProfileData?.last_name}
              </Label>
            </Grid>
          </Grid>
        </Grid>
        <Grid row col={12} className={styles['formSection']}>
          <Grid row col={12}>
            <Grid mobile={{ col: 6 }} desktop={{ col: 8 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Password
              </Label>
              <Label className={styles['changePassword']} htmlFor="name-label">
                Change Password
              </Label>
            </Grid>
            <Grid
              mobile={{ col: 6 }}
              desktop={{ col: 4 }}
              className="text-right"
            >
              <Label className={styles['displayEmailId']} htmlFor="name-label">
                {userProfileData?.email}
              </Label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid col={12}>
          <h1 className="text-bold">Contact Info</h1>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid row col={12} className={styles['formSection']}>
          <Grid row col={12}>
            <Grid mobile={{ col: 6 }} desktop={{ col: 8 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Email Address
              </Label>
              <Label
                className={styles['userEmailAddress']}
                htmlFor="name-label"
              >
                User Email Address
              </Label>
            </Grid>
            <Grid
              mobile={{ col: 6 }}
              desktop={{ col: 4 }}
              className="text-right"
            >
              <Label className={styles['displayEmailId']} htmlFor="name-label">
                {userProfileData?.email}
              </Label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </GridContainer>
  )
}

export default ProfileDetailForm
