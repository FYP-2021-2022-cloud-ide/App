import Image from 'next/image'
import {BellIcon, QuestionMarkCircleIcon, MoonIcon, SearchIcon} from '@heroicons/react/solid'

interface props{
    user: string
}

const Menu = ({user}:props) => {
    return (
        <div className="flex flex-row justify-between w-full py-4">
            <div></div>
            <div className="border flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl hover:border-blue-600 w-96 shadow-2xl">
                <SearchIcon className="w-6 h-6"></SearchIcon>
                <input placeholder="Search..." className="focus:outline-none"></input>
            </div>
            <div className="flex-0.5">
                <div className='flex flex-row text-gray-500 justify-between gap-x-4 mr-8'>
                    <h3 className='mt-2'>{user}</h3>
                    <BellIcon className='w-6 h-6'></BellIcon>
                    <QuestionMarkCircleIcon className='w-6 h-6'></QuestionMarkCircleIcon>
                    <MoonIcon className='w-6 h-6'></MoonIcon>
                </div>
            </div>  
        </div>
    )
}

export default Menu