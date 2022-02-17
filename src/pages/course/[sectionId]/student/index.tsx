import Router, { useRouter } from "next/router";
import CourseBar from "../../../../components/CourseBar";
import WorkspacesList from "../../../../components/WorkspaceList";
import React, { useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { templateAPI } from "../../../../lib/api/templateAPI";
import { generalAPI } from "../../../../lib/api/generalAPI";
import {
  SectionRole,
  SectionUserInfo,
  Template,
  Workspace,
} from "../../../../lib/cnails";
import myToast from "../../../../components/CustomToast";
import { containerAPI } from "../../../../lib/api/containerAPI";
import exampleTemplates from "../../../../fake_data/example_template.json";

const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>(null);
  const { sub } = useCnails();
  const { templateList } = templateAPI;
  const { addContainer, removeContainer } = containerAPI;
  const { getSectionUserInfo } = generalAPI;
  // data fetching from API
  const fetchSectionUserInfo = async () => {
    const response = await getSectionUserInfo(sectionId, sub);
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

  /**
   * the API need to be removed
   */
  const fetchWorkspaces = async () => {
    const response = await templateList(sectionId, sub);
    if (response.success) {
      response.templates = response.templates.filter(
        (template) => template.active
      );
      setWorkspaces(response.templates);
      // setWorkspaces(exampleTemplates);
    }
  };
  useEffect(() => {
    fetchSectionUserInfo();
    if (sectionId!=undefined)
      fetchWorkspaces();
  }, []);

  return (
    <div className="w-full">
      {sectionUserInfo && workspaces ? (
        <div className="flex flex-col px-8 w-full space-y-5 mb-10">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
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
            workspaces={workspaces}
            onClick={(workspace) => {
              if (workspace.containerID) {
                window.open(
                  "https://codespace.ust.dev/user/container/" +
                    workspace.containerID +
                    "/"
                );
              }
            }}
            onToggleStart={async (workspace, start) => {
              if (start) {
                const id = myToast.loading("Starting workspace...");
                const response = await addContainer(
                  workspace.imageId,
                  memory,
                  CPU,
                  sectionUserInfo.sectionUserId,
                  workspace.id,
                  "student",
                  false
                );
                myToast.dismiss(id);
                if (response.success) {
                  myToast.success("Workspace is successfully started.");
                } else
                  myToast.error(
                    `Workspace cannot be started. ${response.message}`
                  );
              } else {
                const response = await removeContainer(
                  workspace.containerID,
                  sub
                );
                if (response.success) {
                  myToast.success("Workspace is successfully stopped.");
                } else
                  myToast.error(
                    `Workspace cannot be stopped. ${response.message}`
                  );
              }
            }}
          ></WorkspacesList>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full w-full ">
          <Loader></Loader>
        </div>
      )}
    </div>
  );
};

export default Home;
