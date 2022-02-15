import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
} from "../../../../lib/cnails";
import myToast from "../../../../components/CustomToast";
import {
  Environment as APIEnvironment,
  Template as APITemplate,
} from "../../../../lib/api/api";
import ModalForm, { Section } from "../../../../components/ModalForm";
import { containerAPI } from "../../../../lib/api/containerAPI";
import EnvironmentList from "../../../../components/course/instructor/EnvironmentList";
import CourseBar from "../../../../components/course/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import TemplateList from "../../../../components/course/instructor/Template/TemplateList";
import {
  getCreateEnvironmentFormStructure,
  getTemplateCreateFormStructure,
  getTemplateUpdateFormStructure,
  getUpdateEnvironmentFormStructure,
  getValidName,
} from "../../../../lib/forms";
import _ from "lodash";

const registry = "143.89.223.188:5000";
const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;
const envChoices = [
  { value: "C++/C", id: `${registry}/codeserver:latest` },
  { value: "Python3", id: `${registry}/codeserver:latest` },
  { value: "Java", id: `${registry}/codeserver:latest` },
];

async function fetchEnvironmentsAndTemplates(
  sectionId: string,
  sub: string,
  onFailCallBack?: () => void,
  onSuccessCallBack?: (
    environments: APIEnvironment[],
    templates: APITemplate[]
  ) => void
) {
  const { environmentList: fetchEnvironments } = envAPI;
  const { templateList: fetchTemplates } = templateAPI;
  const envResponse = await fetchEnvironments(sectionId, sub);
  const templateResponse = await fetchTemplates(sectionId, sub);
  if (!envResponse.success || !templateResponse.success) {
    if (onFailCallBack) onFailCallBack();
  } else {
    if (onSuccessCallBack)
      onSuccessCallBack(envResponse.environments, templateResponse.templates);
  }
}

const EnvironmentTemplateWrapper = ({
  sectionUserInfo: {
    sectionCode,
    sectionId,
    sectionUserId,
    courseCode,
    courseTitle,
    role,
    sub,
  },
}: {
  sectionUserInfo: SectionUserInfo;
}) => {
  const [envCreateOpen, setEnvCreateOpen] = useState(false);
  const [envUpdateOpen, setEnvUpdateOpen] = useState(false);
  const [templateCreateOpen, setTemplateCreateOpen] = useState(false);
  const [templateUpdateOpen, setTemplateUpdateOpen] = useState(false);
  const [envUpdateTarget, setEnvUpdateTarget] = useState<Environment>(null);
  const [templateUpdateTarget, setTemplateUpdateTarget] =
    useState<Template>(null);
  const [environments, setEnvironments] = useState<Environment[]>(null);
  const [templates, setTemplates] = useState<Template[]>(null);
  const { removeTemplate, addTemplate, activateTemplate, deactivateTemplate } =
    templateAPI;
  const { removeEnvironment, addEnvironment, buildEnvironment } = envAPI;
  const {
    addContainer,
    addTempContainer,
    removeTempContainer,
    removeContainer,
  } = containerAPI;
  const fetch = () =>
    fetchEnvironmentsAndTemplates(
      sectionId,
      sub,
      () => {
        myToast.error(
          "environments or templates cannot be fetched for some reasons."
        );
      },
      (environments, templates) => {
        setEnvironments(environments);
        setTemplates(templates);
      }
    );

  useEffect(() => {
    fetch();
  }, []);

  // if environments or templates has not fetch, don't need to go down
  if (!environments || !templates) return <></>;

  const createEnvironmentFormStructure =
    getCreateEnvironmentFormStructure(environments);
  const updateEnvironmentFormStructure =
    environments.length == 0
      ? {}
      : getUpdateEnvironmentFormStructure(envUpdateTarget, environments);
  const templateCreateFormStructure =
    environments.length == 0
      ? {}
      : getTemplateCreateFormStructure(templates, environments);
  if (_.isEqual(templateCreateFormStructure, {}) && environments.length != 0) {
    throw new Error("it should not happen");
  }
  const templateUpdateFormStructure =
    environments.length == 0 || templates.length == 0
      ? {}
      : getTemplateUpdateFormStructure(
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
            throw new Error("not implemented ");
          }}
          onEnvDelete={async (env) => {
            function checkDeleteValid(env: Environment): boolean {
              for (let t of templates) {
                if (t.imageId == env.imageId) {
                  return false;
                }
              }
              return true;
            }
            if (checkDeleteValid(env)) {
              const response = await removeEnvironment(env.id, sectionUserId);
              if (response.success) {
                myToast.success(
                  `environment ${env.id} is successfully removed`
                );
              }
            }
            fetch();
          }}
          onEnvHighlight={(env) => {
            throw new Error("not implemented");
          }}
          onEnvUpdate={(env) => {
            setEnvUpdateOpen(true);
            setEnvUpdateTarget(env);
          }}
        ></EnvironmentList>
        <TemplateList
          templates={templates}
          onClick={(template) => {
            if (template.containerID) {
              window.open(
                "https://codespace.ust.dev/user/container/" +
                  template.containerID +
                  "/"
              );
            }
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
            const response = await removeTemplate(template.id, sectionUserId);
            if (response.success) {
              myToast.success("Template is successfully deleted.");
            }
            fetch();
          }}
          onUpdate={(template) => {
            setTemplateUpdateOpen(true);
            setTemplateUpdateTarget(template);
          }}
          onToggle={async (template) => {
            if (template.containerID) {
              const response = await removeContainer(template.containerID, sub);
              if (response.success) {
                myToast.success("Template Container is successfully removed. ");
              } else
                myToast.error(
                  `Template Container cannot be removed. ${response.message}`
                );
            } else {
              const id = myToast.loading("Creating Template container...");
              const response = await addContainer(
                template.imageId,
                memory,
                CPU,
                sectionUserId,
                template.id,
                "root",
                false
              );
              myToast.dismiss(id);
              if (response.success) {
                myToast.success("Template container is successfully created.");
              } else
                myToast.error(
                  `Template Container cannot be created. ${response.message}`
                );
            }
            fetch();
          }}
          onToggleActivation={async (template) => {
            if (template.active) {
              const response = await activateTemplate(
                template.containerID,
                sectionUserId
              );
              if (response.success) {
                myToast.success("Template is activated.");
              }
            } else {
              const response = await deactivateTemplate(
                template.containerID,
                sectionUserId
              );
              if (response.success) {
                myToast.success("Template is deactivated.");
              }
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
        title="Create Environment"
        formStructure={createEnvironmentFormStructure}
        onChange={(data, id) => {
          // console.log(data, id);
        }}
        onEnter={async (data) => {
          // console.log(data);
          if (data.is_predefined) {
            const environment = data.environment_choice as Option;
            const name = data.environment_name as string;
            const description = data.environment_descripiton as string;
            const response = await addEnvironment(
              [environment.value + ":" + environment.id],
              name == "" ? "bug" : name,
              description,
              sectionUserId
            );

            if (response.success) {
              const { environmentID } = response;
              myToast.success(
                `Environment (${environmentID}) is successfully created.`
              );
              fetch();
            }
          } else {
            const id = myToast.loading("Creating the environment...");
            try {
              const response = await addTempContainer(
                memory,
                CPU,
                rootImage,
                sub,
                "root"
              );
              console.log(response);
              if (response.success) {
                window.open("https://www.google.com");
                await buildEnvironment(
                  data.environment_name as string,
                  data.environment_description as string,
                  sectionUserId,
                  response.containerID
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
        formStructure={updateEnvironmentFormStructure}
        title="Update Environment"
      ></ModalForm>

      {/* template create form   */}
      <ModalForm
        clickOutsideToClose
        isOpen={templateCreateOpen && environments.length != 0}
        setOpen={setTemplateCreateOpen}
        formStructure={templateCreateFormStructure}
        title="Create Template"
        onChange={(data, id) => {
          console.log(data);
        }}
        onEnter={async (data) => {
          console.log(data);
          const toastId = myToast.loading("Creating A temporary container...");
          try {
            const dialogClass =
              "inline-block w-full max-w-md py-4 px-4 overflow-hidden align-middle transition-all transform bg-white dark:bg-gray-800 text-[#415A6E]";
            const titleClass =
              "text-lg font-medium leading-6 dark:text-gray-300";
            const okButtonClass =
              "text-sm  mx-2 w-fit rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
            const cancelButtonClass =
              "text-sm mx-2 w-fit rounded-md px-4 py-2 bg-gray-400 hover:bg-gray-500 text-base leading-6 font-medium text-white shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5";
            const response = await addTempContainer(
              memory,
              CPU,
              rootImage,
              sub,
              "root"
            );
            console.log(response);
            //can we add a container link modal page here

            // if (response.success) {
            //   setTempContainerId(response.containerID as string)

            // myToast.setTemplate(
            //   <div>
            //     <a href="https://www.google.com"></a>
            //   </div>
            // );
            if (response.success) {
              let count = 10;
              const id = setInterval(async () => {
                console.log("adding template", 10 - count + 1);
                const response2 = await addTemplate(
                  data.name as string,
                  data.description as string,
                  sectionUserId,
                  (data.environment as Option).id,
                  "",
                  response.containerID as string,
                  false,
                  data.is_exam as boolean,
                  Number(data.time_limit),
                  data.allow_notification as boolean
                );
                count--;
                if (count == 0 || response2.success) {
                  myToast.dismiss(toastId);
                  clearInterval(id);
                  if (response2.success) {
                    console.log(response2);
                    myToast.success(
                      `Template (${response2.templateID}) is successfully created.`
                    );
                    fetch();
                  }
                }
              }, 5000);
            } else {
              myToast.error("A temporary container cannot be created.");
            }
            //the useState From setting the tempContainerID doesnt work
            // if (tempContainerId!=""){
            //   myToast.setTemplate(
            //     <div className={dialogClass}>
            //       <h3 className={titleClass}>Create Assignment Template</h3>
            //       <div className="py-2 text-gray-600 dark:text-gray-300">
            //         A new container is prepared, please click the following link
            //         and set up the template. After finished the setting, please
            //         press the finish button to save the template
            //       </div>
            //       <a
            //         rel="noreferrer"
            //         className="flex  justify-center my-2 mx-2 rounded-md px-4 py-2 bg-green-400 hover:bg-green-500 text-base leading-6 font-medium shadow-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            //         href={
            //           ("https://codespace.ust.dev/user/container/" +
            //           tempContainerId) + "/"
            //         }
            //         target="_blank"
            //       >
            //         Click Here
            //       </a>
            //       <div className="flex justify-around">
            //         <button
            //           onClick={async () => {
            //             const response = await removeTempContainer(
            //               tempContainerId,
            //               sub
            //             );

            //             if (response.success) {
            //               myToast.success(`Template Creation is cancelled.`);
            //             } else {
            //               myToast.error(
            //                 `Cannot Remove Temp Container becase ${response.message}`
            //               );
            //             }
            //           }}
            //           type="button"
            //           className={cancelButtonClass}
            //         >
            //           Cancel
            //         </button>

            //         <button
            //           onClick={async () => {
            //             const response = await addTemplate(
            //               data.name as string,
            //               data.description as string,
            //               sectionUserId,
            //               (data.environment as Option).id,
            //               "",
            //               tempContainerId,
            //               false,
            //               data.is_exam as boolean,
            //               Number(data.time_limit),
            //               data.allow_notification as boolean
            //             );

            //             if (response.success) {
            //               myToast.success(
            //                 `Template (${response.templateID}) is successfully created.`
            //               );
            //               fetch();
            //             } else {
            //               myToast.error(
            //                 `Template Cannot be created becase ${response.message}`
            //               );
            //             }
            //           }}
            //           className={okButtonClass}
            //         >
            //           Finish Editing
            //         </button>
            //       </div>
            //     </div>
            //   );
            // }
          } catch (error) {
            myToast.error(error.message);
          } finally {
            myToast.dismiss(toastId);
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
        // clickOutsideToClose
        setOpen={setTemplateUpdateOpen}
        formStructure={templateUpdateFormStructure}
        title="Update Template"
      ></ModalForm>
    </>
  );
};

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  // data fetching from API
  const [sectionUserInfo, setSectionUserInfo] = useState<SectionUserInfo>(null);
  const { getSectionUserInfo } = generalAPI;
  const { sub } = useCnails();
  const fetchSectionInfo = async () => {
    const response = await getSectionUserInfo(sectionId, sub); //
    console.log(response);

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
  useEffect(() => {
    fetchSectionInfo();
  }, []);

  return (
    <div className="w-full">
      {sectionUserInfo ? (
        <div className="flex flex-col font-bold px-8 w-full text-gray-600 space-y-4">
          <Breadcrumbs
            elements={[
              {
                name: "Dashboard",
                path: "/",
              },
              {
                name: sectionUserInfo.courseCode,
                path: `/course/${sectionId}/instructor`,
              },
            ]}
          />
          <CourseBar
            role="INSTRUCTOR"
            courseCode={sectionUserInfo.courseCode}
            courseTitle={sectionUserInfo.courseTitle}
            sectionCode={sectionUserInfo.sectionCode}
          ></CourseBar>
          <EnvironmentTemplateWrapper
            sectionUserInfo={sectionUserInfo}
          ></EnvironmentTemplateWrapper>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Home;
