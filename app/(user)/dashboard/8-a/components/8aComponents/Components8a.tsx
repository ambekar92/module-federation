'use client'

import React from 'react'
import { Button, ButtonGroup, Card, Grid, Link, Table } from '@trussworks/react-uswds'
import styles from './Components8a.module.scss'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Components8a = () => {

  const handleTableRequest = (data: any) => {
    console.log('>> Check ');

  }

  return (
    <>
      <Grid row>
        <Grid col={6}>
          <h1>Welcome [User]</h1>
        </Grid>
        <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
          <ButtonGroup type="default">
            <Button type="button"
              outline
            >
              {/* <span><AppRegistrationOutlinedIcon className='margin-right-1' /></span>  */}
              <span className='margin-bottom-2' style={{ marginBottom: '15px' }}>Invitation Code </span>
            </Button>
            <Button
              type="button"
              outline
            >
              Apply
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      <hr style={{ margin: '0' }} />

      <p className='margin-top-2 margin-bottom-1 text'> <Link href='#'>Home </Link> <ArrowForwardIosOutlinedIcon style={{ fontSize: '10px' }} /> 8(a) Business Development </p>
      <h2 className='margin-top-1 margin-bottom-1'>MySBA Support Team</h2>

      <Grid row>
        <Grid col={6}>
          <Card className={styles['cardStyle']}>
            <Grid row style={{ padding: '4px' }}>
              <Grid col={6}>
                <div>
                  <p className='margin-0 text-normal'>DISTRICT OFFICE</p>
                  <h2 className='margin-0'>[District Office Name]</h2>
                </div>
              </Grid>
              <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
                <LaunchOutlinedIcon />
              </Grid>

              <Grid col={12}>
                <hr className={styles['hrColor']} />
              </Grid>

              <Grid col={6}>
                <div className='padding-right-2 padding-top-2 display-flex'>
                  <div className='margin-right-2'><StoreOutlinedIcon /></div>
                  <div>
                    123 Main Street<br />
                    Baltimore, MD 21201
                  </div>
                </div>
              </Grid>
              <Grid col={6}>
                <div className='padding-right-2 padding-top-2 display-flex'>
                  <div className='margin-right-2'>
                    <PhoneOutlinedIcon />
                  </div>
                  <div>
                    (000) 000-0000
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>

        </Grid>

        <Grid col={6}>
          <Card className={styles['cardStyle']}>
            <Grid row style={{ padding: '4px' }}>
              <Grid col={6}>
                <div>
                  <p className='margin-0 text-normal'>DISTRICT OFFICE POINT OF CONTACT</p>
                  <h2 className='margin-0'>Jane Doe</h2>
                </div>
              </Grid>
              <Grid col={6} className="display-flex flex-justify-end margin-bottom-1">
                <Button
                  type="button"
                >
                  Message
                </Button>
              </Grid>

              <Grid col={12}>
                <hr className={styles['hrColor']} />
              </Grid>

              <Grid col={6}>
                <div className='padding-right-2 padding-top-2 display-flex'>
                  <div className='margin-right-2'><EmailOutlinedIcon /></div>
                  <div>
                    address@sba.gov<br /><br />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <h2 className='margin-top-1 margin-bottom-1'>Your Tasks</h2>
      <Grid col={12}>
        <Card className={styles['cardStyle']}>
          <Grid row style={{ padding: '4px' }}>
            <Grid col={2} className='text-base'>
              <span className='font-mono-2xs'>BUSINESS PLAN</span>
            </Grid>
            <Grid col={10}>
              <hr className={styles['hrColor']} />
            </Grid>

            <Grid col={12}>
              <div className={styles['yourTasks']}>
                <Grid col={8}>
                  A good business plan guides you through each stage of starting and managing your business.
                  You&apos;ll use your business plan as a roadmap for how to structure, run and grow your business.
                </Grid>
                <Grid col={12} className="display-flex flex-justify-end margin-bottom-1">
                  <Button
                    type="button"
                  >
                    Start
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid row>
        <Grid col={4}>
          <Card className={styles['taskCardStyle']}>
            <Grid row style={{ padding: '4px', backgroundColor: 'transparent' }}>
              <Grid col={12}>
                <h2 className='margin-top-0 text-white'>Capability Statement</h2>
              </Grid>
              <Grid col={12} className="display-flex flex-justify-end margin-bottom-1 margin-top-10">
                <p className='margin-top-1 margin-bottom-1 text-white'>
                  <Link href='/field-function/upload-capability-statement' className={styles['removeLink']}>Open </Link>
                  <ArrowForwardIosOutlinedIcon style={{ fontSize: '18px', paddingTop: '7px' }} />
                </p>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid col={4}>
          <Card className={styles['taskCardStyle']}>
            <Grid row style={{ padding: '4px', backgroundColor: 'transparent' }}>
              <Grid col={12}>
                <h2 className='margin-top-0 text-white'>[Label]</h2>
              </Grid>
              <Grid col={12} className="display-flex flex-justify-end margin-bottom-1 margin-top-10">
                <p className='margin-top-1 margin-bottom-1 text-white'> Open <ArrowForwardIosOutlinedIcon style={{ fontSize: '18px', paddingTop: '7px' }} /> </p>

              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid col={4}>
          <Card className={styles['taskCardStyle']}>
            <Grid row style={{ padding: '4px', backgroundColor: 'transparent' }}>
              <Grid col={12}>
                <h2 className='margin-top-0 text-white'>[Label]</h2>
              </Grid>
              <Grid col={12} className="display-flex flex-justify-end margin-bottom-1 margin-top-10">
                <p className='margin-top-1 margin-bottom-1 text-white'> Open <ArrowForwardIosOutlinedIcon style={{ fontSize: '18px', paddingTop: '7px' }} /> </p>

              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

export default Components8a
