import { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import EnvironmentList from "../../../../components/course/instructor/Environment/EnvironmentList";
import TemplateList from "../../../../components/course/instructor/Template/TemplateList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import { GetServerSideProps } from 'next';
import WorkSpaceList from "../../../../components/course/instructor/WorkSpace/WorkSpaceList";

interface ICourseProps{
  sub: string
}

const Home = ({sub}:ICourseProps)=>{
    const router = useRouter();
    const courseId = router.query.sessionId as string
    const [courseName,setCourseName]= useState("")
    const [sectionUserID,setSUID]= useState("")
    const [thisEnvironmentList,setEnvironmentList]= useState(null)
    const [thisTemplateList,setTemplateList]= useState(null)
    const [workSpaceList,setWorkspaceList]= useState(null)
    const { environmentList,templateList,containerList} = useCnails();
    // data fetching from API
    useEffect(()=>{
        const fetchEnvironments = async ()=>{
          const response = await environmentList(courseId, sub)//
          if(response.success){
            console.log(response)
            setSUID(response.userSectionID)
            setEnvironmentList(response.environments)
          }
        }
        const fetchTemplates = async ()=>{
          const response = await templateList(courseId,sub)//
          if(response.success){
            setCourseName(response.sectionInfo[0])
            setTemplateList(response.templates)
          }
        }
        const fetchWorkspace = async ()=>{
          const response = await containerList(sub)//
          if(response.success){
            setWorkspaceList(response.containers)
          }
        }
        fetchEnvironments()
        fetchTemplates()
        fetchWorkspace()
    }, [])
    //console.log(imageList)

    return (
      <div className="w-full">
          {thisEnvironmentList&&thisTemplateList ? (
              <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen">
                  {/* pathBar */}
                  <CourseBar role={ "Instructor"}  courseName={courseName!}></CourseBar>
          
                  <div className="grid grid-cols-2 gap-8">
                      <EnvironmentList environments={thisEnvironmentList!} sectionUserID={sectionUserID}></EnvironmentList>
                      <TemplateList environments={thisEnvironmentList!} templates={thisTemplateList!} sectionUserID={sectionUserID}></TemplateList>
                      {/* <WorkSpaceList containers={workSpaceList!}  courseName={courseName!} sectionUserID={sectionUserID}></WorkSpaceList> */}
                  </div>
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