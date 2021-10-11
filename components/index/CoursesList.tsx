import Image from 'next/image'
import Link from 'next/link'
import Course from './Course'

interface course{
    sessionId: String
    courseCode: String
    session: String
    role: String
    name: String
    lastUpdateTime: String
}

interface props{
    courses: course[]
}

const CoursesList = ({courses}:props)=>{
    //console.log(courses)
    return(
        <div className = "flex flex-col my-4">
            <div className = "my-4 text-gray-600 font-bold text-xl">Courses</div>
            <div className = "space-x-4 flex flex-wrap">
                {courses.map((course:course)=>{
                    var link = "https://codespace.ust.dev/course/"+course.sessionId+"/"+course.role.toLowerCase()
                    return(
                        <Course link={link} course={course}></Course>
                    )
                })}
            </div>
        
        </div>
    )
}

export default CoursesList