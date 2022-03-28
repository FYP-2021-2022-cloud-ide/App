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
  StudentWorkspace,
};

type SectionRole = "INSTRUCTOR" | "STUDENT";

type ContainerType = "SANDBOX" | "TEMPORARY" | "TEMPLATE_WORKSPACE";
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

/**
 * @remark the naming convention of sandbox in the backend is poor.
 * pay attention to the difference in `id` , `imageId`, `sandboxesId`
 */
type SandboxImage = {
  /**
   * the id of this sandbox in the database, you need to use this in `removeSandboxImage`
   */
  id: string;
  title: string;
  description: string;
  /**
   * the underlying image id of the sandbox. You need to use this to call `addTempContainer`
   */
  imageId: string;
  /**
   * the container id of the workspace created from sandbox.
   */
  sandboxesId: string;
};

type ContainerList = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

type Container = {
  title: string;
  subTitle: string;
  existedTime: string;
  containerID: string;
  type: ContainerType;
};

type Workspace = Template;

type ContainerInfo = {
  // the current active container number
  containersAlive: number;

  // total number of container
  containersTotal: number;
};

type Notification = {
  id: string;
  courseCode?: string;
  sectionCode?: string;
  section_id?: string;
  read: boolean;
  sender: {
    id: string;
    name: string;
    sub: string;
  };
  title: string;
  body: string;
  sentAt: string;
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
  notifications: Notification[];
  containers: Container[];
  containerInfo: ContainerInfo;
  sandboxImages: SandboxImage[];
  /**
   * a function to fetch the new container list.
   * It will update the context and hence update all affected UI.
   *
   * @remark because of the inconsistency in backend API, both sub and userId are needed. Also, fetching this API will fetch the data
   *
   * @param sub the user sub
   * @param userId the user id
   */
  fetchContainers: (
    sub: string,
    userId: string
  ) => Promise<{
    containers: Container[];
    containersInfo: ContainerInfo;
  }>;
  /**
   * a function to fetch a new list of notification.
   * It will update the context and hence update all affected UI.
   */
  fetchNotifications: (userId: string) => Promise<Notification[]>;
  containerQuota: number;
};

type InstructorContextState = {
  environments: Environment[];
  templates: Template[];
  fetch: () => void;
  sectionUserInfo: SectionUserInfo;
  highlightedEnv: Environment;
  setHighlightedEnv: React.Dispatch<React.SetStateAction<Environment>>;
};

type StudentWorkspace = {
  status: "NOT_STARTED_BEFORE" | "ON" | "OFF";
  workspaceId: string;
  student: {
    name: string;
    sub: string;
  };
};

export type ActionType = "delete" | "reply";
