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
            <a className="border broder-gray-200 shadow-sm rounded-lg bg-white p-4 dark:bg-gray-600 dark:border-gray-700 min-w-max">
                <div className="flex flex-row min-w-max">
                    <div className="flex flex-col">
                        <div className="flex flex-row space-x-3 items-center">
                        <b className="font-semibold  text-gray-800 dark:text-gray-300">{course.courseCode + " (" +course.section+")"}</b>
                        {course.sectionRole == "INSTRUCTOR" ?<div className="badge bg-purple-500 border-purple-500">Instructor</div>:<div className="badge bg-blue-500 border-blue-500">Student</div>}
                        </div>
                        <div className="font-medium text-xs text-gray-600 dark:text-gray-400 mt-2">{course.name}</div>
                        <div className="text-xs text-gray-400 mt-10">
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