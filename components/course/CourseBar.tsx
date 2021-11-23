import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon, MenuIcon, CogIcon ,TerminalIcon } from '@heroicons/react/solid'


interface props{
    courseName: string
    role: string
}
interface propsR{
    role: string
}


function RoleBlock({role}:propsR){
    if(role == "Student" || role == "student"){
        return(
            <div className="w-32 h-10 bg-blue-600 rounded-xl text-white text-center ">
                <div className="mt-2">{role}</div>
            </div>
        )
    }else{
        return(
            <div className="w-32 h-10 bg-purple-600 rounded-xl text-white text-center ">
                <div className="mt-2">{role}</div>
            </div>
        )
    }
}

const CourseBar = ({courseName, role}:props) => {

    return (
        
            <div className="flex flex-row justify-between text-gray-700 dark:text-gray-300">
                <div className="flex flex-row justify-start gap-x-4">
                    <TerminalIcon className="w-7 h-7"> </TerminalIcon> 
                    <p className="text-lg">{courseName}</p>
                    <div className="badge dark:bg-gray-300 dark:text-gray-700"> {role}</div>
                </div>
                <div className="flex flex-row gap-x-4 justify-end">
                    <button className="hover:scale-110 transition ease-in-out duration-300">
                        <CogIcon className="w-7 h-7"></CogIcon>
                    </button>
                </div>
                
            </div>
       
    )
}

export default CourseBar