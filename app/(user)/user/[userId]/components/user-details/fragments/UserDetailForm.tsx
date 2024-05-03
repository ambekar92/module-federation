import { zodResolver } from '@hookform/resolvers/zod'
import {
  Grid,
  GridContainer,
  Label,
  Icon,
  Button,
} from '@trussworks/react-uswds'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInputs from './FormInputs'
import { FormSchema } from '../utils/schemas'
import { UserFormInputs, UserProfileType } from '../utils/types'

interface userDetailFormProps {
  userProfileData: UserProfileType
}

function UserDetailForm({ userProfileData }: userDetailFormProps) {
  const [openEdit, setOpenEdit] = useState(false)
  const handleCloseEdit = () => setOpenEdit(false)
  const handleOpenEdit = () => setOpenEdit(true)

  const [userData, setUserData] = useState<{
    title: string
    role: string
    status: string
    address: string
    address2: string
    city: string
    state: string
    zip: string
    phone: string
  }>({
    title: userProfileData.title,
    role: userProfileData.role,
    status: userProfileData.status,
    address: userProfileData.address,
    address2: userProfileData.address2,
    city: userProfileData.city,
    state: userProfileData.state,
    zip: userProfileData.zip,
    phone: userProfileData.phone,
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: userProfileData.title,
      role: userProfileData.role,
      status: userProfileData.status,
      address: userProfileData.address,
      address2: userProfileData.address2,
      city: userProfileData.city,
      state: userProfileData.state,
      zip: userProfileData.zip,
      phone: userProfileData.phone,
    },
  })

  return (
    <GridContainer containerSize="widescreen">
      <Grid row col={12} className="padding-right-2">
        <Grid col={7}>
          <h1 className="underline-heading top-3">
            {openEdit ? 'Edit ' : ''}User Details
          </h1>
        </Grid>
        <Grid col={5}>
          <button
            onClick={() => handleOpenEdit()}
            className="float-right bg-transparent cursor-pointer text-blue display-flex border-0 flex-column padding-3 hover:text-gray"
          >
            <Icon.Edit size={4}></Icon.Edit>
          </button>
          <button className="float-right bg-transparent cursor-pointer text-blue display-flex flex-align-center flex-align-center border-0 flex-column flex-justify-center padding-3">
            <Icon.History size={4}></Icon.History>
          </button>
        </Grid>
      </Grid>
      <Grid row col={12} className="padding-right-2">
        <h1 className="text-normal">
          <Icon.Person
            className="bottom-1 float-left right-1"
            size={6}
          ></Icon.Person>
          Profile Information
        </h1>
      </Grid>
      <Grid row gap>
        <Grid row col={12}>
          <Grid mobile={{ col: 12 }} desktop={{ col: 4 }}>
            <Label className="text-bold" htmlFor="name-label">
              Name
            </Label>
            {userProfileData.name}
          </Grid>
          <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
            <Label className="text-bold" htmlFor="name-label">
              Email
            </Label>
            {userProfileData.email}
          </Grid>
          <Grid mobile={{ col: 12 }} desktop={{ col: 2 }}>
            <Label className="text-bold" htmlFor="name-label">
              Created
            </Label>
            {userProfileData.created}
          </Grid>
          <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
            <Label className="text-bold" htmlFor="name-label">
              Last Login
            </Label>
            {userProfileData.lastLogin}
          </Grid>
        </Grid>
        {openEdit ? (
          <FormInputs
            setUserData={setUserData}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            isValid={isValid}
            touchedFields={touchedFields}
            handleCloseEdit={handleCloseEdit}
          />
        ) : (
          <Grid row col={12} className="padding-bottom-3">
            <Grid mobile={{ col: 12 }} desktop={{ col: 4 }}>
              <Label className="text-bold" htmlFor="name-label">
                Title
              </Label>
              {userData.title}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
              <Label className="text-bold" htmlFor="name-label">
                Role
              </Label>
              {userData.role}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 2 }}>
              <Label className="text-bold" htmlFor="name-label">
                Status
              </Label>
              {userData.status}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
              <Label className="text-bold" htmlFor="name-label">
                Phone
              </Label>
              {userData.phone}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 4 }}>
              <Label className="text-bold" htmlFor="name-label">
                Address
              </Label>
              {userData.address}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
              <Label className="text-bold" htmlFor="name-label">
                Address2
              </Label>
              {userData.address2}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 2 }}>
              <Label className="text-bold" htmlFor="name-label">
                City
              </Label>
              {userData.city}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 1 }}>
              <Label className="text-bold" htmlFor="name-label">
                State
              </Label>
              {userData.state}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 2 }}>
              <Label className="text-bold" htmlFor="name-label">
                Zip
              </Label>
              {userData.zip}
            </Grid>
          </Grid>
        )}
      </Grid>
    </GridContainer>
  )
}

export default UserDetailForm
