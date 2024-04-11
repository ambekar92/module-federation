import { useEffect } from 'react'
import React from 'react'
import { Button, Icon } from '@trussworks/react-uswds'
import checkPageStatus, { awayNotification } from './../utils/pushNotification'
import WebSocketComponent from './websocket'
import { useAuth } from '../context/AuthContext'
import Login from './login'
import { ParticipationAgreementModal } from '@/components/Modals'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import styles from '../../styles/modules/Home.module.scss'
import Footer from '@/components/layout/Footer'

export default function Home(): JSX.Element {
   const { isAuthenticated, session } = useAuth()

   if (!isAuthenticated) return <Login />
   // check if the browser is allowing notifications
   useEffect(() => {
      checkPageStatus()
   }, [])

   // When tab is inactive and user is away, notification pops up
   useEffect(
      () => {
         document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
               awayNotification()
            }
         })
      } // check for backend for the number of notifications list so it refreshes when the list changes
   )

   const handleSendMessage = (e: any): void => {
      e.preventDefault()
      checkPageStatus()
   }

   const modalBody = (
      <ul className="participation-modal-body">
         <li>
            To complete your <span>Participation Agreement</span>, carefully read through each section and check the box
            at the bottom of the section indicating your understanding and agreement to the terms.{' '}
         </li>
         <li>
            A signed copy of your <span>Participation Agreement</span> will be made available under the ‘Documents’
            section of your dashboard.
         </li>
      </ul>
   )

   return (
      <>
         <Navbar />
         <Sidebar />

         <div className="layoutMain">
            <h1>HOME Protected Page</h1>
            <p>
               You can view this page because you are signed in as user: <b>{session?.user?.email}</b>
            </p>

            <div className="websocket">
               <WebSocketComponent />
            </div>

            <hr />

            <div className="default-btn">
               <Button type="button">Default</Button>
               <Button type="button">
                  <Icon.CheckBoxOutlineBlank />
                  Default
               </Button>
               <Button type="button" outline>
                  Default
               </Button>
               <Button type="button" outline>
                  <Icon.CheckBoxOutlineBlank /> Default
               </Button>
               <button className="sendBtn" onClick={handleSendMessage}>
                  Turn on Notifications
               </button>
            </div>

            <div className="participation-agreement-modal">
               <ParticipationAgreementModal
                  modalTitle={'U.S. Small Business Administration 8(a) Business Development Program'}
                  subModalTitle={'Participation Agreement'}
                  modalBody={modalBody}
               />
            </div>
         </div>

         <Footer />
      </>
   )
}
