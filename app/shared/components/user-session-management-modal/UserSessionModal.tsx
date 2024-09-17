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
import Cookies from 'js-cookie'

const timeout = 60 * 60_000
const promptBeforeIdle = 5 * 60_000

const UserSessionModal: React.FC = () => {
  const [userActivityState, setUserActivityState] = useState<string>('Active')
  const [remaining, setRemaining] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    const okta_oauth2_issuer = process.env.NEXT_PUBLIC_LOGOUT_URL;
    const idToken = Cookies.get('idtoken');
    const post_logout_redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_POST_REDIRECT_URL || '');

    Cookies.remove('email_password_auth_token');
    Cookies.remove('accesstoken');
    Cookies.remove('idtoken');
    Cookies.remove('next-auth.csrf-token', { path: '/' });
    Cookies.remove('next-auth.callback-url', { path: '/' });
    Cookies.remove('applicationData');
    Cookies.remove('entityData');
    Cookies.remove('maxgov_auth_token');
    Cookies.remove('firstPermission');
    Cookies.remove('lastPermission');

    localStorage.clear();

    await signOut({ redirect: false });

    try {
      if (idToken) {
        const logout_url = `${okta_oauth2_issuer}/oauth2/default/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${post_logout_redirect_uri}`;
        window.location.href = logout_url;
      } else {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
      setIsModalOpen(false);
    }
  }

  const onIdle = () => {
    setUserActivityState('Idle')
    setIsModalOpen(false)
    handleSignOut()
  }

  const onActive = () => {
    setUserActivityState('Active')
    setIsModalOpen(false)
  }

  const onPrompt = () => {
    setUserActivityState('Prompted')
    setIsModalOpen(true)
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
  }, [getRemainingTime])

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
            in {remaining} {remaining > 1 ? 'minutes' : 'minute'} for your
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
