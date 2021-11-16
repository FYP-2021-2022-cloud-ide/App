import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface CourseProps{
    link: string
    course: Course
}

interface Course{
    sectionID: string
    courseCode: string
    section: string
    name: string
    sectionRole: string
    lastUpdateTime: string
}

function Course({link, course}:CourseProps){
    return(
        <Link href= {link}>
            <a className="border broder-gray-200 shadow-sm rounded-lg bg-white p-4 dark:bg-white dark:border-gray-600 hover:shadow-lg transition-all ease-in-out duration-300">
                <div className="flex flex-row">
                    <div className="flex flex-col space-y-1">
                        <b className="font-semibold text-sm text-gray-800">{course.courseCode + " (" +course.section+")"}</b>
                        <div className="font-medium text-xs text-gray-600">{course.name}</div>
                        {/* {course.role == "INSTRUCTOR" ?(
                        <div className = "rounded-lg bg-purple-700 w-24 py-1.5 font-bold text-center text-white text-sm">
                            Instructor
                        </div>):(
                        <div className = "rounded-lg bg-blue-500 w-24 py-1.5 font-bold text-center text-white text-sm">
                            Student
                        </div>) } */}
                        <div className="text-xs text-gray-400">
                            Last update: {course.lastUpdateTime}
                        </div>
                    </div>
                    {/* <Image  src="/codeServer.svg"  width="237" height="94" />  */}
                </div>
            </a>
        </Link>
    )
}

export default Course