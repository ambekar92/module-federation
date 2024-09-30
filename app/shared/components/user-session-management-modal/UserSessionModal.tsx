/* eslint-disable no-console */
'use client'
import { REFRESH_TOKEN_ROUTE } from '@/app/constants/local-routes'
import { useSessionUCMS } from '@/app/lib/auth'
import { logout } from '@/app/lib/logout'
import {
  Button,
  ButtonGroup,
  Modal,
  ModalFooter,
} from '@trussworks/react-uswds'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import styles from './UserSessionModal.module.scss'

const timeout = 60 * 60_000 // 1 hour
const promptBeforeIdle = 5 * 60_000 // 5 minutes
const refreshTokenInterval = 60 * 15_000 // 15 minutes

const UserSessionModal: React.FC = () => {
  const { data: session } = useSessionUCMS()
  const [remaining, setRemaining] = useState<{ minutes: number, seconds: number }>({ minutes: 0, seconds: 0 })
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
      setIsModalOpen(false)
    }
  }

  const onIdle = () => {
    setIsModalOpen(false)
    handleSignOut()
  }

  const onPrompt = () => {
    setIsModalOpen(true)
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout,
    promptBeforeIdle,
    crossTab: true,
    leaderElection: true,
    throttle: 500,
    syncTimers: 200,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getRemainingTime()
      const minutes = Math.floor(remainingTime / 60000)
      const seconds = Math.floor((remainingTime % 60000) / 1000)
      setRemaining({ minutes, seconds })
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [getRemainingTime])

  useEffect(() => {
    if (!session) {
      return
    }
    if(!session.refresh) {
      return
    }
    const refreshToken = async () => {
      const payload = {
        refresh_token: session.refresh
      }
      try {
        await axios.post(REFRESH_TOKEN_ROUTE, payload)
        if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.log('Token refreshed successfully')
        }
      } catch (error) {
        if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
          console.error('Failed to refresh token:', error)
        }
      }
    }

    const interval = setInterval(refreshToken, refreshTokenInterval)

    return () => clearInterval(interval)
  }, [session])
  const handleActive = () => {
    activate()
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="session-modal"
        >
          <div className="usa-prose padding-top-4">
            If you are still there, please click &apos;Stay Logged In&apos;
            below to continue your session. This helps us keep your information
            secure. If no action is taken, you will be automatically logged out
            in {remaining.minutes} minute{remaining.minutes !== 1 ? 's' : ''} for your
            security.
          </div>
          <ModalFooter>
            <ButtonGroup className={styles['btn-alignment'] + ' default-btn'}>
              <Button type="button" onClick={handleActive} disabled={isLoggingOut}>
                Stay Logged In
              </Button>
              <Button type='button' onClick={handleSignOut} outline disabled={isLoggingOut}>
                Log Out
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}

export default UserSessionModal
