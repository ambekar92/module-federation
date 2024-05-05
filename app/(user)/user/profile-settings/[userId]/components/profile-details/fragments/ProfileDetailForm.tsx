import {
  Grid,
  GridContainer,
  Label,
  Icon,
  Button,
} from '@trussworks/react-uswds'
import { useState } from 'react'
import { Divider } from '@mui/material'
import styles from './ProfileSettings.module.scss'
import EditNameModal from './edit-name-modal/EditNameModal'

function ProfileDetailForm() {
  const [openEdit, setOpenEdit] = useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  return (
    <GridContainer containerSize="widescreen">
      <Grid row col={12} className="padding-right-2">
        <Grid col={7}>
          <h1 className="underline-heading top-3">
            Profile Settings
          </h1>
        </Grid>
        <Grid col={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid col={10}>
          <h1 className="text-bold">
            User Info
          </h1>
        </Grid>
        <Grid col={2} className='text-right'>
          <Button type="submit" className='margin-top-2 usa-button--outline' onClick={handleOpenEdit}>
            Edit
          </Button>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid row col={12} className={styles['formSection']}>
          <Grid row col={12}>
            <Grid mobile={{ col: 6 }} desktop={{ col: 8 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Full Name
              </Label>
              <Label className="text-normal margin-left-2 margin-top-0" htmlFor="name-label">
                User Full Name
              </Label>
            </Grid>
            <Grid mobile={{ col: 6 }} desktop={{ col: 4 }}>
              <select
                className="usa-select"
                name="sort"
                id="sort"
                data-placeholder="sort"
              >
                <option value="John Smith">John Smith</option>
              </select>
            </Grid>
          </Grid>
          <Grid row col={12} className='margin-top-4'>
            <Grid mobile={{ col: 6 }} desktop={{ col: 8 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Public Name
              </Label>
              <Label className="text-normal margin-left-2 margin-top-0" htmlFor="name-label">
                User Public Name
              </Label>
            </Grid>
            <Grid mobile={{ col: 6 }} desktop={{ col: 4 }}>
              <select
                className="usa-select"
                name="sort"
                id="sort"
                data-placeholder="sort"
              >
                <option value="John Smith">John Smith</option>
              </select>
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
            <Grid mobile={{ col: 6 }} desktop={{ col: 4 }} className='text-right'>
              <Label className={styles['displayEmailId']} htmlFor="name-label">
                john.smith@smallbusiness.com
              </Label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid col={12}>
          <h1 className="text-bold">
            Contact Info
          </h1>
        </Grid>
      </Grid>

      <Grid row col={12} className="padding-right-2">
        <Grid row col={12} className={styles['formSection']}>
          <Grid row col={12}>
            <Grid mobile={{ col: 6 }} desktop={{ col: 8 }}>
              <Label className="text-bold margin-top-0" htmlFor="name-label">
                Email Address
              </Label>
              <Label className={styles['userEmailAddress']} htmlFor="name-label">
                User Email Address
              </Label>
            </Grid>
            <Grid mobile={{ col: 6 }} desktop={{ col: 4 }} className='text-right'>
              <Label className={styles['displayEmailId']} htmlFor="name-label">
                john.smith@smallbusiness.com
              </Label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openEdit &&
        <EditNameModal openModal={openEdit} closeModal={(status) => setOpenEdit(status)} />
      }

    </GridContainer>
  )
}

export default ProfileDetailForm
