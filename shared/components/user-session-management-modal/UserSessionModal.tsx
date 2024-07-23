'use client'

import {
  ButtonGroup,
  Modal,
  ModalFooter,
  Button,
} from '@trussworks/react-uswds'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useIdleTimer } from 'react-idle-timer'
import styles from './UserSessionModal.module.scss'

const timeout = 60 * 60_000
const promptBeforeIdle = 5 * 60_000

interface UserSessionProps {
  openDemo?: boolean
}

const UserSessionModal: React.FC<UserSessionProps> = ({ openDemo }) => {
  const [, setState] = useState<string>('Active')
  const [remaining, setRemaining] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(openDemo !== undefined ? true : false)

  const onIdle = () => {
    setState('Idle')
    setOpen(false)
    signOut()
  }

  const onActive = () => {
    setState('Active')
    setOpen(false)
  }

  const onPrompt = () => {
    setState('Prompted')
    setOpen(true)
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onActive,
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
      setRemaining(Math.ceil(getRemainingTime() / 60_000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })

  const handleActive = () => {
    activate()
  }

  return (
    <>
      {open === true && (
        <Modal
          forceAction
          aria-labelledby="modal-heading"
          aria-describedby="modal-description"
          isInitiallyOpen
          id="session-modal"
        >
          <div className="usa-prose">
            If you are still there, please click &apos;Stay Logged In&apos;
            below to continue your session. This helps us keep your information
            secure. If no action is taken, you will be automatically logged out
            in {remaining} {remaining > 1 ? 'minutes' : 'minute'} for your
            security.
          </div>
          <ModalFooter>
            <ButtonGroup className={styles['btn-alignment'] + ' default-btn'}>
              <Button type="button" onClick={handleActive}>
                Stay Logged In
              </Button>
              <Button type='button' onClick={() => signOut()} outline>
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
