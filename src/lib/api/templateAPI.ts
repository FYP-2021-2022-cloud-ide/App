import {
  TemplateListResponse,
  TemplateAddResponse,
  TemplateGetStudentWorkspaceResponse,
  SuccessStringResponse,
  ContainerAddResponse,
  ListTemplatesRequest,
  AddTemplateRequest,
  UpdateTemplateRequest,
  ActivateTemplateRequest,
  DeactivateTemplateRequest,
  RemoveTemplateRequest,
  GetTemplateStudentWorkspaceRequest,
  AddTemplateContainerRequest,
  RemoveTemplateContainerRequest,
} from "./api";

const templateAPI = {
  listTemplates: async (
    req: ListTemplatesRequest
  ): Promise<TemplateListResponse> => {
    var res = await fetch(
      "/api/template/listTemplates?sectionid=" +
        req.sectionid +
        "&sub=" +
        req.sub,
      {
        method: "GET",
      }
    );
    return res.json();
  },

  addTemplate: async (
    req: AddTemplateRequest
  ): Promise<TemplateAddResponse> => {
    var res = await fetch("/api/template/addTemplate", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  updateTemplate: async (
    req: UpdateTemplateRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/updateTemplate", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  activateTemplate: async (
    req: ActivateTemplateRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/activateTemplate", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  deactivateTemplate: async (
    req: DeactivateTemplateRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/deactivateTemplate", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },

  removeTemplate: async (
    req: RemoveTemplateRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/removeTemplate", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },

  getTemplateStudentWorkspace: async (
    req: GetTemplateStudentWorkspaceRequest
  ): Promise<TemplateGetStudentWorkspaceResponse> => {
    var res = await fetch("/api/template/getTemplateStudentWorkspace", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  addTemplateContainer: async (
    req: AddTemplateContainerRequest
  ): Promise<ContainerAddResponse> => {
    var res = await fetch("/api/template/addTemplateContainer", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
  removeTemplateContainer: async (
    req: RemoveTemplateContainerRequest
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/removeTemplateContainer", {
      method: "POST",
      body: JSON.stringify(req),
    });
    return res.json();
  },
};

export { templateAPI };
