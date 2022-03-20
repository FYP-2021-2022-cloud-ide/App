import { MessagePayload } from "firebase/messaging";

/**
 *
 * store all the cnails object type
 */

export type {
  SectionRole,
  Environment,
  Template,
  Course,
  SectionUserInfo,
  Container,
  ContainerInfo,
  SandboxImage,
  ContainerList,
  Notification,
  ActionType,
  CnailsContextState,
  InstructorContextState,
  Workspace,
  StudentWorkspace
};

type SectionRole = "INSTRUCTOR" | "STUDENT";

type Environment = {
  id: string;
  imageId: string;
  libraries: string;
  name: string;
  description: string;
};

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  assignment_config_id: string;
  storage: string;
  containerID?: string;
  environment_id: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
};

type Course = {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: SectionRole;
  lastUpdateTime: string;
};

type SectionUserInfo = {
  courseCode: string;
  courseTitle?: string;
  sectionCode: string;
  sectionId: string;
  sectionUserId: string;
  role: SectionRole;
  sub: string;
};

type SandboxImage = {
  id: string;
  title: string;
  description: string;
  imageId: string;
  sandboxesId: string;
};

type ContainerList = {
  containerInfo: ContainerInfo;
  containers: Container[];
};
type Container = {
  courseTitle: string;
  assignmentName: string;
  existedTime: string;
  containerID: string;
};

type Workspace = Template;

/**
 * container info is actually the quota info
 */
type ContainerInfo = {
  // the current active container number
  containersAlive: number;

  // the max active container allowance
  containersTotal: number;
};

type Notification = {
  id: string;
  sender: {
    id: string;
    name: string;
    sub: string;
  };
  title: string;
  body: string;
  updatedAt: string;
  allow_reply: boolean;
};

type CnailsContextState = {
  sub: string;
  name: string;
  email: string;
  userId: string;
  semesterId: string;
  // bio: string;
  // isAdmin: boolean;
  notifications: Notification[],
  containers: Container[],
  containerInfo: ContainerInfo,
  fetchContainers: (sub: string) => Promise<{
    containers: Container[];
    containersInfo: ContainerInfo;
  }>,
  fetchNotifications: (userId: string) => Promise<Notification[]>,
  containerQuota: number,
};

type InstructorContextState = {
  environments: Environment[],
  templates: Template[],
  fetch: () => void,
  sectionUserInfo: SectionUserInfo,
  highlightedEnv: Environment,
  setHighlightedEnv: React.Dispatch<React.SetStateAction<Environment>>,
}

type StudentWorkspace = {
  status: "NOT_STARTED_BEFORE" | "ON" | "OFF";
  workspaceId: string;
  student: {
    name: string;
    sub: string;
  };
};


export type ActionType = "delete" | "reply";
