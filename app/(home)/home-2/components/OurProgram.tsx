'use client'
import React, { useEffect, useState } from 'react'
import { Grid, Link } from '@trussworks/react-uswds'
import { MediumLowerPartInfo } from '../utils/constants'
import Spinner from '@/app/shared/components/spinner/Spinner'

export const OurProgram = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (MediumLowerPartInfo) {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <Spinner center />
  }

  return (
    <>
      <h1 className="padding-top-2 padding-x-4">Our Programs</h1>
      <h3
        style={{ fontWeight: '400', fontSize: '16px' }}
        className="padding-x-4"
      >
        SBA offers four certifications, and eight total programs, to help you
        stand out, find contracts, and grow your business.
      </h3>
      <section className="padding-x-4">
        <Grid row className="margin-top-2">
          {MediumLowerPartInfo.map((card, index) => (
            <Grid key={index} tablet={{ col: 6 }} desktop={{ col: 3 }} className="padding-2">
              <Link href={`${card.link}`} style={{ textDecoration: 'none' }}>
                <div
                  className={`bg-white radius-lg line-height-base ${index !== 0 ? 'padding-2' : ''} border-primary-light border-1px padding-2 height-full`}
                  style={{
                    boxShadow: '0px 5px 8px rgba(128, 128, 128, 0.2)',
                  }}
                >
                  <span className="text-size-xs text-base">
                    {card.subTitle}
                  </span>
                  <p
                    className="text-size-md margin-y-2px"
                    style={{ fontWeight: 600, color: 'black' }}
                  >
                    {card.title}
                  </p>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  )
}
