'use client'
import React from 'react'
import styles from './cards.module.scss'
import { MediumPartInfo } from '../utils/constants'

export const Benefits = () => {
  return (
    <section className={styles['next-part']}>
      <div>
        <h1 className="padding-left-6" style={{marginBottom: '-10px'}}>Benefits of Certification</h1>
        <ul>
          {MediumPartInfo.map((info, index) => (
            <li key={index} style={{ listStyleType: 'none'}} className={'padding-top-2 padding-left-2'}>
              <img
                src={'/homepage2/triangle.svg'}
                className="padding-right-2"
                alt="li"
              />
              {info.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
