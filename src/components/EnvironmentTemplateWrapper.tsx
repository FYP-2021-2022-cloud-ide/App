import { useRouter } from "next/router";
import { useState } from "react";
import { useCnails } from "../contexts/cnails";
import { useInstructor } from "../contexts/instructor";
import { Environment, Template } from "../lib/cnails";
import { memory, CPU } from "../lib/formHelper";
import CreateEnvironmentForm from "./forms/CreateEnvironmentForm";
import UpdateEnvironmentForm from "./forms/UpdateEnvironmentForm";
import CreateTemplateForm from "./forms/CreateTemplateForm";
import UpdateTemplateForm from "./forms/UpdateTemplateForm";
import myToast from "./CustomToast";
import EnvironmentList from "./EnvironmentList";
import TemplateList from "./TemplateList";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { useContainers } from "../contexts/containers";

const EnvironmentTemplateWrapper = () => {
  const router = useRouter();
  const { sub } = useCnails();
  const { createContainer, removeContainer } = useContainers();
  const {
    environments,
    templates,
    sectionUserInfo,
    setHighlightedEnv,
    removeEnvironment,
    removeTemplate,
    publishTemplate,
    unpublishTemplate,
  } = useInstructor();
  const [envCreateOpen, setEnvCreateOpen] = useState(false);
  const [envUpdateOpen, setEnvUpdateOpen] = useState(false);
  const [templateCreateOpen, setTemplateCreateOpen] = useState(false);
  const [templateUpdateOpen, setTemplateUpdateOpen] = useState(false);
  const [envUpdateTarget, setEnvUpdateTarget] = useState<Environment>(null);
  const [templateUpdateTarget, setTemplateUpdateTarget] =
    useState<Template>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
        <EnvironmentList
          environments={environments}
          onEnvCreateBtnClick={() => {
            setEnvCreateOpen(true);
          }}
          onEnvClick={() => {
            // router.push(`${router.asPath}/${env.id}`);
            // console.log(router.asPath);
          }}
          menuItems={(env) => [
            {
              text: "Delete",
              show: !Boolean(env.temporaryContainerId),
              onClick: async () => {
                await removeEnvironment(env.id);
              },
            },
            {
              text: "Update Info",
              show: !Boolean(env.temporaryContainerId),
              onClick: () => {
                setEnvUpdateOpen(true);
                setEnvUpdateTarget(env);
              },
            },
            {
              text: "Highlight Templates",
              onClick: () => {
                if (templates.some((t) => t.environment_id === env.id)) {
                  setHighlightedEnv(env);
                } else myToast.warning(`No template is using ${env.name}.`);
              },
            },
            {
              text: "Update Internal",
              show: !Boolean(env.temporaryContainerId),
              onClick: async () => {
                if (templates.some((t) => t.environment_id === env.id)) {
                  myToast.error({
                    title: "Invalid Operation",
                    description:
                      "Some template is still using this environment.",
                  });
                  return;
                }
                await createContainer({
                  memLimit: memory,
                  numCPU: CPU,
                  imageId: env.imageId,
                  sub: sub,
                  accessRight: "root",
                  event: "ENV_UPDATE",
                  title: env.name,
                  sourceId: env.id,
                  sectionUserInfo: sectionUserInfo,
                  formData: {
                    name: env.name,
                    description: env.description,
                    containerId: "",
                    section_user_id: sectionUserInfo.sectionUserId,
                    envId: env.id,
                  },
                });
              },
            },
          ]}
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
          menuItems={(template) => [
            {
              text: "Delete",
              onClick: async () => {
                await removeTemplate(template.id);
              },
              show: !Boolean(template.containerId),
            },
            {
              text: "Update info",
              onClick: () => {
                setTemplateUpdateTarget(template);
                setTemplateUpdateOpen(true);
              },
              show: !Boolean(template.containerId),
            },
            {
              text: template.containerId ? "Stop workspace" : "Start workspace",
              // show: template.status != "UPDATING_INTERNAL",
              onClick: async () => {
                if (template.containerId) {
                  await removeContainer(template.containerId);
                } else {
                  await createContainer({
                    imageName: template.imageId,
                    memLimit: memory,
                    numCPU: CPU,
                    section_user_id: sectionUserInfo.sectionUserId,
                    template_id: template.id,
                    accessRight: "student",
                    useFresh: false,
                    title: template.name,
                    sub: sub,
                    event: "TEMPLATE_START_WORKSPACE",
                    sectionUserInfo: sectionUserInfo,
                  });
                }
              },
            },
            {
              text: template.active ? "Unpublish" : "Publish",
              onClick: async () => {
                if (!template.active) await publishTemplate(template.id);
                else await unpublishTemplate(template.id);
              },
            },
            {
              text: "Share link",
              onClick: () => {
                myToast.success("link to copied to clipboard.");
                navigator.clipboard.writeText(
                  "https://codespace.ust.dev/quickAssignmentInit/" + template.id
                );
              },
              show: Boolean(template.active),
            },
            {
              text: "Update Internal",
              show: !Boolean(template.containerId),
              onClick: async () => {
                if (template.active) {
                  myToast.error({
                    title: "Operation invalid",
                    description:
                      "The template is published and it is suggested to unpublish it before update it.",
                  });
                  return;
                }
                await createContainer({
                  memLimit: memory,
                  numCPU: CPU,
                  imageId: template.imageId,
                  sub: sub,
                  accessRight: "root",
                  title: template.name,
                  sourceId: template.id,
                  event: "TEMPLATE_UPDATE",
                  sectionUserInfo: sectionUserInfo,
                  formData: {
                    templateId: template.id,
                    templateName: template.name,
                    description: template.description,
                    section_user_id: sectionUserInfo.sectionUserId,
                    containerId: "",
                    isExam: template.isExam,
                    timeLimit: template.timeLimit,
                    allow_notification: template.allow_notification,
                  },
                });
              },
            },
          ]}
          environments={environments}
          sectionUserID={sectionUserInfo.sectionUserId}
        ></TemplateList>
      </div>
      {/* environment create form  */}
      <CreateEnvironmentForm
        isOpen={envCreateOpen}
        setOpen={setEnvCreateOpen}
      />
      {/* environment update form  */}
      <UpdateEnvironmentForm
        isOpen={envUpdateOpen && environments.length != 0}
        setOpen={setEnvUpdateOpen}
        target={envUpdateTarget}
      />
      {/* template create form   */}
      <CreateTemplateForm
        isOpen={templateCreateOpen && environments.length != 0}
        setOpen={setTemplateCreateOpen}
      />
      {/* template update form  */}
      <UpdateTemplateForm
        isOpen={
          templateUpdateOpen &&
          environments.length != 0 &&
          templates.length != 0
        }
        setOpen={setTemplateUpdateOpen}
        target={templateUpdateTarget}
      />
    </>
  );
};

export default EnvironmentTemplateWrapper;
