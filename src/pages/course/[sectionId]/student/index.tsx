import CourseBar from "../../../../components/CourseBar";
import WorkspacesList from "../../../../components/WorkspaceList";
import React from "react";
import { useCnails } from "../../../../contexts/cnails";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import myToast from "../../../../components/CustomToast";
import { CPU, memory } from "../../../../lib/formHelper";
import { useContainers } from "../../../../contexts/containers";
import { SectionProvider } from "../../../../contexts/section";
import { StudentProvider, useStudent } from "../../../../contexts/student";

const Wrapper = () => {
  const { sub } = useCnails();
  const { sectionUserInfo, workspaces } = useStudent();
  const { createContainer, removeContainer } = useContainers();

  return (
    <div className="flex flex-col px-8 w-full space-y-5 mb-10 mt-5">
      <Breadcrumbs
        elements={[
          {
            name: "Dashboard",
            path: "/",
          },
          {
            name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
            path: `/course/${sectionUserInfo.sectionId}/student`,
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
          if (workspace.containerId) {
            window.open(
              "https://codespace.ust.dev/user/container/" +
                workspace.containerId +
                "/"
            );
          }
        }}
        menuItems={(workspace) => [
          {
            text: workspace.containerId ? "Stop workspace" : "Start workspace",
            onClick: async () => {
              if (!workspace.containerId) {
                await myToast.promise(
                  "Starting workspace...",
                  createContainer({
                    imageName: workspace.imageId,
                    memLimit: memory,
                    numCPU: CPU,
                    section_user_id: sectionUserInfo.sectionUserId,
                    template_id: workspace.id,
                    accessRight: "student",
                    useFresh: false,
                    title: workspace.name,
                    sub: sub,
                    event: "WORKSPACE_START",
                  })
                );
              } else {
                await myToast.promise(
                  "Stopping workspace...",
                  removeContainer(workspace.containerId)
                );
              }
            },
          },
        ]}
      ></WorkspacesList>
    </div>
  );
};

const Home = () => {
  return (
    <SectionProvider>
      <StudentProvider>
        <Wrapper></Wrapper>
      </StudentProvider>
    </SectionProvider>
  );
};

export default Home;
