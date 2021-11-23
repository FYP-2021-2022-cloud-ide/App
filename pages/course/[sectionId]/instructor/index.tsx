import { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import EnvironmentList from "../../../../components/course/instructor/Environment/EnvironmentList";
import TemplateList from "../../../../components/course/instructor/Template/TemplateList";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../../../../contexts/cnails";
import { GetServerSideProps } from 'next';
import Breadcrumbs from "../../../../components/Breadcrumbs";

//testing 
import TemplateListData from "../../../../data/testing/templateList"
import EnvironmentListData from "../../../../data/testing/environmentList"

interface ICourseProps {
  sub: string
}

const Home = ({ sub }: ICourseProps) => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string
  const [courseName, setCourseName] = useState("COMP1021")
  const [sectionUserID, setSectionUserID] = useState("")
  const [thisEnvironmentList, setEnvironmentList] = useState(EnvironmentListData.environments)
  const [thisTemplateList, setTemplateList] = useState(TemplateListData.templates)
  const { environmentList, templateList, getSectionInfo } = useCnails();
  // data fetching from API
  useEffect(() => {
    const fetchEnvironments = async () => {
      const response = await environmentList(sectionId, sub)//
      if (response.success) {
        console.log(response)
        setEnvironmentList(response.environments)
      }
    }
    const fetchTemplates = async () => {
      const response = await templateList(sectionId, sub)//
      if (response.success) {
        setTemplateList(response.templates)
      }
    }
    const fetchSectionInfo = async () => {
      const response = await getSectionInfo(sectionId, sub)//
      if (response.success) {
        setSectionUserID(response.sectionUserID)
        setCourseName(response.courseName)
      }
    }
    // fetchEnvironments()
    // fetchTemplates()
    // fetchSectionInfo()
  }, [])

  

  return (

    <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen text-gray-600 space-y-4">
      <Breadcrumbs elements={["Dashboard" , courseName]}/>
      <CourseBar role={"Instructor"} courseName={courseName!}></CourseBar>

      <div className="flex flex-row space-x-4">
        <EnvironmentList environments={thisEnvironmentList!} sectionUserID={sectionUserID}></EnvironmentList>
        <TemplateList environments={thisEnvironmentList!} templates={thisTemplateList!} sectionUserID={sectionUserID}></TemplateList>
      </div>
    </div>


  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  var cookies = context.req.cookies
  return {
    props: {
      sub: cookies.sub,
    }
  }
}

export default Home