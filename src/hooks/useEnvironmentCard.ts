import { useMemo } from "react";
import myToast from "../components/CustomToast";
import { useCnails } from "../contexts/cnails";
import { useContainers } from "../contexts/containers";
import { useInstructor } from "../contexts/instructor";
import { Environment } from "../lib/cnails";
import { memory, CPU } from "../lib/formHelper";

const useEnvironmentCard = (env: Environment) => {
  const { sub } = useCnails();
  const { createContainer, containers } = useContainers();
  const {
    sectionUserInfo,
    setHighlightedEnv,
    removeEnvironment,
    setEnvUpdateOpen,
    setEnvUpdateTarget,
    templates,
  } = useInstructor();
  const status = env.status;
  const container = containers.find(
    (container) => container.redisPatch.sourceId == env.id
  );

  const comment =
    (status == "CREATING" && "being created...") ||
    (status == "REMOVING" && "being removed...") ||
    (status == "UPDATING" && "being updated...") ||
    (container &&
      ((container.status == "CREATING" && "starting temporary workspace...") ||
        (container.status == "REMOVING" && "stopping temporary workspace...") ||
        "updating internal..."));

  const menuItems = [
    {
      text: "Delete",
      // show: !Boolean(env.temporaryContainerId),
      onClick: async () => {
        await removeEnvironment(env.id);
      },
    },
    {
      text: "Update Info",
      // show: !Boolean(env.temporaryContainerId),
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
      // show: !Boolean(env.temporaryContainerId),
      onClick: async () => {
        if (templates.some((t) => t.environment_id === env.id)) {
          myToast.error({
            title: "Invalid Operation",
            description: "Some template is still using this environment.",
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
  ];

  return {
    menuItems,
    container,
    comment,
  };
};

export default useEnvironmentCard;
