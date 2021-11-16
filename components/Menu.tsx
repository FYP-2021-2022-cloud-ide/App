import Image from 'next/image'
import {BellIcon, QuestionMarkCircleIcon, MoonIcon, SearchIcon , SunIcon} from '@heroicons/react/solid'
import UserMenu from './UserMenu'
import {useTheme} from "../contexts/theme"

interface props{
    sub: string
    name: string
    email: string
}

const Menu = ({sub, name, email}:props) => {
    const { isDark , setDark } = useTheme() ; 

    return (
        <div className="grid grid-cols-3 gap-8 w-full">
            <div></div>
            <div className="border flex text-gray-500 flex-row space-x-2 items-center focus:border-black-600 text-left rounded dark:border-gray-700 dark:bg-white hover:border-blue-600 w-96 px-2 shadow">
                <SearchIcon className="w-6 h-6"></SearchIcon>
                <input placeholder="Search..." className="focus:outline-none dark:bg-white w-full"></input>
            </div>
            <div className="">
                <div className='flex flex-row items-center text-gray-500 justify-end gap-x-4 mr-8'>
                    <UserMenu sub={sub} name={name} email={email}></UserMenu>
                    <BellIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300 dark:text-gray-200'></BellIcon>
                    <QuestionMarkCircleIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300 dark:text-gray-200'></QuestionMarkCircleIcon>
                    {
                        isDark? <SunIcon className="w-6 h-6 text-yellow-400" onClick={()=>setDark(!isDark)}></SunIcon> : <MoonIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300' onClick={() => setDark(!isDark)}></MoonIcon>
                    }         
                </div>
            </div>  
        </div>
    )
}

export default Menu