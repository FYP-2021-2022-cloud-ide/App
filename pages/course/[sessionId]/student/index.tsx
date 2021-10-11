import { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import WorkspacesList from "../../../../components/course/student/WorkspaceList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import { GetServerSideProps } from 'next';

const Home = ()=>{
    const router = useRouter();
    const courseId = router.query.sessionId as string
    const [courseName,setCourseName]= useState("")
    const [sectionUserID,setSUID]= useState("")
    const [thisTemplateList,setTemplateList]= useState(null)
    const { templateList} = useCnails();
    // data fetching from API 
    useEffect(()=>{
      const fetchTemplates = async ()=>{
        const response = await templateList(courseId)//
        const templates = JSON.parse(response.message)
        if(templates.success){
          setCourseName(templates.sectionInfo[0])
          setSUID(templates.sectionInfo[1])
          setTemplateList(templates.templates)
        }
      }
      fetchTemplates()
    }, [])

    return (
      <div className="flex flex-col font-bold pl-10 w-full pt-10 min-h-screen">
        {/* pathBar */}
        <CourseBar role={"Student"}  courseName={courseName!}></CourseBar>
        <WorkspacesList containers={thisTemplateList!}></WorkspacesList>
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
export default Home