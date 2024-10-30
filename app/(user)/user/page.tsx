'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { updateUserProfile } from '@/app/services/api/user-service/updateUserProfile';
import { useUser } from '@/app/services/queries/user-service/useUser';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { Role } from '@/app/shared/types/role';
import { isRole } from '@/middleware';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@mui/material';
import { Alert } from '@trussworks/react-uswds';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const infoItemStyle: React.CSSProperties = {display: 'flex', flexDirection: 'column', gap: '.5rem'};

const UserPage = () => {
  const userSession = useSessionUCMS();
  const {data: user, error, isLoading, mutate} = useUser(userSession?.data?.user_id?.toString());
  const [userOutOfOffice, setUserOutOfOffice] = useState<boolean>();
  const isInternalUser = isRole(userSession?.data?.permissions, Role.INTERNAL);

  const handleClick = async () => {
    if(!user) {return;}
    const newOutOfOfficeStatus = !userOutOfOffice;
    setUserOutOfOffice(newOutOfOfficeStatus);

    try {
      await updateUserProfile({
        id: user.id,
        user_id: user.id,
        okta_id: user.profile[0].okta_id,
        out_of_office: newOutOfOfficeStatus
      });
      mutate({
        ...user,
        profile: [{...user.profile[0], out_of_office: newOutOfOfficeStatus}]
      }, false);
    } catch (error) {
      setUserOutOfOffice(!newOutOfOfficeStatus);
      if (process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Failed to update user profile:', error);
      }
    }
  }

  useEffect(() => {
    setUserOutOfOffice(user?.profile[0].out_of_office || false)
  }, [user]);

  if (error) {
    return <Alert type='error' headingLevel='h4'>Failed to load user details</Alert>;
  }
  if (isLoading || !user || !userSession) {
    return <Spinner center />
  }

  return (
    <div className="grid-row grid-gap-4">
      <div className="grid-col-12">
        <div className='flex flex-justify flex-align-center'>
          <h1 style={{marginBottom: '0'}}>User Details</h1>
          {(user.profile[0].out_of_office !== null && isInternalUser) && (
          // Out of office switch remains the same
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: userOutOfOffice ? '#cc0000' : 'black', fontWeight: userOutOfOffice ? 'bold' : 'normal' }}>
            Out of Office
              </span>
              <Switch
                id='out-of-office'
                onChange={handleClick}
                checked={!userOutOfOffice}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'green',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'green',
                  },
                }}
              />
              <span style={{ color: userOutOfOffice ? 'black' : '#197e4e', fontWeight: userOutOfOffice ? 'normal' : 'bold' }}>
            In Office
              </span>
            </div>
          )}
        </div>
        <p className='font-body-xl margin-y-2' style={{display: 'flex', gap: '.5rem', alignItems: 'center'}}>
          <FontAwesomeIcon icon={faUser} style={{width: '1.5rem'}} />
      Profile Information
        </p>
      </div>

      {!!user && (
        <>
          {/* Top Row */}
          <div className="grid-col-12 tablet:grid-col-4">
            <div style={infoItemStyle}>
              <strong>Name</strong>
              <span>{`${user.first_name} ${user.last_name}`}</span>
            </div>
          </div>
          <div className="grid-col-12 tablet:grid-col-4">
            <div style={infoItemStyle}>
              <strong>Email</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="grid-col-12 tablet:grid-col-4">
            <div style={infoItemStyle}>
              <strong>Last Login</strong>
              <span>{user.last_login ? moment(user.last_login).format('MM/DD/yyyy') : 'N/A'}</span>
            </div>
          </div>

          {/* Bottom Row */}
          {isInternalUser && (
            <div className="grid-col-12 tablet:grid-col-4 margin-top-4">
              <div style={infoItemStyle}>
                <strong>Role</strong>
                <span>{user?.prbac_role?.map(p => p.name).join(', ')}</span>
              </div>
            </div>
          )}
          <div className="grid-col-12 tablet:grid-col-4 margin-top-4">
            <div style={infoItemStyle}>
              <strong>Status</strong>
              <span>{user.is_active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <div className="grid-col-12 tablet:grid-col-4 margin-top-4">
            <div style={infoItemStyle}>
              <strong>Date Joined</strong>
              <span>{user.date_joined ? moment(user.date_joined).format('MM/DD/yyyy') : 'N/A'}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserPage
