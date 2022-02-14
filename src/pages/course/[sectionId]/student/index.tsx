import Router, { useRouter } from "next/router";
import CourseBar from "../../../../components/course/CourseBar";
import WorkspacesList from "../../../../components/course/student/WorkspaceList";
import React, { useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { templateAPI } from "../../../../lib/api/templateAPI";
import { generalAPI } from "../../../../lib/api/generalAPI";
import { SectionRole, SectionUserInfo } from "../../../../lib/cnails";

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>();
  const [thisTemplateList, setTemplateList] = useState(null);
  const { sub } = useCnails();
  const { templateList } = templateAPI;
  const { getSectionUserInfo: getSectionInfo } = generalAPI;
  // data fetching from API
  useEffect(() => {
    const fetchSectionInfo = async () => {
      const response = await getSectionInfo(sectionId, sub);
      if (response.success) {
        const { courseName, role, sectionUserID } = response;
        setSectionUserInfo({
          courseCode: courseName.split(" ")[0],
          sectionCode: /\((.*?)\)/.exec(courseName)[1],
          role: role.toUpperCase() as SectionRole,
          sectionId: sectionId,
          sectionUserId: sectionUserID,
          sub: sub,
        });
      } else {
        Router.push("/");
      }
    };
    const fetchTemplates = async () => {
      const response = await templateList(sectionId, sub); //
      if (response.success) {
        response.templates = response.templates.filter(
          (template) => template.active == true
        );
        setTemplateList(response.templates);
      }
    };
    fetchSectionInfo().then(() => {
      fetchTemplates();
    });
  }, []);

  return (
    <div className="w-full">
      {sectionUserInfo && thisTemplateList ? (
        <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen space-y-5">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: sectionUserInfo.courseCode,
                path: `/course/${sectionId}/student`,
              },
            ]}
          />
          <CourseBar
            role="STUDENT"
            courseCode={sectionUserInfo.courseCode}
            courseTitle={sectionUserInfo.courseTitle}
            sectionCode={sectionUserInfo.sectionCode}
          ></CourseBar>
          <WorkspacesList
            templates={thisTemplateList!}
            sectionUserId={sectionUserInfo.sectionUserId}
          ></WorkspacesList>
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
