'use client'
import { useSessionUCMS } from '@/app/lib/auth';
import { useUser } from '@/app/services/queries/user-service/useUser';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@trussworks/react-uswds';
import moment from 'moment';
import React from 'react';

const infoItemStyle: React.CSSProperties = {display: 'flex', flexDirection: 'column', gap: '.5rem'};
const colStyle: React.CSSProperties = {display: 'flex', flexDirection: 'column', gap: '2rem'};

const UserPage =  () => {
  const userSession = useSessionUCMS();
  const {data: user, error, isLoading} = useUser(userSession?.data.user_id.toString());

  if (error) {
    return <Alert type='error' headingLevel='h4'>Failed to load user details</Alert>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1 style={{marginBottom: '0'}}>User Details</h1>
      <p className='font-body-xl' 
      style={{display: 'flex', gap: '.5rem', lineHeight: '2', marginTop: '0', alignItems: 'center'}}><FontAwesomeIcon icon={faUser} style={{width: '1.5rem'}} />
       Profile Information </p>
      {!!user && 
      <div style={{display: 'flex', justifyContent: 'space-between', width: '50%'}}>
        <div style={colStyle}>
          <div style={infoItemStyle}>
            <strong>Name</strong>
            <span>{`${user.first_name} ${user.last_name}`}</span>
          </div>
          <div style={infoItemStyle}>
            <strong>Role</strong>
            <span>{user?.prbac_role?.map(p => p.name).join(', ')}</span>
          </div>
        </div>
        <div style={colStyle}>
          <div style={infoItemStyle}> 
            <strong>Email</strong>
            <span>{user.email}</span>
          </div>
          <div style={infoItemStyle}>
            <strong>Status</strong>
            <span>{user.is_active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
        <div style={colStyle}>
        <div style={infoItemStyle}>
            <strong>Last Login</strong>
            <span>{user.last_login ? moment(user.last_login).format('MM/DD/yyyy') : 'N/A'}</span>
          </div>
          <div style={infoItemStyle}>
            <strong>Date Joined</strong>
            <span>{user.date_joined ? moment(user.date_joined).format('MM/DD/yyyy') : 'N/A'}</span>
          </div>
        </div>
      </div>}
    </>
  )
}

export default UserPage
