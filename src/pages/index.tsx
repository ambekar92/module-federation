/* eslint-disable @typescript-eslint/explicit-function-return-type */
// pages/index.js
import { type GetSessionParams, getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetSessionParams | undefined) {
   const session = await getSession(context)

   if (session === null || session === undefined) {
      return {
         redirect: {
            destination: '/home',
            permanent: false
         }
      }
   }

   return {
      redirect: {
         destination: '/login',
         permanent: false
      }
   }
}

export default function Home(): JSX.Element {
   return <div>Welcome to the homepage</div>
}
