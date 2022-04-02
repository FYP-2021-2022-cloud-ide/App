import type { Workspace as RedisWorkspace } from "../redisHelper";

/**
 *
 * store all the API type
 * these API types are seperated from cnails.d.ts because technically they are UI objects
 */

export type {
  SuccessStringResponse,
  SectionUserInfoResponse,
  SectionRole,
  CourseListResponse,
  Environment,
  SandboxAddRequest,
  EnvironmentListResponse,
  EnvironmentAddResponse,
  Template,
  TemplateListResponse,
  TemplateAddResponse,
  TemplateGetStudentWorkspaceResponse,
  Container,
  ContainerListResponse,
  ContainerAddResponse,
  SandboxAddResponse,
  SandboxImageAddResponse,
  SandboxImageListResponse,
  NotificationListResponse,
  NotificationSendResponse,
  NotificationTokenResponse,
  GoogleOAuthReponse,
  GoogleDriveListResponse,
  LocalFilesDownloadToUserResponse,
  LocalFilesListResponse,
  FetchCookieResponse,
  GetUserDataResponse,
  SystemMessageResponse,
  SandboxImage,
  Error,
  GetEnvResponse,
  ContainerType,
  ContainerAddRequest,
};

export { nodeError, emptyError };

type SectionRole = "instructor" | "student";
type ContainerType = "SANDBOX" | "TEMPORARY" | "TEMPLATE_WORKSPACE";
type SuccessStringResponse = {
  success: boolean;
  error: Error;
};

type Error = {
  status: string;
  error: string;
};

const emptyError: Error = {
  status: "",
  error: "",
};

const nodeError = (err): Error => {
  return {
    status: "TODO",
    error: err.error,
  };
};

type SystemMessageResponse =
  | {
      success: true;
      systemMessage: {
        id: string;
        text: string;
      };
    }
  | {
      success: false;
      error: Error;
    };

type SectionUserInfoResponse =
  | {
      success: true;
      error: Error;
      courseName: string;
      // role: "instructor" | "student";
      role: SectionRole;
      sectionUserID: string;
    }
  | { success: false; error: Error };

type Course = {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: SectionRole;
  lastUpdateTime: string;
};
type CourseListResponse =
  | { success: true; error: Error; courses: Course[] }
  | { success: false; error: Error };

type Environment = {
  id: string;
  imageId: string;
  libraries: string;
  environmentName: string;
  description: string;
  status?: "CREATING" | "UPDATING" | "REMOVING" | null;
};
type EnvironmentListResponse =
  | { success: true; error: Error; environments: Environment[] }
  | { success: false; error: Error };

type EnvironmentAddResponse =
  | {
      success: true;
      error: Error;
      environmentID: string;
    }
  | {
      success: false;
      error: Error;
    };

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  environment_id: string;
  assignment_config_id: string;
  storage: string;
  containerID: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
  status?: "CREATING" | "UPDATING" | "REMOVING" | null;
};

type TemplateListResponse =
  | {
      success: true;
      error: Error;
      templates: Template[];
    }
  | {
      success: false;
      error: Error;
    };

type TemplateAddResponse =
  | {
      success: true;
      error: Error;
      templateID: string;
    }
  | {
      success: false;
      error: Error;
    };

/**
 * this class will be seen in the instructor page
 */
type StudentWorkspace = {
  // status: "NOT_STARTED_BEFORE" | "ON" | "OFF";
  status: string;
  workspaceId: string;
  student: {
    name: string;
    sub: string;
    userId: string;
  };
};

type TemplateGetStudentWorkspaceResponse =
  | {
      success: true;
      error: Error;
      studentWorkspaces: StudentWorkspace[];
    }
  | {
      success: false;
      error: Error;
    };

type ContainerInfo = {
  containersAlive: number | undefined;
  containersTotal: number | undefined;
};

type Container = {
  /**
   *  a container must have a title.
   *  no matter it is a temporary container or a long living container
   */
  title: string;
  subTitle: string;
  startAt: string;
  containerID: string;
  redisPatch?: RedisWorkspace;
};

type ContainerListResponse =
  | {
      success: true;
      error: Error;
      containersInfo: ContainerInfo;
      containers: Container[];
    }
  | {
      success: false;
      error: Error;
    };
type ContainerAddResponse =
  | {
      success: true;
      error: Error;
      containerID: string;
    }
  | {
      success: false;
      error: Error;
    };

type SandboxImage = {
  /**
   * id of the sandbox in the db
   */
  id: string;
  title: string;
  description: string;
  /**
   *  image id
   */
  imageId: string;
  /**
   * container id
   */
  sandboxesId: string;
};

type SandboxAddResponse =
  | {
      success: true;
      error: Error;
      sandboxId: string;
    }
  | {
      success: false;
      error: Error;
    };

type SandboxImageListResponse =
  | {
      success: true;
      error: Error;
      sandboxImages: SandboxImage[];
    }
  | {
      success: false;
      error: Error;
    };

type SandboxImageAddResponse =
  | {
      success: true;
      error: Error;
      sandboxImageId: string;
    }
  | {
      success: false;
      error: Error;
    };

type Notification = {
  id: string;
  title: string;
  body: string;
  sender: Notification_Sender;
  allow_reply: boolean;
  sentAt: string;
  courseCode: string;
  sectionCode: string;
  section_id: string;
  read: boolean;
};
type Notification_Sender = {
  id: string;
  sub: string;
  name: string;
};
type NotificationListResponse =
  | {
      success: true;
      error: Error;
      notifications: Notification[] | null;
    }
  | {
      success: false;
      error: Error;
    };
type NotificationSendResponse =
  | {
      success: true;
      error: Error;
      notificationId: string;
    }
  | {
      success: false;
      error: Error;
    };

type NotificationTokenResponse =
  | {
      success: true;
      error: Error;
      notification_token: string;
    }
  | {
      success: false;
      error: Error;
    };

type GooogleDrive_File = {
  id: string;
  name: string;
};
type GooogleDrive_Folder = {
  id: string;
  name: string;
};
type GooogleDrive_LoadedFiles = {
  folders: GooogleDrive_Folder[];
  files: GooogleDrive_File[];
};
type GoogleOAuthReponse =
  | {
      success: true;
      error: Error;
      authURL: string;
    }
  | {
      success: false;
      error: Error;
    };

type GoogleDriveListResponse =
  | {
      success: true;
      error: Error;
      loadedFiles: GooogleDrive_LoadedFiles;
    }
  | {
      success: false;
      error: Error;
    };

type LocalFilesDownloadToUserResponse =
  | {
      success: true;
      error: Error;
      fileName: string;
      file: string;
    }
  | {
      success: false;
      error: Error;
    };

type LocalFilesListResponse =
  | {
      success: true;
      error: Error;
      tree: directoryTree.DirectoryTree;
    }
  | {
      success: false;
      error: Error;
      tree: directoryTree.DirectoryTree;
    }
  | {
      success: false;
      error: Error;
    };

type FetchCookieResponse =
  | {
      success: true;
      cookies: {
        sub: string;
        name: string;
        email: string;
        userId: string;
        semesterId: string;
      };
    }
  | { success: false; error: Error };
type GetUserDataResponse =
  | {
      success: true;
      error: Error;
      userId: string;
      role: string;
      semesterId: string;
      darkMode: boolean;
      bio: string;
    }
  | {
      success: false;
      error: Error;
    };

type GetEnvResponse = {
  FirebaseApiKey: string;
  FirebaseProjectId: string;
  FirebaseMessagingSenderId: string;
  FirebaseAppId: string;
  Containers_limit: string;
};

type SandboxAddRequest = {
  memLimit: number;
  numCPU: number;
  sandboxImageId: string;
  title: string;
  sub: string;
};

type EventFormDataPair =
  | {
      event: "ENV_CREATE";
      formData: EnvironmentBuildRequest;
    }
  | {
      event: "ENV_UPDATE";
      formData: EnvironmentUpdateRequest;
    }
  | {
      event: "TEMPLATE_CREATE";
      formData: AddTemplateRequest;
    }
  | {
      event: "TEMPLATE_UPDATE";
      formData: UpdateTemplateRequest;
    }
  | {
      event: "SANDBOX_CREATE";
      formData: any;
    }
  | {
      event: "SANDBOX_UPDATE";
      formData: UpdateSandboxImageRequest;
    };

type ContainerAddRequest = {
  memLimit: number;
  numCPU: number;
  imageId: string;
  sub: string;
  accessRight: string;
  title: string;
} & EventFormDataPair;

export type ContainerRemoveRequest = {
  containerId: string;
  sub: string;
};

export type EnvironmentListRequest = {
  sectionId: string;
  sub: string;
};

export type EnvironmentAddRequest = {
  libraries: string[];
  name: string;
  description: string;
  section_user_id: string;
};

export type EnvironmentUpdateRequest = {
  envId: string;
  name: string;
  description: string;
  section_user_id: string;
  containerId: string;
};

export type EnvironmentBuildRequest = {
  name: string;
  description: string;
  section_user_id: string;
  containerId: string;
};

export type EnvironmentRemoveRequest = {
  envId: string;
  section_user_id: string;
};

export type AnnouncementRequest = {
  allowReply: boolean;
  body: string;
  title: string;
  senderId: string;
  sectionId: string;
};

export type AddSandboxImageRequest = {
  description: string;
  imageId: string;
  title: string;
  userId: string;
};

export type RemoveSandboxRequest = {
  sandboxId: string;
  userId: string;
};

export type RemoveSandboxImageRequest = {
  sandboxImageId: string;
  userId: string;
};

export type UpdateSandboxImageRequest = {
  sandboxImageId: string;
  title: string;
  description: string;
  tempContainerId: string;
  userId: string;
};

export type ListTemplatesRequest = {
  sectionid: string;
  sub: string;
};

export type AddTemplateRequest = {
  templateName: string;
  description: string;
  section_user_id: string;
  environment_id: string;
  assignment_config_id: string;
  containerId: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
};
export type UpdateTemplateRequest = {
  templateId: string;
  templateName: string;
  description: string;
  section_user_id: string;
  containerId: string;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
};

export type ActivateTemplateRequest = {
  templateId: string;
  section_user_id: string;
};

export type DeactivateTemplateRequest = {
  templateId: string;
  section_user_id: string;
};

export type RemoveTemplateRequest = {
  templateId: string;
  section_user_id: string;
};

export type GetTemplateStudentWorkspaceRequest = {
  templateId: string;
  section_user_id: string;
};

export type AddTemplateContainerRequest = {
  imageName: string;
  memLimit: number;
  numCPU: number;
  section_user_id: string;
  template_id: string;
  accessRight: string;
  useFresh: boolean;
  title: string;
  sub: string;
  event: "WORKSPACE_START" | "TEMPLATE_START_WORKSPACE";
};

export type RemoveTemplateContainerRequest = {
  containerId: string;
  sub: string;
};
