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
  ContainerType,
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
  type: "SANDBOX" | "TEMPLATE" | "ENV" | "STUDENT_WORKSPACE";
  /**
   * the id of source object, sandboxImage, template or environment.
   * The `sourceId` can be undefined for event `ENV_CREATE`, `TEMPLATE_CREATE`, `SANDBOX_CREATE`
   * because the temporary container is created before the source is created.
   */
  sourceId: string | undefined;
  /**
   * base on the event of the container created to determine whether this is a temporary container
   *
   * temporary container event : `ENV_CREATE`, `ENV_UPDATE`, `TEMPLATE_CREATE` , `TEMPLATE_UPDATE` , `SANDBOX_CREATE` , `SANDBOX_UPDATE`
   *
   * normal container event : `TEMPLATE_START_WORKSPACE`, `SANDBOX_START_WORKSPACE` , `WORKSPACE_START`
   */
  isTemporary: boolean;
  status?: "CREATING" | "REMOVING" | null;
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
  status: "CREATING" | "UPDATING" | "REMOVING" | null;
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
