import {
  TemplateListResponse,
  TemplateAddResponse,
  TemplateGetStudentWorkspaceResponse,
  SuccessStringResponse,
  ContainerAddResponse,
} from "./api";

const templateAPI = {
  templateList: async (
    sectionid: string,
    sub: string
  ): Promise<TemplateListResponse> => {
    var res = await fetch(
      "/api/template/listTemplates?sectionid=" + sectionid + "&sub=" + sub,
      {
        method: "GET",
      }
    );
    return res.json();
  },

  addTemplate: async (
    templateName: string,
    description: string,
    section_user_id: string,
    environment_id: string,
    assignment_config_id: string,
    containerId: string,
    active: boolean,
    isExam: boolean,
    timeLimit: number,
    allow_notification: boolean,
    sectionId: string
  ): Promise<TemplateAddResponse> => {
    var res = await fetch("/api/template/addTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateName: templateName,
        description: description,
        section_user_id: section_user_id,
        environment_id: environment_id,
        assignment_config_id: assignment_config_id,
        containerId: containerId,
        active: active,
        isExam: isExam,
        timeLimit: timeLimit,
        allow_notification: allow_notification,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  updateTemplate: async (
    templateId: string,
    templateName: string,
    description: string,
    section_user_id: string,
    containerId: string,
    isExam: boolean,
    timeLimit: number,
    allow_notification: boolean,
    sectionId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/updateTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        templateName: templateName,
        description: description,
        section_user_id: section_user_id,
        containerId: containerId,
        isExam: isExam,
        timeLimit: timeLimit,
        allow_notification: allow_notification,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  activateTemplate: async (
    templateId: string,
    section_user_id: string,
    sectionId: string,
    templateName: string,
    templateDescription: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/activateTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
        title: templateName,
        description: templateDescription,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },
  deactivateTemplate: async (
    templateId: string,
    section_user_id: string,
    sectionId: string,
    templateName: string,
    templateDescription: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/deactivateTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
        title: templateName,
        description: templateDescription,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },

  removeTemplate: async (
    templateId: string,
    section_user_id: string,
    sectionId: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/removeTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
        sectionId: sectionId,
      }),
    });
    return res.json();
  },

  getTemplateStudentWorkspace: async (
    templateId: string,
    section_user_id: string
  ): Promise<TemplateGetStudentWorkspaceResponse> => {
    var res = await fetch("/api/template/getTemplateStudentWorkspace", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
      }),
    });
    return res.json();
  },
  addTemplateContainer: async (
    imageName: string,
    memLimit: number,
    numCPU: number,
    section_user_id: string,
    template_id: string,
    accessRight: string,
    useFresh: boolean,
    title: string
  ): Promise<ContainerAddResponse> => {
    var res = await fetch("/api/template/addTemplateContainer", {
      method: "POST",
      body: JSON.stringify({
        imageName: imageName,
        memLimit: memLimit,
        numCPU: numCPU,
        section_user_id: section_user_id,
        template_id: template_id,
        accessRight: accessRight,
        useFresh: useFresh,
        title: title,
      }),
    });
    return res.json();
  },
  removeTemplateContainer: async (
    containerId: string,
    sub: string
  ): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/removeTemplateContainer", {
      method: "POST",
      body: JSON.stringify({
        sub: sub,
        containerId: containerId,
      }),
    });
    return res.json();
  },
};

export { templateAPI };
