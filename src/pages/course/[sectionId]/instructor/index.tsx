import Router, { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";
import { generalAPI } from "../../../../lib/api/generalAPI";
import { envAPI } from "../../../../lib/api/envAPI";
import { Option } from "../../../../components/ListBox";
import { templateAPI } from "../../../../lib/api/templateAPI";
import {
  SectionUserInfo,
  SectionRole,
  Environment,
  Template,
  InstructorContextState,
} from "../../../../lib/cnails";
import myToast from "../../../../components/CustomToast";
import {
  Environment as APIEnvironment,
  Error,
  SuccessStringResponse,
  Template as APITemplate,
} from "../../../../lib/api/api";
import ModalForm from "../../../../components/ModalForm/ModalForm";
import { containerAPI } from "../../../../lib/api/containerAPI";
import EnvironmentList from "../../../../components/EnvironmentList";
import CourseBar from "../../../../components/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import TemplateList from "../../../../components/TemplateList";
import {
  getCreateEnvironmentFormStructure,
  getCreateTemplateFormStructure,
  getUpdateTemplateFormStructure,
  getUpdateEnvironmentFormStructure,
  getAnnouncementFormStructure,
  CreateEnvironmentFormData,
  CreateTemplateFormData,
  UpdateTemplateFormData,
  UpdateEnvironmentFormData,
  AnnouncementFormData,
  rootImage,
  CPU,
  memory
} from "../../../../lib/forms";
import _ from "lodash";
import courseAPI from "../../../../lib/api/courses";
import CardMenu from "../../../../components/CardMenu";
import { errorToToastDescription } from "../../../../lib/errorHelper";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../../../../lib/constants";
import { useForceUpdate } from "../../../../components/useForceUpdate";



const InstructorContext = React.createContext({} as InstructorContextState);
export const useInstructor = () => useContext(InstructorContext);
export const InstructorProvider = ({
  children,
  sectionUserInfo,
}: {
  children: JSX.Element;
  sectionUserInfo: SectionUserInfo;
}) => {
  const { sub, userId, fetchContainers } = useCnails();
  const [environments, setEnvironments] = useState<Environment[]>(null);
  const [templates, setTemplates] = useState<Template[]>(null);
  const [highlightedEnv, setHighlightedEnv] = useState<Environment>(null);

  const fetch = () => {
    fetchEnvironmentsAndTemplates(
      sectionUserInfo.sectionId,
      sub,
      (error) => {
        myToast.error({
          title: "Fail to fetch environments or templates",
          description: errorToToastDescription(error),
          comment: CLICK_TO_REPORT,
        });
      },
      (environments, templates) => {
        setEnvironments(
          environments.map((e) => ({
            ...e,
            name: e.environmentName,
          }))
        );
        setTemplates(
          templates.map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
            imageId: t.imageId,
            assignment_config_id: t.assignment_config_id,
            storage: t.storage,
            containerID: t.containerID,
            environment_id: t.environment_id,
            active: t.active,
            isExam: t.isExam,
            timeLimit: t.timeLimit,
            allow_notification: t.allow_notification,
          }))
        );
      }
    );
    fetchContainers(sub);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!environments || !templates || !sectionUserInfo) return <></>;

  return (
    <InstructorContext.Provider
      value={{
        environments,
        templates,
        fetch,
        sectionUserInfo,
        highlightedEnv,
        setHighlightedEnv,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

async function fetchEnvironmentsAndTemplates(
  sectionId: string,
  sub: string,
  onFailCallBack?: (error: Error) => void,
  onSuccessCallBack?: (
    environments: APIEnvironment[],
    templates: APITemplate[]
  ) => void
) {
  const { listEnvironments: fetchEnvironments } = envAPI;
  const { templateList: fetchTemplates } = templateAPI;
  const envResponse = await fetchEnvironments(sectionId, sub);
  const templateResponse = await fetchTemplates(sectionId, sub);
  if (!envResponse.success || !templateResponse.success) {
    if (onFailCallBack)
      onFailCallBack(
        !envResponse.success ? envResponse.error : templateResponse.error
      );
  } else {
    if (onSuccessCallBack)
      onSuccessCallBack(envResponse.environments, templateResponse.templates);
  }
}

const EnvironmentTemplateWrapper = () => {
  const router = useRouter();
  const { sub } = useCnails();
  const { environments, templates, fetch, sectionUserInfo, setHighlightedEnv } =
    useInstructor();
  const { sectionUserId, sectionId } = sectionUserInfo;
  const [envCreateOpen, setEnvCreateOpen] = useState(false);
  const [envUpdateOpen, setEnvUpdateOpen] = useState(false);
  const [templateCreateOpen, setTemplateCreateOpen] = useState(false);
  const [templateUpdateOpen, setTemplateUpdateOpen] = useState(false);
  const [envUpdateTarget, setEnvUpdateTarget] = useState<Environment>(null);
  const [templateUpdateTarget, setTemplateUpdateTarget] =
    useState<Template>(null);
  const forceUpdate = useForceUpdate();

  const {
    removeTemplate,
    addTemplate,
    activateTemplate,
    deactivateTemplate,
    updateTemplate,
    addTemplateContainer,
    removeTemplateContainer
  } = templateAPI;
  const {
    removeEnvironment,
    addEnvironment,
    buildEnvironment,
    updateEnvironment,
  } = envAPI;
  const {
    addTempContainer,
    removeTempContainer,
  } = containerAPI;

  // if environments or templates has not fetch, don't need to go down
  if (!environments || !templates) return <></>;

  const createEnvironmentFormStructure =
    getCreateEnvironmentFormStructure(environments);
  const updateEnvironmentFormStructure = getUpdateEnvironmentFormStructure(
    sub,
    envUpdateTarget,
    environments
  );
  const templateCreateFormStructure = getCreateTemplateFormStructure(
    templates,
    environments
  );
  const templateUpdateFormStructure = getUpdateTemplateFormStructure(
    sub,
    templateUpdateTarget,
    templates,
    environments
  );

  return (
    <>
      <div className="flex flex-row space-x-10 w-full">
        <EnvironmentList
          environments={environments}
          onEnvCreateBtnClick={() => {
            setEnvCreateOpen(true);
          }}
          onEnvClick={(env) => {
            // router.push(`${router.asPath}/${env.id}`);
            // console.log(router.asPath);
          }}
          onEnvDelete={async (env) => {
            const numTemplates = templates.filter(
              (t) => t.environment_id === env.id
            ).length;
            if (numTemplates != 0) {
              myToast.error({
                title: "Fail to remove environment",
                description: `${numTemplates} template${numTemplates > 1 ? "s are" : " is"
                  } still using ${env.name}.`,
                comment: CLICK_TO_DISMISS,
              });
            } else {
              const response = await removeEnvironment(env.id, sectionUserId, sectionId);
              if (response.success) {
                myToast.success(
                  `environment ${env.id} is successfully removed`
                );
              }
            }
            fetch();
          }}
          onEnvUpdate={(env) => {
            setEnvUpdateOpen(true);
            setEnvUpdateTarget(env);
          }}
          onEnvHighlight={(env) => {
            if (templates.some((t) => t.environment_id === env.id)) {
              setHighlightedEnv(env);
              forceUpdate();
            } else myToast.warning(`No template is using ${env.name}.`);
          }}
        ></EnvironmentList>
        <TemplateList
          templates={templates}
          onClick={(template) => {
            // go to details
            router.push(`${router.asPath}/${template.id}`);
          }}
          onCreate={() => {
            if (environments.length == 0)
              myToast.warning(
                "You need to have at least one environment before creating a template."
              );
            else {
              setTemplateCreateOpen(true);
            }
          }}
          onDelete={async (template) => {
            const response = await removeTemplate(template.id, sectionUserId, sectionId);
            if (response.success) {
              myToast.success("Template is successfully deleted.");
            }
            fetch();
          }}
          onUpdate={(template) => {
            setTemplateUpdateTarget(template);
            setTemplateUpdateOpen(true);
          }}
          onWorkspaceCardClick={(template) => {
            if (template.containerID) {
              window.open(
                "https://codespace.ust.dev/user/container/" +
                template.containerID +
                "/"
              );
            }
          }}
          onToggle={async (template) => {
            if (template.containerID) {
              const response = await removeTemplateContainer(template.containerID, sub);
              if (response.success) {
                myToast.success("Template workspace is successfully stopped. ");
              } else
                myToast.error({
                  title: `Fail to stop template workspace`,
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT,
                });
            } else {
              const id = myToast.loading("Starting workspace...");
              const response = await addTemplateContainer(
                template.imageId,
                memory,
                CPU,
                sectionUserId,
                template.id,
                "student",
                false,
                template.name
              );
              myToast.dismiss(id);
              if (response.success) {
                myToast.success("Template workspace is successfully started.");
              } else
                myToast.error({
                  title: `Fail to start template workspace`,
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT,
                });
            }
            fetch();
          }}
          onToggleActivation={async (template) => {
            if (!template.active) {
              const id = myToast.loading(`Publishing the ${template.name}...`);
              const response = await activateTemplate(
                template.id,
                sectionUserId,
                sectionId,
                template.name,
                template.description ,
              );
              myToast.dismiss(id);
              if (response.success) {
                myToast.success(`${template.name} is published.`);
              } else {
                myToast.error({
                  title: `Fail to publish template`,
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT,
                });
              }
            } else {
              const id = myToast.loading(
                `Unpublishing the ${template.name}...`
              );
              const response = await deactivateTemplate(
                template.id,
                sectionUserId,
                sectionId,
                template.name,
                template.description,
              );
              myToast.dismiss(id);
              if (response.success) {
                myToast.success(`${template.name} is unpublished.`);
              } else
                myToast.error({
                  title: `Fail to unpublish template`,
                  description: errorToToastDescription(response.error),
                  comment: CLICK_TO_REPORT,
                });
            }
            fetch();
          }}
          environments={environments}
          sectionUserID={sectionUserId}
        ></TemplateList>
      </div>
      {/* environment create form  */}
      <ModalForm
        isOpen={envCreateOpen}
        setOpen={setEnvCreateOpen}
        clickOutsideToClose
        escToClose
        title="Create Environment"
        formStructure={createEnvironmentFormStructure}
        onEnter={async ({ create_environment: data }: CreateEnvironmentFormData) => {
          // console.log(data);
          const { environment_choice: environment, name, description } = data;
          const id = myToast.loading("Creating the environment...");
          if (data.is_predefined) {
            const response = await addEnvironment(
              [environment.value + ":" + environment.imageId],
              name,
              description,
              sectionUserId,
              sectionId
            );
            myToast.dismiss(id);
            if (response.success) {
              const { environmentID } = response;
              myToast.success(
                `Environment (${environmentID}) is successfully created.`
              );
              fetch();
            } else {
              myToast.error({
                title: `Fail to create environment`,
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
              });
            }
          }
          if (!data.is_predefined) {
            try {
              const response = await addTempContainer(
                memory,
                CPU,
                rootImage,
                sub,
                "root",
                "ENV_CREATE",
                data.name
              );
              myToast.dismiss(id);
              if (response.success) {
                const { containerID } = response;
                const customToastId = myToast.custom(
                  <div className="flex flex-col space-y-2">
                    <p>
                      A temporary workspace is created. Click the link to open a
                      new window where set up your workspace. After finish
                      setup, click <span className="font-bold">Finish</span>.
                    </p>
                    <a
                      className="btn btn-xs"
                      href={
                        "https://codespace.ust.dev/user/container/" +
                        containerID +
                        "/"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Set up workspace
                    </a>
                    <div className="flex flex-row space-x-2">
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={async () => {
                          // cancel the build
                          myToast.dismiss(customToastId);
                          const response = await removeTempContainer(
                            containerID,
                            sub
                          );
                          if (response.success)
                            console.log("remove temp container", containerID);
                          else
                            console.log(
                              "fail to remove temp container",
                              response.error.status,
                              containerID,
                              sub
                            );
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={async () => {
                          // build succeed
                          myToast.dismiss(customToastId);
                          const id = myToast.loading(
                            "Building your custom environment..."
                          );
                          const response = await buildEnvironment(
                            name,
                            description,
                            sectionUserId,
                            containerID,
                            sectionId ,
                          );
                          if (response.success) {
                            fetch();
                            myToast.dismiss(id);
                          }
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  </div>,
                  "toaster toaster-custom toaster-no-dismiss",
                  "🗂"
                );
              }
            } catch (error) {
              myToast.error(error.message);
            } finally {
              myToast.dismiss(id);
            }
          }
        }}
      ></ModalForm>

      {/* environment update form  */}
      <ModalForm
        isOpen={envUpdateOpen && environments.length != 0}
        setOpen={setEnvUpdateOpen}
        clickOutsideToClose
        escToClose
        formStructure={updateEnvironmentFormStructure}
        onClose={async ({ update_environment: data }: UpdateEnvironmentFormData, isEnter) => {
          const { update_internal: containerId } = data;
          if (containerId != "" && !isEnter) {
            // remove the temp container
            const response = await removeTempContainer(containerId, sub);
            if (response.success)
              console.log("temp container is successfully removed.");
            else
              console.error("fail to remove temp container", containerId, sub);
            fetch();
          }
        }}
        onEnter={async ({ update_environment: data }: UpdateEnvironmentFormData) => {
          const id = myToast.loading("Updating an environment...");
          const { name, description, update_internal: containerId } = data;
          const response = await updateEnvironment(
            envUpdateTarget.id,
            name,
            description,
            sectionUserId,
            containerId,
            sectionId
          );
          myToast.dismiss(id);
          if (response.success) {
            myToast.success("Environment is updated.");
          } else {
            myToast.error({
              title: "Fail to update environment",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
            console.log(response.error.status, containerId, sectionUserId);
          }
          fetch();
        }}
        title="Update Environment"
      ></ModalForm>

      {/* template create form   */}
      <ModalForm
        clickOutsideToClose
        escToClose
        isOpen={templateCreateOpen && environments.length != 0}
        setOpen={setTemplateCreateOpen}
        formStructure={templateCreateFormStructure}
        title="Create Template"
        onEnter={async ({ create_template: data }: CreateTemplateFormData) => {
          const toastId = myToast.loading("Creating a temporary workspace...");
          var selectedEnv = data.environment;
          const response = await addTempContainer(
            memory,
            CPU,
            selectedEnv.imageId,
            sub,
            "root",
            "TEMPLATE_CREATE",
            data.name
          );
          myToast.dismiss(toastId);
          console.log(response);
          if (response.success) {
            const { containerID } = response;
            const customToastId = myToast.custom(
              <div className="flex flex-col space-y-2">
                <p>
                  A temp workspace is created. Click the link to set up your
                  workspace. After finish setup, click{" "}
                  <span className="font-bold">Finish</span>.
                </p>
                <a
                  className="btn btn-xs border-none"
                  href={
                    "https://codespace.ust.dev/user/container/" +
                    containerID +
                    "/"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Set up workspace
                </a>
                <div className="flex flex-row space-x-2">
                  <button
                    className="btn btn-xs bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500 border-none"
                    onClick={async () => {
                      // cancel the build
                      myToast.dismiss(customToastId);
                      const response = await removeTempContainer(containerID, sub);
                      if (response.success)
                        console.log("remove temporary workspace", containerID);
                      else
                        console.log(
                          "fail to remove temporary workspace",
                          response.error.status,
                          containerID,
                          sub
                        );
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-xs bg-green-500 text-white hover:bg-green-600 border-none "
                    onClick={async () => {
                      // build succeed
                      myToast.dismiss(customToastId);
                      const id = myToast.loading("Building your template...");
                      const response = await addTemplate(
                        data.name as string,
                        data.description as string,
                        sectionUserId,
                        data.environment.id,
                        "",
                        containerID as string,
                        false,
                        data.is_exam as boolean,
                        Number(data.time_limit),
                        data.allow_notification as boolean,
                        sectionId
                      );
                      if (response.success) {
                        fetch();
                        myToast.dismiss(id);
                      }
                    }}
                  >
                    Finish
                  </button>
                </div>
              </div>,
              "toaster toaster-custom toaster-no-dismiss",
              "🗂"
            );
          }
        }}
      ></ModalForm>
      {/* template update form  */}
      <ModalForm
        isOpen={
          templateUpdateOpen &&
          environments.length != 0 &&
          templates.length != 0
        }
        clickOutsideToClose
        escToClose
        setOpen={setTemplateUpdateOpen}
        formStructure={templateUpdateFormStructure}
        title="Update Template"
        onClose={async ({ update_template: data }: UpdateTemplateFormData, isEnter) => {
          const { update_internal: containerId } = data;
          if (containerId != "" && !isEnter) {
            // remove the temp container
            const response = await removeTempContainer(containerId, sub);
            if (response.success)
              console.log("temp container is successfully removed.");
            else
              console.error("fail to remove temp container", containerId, sub);
            fetch();
          }
        }}
        onEnter={async ({ update_template: data }: UpdateTemplateFormData) => {
          const id = myToast.loading("Updating the template...");
          const {
            name,
            description,
            update_internal: containerId,
            allow_notification,
            time_limit,
            is_exam,
          } = data;

          const response = await updateTemplate(
            templateUpdateTarget.id,
            name,
            description,
            sectionUserId,
            containerId,
            is_exam,
            Number(time_limit),
            allow_notification,
            sectionId
          );
          myToast.dismiss(id);
          if (response.success) {
            myToast.success("Template is updated.");
          } else {
            myToast.error({
              title: "Fail to update template",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          }
          fetch();
        }}
      ></ModalForm>
    </>
  );
};

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  // data fetching from API
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const [announceFormOpen, setAnnounceFormOpen] = useState<boolean>(false);
  const { getSectionUserInfo } = generalAPI;
  const { sub, userId } = useCnails();
  const fetchSectionUserInfo = async () => {
    const response = await getSectionUserInfo(sectionId, sub); //

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
      //restrict the student to access instructor page
      if ((role.toUpperCase() as SectionRole) != "INSTRUCTOR") {
        myToast.error({
          title: "Permission denied",
          description: "You are not an instructor of this section.",
          comment: CLICK_TO_DISMISS,
        });
        router.push("/");
      }
    } else {
      myToast.error({
        title: "Fail to get section information",
        description: errorToToastDescription(response.error),
        comment: CLICK_TO_REPORT,
      });
      router.push("/");
    }
  };
  useEffect(() => {
    fetchSectionUserInfo();
  }, []);
  if (!sectionUserInfo) return <></>;

  return (
    <div className="w-full">
      {sectionUserInfo ? (
        <div className="flex flex-col  px-8 w-full space-y-4">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: `${sectionUserInfo.courseCode} (${sectionUserInfo.sectionCode})`,
                path: `/course/${sectionId}/instructor`,
              },
            ]}
          />
          <div className="flex flex-row justify-between space-x-2 z-[2]">
            <CourseBar
              role="INSTRUCTOR"
              courseCode={sectionUserInfo.courseCode}
              courseTitle={sectionUserInfo.courseTitle}
              sectionCode={sectionUserInfo.sectionCode}
            />
            <CardMenu
              items={[
                {
                  text: "Make announcement",
                  onClick: () => {
                    setAnnounceFormOpen(true);
                  },
                },
              ]}
            ></CardMenu>
          </div>
          <InstructorProvider sectionUserInfo={sectionUserInfo}>
            <EnvironmentTemplateWrapper></EnvironmentTemplateWrapper>
          </InstructorProvider>
        </div>
      ) : (
        <Loader />
      )}
      <ModalForm
        isOpen={announceFormOpen}
        setOpen={setAnnounceFormOpen}
        title={"Course Annoucement"}
        size="lg"
        formStructure={getAnnouncementFormStructure()}
        clickOutsideToClose
        escToClose
        onEnter={async ({ course_announcement: data }: AnnouncementFormData) => {
          console.log(data);
          const response = await courseAPI.sendNotificationAnnouncement(
            data.allow_reply,
            data.announcement,
            data.title,
            userId,
            sectionId
          );
          if (response.success)
            myToast.success("The course announcement is sent.");
          else
            myToast.error({
              title: "Fail to send course announcement",
              description: errorToToastDescription(response.error),
              comment: CLICK_TO_REPORT,
            });
          setAnnounceFormOpen(false);
        }}
        onClose={() => {
          setAnnounceFormOpen(false);
        }}
      ></ModalForm>
    </div>
  );
};
export default Home;
