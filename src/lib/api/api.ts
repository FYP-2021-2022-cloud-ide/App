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
  Error,
};
type SectionRole = "instructor" | "student";
type SuccessStringResponse = {
  success: boolean;
  error: Error;
};

type Error = {
  status: string;
  error: string;
};

export const emptyError: Error = {
  status: "",
  error: "",
};

export const nodeError = (err): Error => {
  return {
    status: "TODO",
    error: err.error,
  };
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
  courseTitle: string;
  assignmentName: string;
  existedTime: string;
  containerID: string;
};

type ContainerListResponse =
  | {
      success: true;
      error: Error;
      containersInfo: ContainerInfo;
      containers: Container[];
      tempContainers: Container[];
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
  id: string; // id in sandbox image db
  title: string;
  description: string;
  imageId: string; // image id
  sandboxesId: string; // container id
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
