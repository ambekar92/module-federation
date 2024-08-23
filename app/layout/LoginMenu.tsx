import { Button } from '@trussworks/react-uswds'
import { signIn } from 'next-auth/react';

const LoginMenu = () => {
  function handleLogin() {
    localStorage.clear()
    signIn('okta', { callbackUrl: '/?signedIn=true' })
  }
  const handleSSOLogin =  async() => {
    signIn('boxyhq-saml');
  };
  return (
    <div style={{
      textWrap: 'wrap',
      width: '25rem',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div>
        <h2>Log In</h2>
        <p>You can access your account by signing in with one of the options below</p>
      </div>

      <Button type='button' onClick={handleLogin}>Log In</Button>
      <div style={{marginTop: '2rem'}}>
        <hr />
      </div>

      <div>
        <h3>Are you a federal employee?</h3>
        <p>If you are a federal employee or [other secondary user], please use [secondary Single Sign On (SSO)]</p>
      </div>

      <Button outline type='button' onClick={handleSSOLogin}>Launch Secondary SSO</Button>
    </div>
  )
}

export default LoginMenu
