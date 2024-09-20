import { Button } from '@trussworks/react-uswds'
import { signIn } from 'next-auth/react';
import { axiosInstance } from '../services/axiosInstance';
import { useRouter } from 'next/navigation';
import { encrypt } from '@/app/shared/utility/encryption';

const LoginMenu = () => {
  const router = useRouter();

  function handleLogin() {
    localStorage.clear()
    signIn('okta', { callbackUrl: `/protect/?state=${encrypt('true')}` })
  }
  const handleSSOLogin =  async() => {
    axiosInstance.get('/max-login').then(response => {
      router.push(response.data)
    })
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
        <h3>Are you an SBA user?</h3>
        <p>Click the button below to login</p>
      </div>

      <Button outline type='button' onClick={handleSSOLogin}>SBA User Login</Button>
    </div>
  )
}

export default LoginMenu
