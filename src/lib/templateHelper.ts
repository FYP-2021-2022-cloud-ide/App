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
        !container.isTemporary &&
        container.redisPatch.sourceId == template.id
      ) {
        // it is a template workspace
        if (container.id == "")
          return {
            ...template,
            status: "STARTING_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING")
            return {
              ...template,
              containerId: "", // clear the container id
              status: "STOPPING_WORKSPACE",
            };
          else
            return {
              ...template,
              containerId: container.id,
              status: "DEFAULT",
            };
        }
      }

      if (container.redisPatch.sourceId == template.id) {
        // this is a temporary workspace
        if (container.id == "")
          return {
            ...template,
            status: "STARTING_UPDATE_WORKSPACE",
          };
        else {
          if (container.status == "REMOVING") {
            return {
              ...template,
              containerId: "", // clear the container Id
              status: "STOPPING_UPDATE_WORKSPACE",
            };
          } else
            return {
              ...template,
              containerId: container.id,
            };
        }
      }
    }

    // no template is related to this environment
    return {
      ...template,
      containerId: "",
      status: "DEFAULT",
    };
  });
};
