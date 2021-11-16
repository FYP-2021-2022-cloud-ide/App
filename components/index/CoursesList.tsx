import Image from 'next/image'
import Link from 'next/link'
import Course from './Course'
import data from "../../data/testing/courseList"


interface course{
    sectionID: string
    courseCode: string
    section: string
    name: string
    sectionRole: string
    lastUpdateTime: string
}

export interface props{
    courses: course[]
}



const CoursesList = ({courses}:props)=>{
    console.log(courses)
    // courses = data.courses
    return(
        <div className = "flex flex-col my-4">
            <div className = "my-4 text-gray-600 font-bold text-xl dark:text-white">Courses</div>
            <div className = "space-x-4 flex flex-wrap">
                {courses.map((course:course)=>{
                    var link = "https://codespace.ust.dev/course/"+course.sectionID+"/"+course.sectionRole.toLowerCase()
                    return(
                        <Course link={link} course={course}></Course>
                    )
                })}
            </div>
        
        </div>
    )
}

export default CoursesList