import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import { useTheme } from '@mui/material/styles'
import Footer from './Footer'

interface IProps {
   children: ReactNode
}
const Layout = ({ children }: IProps) => {
   const theme = useTheme()
   return (
      <div className={`${theme.palette.mode} layout`}>
         <Navbar />
         {children}
         <Footer />
      </div>
   )
}
export default Layout
