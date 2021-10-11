import Link from 'next/link'
import { ChevronRightIcon, ChevronLeftIcon, MenuIcon, CogIcon } from '@heroicons/react/solid'


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
        <div className='text-[#578CB5]'>
            <div className="flex flex-row space-x-2 ">
                <Link href={'/'}>
                    <a className= "flex flex-row gap-x-2" >
                        {/* <div className= "text-5xl scale-y-125 scale-x-150" >
                            <img src="/coursePage/arrow.svg"  className="" />
                        </div> */}
                        <ChevronLeftIcon className="w-7 h-7"></ChevronLeftIcon>
                        <div className= "text-lg font-light hover:underline" >
                            Back
                        </div>
                    </a>
                </Link>
                <div className= "text-lg mx-4" >|</div>
                {/* <img src="/coursePage/vline.svg"  className="mx-5" /> */}
                <div className= "text-lg font-light" >
                    Course
                </div>
                {/* <div className= "text-5xl scale-y-125  scale-x-150" >
                <img src="/coursePage/arrow.svg"  className="rotate-180" />
                </div> */}
                <ChevronRightIcon className="w-7 h-7"></ChevronRightIcon>
                <div className= "text-lg font-light" >
                    {courseName}
                </div>
            </div>
            {/* title and settings */}
            <div className="flex flex-row justify-between py-6">
                <div className="flex flex-row justify-start gap-x-4 w-1/2">
                    <img src="/coursePage/manageDocRole.svg"  className="" />
                    <div className="text-lg mt-1 ">{courseName}</div>
                    {/* <RoleBlock role={role}></RoleBlock> */}
                </div>
                <div className="flex flex-row gap-x-4 mr-8">
                    <button className="">
                        {/* <img src="/coursePage/barWithDots.svg"  className="" /> */}
                        <MenuIcon className="w-7 h-7"></MenuIcon>
                    </button>
                    <button className="">
                        {/* <img src="/coursePage/repairing.svg"  className="" /> */}
                        <CogIcon className="w-7 h-7"></CogIcon>
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default CourseBar