import { zodResolver } from '@hookform/resolvers/zod'
import { Grid, GridContainer, Icon, Label } from '@trussworks/react-uswds'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormSchema } from '../utils/schemas'
import { UserFormInputs, UserProfileType } from '../utils/types'
import FormInputs from './FormInputs'
import { formatDateFromNumber } from '@/app/(user)/dashboard/utils/helpers'

interface userDetailFormProps {
  userProfileData: UserProfileType
}

function UserDetailForm({ userProfileData }: userDetailFormProps) {
  const [openEdit, setOpenEdit] = useState(false)
  const handleCloseEdit = () => setOpenEdit(false)
  const handleOpenEdit = () => setOpenEdit(true)

  const [userData, setUserData] = useState<{
    role: string
    status: string
    dateJoined: string
    firstName: string
    lastLogin: string
    email: string
  }>()

  useEffect(() => {
    if (Object.keys(userProfileData).length > 0) {
      setUserData({
        role: userProfileData.prbac_role[0].name,
        status: userProfileData.is_active ? 'Active' : ' In Active',
        dateJoined: formatDateFromNumber(userProfileData.date_joined),
        firstName: userProfileData.first_name + ' ' + userProfileData.last_name,
        lastLogin: formatDateFromNumber(userProfileData.last_login),
        email: userProfileData.email,
      })
    }
  }, [userProfileData])

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      role: userProfileData.role,
      status: userProfileData.status,
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
            {userData?.firstName}
          </Grid>
          <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
            <Label className="text-bold" htmlFor="name-label">
              Email
            </Label>
            {userData?.email}
          </Grid>
          <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
            <Label className="text-bold" htmlFor="name-label">
              Last Login
            </Label>
            {userData?.lastLogin}
          </Grid>
        </Grid>
        {openEdit ? (
          <FormInputs
            setUserData={setUserData as any}
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
                Role
              </Label>
              {userData?.role}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
              <Label className="text-bold" htmlFor="name-label">
                Status
              </Label>
              {userData?.status}
            </Grid>
            <Grid mobile={{ col: 12 }} desktop={{ col: 3 }}>
              <Label className="text-bold" htmlFor="name-label">
                Date Joined
              </Label>
              {userData?.dateJoined}
            </Grid>
          </Grid>
        )}
      </Grid>
    </GridContainer>
  )
}

export default UserDetailForm
