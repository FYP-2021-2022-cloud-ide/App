import { Container, Template } from "./cnails";
import { Template as ApiTemplate } from "./api/api";

export const apiTemplatesToUiTemplates = (templates: ApiTemplate[]) => {
  return templates.map<Template>((template) => ({
    ...template,
    status: "DEFAULT",
  }));
};

export const patchTemplates = (
  templates: Template[],
  containers: Container[]
) => {
  return templates.map<Template>((template) => {
    for (let container of containers) {
      if (
        !container.redisPatch.data &&
        container.redisPatch.sourceId &&
        template.id
      ) {
        // it is a template workspace
        if (container.containerID == "")
          return {
            ...template,
            status: "STARTING_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING")
            return {
              ...template,
              containerID: "", // clear the container id
              status: "STOPPING_WORKSPACE",
            };
          else
            return {
              ...template,
              containerID: container.containerID,
              status: "DEFAULT",
            };
        }
      }

      if (container.redisPatch.sourceId == template.id) {
        // this is a temporary workspace
        if (container.containerID == "")
          return {
            ...template,
            status: "STARTING_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING") {
            return {
              ...template,
              containerID: "", // clear the container Id
              status: "STOPPING_WORKSPACE",
            };
          } else
            return {
              ...template,
              containerID: container.containerID,
              status: "UPDATING_INTERNAL",
            };
        }
      }
    }

    // no template is related to this environment
    return {
      ...template,
      containerID: "",
      status: "DEFAULT",
    };
  });
};
