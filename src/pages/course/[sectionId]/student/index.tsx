import Router, { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import WorkspacesList from "../../../../components/course/student/WorkspaceList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader"; 
import Breadcrumbs from "../../../../components/Breadcrumbs";

interface Template {
  imageId: string
  id: string
  name: string
  description: string
  assignment_config_id: string
  storage: string
  containerID: string
  active: boolean
}

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string
  const [courseName, setCourseName] = useState("")
  const [sectionUserID, setSUID] = useState("")
  const [thisTemplateList, setTemplateList] = useState(null)
  const { templateList, getSectionInfo, sub } = useCnails();
  // data fetching from API 
  useEffect(() => {
    const fetchSectionInfo = async () => {
      const response = await getSectionInfo(sectionId, sub)
      if (response.success) {
        console.log(response)
        setCourseName(response.courseName)
        setSUID(response.sectionUserID)
      }
    }
    const fetchTemplates = async () => {
      const response = await templateList(sectionId, sub)//
      if (response.success && response.role=="student") {
        response.templates = response.templates.filter((template: Template) => template.active == true)
        setTemplateList(response.templates)
      }else{
        Router.push('/')
      }
    }
    fetchSectionInfo().then(
      ()=>{
        fetchTemplates()
      }
    )
  }, [])

  return (
    <div className="w-full">

      {courseName && thisTemplateList ? (
        <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen space-y-5">
          <Breadcrumbs elements={[{
            name: "Dashboard",
            path: "/"
          },
          {
            name: courseName,
            path: `/course/${sectionId}/student`
          }]} />
          <CourseBar role={"Student"} courseName={courseName!}></CourseBar>
          <WorkspacesList templates={thisTemplateList!} sectionUserId={sectionUserID}></WorkspacesList>
        </div>
      ) : (
        <div className="flex h-screen w-full">
          <div className="m-auto">
            <Loader></Loader>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home