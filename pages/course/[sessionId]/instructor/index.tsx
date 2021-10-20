import { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import ImageList from "../../../../components/course/instructor/ImageList";
import TemplateList from "../../../../components/course/instructor/TemplateList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import { GetServerSideProps } from 'next';
import WorkSpaceList from "../../../../components/course/instructor/WorkSpaceList";

const Home = ()=>{
    const router = useRouter();
    const courseId = router.query.sessionId as string
    const [courseName,setCourseName]= useState("")
    const [sectionUserID,setSUID]= useState("")
    const [imageList,setImageList]= useState(null)
    const [thisTemplateList,setTemplateList]= useState(null)
    const { environmentList,templateList} = useCnails();
    // data fetching from API
    useEffect(()=>{
        const fetchEnvironments = async ()=>{
          const response = await environmentList(courseId)//
          if(response.success){
            setImageList(response.environments)
          }
        }
        const fetchTemplates = async ()=>{
          const response = await templateList(courseId)//
          if(response.success){
            setCourseName(response.sectionInfo[0])
            setSUID(response.sectionInfo[1])
            setTemplateList(response.templates)
          }
        }
        fetchEnvironments()
        fetchTemplates()
    }, [])    
    //console.log(imageList)

    return (
      <div className="w-full">
          {imageList&&thisTemplateList ? (
              <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen">
                  {/* pathBar */}
                  <CourseBar role={ "Instructor"}  courseName={courseName!}></CourseBar>
          
                  <div className="grid grid-cols-3 gap-8">
                      <ImageList images={imageList!} sectionUserID={sectionUserID}></ImageList>
                      <TemplateList images={imageList!} templates={thisTemplateList!} sectionUserID={sectionUserID}></TemplateList>
                      <WorkSpaceList containers={null}></WorkSpaceList>
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