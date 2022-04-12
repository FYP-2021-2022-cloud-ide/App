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
  Container,
  SectionRole,
  SectionUserInfo,
  Workspace,
} from "../../../../lib/cnails";
import myToast from "../../../../components/CustomToast";
import { errorToToastDescription } from "../../../../lib/errorHelper";
import { CLICK_TO_REPORT } from "../../../../lib/constants";
import {
  CPU,
  memory
} from "../../../../lib/formHelper";
import { apiTemplatesToUiTemplates, patchTemplates } from "../../../../lib/templateHelper";
import { TemplateListResponse } from "../../../../lib/api/api";
import { useCancelablePromise } from "../../../../components/useCancelablePromise";
import { useContainers } from "../../../../contexts/containers";


const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>();
  const { sub, } = useCnails();
  const { fetchContainers, containers } = useContainers()
  const { listTemplates, addTemplateContainer, removeTemplateContainer } = templateAPI;
  const { getSectionUserInfo } = generalAPI;
  const { cancelablePromise } = useCancelablePromise();

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
      myToast.error({
        title: "Fail to get section information",
        description: errorToToastDescription(response.error),
      });
      Router.push("/");
    }
  };

  /**
   * the hook will change the status of workspace base on the change in containers
   */
  useEffect(() => {
    if (workspaces && containers) {
      setWorkspaces(workspace => patchTemplates(workspace, containers))
    }
  }, [containers])

  /**
   * the API need to be removed
   */
  const fetchWorkspaces = async (_containers: Container[] = containers) => {
    const afterResponse = (response: TemplateListResponse, mount: boolean = true) => {
      if (response.success) {
        const workspaces = patchTemplates(apiTemplatesToUiTemplates(response.templates.filter(template => template.active)), _containers)
        if (mount) setWorkspaces(workspaces)
        return workspaces
      } else {
        myToast.error({
          title: "Fail to fetch workspace.",
          description: errorToToastDescription(response.error),
        });
      }
    }
    try {
      const response = await cancelablePromise(listTemplates({
        sectionid: sectionId,
        sub: sub
      }))
      return afterResponse(response)
    } catch (error) {
      if (error.isCanceled) {
        return afterResponse(error.value as TemplateListResponse, false)
      } else {
        console.error(error)
      }
    }
  };
  const fetch = async () => {
    await fetchSectionUserInfo();
    const containers = await fetchContainers();
    await fetchWorkspaces(containers);
  }

  useEffect(() => {
    fetch()
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
              if (workspace.containerId) {
                window.open(
                  "https://codespace.ust.dev/user/container/" +
                  workspace.containerId +
                  "/"
                );
              }
            }}
            menuItems={(workspace) => ([
              {
                text: workspace.containerId ? "Stop workspace" : "Start workspace",
                onClick: async () => {
                  if (!workspace.containerId) {
                    const toastId = myToast.loading("Starting workspace...");
                    const response = await addTemplateContainer(
                      {
                        imageName: workspace.imageId,
                        memLimit: memory,
                        numCPU: CPU,
                        section_user_id: sectionUserInfo.sectionUserId,
                        template_id: workspace.id,
                        accessRight: "student",
                        useFresh: false,
                        title: workspace.name,
                        sub: sub,
                        event: "WORKSPACE_START"
                      }
                    );
                    if (response.success) {
                      myToast.success("Workspace is successfully started.", {
                        id: toastId
                      });
                    } else
                      myToast.error({
                        title: `Fail to start workspace`,
                        description: errorToToastDescription(response.error),
                      }, {
                        id: toastId
                      });
                  } else {
                    const toastId = myToast.loading("Stopping workspace...")
                    const response = await removeTemplateContainer(
                      {
                        containerId: workspace.containerId,
                        sub: sub
                      }
                    );
                    if (response.success) {
                      myToast.success("Workspace is successfully stopped.", {
                        id: toastId
                      });
                    } else
                      myToast.error({
                        title: `Fail to stop workspace`,
                        description: errorToToastDescription(response.error),
                      }, {
                        id: toastId
                      });

                  }
                  await fetchContainers();
                }
              }
            ])}
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
