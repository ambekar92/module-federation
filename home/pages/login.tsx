// client-auth.tsx
import { Button, Card } from '@trussworks/react-uswds'
import UCMSAlert from '../shared/UCMSAlert/UCMSAlert'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styles from '../../styles/modules/login.module.scss'
import { useAuth } from '../context/AuthContext'
interface ILogin {
   redirect?: string
}

export default function Login({ redirect }: ILogin): JSX.Element {
   const { isAuthenticated } = useAuth()
   const router = useRouter()

   useEffect(() => {
      if (isAuthenticated) {
         router.push(redirect || '/home')
      }
   }, [])

   return (
      <>
         <Card style={{ width: '50%', margin: 'auto', marginTop: '2rem' }}>
            <div className={styles.container}>
               <div className={styles.header}>
                  <h1>Welcome</h1>
                  <p>Log in to access your account.</p>
               </div>

               <div className={styles.mainContent}>
                  <div className={styles.actionButtons}>
                     <Button type="button" onClick={() => signIn()}>
                        Sign in
                     </Button>
                     <Button type="button" onClick={() => signIn()}>
                        Create New Account
                     </Button>
                  </div>
                  <div className={styles.note}>
                     <h3>Federal Employee?</h3>
                     <p>
                        If you are a federal employee or SBA contracting <br />
                        officer, please visit the <a href="#">employee account page.</a>
                     </p>
                  </div>
               </div>
               <UCMSAlert
                  styles={{ display: 'flex', flexDirection: 'row' }}
                  title={`Warning`}
                  text={
                     <div className="margin-top-2">
                        <strong>
                           This is a U.S. Small Business Administration federal government computer system that is for
                           official use only.
                        </strong>
                        <p className="margin-top-0">
                           The system is subject to monitoring and anyone using this system expressly consents to such
                           monitoring. Individuals found performing unauthorized activities may be subject to
                           disciplinary action including criminal prosecution.
                        </p>
                     </div>
                  }
               ></UCMSAlert>
            </div>
         </Card>
      </>
   )
}
