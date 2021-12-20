import React, { useEffect, useState } from 'react';
import { useCnails } from '../contexts/cnails';
import CoursesList from '../components/index/CoursesList';
import ContainersList from '../components/index/ContainersList';
import { GetServerSideProps } from 'next';
//testing 
import containerData from "../data/testing/containerList";
import courseData from "../data/testing/courseList";
import { props as CourseListProps } from "../components/index/CoursesList"
import { props as ContainerListProps } from "../components/index/ContainersList"


interface props {
    sub: string
}

export default function Home() {
    // load once when page is rendered
    const [courses, setCourses] = useState<CourseListProps>()
    const [containers, setContainers] = useState<ContainerListProps>()
    const { containerList, courseList, sub } = useCnails();
    console.log("sub is ",sub)
    // data fetching from API
    useEffect(() => {
        const fetchCourses = async () => {
            const courses = await courseList(sub)
            setCourses(courses)
        }
        const fetchContainers = async () => {
            // console.log('part A')
            const containers = await containerList(sub)
            // console.log(containers)
            setContainers(containers)
        }
        // while(sub == "")
        fetchCourses()
        fetchContainers()
    }, [])
    // console.log('testing')
    console.log(containers) 
    return (
        <div>
            {courses&&containers ? (
                <div className = "flex flex-col mx-6">
                    {/* @ts-ignore */}
                    <ContainersList containers = {containers!.containers} containerInfo={containers!.containersInfo} ></ContainersList>
                    {/* @ts-ignore */}
                    <CoursesList courses= {courses!.courses} ></CoursesList>
                </div>
            ):(
                <div className="flex h-screen w-screen">
                    <div className="m-auto">
                        <img src='/circle.svg'/> 
                    </div>
                </div>
            )}
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     var cookies = context.req.cookies
//     return {
//         props: {
//             sub: cookies.sub,
//         }
//     }
// }