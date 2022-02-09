import Router, { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import EnvironmentList from "../../../../components/course/instructor/EnvironmentList";
import TemplateList from "../../../../components/course/instructor/Template/TemplateList";
import React, { useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";
import Breadcrumbs from "../../../../components/Breadcrumbs";

import { generalAPI } from "../../../../lib/generalAPI";
import { envAPI } from "../../../../lib/envAPI";
import { templateAPI } from "../../../../lib/templateAPI";
const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const [courseName, setCourseName] = useState("");
  const [sectionUserID, setSectionUserID] = useState("");
  const [thisEnvironmentList, setEnvironmentList] = useState();
  const [thisTemplateList, setTemplateList] = useState();
  const { sub } = useCnails();
  const { templateList } = templateAPI;
  const { environmentList } = envAPI;
  const { getSectionInfo } = generalAPI;
  // data fetching from API
  useEffect(() => {
    const fetchEnvironments = async () => {
      const response = await environmentList(sectionId, sub); //
      if (response.success) {
        setEnvironmentList(response.environments);
      }
    };
    const fetchTemplates = async () => {
      const response = await templateList(sectionId, sub); //
      if (response.success) {
        setTemplateList(response.templates);
      }
    };
    const fetchSectionInfo = async () => {
      const response = await getSectionInfo(sectionId, sub); //
      console.log(response);
      if (response.success && response.role == "instructor") {
        setSectionUserID(response.sectionUserID);
        setCourseName(response.courseName);
      } else {
        Router.push("/");
      }
    };
    fetchSectionInfo().then(() => {
      fetchEnvironments();
      fetchTemplates();
    });
  }, []);

  return (
    <div className="w-full">
      {thisEnvironmentList && thisTemplateList ? (
        <div className="flex flex-col font-bold px-8 w-full pt-10 text-gray-600 space-y-4">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: courseName,
                path: `/course/${sectionId}/instructor`,
              },
            ]}
          />
          <CourseBar role={"INSTRUCTOR"} courseName={courseName!}></CourseBar>

          <div className="flex flex-row space-x-10 w-full">
            <EnvironmentList sectionUserID={sectionUserID}></EnvironmentList>
            <TemplateList
              environments={thisEnvironmentList!}
              templates={thisTemplateList!}
              sectionUserID={sectionUserID}
            ></TemplateList>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full">
          <div className="m-auto">
            <Loader></Loader>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
