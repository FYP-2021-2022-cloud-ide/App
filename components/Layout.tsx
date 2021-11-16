import Menu from './Menu'
import Navbar from './Navbar'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import {useTheme} from "../contexts/theme"

interface LayoutProps {
    children: React.ReactNode;
    sub: string
    name: string
    email: string
 }

const Layout = ({children, sub, name, email}:LayoutProps) => {
    const {isDark} = useTheme() ; 

    return (
    <div className={`flex flex-row items-start justify-start min-h-screen ${isDark && "dark"}`}>
      <Head>
          <title>Cnails</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"></link>
      </Head>
      <Navbar></Navbar>
      <div className="flex flex-col items-start justify-start min-h-screen py-2 bg-white dark:bg-black w-full">
        <Menu sub={sub} name={name} email={email}></Menu>
        {children}
      </div>
    </div>
        
    )
}

export default Layout
