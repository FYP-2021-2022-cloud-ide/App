import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import myToast from "../components/CustomToast";
import { useCnails } from "../contexts/cnails";
import { useContainers } from "../contexts/containers";
import { useInstructor } from "../contexts/instructor";
import { Template } from "../lib/cnails";
import { memory, CPU } from "../lib/formHelper";
import removeTemplate from "../pages/api/template/removeTemplate";
import useCleanTilt from "./useCleanTilt";

const useTemplateCard = (template: Template) => {
  const router = useRouter();
  const { sub } = useCnails();
  const {
    highlightedEnv,
    setHighlightedEnv,
    getEnvironment,
    sectionUserInfo,
    setTemplateUpdateOpen,
    setTemplateUpdateTarget,
    removeTemplate,
    publishTemplate,
    unpublishTemplate,
  } = useInstructor();
  const { containers, removeContainer, createContainer } = useContainers();
  const env = getEnvironment(template.environment_id);
  const container = containers.find(
    (container) => container.redisPatch.sourceId == template.id
  );

  const onClick = useCallback(() => {
    router.push(`${router.asPath}/${template.id}`);
  }, [template]);

  const isHighlighted = Boolean(
    highlightedEnv && highlightedEnv.id === template.environment_id
  );

  /**
   * this hook highlight the template for 1000ms
   */
  useEffect(() => {
    if (isHighlighted) {
      // setHighlighted(false);
      const id = setTimeout(() => {
        setHighlightedEnv(undefined);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  });

  const comment =
    (template.status == "CREATING" && "being created...") ||
    (template.status == "REMOVING" && "being removed...") ||
    (template.status == "UPDATING" && "being updated...") ||
    (template.status == "STARTING_WORKSPACE" && "starting workspace...") ||
    (template.status == "STOPPING_WORKSPACE" && "stopping workspace...") ||
    (template.status == "STARTING_UPDATE_WORKSPACE" &&
      "starting temporary workspace...") ||
    (template.status == "STOPPING_UPDATE_WORKSPACE" &&
      "stopping temporary workspace...");

  const menuItems = [
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
  ];

  return {
    env,
    container,
    menuItems,
    onClick,
    isHighlighted,
    comment,
  };
};

export default useTemplateCard;
