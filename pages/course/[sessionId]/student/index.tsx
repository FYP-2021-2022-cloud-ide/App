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
        if(response.success){
          setCourseName(response.sectionInfo[0])
          setSUID(response.sectionInfo[1])
          setTemplateList(response.templates)
        }
      }
      fetchTemplates()
    }, [])

    return (
      <div className="w-full">
          {courseName&&thisTemplateList ? (
              <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen">
                {/* pathBar */}
                <CourseBar role={"Student"}  courseName={courseName!}></CourseBar>
                <WorkspacesList containers={thisTemplateList!}></WorkspacesList>
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
export default Home