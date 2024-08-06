'use client'
import React, { useEffect } from 'react'
import { Grid, Link } from '@trussworks/react-uswds'
import { MediumLowerPartInfo } from '../utils/constants'

export const OurProgram = () => {
  useEffect(() => {
    if (!MediumLowerPartInfo) {
      ;<h1>Loading...</h1>
    }
  }, [MediumLowerPartInfo])

  return (
    <>
      <h1 className="padding-top-2 margin-left-6">Our Programs</h1>
      <h3
        style={{ fontWeight: '400', fontSize: '16px' }}
        className="margin-left-6"
      >
        SBA offers six certifications, and eight total programs, to help you
        stand out, find contracts, and grow your business.{' '}
      </h3>
      <section className="display-flex flex-row flex-justify-center">
        <Grid
          row
          gap="lg"
          className={
            'display-flex flex-row flex-justify-center margin-bottom-4'
          }
        >
          {MediumLowerPartInfo.map((card, index) => (
            <Grid className="margin-top-2" key={index}>
              {index === 5 ? (
                <div
                  className="bg-white radius-lg line-height-base padding-2  "
                  style={{
                    width: '400px',
                  }}
                >
                </div>
              ) : (
                <Link href={`${card.link}`} style={{ textDecoration: 'none' }}>
                  <div
                    className="bg-white radius-lg line-height-base border-primary-light border-1px padding-2  "
                    style={{
                      boxShadow: ' 0px 5px 8px rgba(128, 128, 128, 0.2)',
                      width: '400px',
                    }}
                  >
                    <span className="text-size-xs text-base">
                      {card.subTitle}
                    </span>
                    <p
                      className="text-size-md margin-y-2px padding-bottom-3"
                      style={{ fontWeight: 600, color: 'black' }}
                    >
                      {card.title}
                    </p>
                  </div>
                </Link>
              )}
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  )
}
