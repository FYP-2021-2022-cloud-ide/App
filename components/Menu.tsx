import Image from 'next/image'
import {BellIcon, QuestionMarkCircleIcon, MoonIcon, SearchIcon} from '@heroicons/react/solid'
import UserMenu from './UserMenu'

interface props{
    sub: string
    name: string
    email: string
}

const Menu = ({sub, name, email}:props) => {
    return (
        <div className="grid grid-cols-3 gap-8">
            <div></div>
            <div className="border flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl hover:border-blue-600 w-96 shadow-2xl">
                <SearchIcon className="w-6 h-6"></SearchIcon>
                <input placeholder="Search..." className="focus:outline-none"></input>
            </div>
            <div className="">
                <div className='flex flex-row items-center text-gray-500 justify-end gap-x-4 mr-8'>
                    <UserMenu sub={sub} name={name} email={email}></UserMenu>
                    <BellIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300'></BellIcon>
                    <QuestionMarkCircleIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300'></QuestionMarkCircleIcon>
                    <MoonIcon className='w-6 h-6 hover:scale-110 transition transition-all ease-in-out duration-300'></MoonIcon>
                </div>
            </div>  
        </div>
    )
}

export default Menu