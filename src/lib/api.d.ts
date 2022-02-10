/**
 *
 * store all the API type
 * these API types are seperated from cnails.d.ts because technically they are UI objects
 */

export type {
  TemplateListResponse,
  Environment,
  Template,
  EnvironmentListResponse,
  SectionUserInfoResponse,
};

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  assignment_config_id: string;
  storage: string;
  containerID: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
};

type Environment = {
  id: string;
  imageId: string;
  libraries: string;
  environmentName: string;
  description: string;
};

type SectionUserInfoResponse =
  | {
      success: true;
      message: string;
      courseName: string;
      role: "instructor" | "student";
      sectionUserID: string;
    }
  | { success: false; error: Error };

type EnvironmentListResponse =
  | { success: true; message: string; environments: Environment[] }
  | { success: false; error: Error };

type TemplateListResponse =
  | {
      success: true;
      message: string;
      templates: Template[];
    }
  | {
      success: false;
      error: error;
    };
