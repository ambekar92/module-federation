// pages/index.js

import { getSession } from 'next-auth/react';

export async function getServerSideProps(context:any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }else{
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function Home() {
  return <div>Welcome to the homepage</div>;
}