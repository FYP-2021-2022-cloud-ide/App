import Menu from './Menu'
import Navbar from './SideBar'
import Head from 'next/head'
import { useTheme } from "../contexts/theme"
import { useCnails } from '../contexts/cnails'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDark } = useTheme();
  const {sub, name, email} = useCnails();

  return (
    <div className={`flex flex-row items-start justify-start min-h-screen ${isDark && "dark"}`}>
      <Head>
        <title>Cnails</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"></link>
      </Head>
      <Navbar></Navbar>
      <div className="flex flex-col items-end justify-start min-h-screen bg-white dark:bg-gray-800 w-full">
        <Menu sub={sub} name={name} email={email}></Menu>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>

  )
}

export default Layout
