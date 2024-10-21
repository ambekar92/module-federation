import { Button } from '@trussworks/react-uswds';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { MAX_LOGIN_ROUTE } from '../constants/local-routes';

const LoginMenu = () => {
  const router = useRouter();

  function handleLogin() {
    localStorage.clear()
    signIn('okta', { callbackUrl: `/protect/?state=${uuidv4()}` })
  }

  const handleSSOLogin = async() => {
    try {
      const currentTime = new Date().getTime();
      const response = await axios.get(`${MAX_LOGIN_ROUTE}?t=${currentTime}`);
      if (response.data && typeof response.data === 'string') {
        router.push(response.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      if(process.env.NEXT_PUBLIC_DEBUG_MODE) {
        console.error('Error fetching MAX_LOGIN_ROUTE:', error);
      }
    }
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
        <h2>Sign Up / Log In</h2>
        <p>You can access your account by signing in with one of the options below</p>
      </div>

      <Button type='button' onClick={handleLogin}>Sign Up / Log In</Button>
      <div style={{marginTop: '2rem'}}>
        <hr />
      </div>

      <div>
        <h3>Are you an SBA Employee?</h3>
        <p>Click the button below to login</p>
      </div>

      <Button outline type='button' onClick={handleSSOLogin}>SBA Employee Login</Button>
    </div>
  )
}

export default LoginMenu
