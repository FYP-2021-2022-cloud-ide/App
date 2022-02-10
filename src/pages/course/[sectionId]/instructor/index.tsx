import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCnails } from "../../../../contexts/cnails";
import Loader from "../../../../components/Loader";

import { Option } from "../../../../components/ListBox";

import { generalAPI } from "../../../../lib/generalAPI";
import { envAPI } from "../../../../lib/envAPI";
import { templateAPI } from "../../../../lib/templateAPI";
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
} from "../../../../lib/api";
import ModalForm, { Section } from "../../../../components/ModalForm";
import { containerAPI } from "../../../../lib/containerAPI";
import EnvironmentList from "../../../../components/course/instructor/EnvironmentList";
import CourseBar from "../../../../components/course/CourseBar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import TemplateList from "../../../../components/course/instructor/Template/TemplateList";

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

export const getValidEnvName = (environments: Environment[]): string => {
  for (let i = environments.length + 1; ; i++) {
    if (environments.every((env) => env.environmentName != `Environment ${i}`))
      return `Environment ${i}`;
  }
};

function getEnvOptions(environments: Environment[]) {
  // building the environemnts list
  var options: Option[] = [];
  for (let i = 0; i < environments.length; i++) {
    options.push({
      value:
        environments[i].environmentName + " (" + environments[i].imageId + ")",
      id: environments[i].imageId,
    } as Option);
  }
  return options;
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
  const [envUpdateTarget, setEnvUpdateTarget] = useState<Environment>();
  const [templateUpdateTarget, setTemplateUpdateTarget] = useState<Template>();
  const [environments, setEnvironments] = useState<Environment[]>();
  const [templates, setTemplates] = useState<Template[]>();
  const { templateList, removeTemplate, addTemplate } = templateAPI;
  const {
    environmentList,
    removeEnvironment,
    addEnvironment,
    buildEnvironment,
  } = envAPI;
  const { addContainer } = containerAPI;
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
        // the environments and templates can be fetched
        setEnvironments(environments);
        setTemplates(templates);
      }
    );
  useEffect(() => {
    fetch();
  }, []);

  // if environments or templates has not fetch, don't need to go down
  if (!environments || !templates) return <></>;

  const iniCreateEnvironmentFormStructure: { [title: string]: Section } = {
    create_environment: {
      displayTitle: false,
      entries: {
        is_predefined: {
          type: "toggle",
          defaultValue: true,
          text: "Use predefined environment? ",
          description: "whether this environment is a predefined environment",
          tooltip:
            "whether this environment is a predefined environment. You will be prompt to a temporary workspace where you can set up the environment",
        },
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          text: "Pick the Programming Language",
          description: "Pick the Programming Language",
          tooltip: "Pick the Programming Language",
          options: envChoices,
          conditional: (data) => {
            return data.is_predefined as boolean;
          },
        },
        environment_name: {
          type: "input",
          defaultValue: "",
          text: "Environment name",
          placeholder: `e.g. ${getValidEnvName(environments)}`,
        },
        environment_description: {
          type: "textarea",
          defaultValue: "",
          text: "Environment Description",
        },
      },
    },
  };

  const iniUpdateEnvironmentFormStructure: { [title: string]: Section } = {};

  const envOptions = getEnvOptions(environments);
  const initTemplateCreateFormStructure: { [title: string]: Section } = {
    create_template: {
      entries: {
        select_environment: {
          type: "listbox",
          options: envOptions,
          tooltip: "Pick an environment which has been defined in the course.",
          defaultValue: envOptions[0],
        },
      },
    },
  };

  const iniTemplateUpdateFormStructure: { [title: string]: Section } = {};

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
            const response = await removeEnvironment(env.id, sectionUserId);
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
            throw new Error("not implemented");
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
            fetch();
          }}
          onToggle={async (template) => {
            throw new Error("not implemented");
          }}
          onToggleActivation={async (template) => {
            throw new Error("not implemented");
          }}
          environments={environments}
          sectionUserID={sectionUserId}
        ></TemplateList>
      </div>
      {/* environment create form  */}
      <ModalForm
        isOpen={envCreateOpen}
        setOpen={setEnvCreateOpen}
        clickOutsideToClose={true}
        title="Create Environment"
        formStructure={iniCreateEnvironmentFormStructure}
        onClose={() => {}}
        onOpen={() => {}}
        onChange={(data, id) => {
          console.log(data, id);
        }}
        onEnter={async (data) => {
          console.log(data);
          if (data.is_predefined) {
            const environment = data.environment_choice as Option;
            const name = data.environment_name as string;
            const description = data.environment_descripiton as string;
            const response = await addEnvironment(
              [environment.value + ":" + environment.id],
              name == "" ? getValidEnvName(environments) : name,
              description,
              sectionUserId
            );
            const { success, environmentID } = response;
            if (success) {
              myToast.success(
                `Environment (${environmentID}) is successfully created.`
              );
              fetch();
            }
          } else {
            const id = myToast.loading("Creating the environment...");
            try {
              const response = await addContainer(
                rootImage,
                memory,
                CPU,
                sectionUserId,
                "",
                "root",
                true
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
        isOpen={envUpdateOpen}
        setOpen={setEnvUpdateOpen}
        clickOutsideToClose
        formStructure={iniUpdateEnvironmentFormStructure}
        title="Update Environment"
      ></ModalForm>

      {/* template create form   */}
      <ModalForm
        clickOutsideToClose
        isOpen={templateCreateOpen && environments.length != 0}
        setOpen={setTemplateCreateOpen}
        formStructure={initTemplateCreateFormStructure}
        title="Create Template"
      ></ModalForm>
      {/* template update form  */}
      <ModalForm
        isOpen={
          templateUpdateOpen &&
          environmentList.length != 0 &&
          templateList.length != 0
        }
        clickOutsideToClose
        setOpen={setTemplateUpdateOpen}
        formStructure={iniTemplateUpdateFormStructure}
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
  const { getSectionInfo } = generalAPI;
  const { sub } = useCnails();
  const fetchSectionInfo = async () => {
    const response = await getSectionInfo(sectionId, sub); //
    const { success, message, courseName, role, sectionUserID } = response;
    if (success) {
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
