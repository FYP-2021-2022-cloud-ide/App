import { 
  TemplateListResponse ,
  TemplateAddResponse,
  SuccessStringResponse
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
    environment_id:string,
    assignment_config_id: string,
    containerId: string,
    active: boolean,
    isExam: boolean,
    timeLimit: Number,
    allow_notification: boolean
  ): Promise<TemplateAddResponse> => {
    var res = await fetch("/api/template/addTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateName: templateName,
        description: description,
        section_user_id: section_user_id,
        environment_id:environment_id,
        assignment_config_id: assignment_config_id,
        containerId: containerId,
        active: active,
        isExam: isExam,
        timeLimit: timeLimit,
        allow_notification: allow_notification,
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
    timeLimit: Number,
    allow_notification: boolean
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
      }),
    });
    return res.json();
  },
  activateTemplate: async (
    templateId: string,
    section_user_id: string): Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/activateTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
      }),
    });
    return res.json();
  },
  deactivateTemplate: async (
    templateId: string, 
    section_user_id: string) : Promise<SuccessStringResponse> => {
    var res = await fetch("/api/template/deactivateTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
      }),
    });
    return res.json();
  },

  removeTemplate: async (
    templateId: string,
     section_user_id: string): Promise<SuccessStringResponse>  => {
    var res = await fetch("/api/template/removeTemplate", {
      method: "POST",
      body: JSON.stringify({
        templateId: templateId,
        section_user_id: section_user_id,
      }),
    });
    return res.json();
  },
};

export { templateAPI };