import React, { useEffect, useState } from 'react';
import { useCnails } from '../contexts/cnails';
import CoursesList from '../components/index/CoursesList';
import ContainersList from '../components/index/ContainersList';
import { GetServerSideProps } from 'next';


interface props{
    sub: string
}

export default function Home({sub}:props) {
    // load once when page is rendered
    const [courses, setCourses] = useState(null)
    const [containers, setContainers] = useState(null)
    const { containerList, courseList} = useCnails();
    // data fetching from API
    useEffect(()=>{
        const fetchCourses = async ()=>{
            const courses = await courseList(sub)
            setCourses(courses)
        }
        const fetchContainers = async ()=>{
            const containers = await containerList(sub)
            setContainers(containers)
        }
        fetchCourses()
        fetchContainers()
    }, [])
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    var cookies = context.req.cookies
    return {
        props:{
            sub: cookies.sub,
        }
    }
}