import { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import WorkspacesList from "../../../../components/course/student/WorkspaceList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import { GetServerSideProps } from 'next';

interface SCourseProps{
  sub: string
}

interface Template{
  imageId: string
  id: string
  name: string
  description:string
  assignment_config_id: string
  storage: string
  containerID: string
  active: boolean
}

const Home = ({sub}:SCourseProps)=>{
    const router = useRouter();
    const sectionId = router.query.sectionId as string
    const [courseName,setCourseName]= useState("")
    const [sectionUserID,setSUID]= useState("")
    const [thisTemplateList,setTemplateList]= useState(null)
    const { templateList, getSectionInfo} = useCnails();
    // data fetching from API 
    useEffect(()=>{
      const fetchSectionInfo = async()=>{
        const response = await getSectionInfo(sectionId, sub)
        if(response.success){
          console.log(response)
          setCourseName(response.courseName)
          setSUID(response.sectionUserID)
        }
      }
      const fetchTemplates = async ()=>{
        const response = await templateList(sectionId, sub)//
        if(response.success){
          console.log(response)
          response.templates = response.templates.filter((template :Template)=>template.active == true)
          setTemplateList(response.templates)
        }
      }
      fetchSectionInfo()
      fetchTemplates()
    }, [])

    return (
      <div className="w-full">
          {courseName&&thisTemplateList ? (
              <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen">
                {/* pathBar */}
                <CourseBar role={"Student"}  courseName={courseName!}></CourseBar>
                <WorkspacesList templates={thisTemplateList!} sectionUserId={sectionUserID}></WorkspacesList>
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