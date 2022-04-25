import { MessagePayload } from "firebase/messaging";
import { Workspace as RedisPatch } from "./redisHelper";

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
  Message,
  ActionType,
  Workspace,
  StudentWorkspace,
};

type SectionRole = "INSTRUCTOR" | "STUDENT";

type Environment = {
  id: string;
  imageId: string;
  /**
   * it is in fact the environment choice
   */
  libraries: string;
  name: string;
  description: string;
  /**
   * if the environment is updating the internal, there will be a temporary container id
   */
  temporaryContainerId?: string;
  /**
   * if the environment is `CREATING`, the create request is being processed.
   * if the environment is `UPDATING`, the update request is being processed and user should not be able to update it.
   * if the status is `REMOVING`, the remove request is being processed.
   * if the status is undefined or null, user see it normally.
   */
  status: "CREATING" | "REMOVING" | "UPDATING" | "DEFAULT";
};

type Template = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  assignment_config_id: string;
  storage: string;
  containerId?: string;
  environment_id: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allow_notification: boolean;
  /**
   * if status is `CREATING`, the create request is being processed.
   * if status is `UDPATING`, the update request is being processed and user should not be able to update it.
   * if the status is undefined or null, card will show normally
   */
  status?: "CREATING" | "UPDATING" | "REMOVING" | "DEFAULT";
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
  containerId: string;
  /**
   * if the sandbox image is `CREATING`, the create request is being processed.
   * if the sandbox image is `UPDATING`, the update request is being processed and should not let user update it
   * if the sandbox image is `REMOVING`, the remove request is being processed.
   */
  status: "CREATING" | "UPDATING" | "REMOVING" | "DEFAULT";
};

type ContainerList = {
  containerInfo: ContainerInfo;
  containers: Container[];
};

type Container = {
  /**
   *  a container must have a title.
   *  no matter it is a temporary container or a long living container
   */
  title: string;
  subTitle: string;
  startAt: string;
  id: string;
  type: "SANDBOX" | "TEMPLATE" | "ENV" | "STUDENT_WORKSPACE";
  /**
   *  if the container is `CREATING`, the request is being processed and the container is soon be created.
   * if the status is `REMOVING`, the remove request is being processed
   * if the container is `undefined` or null, the container is up and can let user enter it.
   *
   * @remark in the `redisHelper` there is a status `RUNNING`. But it should return `undefined` to UI
   */
  status: "CREATING" | "REMOVING" | "DEFAULT";
  /**
   * base on the event of the container created to determine whether this is a temporary container
   *
   * temporary container event : `ENV_CREATE`, `ENV_UPDATE`, `TEMPLATE_CREATE` , `TEMPLATE_UPDATE` , `SANDBOX_CREATE` , `SANDBOX_UPDATE`
   *
   * normal container event : `TEMPLATE_START_WORKSPACE`, `SANDBOX_START_WORKSPACE` , `WORKSPACE_START`
   */
  isTemporary: boolean;
  /**
   * the redis patch data
   */
  redisPatch: RedisPatch;
};

type Workspace = Template;

type ContainerInfo = {
  // the current active container number
  containersAlive: number;

  // total number of container
  containersTotal: number;
};

type Message = {
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

type StudentWorkspace = {
  status: "NOT_STARTED_BEFORE" | "ON" | "OFF";
  workspaceId: string;
  student: {
    name: string;
    sub: string;
  };
};

export type ActionType = "delete" | "reply";
