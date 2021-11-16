import React, { useEffect, useState } from 'react';
import { useCnails } from '../contexts/cnails';
import CoursesList from '../components/index/CoursesList';
import ContainersList from '../components/index/ContainersList';
import { GetServerSideProps } from 'next';
//testing 
import containerData from "../data/testing/container" ; 
import courseData from "../data/testing/course" ; 
import {props as CourseListProps} from "../components/index/CoursesList"
import {props as ContainerListProps} from "../components/index/ContainersList"


interface props{
    sub: string
}

export default function Home({sub}:props) {
    // load once when page is rendered
    const [courses, setCourses] = useState<CourseListProps>(courseData)
    const [containers, setContainers] = useState<ContainerListProps>(containerData)
    const { containerList, courseList} = useCnails();
    // data fetching from API
    // useEffect(()=>{
    //     const fetchCourses = async ()=>{
    //         const courses = await courseList(sub) 
    //         // testing 
    //         // const courses = courseData; 
    //         setCourses(courses)
    //     }
    //     const fetchContainers = async ()=>{
    //         const containers = await containerList(sub)
    //         //testing 
    //         // const containers = containerData ; 
    //         setContainers(containers)
    //     }
    //     fetchCourses()
    //     fetchContainers()
    // }, [])
    // console.log(containers)
    console.log(containers.containerInfo)
    return (
        <div>
            {courses&&containers ? (
                <div className = "flex flex-col mx-6">
                    {/* @ts-ignore */}
                    <ContainersList containers = {containerData!.containers} containerInfo={containerData!.containersInfo} ></ContainersList>
                    {/* @ts-ignore */}
                    <CoursesList courses= {courseData!.courses} ></CoursesList>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    var cookies = context.req.cookies
    return {
        props:{
            sub: cookies.sub,
        }
    }
}