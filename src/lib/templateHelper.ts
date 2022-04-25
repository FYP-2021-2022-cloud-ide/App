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
    const container = containers.find(
      (container) => container.redisPatch.sourceId == template.id
    );
    return {
      ...template,
      containerId: container ? container.id : "",
      status: "DEFAULT",
    };
  });
};
