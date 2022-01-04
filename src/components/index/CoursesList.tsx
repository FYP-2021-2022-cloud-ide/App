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
            <div className = "my-4 text-gray-600 dark:text-gray-300 font-bold text-xl ">Courses</div>
            <div className = "grid grid-cols-2 md:grid-cols-3 gap-8 ">
                {courses.map((course:course)=>{
                    var link = "/course/"+course.sectionID+"/"+course.sectionRole.toLowerCase()
                    return(
                        <Course key={course.sectionID} link={link} course={course}></Course>
                    )
                })}
            </div>
        
        </div>
    )
}

export default CoursesList