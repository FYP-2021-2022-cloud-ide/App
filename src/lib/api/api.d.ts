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
  GoogleDriveListResponse,
  LocalFilesDownloadToUserResponse,
  LocalFilesListResponse,
  FetchCookieResponse,
  GetUserDataResponse,
  
};
type SectionRole = "instructor" | "student";
type SuccessStringResponse = {
  success: boolean;
  message: string;
};

type SectionUserInfoResponse =
  | {
      success: true;
      message: string;
      courseName: string;
      // role: "instructor" | "student";
      role: SectionRole;
      sectionUserID: string;
    }
  | { success: false; message: string };

type Course = {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: SectionRole;
  lastUpdateTime: string;
};
type CourseListResponse =
  | { success: true; message: string; courses: Course[] }
  | { success: false; message: string };

type Environment = {
  id: string;
  imageId: string;
  libraries: string;
  environmentName: string;
  description: string;
};
type EnvironmentListResponse =
  | { success: true; message: string; environments: Environment[] }
  | { success: false; message: string };

type EnvironmentAddResponse =
  | {
      success: true;
      message: string;
      environmentID: string;
    }
  | {
      success: false;
      message: string;
    };

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  environment_id:string
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
      message: string;
      templates: Template[];
    }
  | {
      success: false;
      message: string;
    };

type TemplateAddResponse =
  | {
      success: true;
      message: string;
      templateID: string;
    }
  | {
      success: false;
      message: string;
    };

type StudentWorkspace = {
  // status: "NOT_STARTED_BEFORE" | "ON" | "OFF";
  status:string;
  workspaceId: string;
  student: {
    name: string;
    sub: string;
    userId:string;
  };
};

type TemplateGetStudentWorkspaceResponse =
| {
    success: true;
    message: string;
    studentWorkspaces: StudentWorkspace[];
  }
| {
    success: false;
    message: string;
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
      message: string;
      containersInfo: ContainerInfo;
      containers: Container[];
      tempContainers: Container[];
    }
  | {
      success: false;
      message: string;
    };
type ContainerAddResponse =
  | {
      success: true;
      message: string;
      containerID: string;
    }
  | {
      success: false;
      message: string;
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
      message: string;
      sandboxId: string;
    }
  | {
      success: false;
      message: string;
    };

type SandboxImageListResponse =
  | {
      success: true;
      message: string;
      sandboxImages: SandboxImage[];
    }
  | {
      success: false;
      message: string;
    };

type SandboxImageAddResponse =
  | {
      success: true;
      message: string;
      sandboxImageId: string;
    }
  | {
      success: false;
      message: string;
    };

type Notification = {
  id: string;
  title: string;
  body: string;
  sender: Notification_Sender;
  allow_reply: boolean;
  updatedAt: string;
};
type Notification_Sender = {
  id: string;
  sub: string;
  name: string;
};
type NotificationListResponse =
  | {
      success: true;
      message: string;
      notifications: Notification[] | null;
    }
  | {
      success: false;
      message: string;
    };
type NotificationSendResponse =
  | {
      success: true;
      message: string;
      notificationId: string;
    }
  | {
      success: false;
      message: string;
    };

type NotificationTokenResponse =
  | {
      success: true;
      message: string;
      notification_token: string;
    }
  | {
      success: false;
      message: string;
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
type GoogleDriveListResponse =
  | {
      success: true;
      message: string;
      loadedFiles: GooogleDrive_LoadedFiles;
    }
  | {
      success: false;
      message: string;
    };

type LocalFilesDownloadToUserResponse =
  | {
      success: true;
      message: string;
      fileName: string;
      file: string;
    }
  | {
      success: false;
      message: string;
    };

type LocalFilesListResponse =
  | {
      success: true;
      message: string;
      tree: directoryTree.DirectoryTree;
    }
  | {
      success: false;
      message: string;
      tree: directoryTree.DirectoryTree;
    }
  | {
      success: false;
      message: string;
    };

type FetchCookieResponse = {
  sub: string;
  name: string;
  email: string;
  userId: string;
  semesterId: string;
  darkMode: string;
  bio: string;
  role: string;
};
type GetUserDataResponse =
  | {
      success: true;
      message: string;
      userId: string;
      role: string;
      semesterId: string;
      darkMode: boolean;
      bio: string;
    }
  | {
      success: false;
      message: string;
    };
