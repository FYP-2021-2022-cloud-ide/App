/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "dockerGet";

export interface Error {
  status: string;
  error: string;
}

export interface ListFilesRequest {
  sessionKey: string;
  sub: string;
  folderId: string;
}

export interface ChildrenReply {
  files: ChildrenReply_child[];
  folders: ChildrenReply_child[];
  success: boolean;
  error: Error | undefined;
}

export interface ChildrenReply_child {
  id: string;
  name: string;
}

export interface CodeRequest {
  sessionKey: string;
  code: string;
  sub: string;
}

export interface UserIdRequest {
  sessionKey: string;
  userId: string;
}

export interface ListNotificationsReply {
  success: boolean;
  error: Error | undefined;
  notifications: ListNotificationsReply_Notification[];
}

export interface ListNotificationsReply_Notification {
  id: string;
  title: string;
  body: string;
  sender: ListNotificationsReply_Notification_Sender | undefined;
  allowReply: boolean;
  read: boolean;
  courseCode: string;
  sectionCode: string;
  sectionId: string;
  sentAt: string;
}

export interface ListNotificationsReply_Notification_Sender {
  id: string;
  sub: string;
  name: string;
}

export interface EmptyRequest {
  sessionKey: string;
}

export interface ListContainerReply {
  success: boolean;
  error: Error | undefined;
  containerInfo: ListContainerReply_ContainersInfo | undefined;
  containers: ListContainerReply_Container[];
  tempContainers: ListContainerReply_Container[];
}

export interface ListContainerReply_ContainersInfo {
  containersAlive: number;
  containersTotal: number;
}

export interface ListContainerReply_Container {
  courseTitle: string;
  assignmentName: string;
  existedTime: string;
  containerID: string;
}

export interface ListCoursesReply {
  success: boolean;
  error: Error | undefined;
  courses: ListCoursesReply_Course[];
}

export interface ListCoursesReply_Course {
  sectionID: string;
  courseCode: string;
  section: string;
  name: string;
  sectionRole: string;
  lastUpdateTime: string;
}

export interface GetSectionInfoReply {
  success: boolean;
  error: Error | undefined;
  sectionUserID: string;
  courseName: string;
  role: string;
}

export interface ListEnvironmentsReply {
  success: boolean;
  error: Error | undefined;
  environments: ListEnvironmentsReply_Environment[];
}

export interface ListEnvironmentsReply_Environment {
  id: string;
  imageId: string;
  environmentName: string;
  libraries: string;
  description: string;
}

export interface ListTemplatesReply {
  success: boolean;
  error: Error | undefined;
  templates: ListTemplatesReply_Template[];
}

export interface ListTemplatesReply_Template {
  id: string;
  name: string;
  description: string;
  environmentId: string;
  imageId: string;
  assignmentConfigId: string;
  storage: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allowNotification: boolean;
  ContainerId: string[];
}

export interface AddContainerRequest {
  sessionKey: string;
  imageName: string;
  environmentId: string;
  memLimit: number;
  numCPU: number;
  sectionUserId: string;
  templateId: string;
  accessRight: string;
  useFresh: boolean;
}

export interface InstantAddContainerRequest {
  sessionKey: string;
  sub: string;
  templateId: string;
}

export interface AddContainerReply {
  success: boolean;
  error: Error | undefined;
  containerID: string;
}

export interface RemoveContainerRequest {
  sessionKey: string;
  containerID: string;
  sub: string;
}

export interface SubmitFilesRequest {
  sessionKey: string;
  containerID: string;
  sectionUserId: string;
}

export interface ContainerTimeReply {
  success: boolean;
  error: Error | undefined;
  isExam: boolean;
  timeLimit: string;
  createdAt: string;
}

export interface AddTemplateRequest {
  sessionKey: string;
  name: string;
  description: string;
  environmentId: string;
  containerID: string;
  assignmentConfigId: string;
  sectionUserId: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allowNotification: boolean;
}

export interface UpdateTemplateRequest {
  sessionKey: string;
  templateID: string;
  name: string;
  description: string;
  containerID: string;
  assignmentConfigId: string;
  sectionUserId: string;
  active: boolean;
  isExam: boolean;
  timeLimit: number;
  allowNotification: boolean;
}

export interface TemplateIdRequest {
  sessionKey: string;
  templateID: string;
  sectionUserId: string;
}

export interface AddTemplateReply {
  success: boolean;
  error: Error | undefined;
  templateID: string;
}

export interface TemplateGetStudentWorkspaceReply {
  success: boolean;
  error: Error | undefined;
  StudentWorkspaces: TemplateGetStudentWorkspaceReply_StudentWorkspace[];
}

export interface TemplateGetStudentWorkspaceReply_StudentWorkspace {
  status: string;
  workspaceId: string;
  student:
    | TemplateGetStudentWorkspaceReply_StudentWorkspace_Student
    | undefined;
}

export interface TemplateGetStudentWorkspaceReply_StudentWorkspace_Student {
  name: string;
  sub: string;
  userId: string;
}

export interface AddEnvironmentRequest {
  sessionKey: string;
  libraries: string[];
  sectionUserId: string;
  name: string;
  description: string;
}

export interface AddEnvironmentReply {
  success: boolean;
  error: Error | undefined;
  environmentID: string;
}

export interface BuildEnvironmentRequest {
  sessionKey: string;
  name: string;
  description: string;
  sectionUserId: string;
  containerID: string;
}

export interface UpdateEnvironmentRequest {
  sessionKey: string;
  environmentID: string;
  name: string;
  description: string;
  sectionUserId: string;
  containerID: string;
}

export interface EnvironmentIdRequest {
  sessionKey: string;
  environmentID: string;
  sectionUserId: string;
}

export interface SectionAndSubRequest {
  sessionKey: string;
  sectionID: string;
  sub: string;
}

export interface CheckHaveContainerRequest {
  sessionKey: string;
  sub: string;
  containerID: string;
}

export interface SubRequest {
  sessionKey: string;
  sub: string;
}

export interface SectionRequest {
  sessionKey: string;
  sectionID: string;
}

export interface SuccessStringReply {
  success: boolean;
  error: Error | undefined;
}

export interface StringReply {
  error: Error | undefined;
}

export interface ListReply {
  error: Error[];
}

export interface GetUserDataRequest {
  sessionKey: string;
  isSessionKey: boolean;
  sub: string;
}

export interface GetUserDataReply {
  success: boolean;
  error: Error | undefined;
  userId: string;
  role: string;
  semesterId: string;
  darkMode: boolean;
  bio: string;
}

export interface UpdateUserDataRequest {
  sessionKey: string;
  sub: string;
  darkMode: boolean;
  bio: string;
}

export interface GetNotificationTokenReply {
  success: boolean;
  error: Error | undefined;
  notificationToken: string;
}

export interface SendNotificationRequest {
  sessionKey: string;
  title: string;
  body: string;
  sender: string;
  receiver: string;
  allowReply: boolean;
  sectionId: string;
}

export interface SendNotificationAnnouncementRequest {
  sessionKey: string;
  title: string;
  body: string;
  sender: string;
  sectionId: string;
  allowReply: boolean;
}

export interface SendNotificationReply {
  success: boolean;
  error: Error | undefined;
  notificationId: string;
}

export interface UpdateNotificationTokenRequest {
  sessionKey: string;
  sub: string;
  token: string;
}

export interface ChangeNotificationReadRequest {
  sessionKey: string;
  userId: string;
  notificationId: string[];
  read: boolean;
}

export interface RemoveNotificationRequest {
  sessionKey: string;
  userId: string;
  notificationId: string[];
}

export interface UpdateSubscriptionRequest {
  sessionKey: string;
  userId: string;
  token: string;
  semesterId: string;
}

export interface GoogleOAuthReply {
  success: boolean;
  error: Error | undefined;
  authURL: string;
}

export interface DownloadRequest {
  sessionKey: string;
  sub: string;
  fileId: string;
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface UploadRequest {
  sessionKey: string;
  sub: string;
  filePath: string;
  parentId: string;
  fileType: string;
}

export interface AddTempContainerRequest {
  imageName: string;
  memLimit: number;
  numCPU: number;
  sessionKey: string;
  sub: string;
  accessRight: string;
}

export interface AddTempContainerReply {
  success: boolean;
  error: Error | undefined;
  tempContainerId: string;
}

export interface RemoveTempContainerRequest {
  sessionKey: string;
  containerId: string;
  sub: string;
}

export interface AddSandBoxImageRequest {
  sessionKey: string;
  userId: string;
  title: string;
  description: string;
  imageId: string;
}

export interface AddSandBoxImageReply {
  success: boolean;
  error: Error | undefined;
  sandBoxImageId: string;
}

export interface UpdateSandBoxImageRequest {
  sessionKey: string;
  sandBoxImageId: string;
  userId: string;
  title: string;
  description: string;
  tempContainerId: string;
}

export interface SandBoxImageIdRequest {
  sessionKey: string;
  sandBoxImageId: string;
  userId: string;
}

export interface ListSandBoxImageRequest {
  sessionKey: string;
  userId: string;
}

export interface ListSandBoxImageReply {
  success: boolean;
  error: Error | undefined;
  sandboxImages: ListSandBoxImageReply_SandBoxImage[];
}

export interface ListSandBoxImageReply_SandBoxImage {
  id: string;
  title: string;
  description: string;
  imageId: string;
  sandboxId: string[];
}

export interface AddSandBoxRequest {
  sessionKey: string;
  memLimit: number;
  numCPU: number;
  sandBoxImageId: string;
}

export interface AddSandBoxReply {
  success: boolean;
  error: Error | undefined;
  sandBoxId: string;
}

export interface SandBoxIdRequest {
  sessionKey: string;
  sandBoxId: string;
  userId: string;
}

function createBaseError(): Error {
  return { status: "", error: "" };
}

export const Error = {
  encode(message: Error, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Error {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseError();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        case 2:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Error {
    return {
      status: isSet(object.status) ? String(object.status) : "",
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: Error): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Error>, I>>(object: I): Error {
    const message = createBaseError();
    message.status = object.status ?? "";
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseListFilesRequest(): ListFilesRequest {
  return { sessionKey: "", sub: "", folderId: "" };
}

export const ListFilesRequest = {
  encode(
    message: ListFilesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    if (message.folderId !== "") {
      writer.uint32(18).string(message.folderId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFilesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFilesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        case 2:
          message.folderId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFilesRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      folderId: isSet(object.folderId) ? String(object.folderId) : "",
    };
  },

  toJSON(message: ListFilesRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.folderId !== undefined && (obj.folderId = message.folderId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListFilesRequest>, I>>(
    object: I
  ): ListFilesRequest {
    const message = createBaseListFilesRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.folderId = object.folderId ?? "";
    return message;
  },
};

function createBaseChildrenReply(): ChildrenReply {
  return { files: [], folders: [], success: false, error: undefined };
}

export const ChildrenReply = {
  encode(
    message: ChildrenReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.files) {
      ChildrenReply_child.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.folders) {
      ChildrenReply_child.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.success === true) {
      writer.uint32(24).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChildrenReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChildrenReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.files.push(
            ChildrenReply_child.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.folders.push(
            ChildrenReply_child.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.success = reader.bool();
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChildrenReply {
    return {
      files: Array.isArray(object?.files)
        ? object.files.map((e: any) => ChildrenReply_child.fromJSON(e))
        : [],
      folders: Array.isArray(object?.folders)
        ? object.folders.map((e: any) => ChildrenReply_child.fromJSON(e))
        : [],
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: ChildrenReply): unknown {
    const obj: any = {};
    if (message.files) {
      obj.files = message.files.map((e) =>
        e ? ChildrenReply_child.toJSON(e) : undefined
      );
    } else {
      obj.files = [];
    }
    if (message.folders) {
      obj.folders = message.folders.map((e) =>
        e ? ChildrenReply_child.toJSON(e) : undefined
      );
    } else {
      obj.folders = [];
    }
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChildrenReply>, I>>(
    object: I
  ): ChildrenReply {
    const message = createBaseChildrenReply();
    message.files =
      object.files?.map((e) => ChildrenReply_child.fromPartial(e)) || [];
    message.folders =
      object.folders?.map((e) => ChildrenReply_child.fromPartial(e)) || [];
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseChildrenReply_child(): ChildrenReply_child {
  return { id: "", name: "" };
}

export const ChildrenReply_child = {
  encode(
    message: ChildrenReply_child,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChildrenReply_child {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChildrenReply_child();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChildrenReply_child {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ChildrenReply_child): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChildrenReply_child>, I>>(
    object: I
  ): ChildrenReply_child {
    const message = createBaseChildrenReply_child();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCodeRequest(): CodeRequest {
  return { sessionKey: "", code: "", sub: "" };
}

export const CodeRequest = {
  encode(
    message: CodeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.code !== "") {
      writer.uint32(10).string(message.code);
    }
    if (message.sub !== "") {
      writer.uint32(18).string(message.sub);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.code = reader.string();
          break;
        case 2:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      code: isSet(object.code) ? String(object.code) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: CodeRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.code !== undefined && (obj.code = message.code);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodeRequest>, I>>(
    object: I
  ): CodeRequest {
    const message = createBaseCodeRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.code = object.code ?? "";
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseUserIdRequest(): UserIdRequest {
  return { sessionKey: "", userId: "" };
}

export const UserIdRequest = {
  encode(
    message: UserIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UserIdRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: UserIdRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UserIdRequest>, I>>(
    object: I
  ): UserIdRequest {
    const message = createBaseUserIdRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseListNotificationsReply(): ListNotificationsReply {
  return { success: false, error: undefined, notifications: [] };
}

export const ListNotificationsReply = {
  encode(
    message: ListNotificationsReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.notifications) {
      ListNotificationsReply_Notification.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListNotificationsReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.notifications.push(
            ListNotificationsReply_Notification.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      notifications: Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) =>
            ListNotificationsReply_Notification.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ListNotificationsReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.notifications) {
      obj.notifications = message.notifications.map((e) =>
        e ? ListNotificationsReply_Notification.toJSON(e) : undefined
      );
    } else {
      obj.notifications = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListNotificationsReply>, I>>(
    object: I
  ): ListNotificationsReply {
    const message = createBaseListNotificationsReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.notifications =
      object.notifications?.map((e) =>
        ListNotificationsReply_Notification.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseListNotificationsReply_Notification(): ListNotificationsReply_Notification {
  return {
    id: "",
    title: "",
    body: "",
    sender: undefined,
    allowReply: false,
    read: false,
    courseCode: "",
    sectionCode: "",
    sectionId: "",
    sentAt: "",
  };
}

export const ListNotificationsReply_Notification = {
  encode(
    message: ListNotificationsReply_Notification,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.body !== "") {
      writer.uint32(26).string(message.body);
    }
    if (message.sender !== undefined) {
      ListNotificationsReply_Notification_Sender.encode(
        message.sender,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.allowReply === true) {
      writer.uint32(48).bool(message.allowReply);
    }
    if (message.read === true) {
      writer.uint32(56).bool(message.read);
    }
    if (message.courseCode !== "") {
      writer.uint32(66).string(message.courseCode);
    }
    if (message.sectionCode !== "") {
      writer.uint32(74).string(message.sectionCode);
    }
    if (message.sectionId !== "") {
      writer.uint32(82).string(message.sectionId);
    }
    if (message.sentAt !== "") {
      writer.uint32(42).string(message.sentAt);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListNotificationsReply_Notification {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsReply_Notification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 3:
          message.body = reader.string();
          break;
        case 4:
          message.sender = ListNotificationsReply_Notification_Sender.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.allowReply = reader.bool();
          break;
        case 7:
          message.read = reader.bool();
          break;
        case 8:
          message.courseCode = reader.string();
          break;
        case 9:
          message.sectionCode = reader.string();
          break;
        case 10:
          message.sectionId = reader.string();
          break;
        case 5:
          message.sentAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsReply_Notification {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      body: isSet(object.body) ? String(object.body) : "",
      sender: isSet(object.sender)
        ? ListNotificationsReply_Notification_Sender.fromJSON(object.sender)
        : undefined,
      allowReply: isSet(object.allowReply) ? Boolean(object.allowReply) : false,
      read: isSet(object.read) ? Boolean(object.read) : false,
      courseCode: isSet(object.courseCode) ? String(object.courseCode) : "",
      sectionCode: isSet(object.sectionCode) ? String(object.sectionCode) : "",
      sectionId: isSet(object.sectionId) ? String(object.sectionId) : "",
      sentAt: isSet(object.sentAt) ? String(object.sentAt) : "",
    };
  },

  toJSON(message: ListNotificationsReply_Notification): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    message.sender !== undefined &&
      (obj.sender = message.sender
        ? ListNotificationsReply_Notification_Sender.toJSON(message.sender)
        : undefined);
    message.allowReply !== undefined && (obj.allowReply = message.allowReply);
    message.read !== undefined && (obj.read = message.read);
    message.courseCode !== undefined && (obj.courseCode = message.courseCode);
    message.sectionCode !== undefined &&
      (obj.sectionCode = message.sectionCode);
    message.sectionId !== undefined && (obj.sectionId = message.sectionId);
    message.sentAt !== undefined && (obj.sentAt = message.sentAt);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ListNotificationsReply_Notification>, I>
  >(object: I): ListNotificationsReply_Notification {
    const message = createBaseListNotificationsReply_Notification();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.body = object.body ?? "";
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? ListNotificationsReply_Notification_Sender.fromPartial(object.sender)
        : undefined;
    message.allowReply = object.allowReply ?? false;
    message.read = object.read ?? false;
    message.courseCode = object.courseCode ?? "";
    message.sectionCode = object.sectionCode ?? "";
    message.sectionId = object.sectionId ?? "";
    message.sentAt = object.sentAt ?? "";
    return message;
  },
};

function createBaseListNotificationsReply_Notification_Sender(): ListNotificationsReply_Notification_Sender {
  return { id: "", sub: "", name: "" };
}

export const ListNotificationsReply_Notification_Sender = {
  encode(
    message: ListNotificationsReply_Notification_Sender,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.sub !== "") {
      writer.uint32(18).string(message.sub);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListNotificationsReply_Notification_Sender {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNotificationsReply_Notification_Sender();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.sub = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListNotificationsReply_Notification_Sender {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: ListNotificationsReply_Notification_Sender): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.sub !== undefined && (obj.sub = message.sub);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ListNotificationsReply_Notification_Sender>, I>
  >(object: I): ListNotificationsReply_Notification_Sender {
    const message = createBaseListNotificationsReply_Notification_Sender();
    message.id = object.id ?? "";
    message.sub = object.sub ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseEmptyRequest(): EmptyRequest {
  return { sessionKey: "" };
}

export const EmptyRequest = {
  encode(
    message: EmptyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmptyRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
    };
  },

  toJSON(message: EmptyRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmptyRequest>, I>>(
    object: I
  ): EmptyRequest {
    const message = createBaseEmptyRequest();
    message.sessionKey = object.sessionKey ?? "";
    return message;
  },
};

function createBaseListContainerReply(): ListContainerReply {
  return {
    success: false,
    error: undefined,
    containerInfo: undefined,
    containers: [],
    tempContainers: [],
  };
}

export const ListContainerReply = {
  encode(
    message: ListContainerReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    if (message.containerInfo !== undefined) {
      ListContainerReply_ContainersInfo.encode(
        message.containerInfo,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.containers) {
      ListContainerReply_Container.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.tempContainers) {
      ListContainerReply_Container.encode(
        v!,
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListContainerReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListContainerReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 2:
          message.containerInfo = ListContainerReply_ContainersInfo.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.containers.push(
            ListContainerReply_Container.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.tempContainers.push(
            ListContainerReply_Container.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListContainerReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      containerInfo: isSet(object.containerInfo)
        ? ListContainerReply_ContainersInfo.fromJSON(object.containerInfo)
        : undefined,
      containers: Array.isArray(object?.containers)
        ? object.containers.map((e: any) =>
            ListContainerReply_Container.fromJSON(e)
          )
        : [],
      tempContainers: Array.isArray(object?.tempContainers)
        ? object.tempContainers.map((e: any) =>
            ListContainerReply_Container.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ListContainerReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.containerInfo !== undefined &&
      (obj.containerInfo = message.containerInfo
        ? ListContainerReply_ContainersInfo.toJSON(message.containerInfo)
        : undefined);
    if (message.containers) {
      obj.containers = message.containers.map((e) =>
        e ? ListContainerReply_Container.toJSON(e) : undefined
      );
    } else {
      obj.containers = [];
    }
    if (message.tempContainers) {
      obj.tempContainers = message.tempContainers.map((e) =>
        e ? ListContainerReply_Container.toJSON(e) : undefined
      );
    } else {
      obj.tempContainers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListContainerReply>, I>>(
    object: I
  ): ListContainerReply {
    const message = createBaseListContainerReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.containerInfo =
      object.containerInfo !== undefined && object.containerInfo !== null
        ? ListContainerReply_ContainersInfo.fromPartial(object.containerInfo)
        : undefined;
    message.containers =
      object.containers?.map((e) =>
        ListContainerReply_Container.fromPartial(e)
      ) || [];
    message.tempContainers =
      object.tempContainers?.map((e) =>
        ListContainerReply_Container.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseListContainerReply_ContainersInfo(): ListContainerReply_ContainersInfo {
  return { containersAlive: 0, containersTotal: 0 };
}

export const ListContainerReply_ContainersInfo = {
  encode(
    message: ListContainerReply_ContainersInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.containersAlive !== 0) {
      writer.uint32(8).int64(message.containersAlive);
    }
    if (message.containersTotal !== 0) {
      writer.uint32(16).int64(message.containersTotal);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListContainerReply_ContainersInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListContainerReply_ContainersInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.containersAlive = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.containersTotal = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListContainerReply_ContainersInfo {
    return {
      containersAlive: isSet(object.containersAlive)
        ? Number(object.containersAlive)
        : 0,
      containersTotal: isSet(object.containersTotal)
        ? Number(object.containersTotal)
        : 0,
    };
  },

  toJSON(message: ListContainerReply_ContainersInfo): unknown {
    const obj: any = {};
    message.containersAlive !== undefined &&
      (obj.containersAlive = Math.round(message.containersAlive));
    message.containersTotal !== undefined &&
      (obj.containersTotal = Math.round(message.containersTotal));
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ListContainerReply_ContainersInfo>, I>
  >(object: I): ListContainerReply_ContainersInfo {
    const message = createBaseListContainerReply_ContainersInfo();
    message.containersAlive = object.containersAlive ?? 0;
    message.containersTotal = object.containersTotal ?? 0;
    return message;
  },
};

function createBaseListContainerReply_Container(): ListContainerReply_Container {
  return {
    courseTitle: "",
    assignmentName: "",
    existedTime: "",
    containerID: "",
  };
}

export const ListContainerReply_Container = {
  encode(
    message: ListContainerReply_Container,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.courseTitle !== "") {
      writer.uint32(10).string(message.courseTitle);
    }
    if (message.assignmentName !== "") {
      writer.uint32(18).string(message.assignmentName);
    }
    if (message.existedTime !== "") {
      writer.uint32(26).string(message.existedTime);
    }
    if (message.containerID !== "") {
      writer.uint32(34).string(message.containerID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListContainerReply_Container {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListContainerReply_Container();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.courseTitle = reader.string();
          break;
        case 2:
          message.assignmentName = reader.string();
          break;
        case 3:
          message.existedTime = reader.string();
          break;
        case 4:
          message.containerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListContainerReply_Container {
    return {
      courseTitle: isSet(object.courseTitle) ? String(object.courseTitle) : "",
      assignmentName: isSet(object.assignmentName)
        ? String(object.assignmentName)
        : "",
      existedTime: isSet(object.existedTime) ? String(object.existedTime) : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
    };
  },

  toJSON(message: ListContainerReply_Container): unknown {
    const obj: any = {};
    message.courseTitle !== undefined &&
      (obj.courseTitle = message.courseTitle);
    message.assignmentName !== undefined &&
      (obj.assignmentName = message.assignmentName);
    message.existedTime !== undefined &&
      (obj.existedTime = message.existedTime);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListContainerReply_Container>, I>>(
    object: I
  ): ListContainerReply_Container {
    const message = createBaseListContainerReply_Container();
    message.courseTitle = object.courseTitle ?? "";
    message.assignmentName = object.assignmentName ?? "";
    message.existedTime = object.existedTime ?? "";
    message.containerID = object.containerID ?? "";
    return message;
  },
};

function createBaseListCoursesReply(): ListCoursesReply {
  return { success: false, error: undefined, courses: [] };
}

export const ListCoursesReply = {
  encode(
    message: ListCoursesReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.courses) {
      ListCoursesReply_Course.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListCoursesReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCoursesReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.courses.push(
            ListCoursesReply_Course.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCoursesReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      courses: Array.isArray(object?.courses)
        ? object.courses.map((e: any) => ListCoursesReply_Course.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListCoursesReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.courses) {
      obj.courses = message.courses.map((e) =>
        e ? ListCoursesReply_Course.toJSON(e) : undefined
      );
    } else {
      obj.courses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCoursesReply>, I>>(
    object: I
  ): ListCoursesReply {
    const message = createBaseListCoursesReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.courses =
      object.courses?.map((e) => ListCoursesReply_Course.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListCoursesReply_Course(): ListCoursesReply_Course {
  return {
    sectionID: "",
    courseCode: "",
    section: "",
    name: "",
    sectionRole: "",
    lastUpdateTime: "",
  };
}

export const ListCoursesReply_Course = {
  encode(
    message: ListCoursesReply_Course,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sectionID !== "") {
      writer.uint32(10).string(message.sectionID);
    }
    if (message.courseCode !== "") {
      writer.uint32(18).string(message.courseCode);
    }
    if (message.section !== "") {
      writer.uint32(26).string(message.section);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.sectionRole !== "") {
      writer.uint32(42).string(message.sectionRole);
    }
    if (message.lastUpdateTime !== "") {
      writer.uint32(50).string(message.lastUpdateTime);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListCoursesReply_Course {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListCoursesReply_Course();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sectionID = reader.string();
          break;
        case 2:
          message.courseCode = reader.string();
          break;
        case 3:
          message.section = reader.string();
          break;
        case 4:
          message.name = reader.string();
          break;
        case 5:
          message.sectionRole = reader.string();
          break;
        case 6:
          message.lastUpdateTime = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListCoursesReply_Course {
    return {
      sectionID: isSet(object.sectionID) ? String(object.sectionID) : "",
      courseCode: isSet(object.courseCode) ? String(object.courseCode) : "",
      section: isSet(object.section) ? String(object.section) : "",
      name: isSet(object.name) ? String(object.name) : "",
      sectionRole: isSet(object.sectionRole) ? String(object.sectionRole) : "",
      lastUpdateTime: isSet(object.lastUpdateTime)
        ? String(object.lastUpdateTime)
        : "",
    };
  },

  toJSON(message: ListCoursesReply_Course): unknown {
    const obj: any = {};
    message.sectionID !== undefined && (obj.sectionID = message.sectionID);
    message.courseCode !== undefined && (obj.courseCode = message.courseCode);
    message.section !== undefined && (obj.section = message.section);
    message.name !== undefined && (obj.name = message.name);
    message.sectionRole !== undefined &&
      (obj.sectionRole = message.sectionRole);
    message.lastUpdateTime !== undefined &&
      (obj.lastUpdateTime = message.lastUpdateTime);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListCoursesReply_Course>, I>>(
    object: I
  ): ListCoursesReply_Course {
    const message = createBaseListCoursesReply_Course();
    message.sectionID = object.sectionID ?? "";
    message.courseCode = object.courseCode ?? "";
    message.section = object.section ?? "";
    message.name = object.name ?? "";
    message.sectionRole = object.sectionRole ?? "";
    message.lastUpdateTime = object.lastUpdateTime ?? "";
    return message;
  },
};

function createBaseGetSectionInfoReply(): GetSectionInfoReply {
  return {
    success: false,
    error: undefined,
    sectionUserID: "",
    courseName: "",
    role: "",
  };
}

export const GetSectionInfoReply = {
  encode(
    message: GetSectionInfoReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.sectionUserID !== "") {
      writer.uint32(26).string(message.sectionUserID);
    }
    if (message.courseName !== "") {
      writer.uint32(34).string(message.courseName);
    }
    if (message.role !== "") {
      writer.uint32(42).string(message.role);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSectionInfoReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSectionInfoReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.sectionUserID = reader.string();
          break;
        case 4:
          message.courseName = reader.string();
          break;
        case 5:
          message.role = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSectionInfoReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      sectionUserID: isSet(object.sectionUserID)
        ? String(object.sectionUserID)
        : "",
      courseName: isSet(object.courseName) ? String(object.courseName) : "",
      role: isSet(object.role) ? String(object.role) : "",
    };
  },

  toJSON(message: GetSectionInfoReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.sectionUserID !== undefined &&
      (obj.sectionUserID = message.sectionUserID);
    message.courseName !== undefined && (obj.courseName = message.courseName);
    message.role !== undefined && (obj.role = message.role);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSectionInfoReply>, I>>(
    object: I
  ): GetSectionInfoReply {
    const message = createBaseGetSectionInfoReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.sectionUserID = object.sectionUserID ?? "";
    message.courseName = object.courseName ?? "";
    message.role = object.role ?? "";
    return message;
  },
};

function createBaseListEnvironmentsReply(): ListEnvironmentsReply {
  return { success: false, error: undefined, environments: [] };
}

export const ListEnvironmentsReply = {
  encode(
    message: ListEnvironmentsReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.environments) {
      ListEnvironmentsReply_Environment.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListEnvironmentsReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListEnvironmentsReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.environments.push(
            ListEnvironmentsReply_Environment.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListEnvironmentsReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      environments: Array.isArray(object?.environments)
        ? object.environments.map((e: any) =>
            ListEnvironmentsReply_Environment.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ListEnvironmentsReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.environments) {
      obj.environments = message.environments.map((e) =>
        e ? ListEnvironmentsReply_Environment.toJSON(e) : undefined
      );
    } else {
      obj.environments = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListEnvironmentsReply>, I>>(
    object: I
  ): ListEnvironmentsReply {
    const message = createBaseListEnvironmentsReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.environments =
      object.environments?.map((e) =>
        ListEnvironmentsReply_Environment.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseListEnvironmentsReply_Environment(): ListEnvironmentsReply_Environment {
  return {
    id: "",
    imageId: "",
    environmentName: "",
    libraries: "",
    description: "",
  };
}

export const ListEnvironmentsReply_Environment = {
  encode(
    message: ListEnvironmentsReply_Environment,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.imageId !== "") {
      writer.uint32(18).string(message.imageId);
    }
    if (message.environmentName !== "") {
      writer.uint32(26).string(message.environmentName);
    }
    if (message.libraries !== "") {
      writer.uint32(42).string(message.libraries);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListEnvironmentsReply_Environment {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListEnvironmentsReply_Environment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.imageId = reader.string();
          break;
        case 3:
          message.environmentName = reader.string();
          break;
        case 5:
          message.libraries = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListEnvironmentsReply_Environment {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
      environmentName: isSet(object.environmentName)
        ? String(object.environmentName)
        : "",
      libraries: isSet(object.libraries) ? String(object.libraries) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: ListEnvironmentsReply_Environment): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.imageId !== undefined && (obj.imageId = message.imageId);
    message.environmentName !== undefined &&
      (obj.environmentName = message.environmentName);
    message.libraries !== undefined && (obj.libraries = message.libraries);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ListEnvironmentsReply_Environment>, I>
  >(object: I): ListEnvironmentsReply_Environment {
    const message = createBaseListEnvironmentsReply_Environment();
    message.id = object.id ?? "";
    message.imageId = object.imageId ?? "";
    message.environmentName = object.environmentName ?? "";
    message.libraries = object.libraries ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseListTemplatesReply(): ListTemplatesReply {
  return { success: false, error: undefined, templates: [] };
}

export const ListTemplatesReply = {
  encode(
    message: ListTemplatesReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.templates) {
      ListTemplatesReply_Template.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListTemplatesReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTemplatesReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.templates.push(
            ListTemplatesReply_Template.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListTemplatesReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      templates: Array.isArray(object?.templates)
        ? object.templates.map((e: any) =>
            ListTemplatesReply_Template.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ListTemplatesReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.templates) {
      obj.templates = message.templates.map((e) =>
        e ? ListTemplatesReply_Template.toJSON(e) : undefined
      );
    } else {
      obj.templates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTemplatesReply>, I>>(
    object: I
  ): ListTemplatesReply {
    const message = createBaseListTemplatesReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.templates =
      object.templates?.map((e) =>
        ListTemplatesReply_Template.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseListTemplatesReply_Template(): ListTemplatesReply_Template {
  return {
    id: "",
    name: "",
    description: "",
    environmentId: "",
    imageId: "",
    assignmentConfigId: "",
    storage: "",
    active: false,
    isExam: false,
    timeLimit: 0,
    allowNotification: false,
    ContainerId: [],
  };
}

export const ListTemplatesReply_Template = {
  encode(
    message: ListTemplatesReply_Template,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.environmentId !== "") {
      writer.uint32(98).string(message.environmentId);
    }
    if (message.imageId !== "") {
      writer.uint32(26).string(message.imageId);
    }
    if (message.assignmentConfigId !== "") {
      writer.uint32(34).string(message.assignmentConfigId);
    }
    if (message.storage !== "") {
      writer.uint32(42).string(message.storage);
    }
    if (message.active === true) {
      writer.uint32(64).bool(message.active);
    }
    if (message.isExam === true) {
      writer.uint32(80).bool(message.isExam);
    }
    if (message.timeLimit !== 0) {
      writer.uint32(72).int64(message.timeLimit);
    }
    if (message.allowNotification === true) {
      writer.uint32(88).bool(message.allowNotification);
    }
    for (const v of message.ContainerId) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListTemplatesReply_Template {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListTemplatesReply_Template();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 12:
          message.environmentId = reader.string();
          break;
        case 3:
          message.imageId = reader.string();
          break;
        case 4:
          message.assignmentConfigId = reader.string();
          break;
        case 5:
          message.storage = reader.string();
          break;
        case 8:
          message.active = reader.bool();
          break;
        case 10:
          message.isExam = reader.bool();
          break;
        case 9:
          message.timeLimit = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.allowNotification = reader.bool();
          break;
        case 6:
          message.ContainerId.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListTemplatesReply_Template {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      environmentId: isSet(object.environmentId)
        ? String(object.environmentId)
        : "",
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
      assignmentConfigId: isSet(object.assignmentConfigId)
        ? String(object.assignmentConfigId)
        : "",
      storage: isSet(object.storage) ? String(object.storage) : "",
      active: isSet(object.active) ? Boolean(object.active) : false,
      isExam: isSet(object.isExam) ? Boolean(object.isExam) : false,
      timeLimit: isSet(object.timeLimit) ? Number(object.timeLimit) : 0,
      allowNotification: isSet(object.allowNotification)
        ? Boolean(object.allowNotification)
        : false,
      ContainerId: Array.isArray(object?.ContainerId)
        ? object.ContainerId.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListTemplatesReply_Template): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.environmentId !== undefined &&
      (obj.environmentId = message.environmentId);
    message.imageId !== undefined && (obj.imageId = message.imageId);
    message.assignmentConfigId !== undefined &&
      (obj.assignmentConfigId = message.assignmentConfigId);
    message.storage !== undefined && (obj.storage = message.storage);
    message.active !== undefined && (obj.active = message.active);
    message.isExam !== undefined && (obj.isExam = message.isExam);
    message.timeLimit !== undefined &&
      (obj.timeLimit = Math.round(message.timeLimit));
    message.allowNotification !== undefined &&
      (obj.allowNotification = message.allowNotification);
    if (message.ContainerId) {
      obj.ContainerId = message.ContainerId.map((e) => e);
    } else {
      obj.ContainerId = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListTemplatesReply_Template>, I>>(
    object: I
  ): ListTemplatesReply_Template {
    const message = createBaseListTemplatesReply_Template();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.environmentId = object.environmentId ?? "";
    message.imageId = object.imageId ?? "";
    message.assignmentConfigId = object.assignmentConfigId ?? "";
    message.storage = object.storage ?? "";
    message.active = object.active ?? false;
    message.isExam = object.isExam ?? false;
    message.timeLimit = object.timeLimit ?? 0;
    message.allowNotification = object.allowNotification ?? false;
    message.ContainerId = object.ContainerId?.map((e) => e) || [];
    return message;
  },
};

function createBaseAddContainerRequest(): AddContainerRequest {
  return {
    sessionKey: "",
    imageName: "",
    environmentId: "",
    memLimit: 0,
    numCPU: 0,
    sectionUserId: "",
    templateId: "",
    accessRight: "",
    useFresh: false,
  };
}

export const AddContainerRequest = {
  encode(
    message: AddContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.imageName !== "") {
      writer.uint32(10).string(message.imageName);
    }
    if (message.environmentId !== "") {
      writer.uint32(98).string(message.environmentId);
    }
    if (message.memLimit !== 0) {
      writer.uint32(21).float(message.memLimit);
    }
    if (message.numCPU !== 0) {
      writer.uint32(29).float(message.numCPU);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    if (message.templateId !== "") {
      writer.uint32(42).string(message.templateId);
    }
    if (message.accessRight !== "") {
      writer.uint32(58).string(message.accessRight);
    }
    if (message.useFresh === true) {
      writer.uint32(64).bool(message.useFresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.imageName = reader.string();
          break;
        case 12:
          message.environmentId = reader.string();
          break;
        case 2:
          message.memLimit = reader.float();
          break;
        case 3:
          message.numCPU = reader.float();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        case 5:
          message.templateId = reader.string();
          break;
        case 7:
          message.accessRight = reader.string();
          break;
        case 8:
          message.useFresh = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddContainerRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      imageName: isSet(object.imageName) ? String(object.imageName) : "",
      environmentId: isSet(object.environmentId)
        ? String(object.environmentId)
        : "",
      memLimit: isSet(object.memLimit) ? Number(object.memLimit) : 0,
      numCPU: isSet(object.numCPU) ? Number(object.numCPU) : 0,
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
      accessRight: isSet(object.accessRight) ? String(object.accessRight) : "",
      useFresh: isSet(object.useFresh) ? Boolean(object.useFresh) : false,
    };
  },

  toJSON(message: AddContainerRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.imageName !== undefined && (obj.imageName = message.imageName);
    message.environmentId !== undefined &&
      (obj.environmentId = message.environmentId);
    message.memLimit !== undefined && (obj.memLimit = message.memLimit);
    message.numCPU !== undefined && (obj.numCPU = message.numCPU);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.templateId !== undefined && (obj.templateId = message.templateId);
    message.accessRight !== undefined &&
      (obj.accessRight = message.accessRight);
    message.useFresh !== undefined && (obj.useFresh = message.useFresh);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddContainerRequest>, I>>(
    object: I
  ): AddContainerRequest {
    const message = createBaseAddContainerRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.imageName = object.imageName ?? "";
    message.environmentId = object.environmentId ?? "";
    message.memLimit = object.memLimit ?? 0;
    message.numCPU = object.numCPU ?? 0;
    message.sectionUserId = object.sectionUserId ?? "";
    message.templateId = object.templateId ?? "";
    message.accessRight = object.accessRight ?? "";
    message.useFresh = object.useFresh ?? false;
    return message;
  },
};

function createBaseInstantAddContainerRequest(): InstantAddContainerRequest {
  return { sessionKey: "", sub: "", templateId: "" };
}

export const InstantAddContainerRequest = {
  encode(
    message: InstantAddContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    if (message.templateId !== "") {
      writer.uint32(18).string(message.templateId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InstantAddContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantAddContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        case 2:
          message.templateId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstantAddContainerRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      templateId: isSet(object.templateId) ? String(object.templateId) : "",
    };
  },

  toJSON(message: InstantAddContainerRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.templateId !== undefined && (obj.templateId = message.templateId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstantAddContainerRequest>, I>>(
    object: I
  ): InstantAddContainerRequest {
    const message = createBaseInstantAddContainerRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.templateId = object.templateId ?? "";
    return message;
  },
};

function createBaseAddContainerReply(): AddContainerReply {
  return { success: false, error: undefined, containerID: "" };
}

export const AddContainerReply = {
  encode(
    message: AddContainerReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.containerID !== "") {
      writer.uint32(26).string(message.containerID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddContainerReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddContainerReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.containerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddContainerReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
    };
  },

  toJSON(message: AddContainerReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddContainerReply>, I>>(
    object: I
  ): AddContainerReply {
    const message = createBaseAddContainerReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.containerID = object.containerID ?? "";
    return message;
  },
};

function createBaseRemoveContainerRequest(): RemoveContainerRequest {
  return { sessionKey: "", containerID: "", sub: "" };
}

export const RemoveContainerRequest = {
  encode(
    message: RemoveContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.containerID !== "") {
      writer.uint32(10).string(message.containerID);
    }
    if (message.sub !== "") {
      writer.uint32(18).string(message.sub);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoveContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.containerID = reader.string();
          break;
        case 2:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveContainerRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: RemoveContainerRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveContainerRequest>, I>>(
    object: I
  ): RemoveContainerRequest {
    const message = createBaseRemoveContainerRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.containerID = object.containerID ?? "";
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseSubmitFilesRequest(): SubmitFilesRequest {
  return { sessionKey: "", containerID: "", sectionUserId: "" };
}

export const SubmitFilesRequest = {
  encode(
    message: SubmitFilesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.containerID !== "") {
      writer.uint32(18).string(message.containerID);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubmitFilesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubmitFilesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.containerID = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubmitFilesRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
    };
  },

  toJSON(message: SubmitFilesRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubmitFilesRequest>, I>>(
    object: I
  ): SubmitFilesRequest {
    const message = createBaseSubmitFilesRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.containerID = object.containerID ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    return message;
  },
};

function createBaseContainerTimeReply(): ContainerTimeReply {
  return {
    success: false,
    error: undefined,
    isExam: false,
    timeLimit: "",
    createdAt: "",
  };
}

export const ContainerTimeReply = {
  encode(
    message: ContainerTimeReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.isExam === true) {
      writer.uint32(24).bool(message.isExam);
    }
    if (message.timeLimit !== "") {
      writer.uint32(34).string(message.timeLimit);
    }
    if (message.createdAt !== "") {
      writer.uint32(42).string(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContainerTimeReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContainerTimeReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.isExam = reader.bool();
          break;
        case 4:
          message.timeLimit = reader.string();
          break;
        case 5:
          message.createdAt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContainerTimeReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      isExam: isSet(object.isExam) ? Boolean(object.isExam) : false,
      timeLimit: isSet(object.timeLimit) ? String(object.timeLimit) : "",
      createdAt: isSet(object.createdAt) ? String(object.createdAt) : "",
    };
  },

  toJSON(message: ContainerTimeReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.isExam !== undefined && (obj.isExam = message.isExam);
    message.timeLimit !== undefined && (obj.timeLimit = message.timeLimit);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContainerTimeReply>, I>>(
    object: I
  ): ContainerTimeReply {
    const message = createBaseContainerTimeReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.isExam = object.isExam ?? false;
    message.timeLimit = object.timeLimit ?? "";
    message.createdAt = object.createdAt ?? "";
    return message;
  },
};

function createBaseAddTemplateRequest(): AddTemplateRequest {
  return {
    sessionKey: "",
    name: "",
    description: "",
    environmentId: "",
    containerID: "",
    assignmentConfigId: "",
    sectionUserId: "",
    active: false,
    isExam: false,
    timeLimit: 0,
    allowNotification: false,
  };
}

export const AddTemplateRequest = {
  encode(
    message: AddTemplateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.environmentId !== "") {
      writer.uint32(98).string(message.environmentId);
    }
    if (message.containerID !== "") {
      writer.uint32(42).string(message.containerID);
    }
    if (message.assignmentConfigId !== "") {
      writer.uint32(26).string(message.assignmentConfigId);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    if (message.active === true) {
      writer.uint32(56).bool(message.active);
    }
    if (message.isExam === true) {
      writer.uint32(64).bool(message.isExam);
    }
    if (message.timeLimit !== 0) {
      writer.uint32(72).int64(message.timeLimit);
    }
    if (message.allowNotification === true) {
      writer.uint32(80).bool(message.allowNotification);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddTemplateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 12:
          message.environmentId = reader.string();
          break;
        case 5:
          message.containerID = reader.string();
          break;
        case 3:
          message.assignmentConfigId = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        case 7:
          message.active = reader.bool();
          break;
        case 8:
          message.isExam = reader.bool();
          break;
        case 9:
          message.timeLimit = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.allowNotification = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddTemplateRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      environmentId: isSet(object.environmentId)
        ? String(object.environmentId)
        : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
      assignmentConfigId: isSet(object.assignmentConfigId)
        ? String(object.assignmentConfigId)
        : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      active: isSet(object.active) ? Boolean(object.active) : false,
      isExam: isSet(object.isExam) ? Boolean(object.isExam) : false,
      timeLimit: isSet(object.timeLimit) ? Number(object.timeLimit) : 0,
      allowNotification: isSet(object.allowNotification)
        ? Boolean(object.allowNotification)
        : false,
    };
  },

  toJSON(message: AddTemplateRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.environmentId !== undefined &&
      (obj.environmentId = message.environmentId);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    message.assignmentConfigId !== undefined &&
      (obj.assignmentConfigId = message.assignmentConfigId);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.active !== undefined && (obj.active = message.active);
    message.isExam !== undefined && (obj.isExam = message.isExam);
    message.timeLimit !== undefined &&
      (obj.timeLimit = Math.round(message.timeLimit));
    message.allowNotification !== undefined &&
      (obj.allowNotification = message.allowNotification);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddTemplateRequest>, I>>(
    object: I
  ): AddTemplateRequest {
    const message = createBaseAddTemplateRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.environmentId = object.environmentId ?? "";
    message.containerID = object.containerID ?? "";
    message.assignmentConfigId = object.assignmentConfigId ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    message.active = object.active ?? false;
    message.isExam = object.isExam ?? false;
    message.timeLimit = object.timeLimit ?? 0;
    message.allowNotification = object.allowNotification ?? false;
    return message;
  },
};

function createBaseUpdateTemplateRequest(): UpdateTemplateRequest {
  return {
    sessionKey: "",
    templateID: "",
    name: "",
    description: "",
    containerID: "",
    assignmentConfigId: "",
    sectionUserId: "",
    active: false,
    isExam: false,
    timeLimit: 0,
    allowNotification: false,
  };
}

export const UpdateTemplateRequest = {
  encode(
    message: UpdateTemplateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.templateID !== "") {
      writer.uint32(10).string(message.templateID);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(50).string(message.description);
    }
    if (message.containerID !== "") {
      writer.uint32(42).string(message.containerID);
    }
    if (message.assignmentConfigId !== "") {
      writer.uint32(26).string(message.assignmentConfigId);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    if (message.active === true) {
      writer.uint32(56).bool(message.active);
    }
    if (message.isExam === true) {
      writer.uint32(64).bool(message.isExam);
    }
    if (message.timeLimit !== 0) {
      writer.uint32(72).int64(message.timeLimit);
    }
    if (message.allowNotification === true) {
      writer.uint32(80).bool(message.allowNotification);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateTemplateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTemplateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.templateID = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 5:
          message.containerID = reader.string();
          break;
        case 3:
          message.assignmentConfigId = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        case 7:
          message.active = reader.bool();
          break;
        case 8:
          message.isExam = reader.bool();
          break;
        case 9:
          message.timeLimit = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.allowNotification = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateTemplateRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      templateID: isSet(object.templateID) ? String(object.templateID) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
      assignmentConfigId: isSet(object.assignmentConfigId)
        ? String(object.assignmentConfigId)
        : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      active: isSet(object.active) ? Boolean(object.active) : false,
      isExam: isSet(object.isExam) ? Boolean(object.isExam) : false,
      timeLimit: isSet(object.timeLimit) ? Number(object.timeLimit) : 0,
      allowNotification: isSet(object.allowNotification)
        ? Boolean(object.allowNotification)
        : false,
    };
  },

  toJSON(message: UpdateTemplateRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.templateID !== undefined && (obj.templateID = message.templateID);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    message.assignmentConfigId !== undefined &&
      (obj.assignmentConfigId = message.assignmentConfigId);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.active !== undefined && (obj.active = message.active);
    message.isExam !== undefined && (obj.isExam = message.isExam);
    message.timeLimit !== undefined &&
      (obj.timeLimit = Math.round(message.timeLimit));
    message.allowNotification !== undefined &&
      (obj.allowNotification = message.allowNotification);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateTemplateRequest>, I>>(
    object: I
  ): UpdateTemplateRequest {
    const message = createBaseUpdateTemplateRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.templateID = object.templateID ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.containerID = object.containerID ?? "";
    message.assignmentConfigId = object.assignmentConfigId ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    message.active = object.active ?? false;
    message.isExam = object.isExam ?? false;
    message.timeLimit = object.timeLimit ?? 0;
    message.allowNotification = object.allowNotification ?? false;
    return message;
  },
};

function createBaseTemplateIdRequest(): TemplateIdRequest {
  return { sessionKey: "", templateID: "", sectionUserId: "" };
}

export const TemplateIdRequest = {
  encode(
    message: TemplateIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.templateID !== "") {
      writer.uint32(10).string(message.templateID);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TemplateIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplateIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.templateID = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TemplateIdRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      templateID: isSet(object.templateID) ? String(object.templateID) : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
    };
  },

  toJSON(message: TemplateIdRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.templateID !== undefined && (obj.templateID = message.templateID);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TemplateIdRequest>, I>>(
    object: I
  ): TemplateIdRequest {
    const message = createBaseTemplateIdRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.templateID = object.templateID ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    return message;
  },
};

function createBaseAddTemplateReply(): AddTemplateReply {
  return { success: false, error: undefined, templateID: "" };
}

export const AddTemplateReply = {
  encode(
    message: AddTemplateReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.templateID !== "") {
      writer.uint32(26).string(message.templateID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddTemplateReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddTemplateReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.templateID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddTemplateReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      templateID: isSet(object.templateID) ? String(object.templateID) : "",
    };
  },

  toJSON(message: AddTemplateReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.templateID !== undefined && (obj.templateID = message.templateID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddTemplateReply>, I>>(
    object: I
  ): AddTemplateReply {
    const message = createBaseAddTemplateReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.templateID = object.templateID ?? "";
    return message;
  },
};

function createBaseTemplateGetStudentWorkspaceReply(): TemplateGetStudentWorkspaceReply {
  return { success: false, error: undefined, StudentWorkspaces: [] };
}

export const TemplateGetStudentWorkspaceReply = {
  encode(
    message: TemplateGetStudentWorkspaceReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.StudentWorkspaces) {
      TemplateGetStudentWorkspaceReply_StudentWorkspace.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TemplateGetStudentWorkspaceReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTemplateGetStudentWorkspaceReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.StudentWorkspaces.push(
            TemplateGetStudentWorkspaceReply_StudentWorkspace.decode(
              reader,
              reader.uint32()
            )
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TemplateGetStudentWorkspaceReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      StudentWorkspaces: Array.isArray(object?.StudentWorkspaces)
        ? object.StudentWorkspaces.map((e: any) =>
            TemplateGetStudentWorkspaceReply_StudentWorkspace.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: TemplateGetStudentWorkspaceReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.StudentWorkspaces) {
      obj.StudentWorkspaces = message.StudentWorkspaces.map((e) =>
        e
          ? TemplateGetStudentWorkspaceReply_StudentWorkspace.toJSON(e)
          : undefined
      );
    } else {
      obj.StudentWorkspaces = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<TemplateGetStudentWorkspaceReply>, I>
  >(object: I): TemplateGetStudentWorkspaceReply {
    const message = createBaseTemplateGetStudentWorkspaceReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.StudentWorkspaces =
      object.StudentWorkspaces?.map((e) =>
        TemplateGetStudentWorkspaceReply_StudentWorkspace.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace(): TemplateGetStudentWorkspaceReply_StudentWorkspace {
  return { status: "", workspaceId: "", student: undefined };
}

export const TemplateGetStudentWorkspaceReply_StudentWorkspace = {
  encode(
    message: TemplateGetStudentWorkspaceReply_StudentWorkspace,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.workspaceId !== "") {
      writer.uint32(18).string(message.workspaceId);
    }
    if (message.student !== undefined) {
      TemplateGetStudentWorkspaceReply_StudentWorkspace_Student.encode(
        message.student,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TemplateGetStudentWorkspaceReply_StudentWorkspace {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        case 2:
          message.workspaceId = reader.string();
          break;
        case 3:
          message.student =
            TemplateGetStudentWorkspaceReply_StudentWorkspace_Student.decode(
              reader,
              reader.uint32()
            );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TemplateGetStudentWorkspaceReply_StudentWorkspace {
    return {
      status: isSet(object.status) ? String(object.status) : "",
      workspaceId: isSet(object.workspaceId) ? String(object.workspaceId) : "",
      student: isSet(object.student)
        ? TemplateGetStudentWorkspaceReply_StudentWorkspace_Student.fromJSON(
            object.student
          )
        : undefined,
    };
  },

  toJSON(message: TemplateGetStudentWorkspaceReply_StudentWorkspace): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.workspaceId !== undefined &&
      (obj.workspaceId = message.workspaceId);
    message.student !== undefined &&
      (obj.student = message.student
        ? TemplateGetStudentWorkspaceReply_StudentWorkspace_Student.toJSON(
            message.student
          )
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<TemplateGetStudentWorkspaceReply_StudentWorkspace>,
      I
    >
  >(object: I): TemplateGetStudentWorkspaceReply_StudentWorkspace {
    const message =
      createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace();
    message.status = object.status ?? "";
    message.workspaceId = object.workspaceId ?? "";
    message.student =
      object.student !== undefined && object.student !== null
        ? TemplateGetStudentWorkspaceReply_StudentWorkspace_Student.fromPartial(
            object.student
          )
        : undefined;
    return message;
  },
};

function createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace_Student(): TemplateGetStudentWorkspaceReply_StudentWorkspace_Student {
  return { name: "", sub: "", userId: "" };
}

export const TemplateGetStudentWorkspaceReply_StudentWorkspace_Student = {
  encode(
    message: TemplateGetStudentWorkspaceReply_StudentWorkspace_Student,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.sub !== "") {
      writer.uint32(18).string(message.sub);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TemplateGetStudentWorkspaceReply_StudentWorkspace_Student {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace_Student();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.sub = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(
    object: any
  ): TemplateGetStudentWorkspaceReply_StudentWorkspace_Student {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(
    message: TemplateGetStudentWorkspaceReply_StudentWorkspace_Student
  ): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.sub !== undefined && (obj.sub = message.sub);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<
    I extends Exact<
      DeepPartial<TemplateGetStudentWorkspaceReply_StudentWorkspace_Student>,
      I
    >
  >(object: I): TemplateGetStudentWorkspaceReply_StudentWorkspace_Student {
    const message =
      createBaseTemplateGetStudentWorkspaceReply_StudentWorkspace_Student();
    message.name = object.name ?? "";
    message.sub = object.sub ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseAddEnvironmentRequest(): AddEnvironmentRequest {
  return {
    sessionKey: "",
    libraries: [],
    sectionUserId: "",
    name: "",
    description: "",
  };
}

export const AddEnvironmentRequest = {
  encode(
    message: AddEnvironmentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    for (const v of message.libraries) {
      writer.uint32(10).string(v!);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(18).string(message.sectionUserId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddEnvironmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddEnvironmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.libraries.push(reader.string());
          break;
        case 2:
          message.sectionUserId = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddEnvironmentRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      libraries: Array.isArray(object?.libraries)
        ? object.libraries.map((e: any) => String(e))
        : [],
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: AddEnvironmentRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    if (message.libraries) {
      obj.libraries = message.libraries.map((e) => e);
    } else {
      obj.libraries = [];
    }
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddEnvironmentRequest>, I>>(
    object: I
  ): AddEnvironmentRequest {
    const message = createBaseAddEnvironmentRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.libraries = object.libraries?.map((e) => e) || [];
    message.sectionUserId = object.sectionUserId ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseAddEnvironmentReply(): AddEnvironmentReply {
  return { success: false, error: undefined, environmentID: "" };
}

export const AddEnvironmentReply = {
  encode(
    message: AddEnvironmentReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.environmentID !== "") {
      writer.uint32(26).string(message.environmentID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddEnvironmentReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddEnvironmentReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.environmentID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddEnvironmentReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      environmentID: isSet(object.environmentID)
        ? String(object.environmentID)
        : "",
    };
  },

  toJSON(message: AddEnvironmentReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.environmentID !== undefined &&
      (obj.environmentID = message.environmentID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddEnvironmentReply>, I>>(
    object: I
  ): AddEnvironmentReply {
    const message = createBaseAddEnvironmentReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.environmentID = object.environmentID ?? "";
    return message;
  },
};

function createBaseBuildEnvironmentRequest(): BuildEnvironmentRequest {
  return {
    sessionKey: "",
    name: "",
    description: "",
    sectionUserId: "",
    containerID: "",
  };
}

export const BuildEnvironmentRequest = {
  encode(
    message: BuildEnvironmentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    if (message.containerID !== "") {
      writer.uint32(42).string(message.containerID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): BuildEnvironmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildEnvironmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 1:
          message.description = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        case 5:
          message.containerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BuildEnvironmentRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
    };
  },

  toJSON(message: BuildEnvironmentRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BuildEnvironmentRequest>, I>>(
    object: I
  ): BuildEnvironmentRequest {
    const message = createBaseBuildEnvironmentRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    message.containerID = object.containerID ?? "";
    return message;
  },
};

function createBaseUpdateEnvironmentRequest(): UpdateEnvironmentRequest {
  return {
    sessionKey: "",
    environmentID: "",
    name: "",
    description: "",
    sectionUserId: "",
    containerID: "",
  };
}

export const UpdateEnvironmentRequest = {
  encode(
    message: UpdateEnvironmentRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.environmentID !== "") {
      writer.uint32(10).string(message.environmentID);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    if (message.containerID !== "") {
      writer.uint32(42).string(message.containerID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateEnvironmentRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateEnvironmentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.environmentID = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        case 5:
          message.containerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateEnvironmentRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      environmentID: isSet(object.environmentID)
        ? String(object.environmentID)
        : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
    };
  },

  toJSON(message: UpdateEnvironmentRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.environmentID !== undefined &&
      (obj.environmentID = message.environmentID);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined &&
      (obj.description = message.description);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateEnvironmentRequest>, I>>(
    object: I
  ): UpdateEnvironmentRequest {
    const message = createBaseUpdateEnvironmentRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.environmentID = object.environmentID ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    message.containerID = object.containerID ?? "";
    return message;
  },
};

function createBaseEnvironmentIdRequest(): EnvironmentIdRequest {
  return { sessionKey: "", environmentID: "", sectionUserId: "" };
}

export const EnvironmentIdRequest = {
  encode(
    message: EnvironmentIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.environmentID !== "") {
      writer.uint32(10).string(message.environmentID);
    }
    if (message.sectionUserId !== "") {
      writer.uint32(34).string(message.sectionUserId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EnvironmentIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnvironmentIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.environmentID = reader.string();
          break;
        case 4:
          message.sectionUserId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EnvironmentIdRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      environmentID: isSet(object.environmentID)
        ? String(object.environmentID)
        : "",
      sectionUserId: isSet(object.sectionUserId)
        ? String(object.sectionUserId)
        : "",
    };
  },

  toJSON(message: EnvironmentIdRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.environmentID !== undefined &&
      (obj.environmentID = message.environmentID);
    message.sectionUserId !== undefined &&
      (obj.sectionUserId = message.sectionUserId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EnvironmentIdRequest>, I>>(
    object: I
  ): EnvironmentIdRequest {
    const message = createBaseEnvironmentIdRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.environmentID = object.environmentID ?? "";
    message.sectionUserId = object.sectionUserId ?? "";
    return message;
  },
};

function createBaseSectionAndSubRequest(): SectionAndSubRequest {
  return { sessionKey: "", sectionID: "", sub: "" };
}

export const SectionAndSubRequest = {
  encode(
    message: SectionAndSubRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sectionID !== "") {
      writer.uint32(10).string(message.sectionID);
    }
    if (message.sub !== "") {
      writer.uint32(18).string(message.sub);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SectionAndSubRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSectionAndSubRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sectionID = reader.string();
          break;
        case 2:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SectionAndSubRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sectionID: isSet(object.sectionID) ? String(object.sectionID) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: SectionAndSubRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sectionID !== undefined && (obj.sectionID = message.sectionID);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SectionAndSubRequest>, I>>(
    object: I
  ): SectionAndSubRequest {
    const message = createBaseSectionAndSubRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sectionID = object.sectionID ?? "";
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseCheckHaveContainerRequest(): CheckHaveContainerRequest {
  return { sessionKey: "", sub: "", containerID: "" };
}

export const CheckHaveContainerRequest = {
  encode(
    message: CheckHaveContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    if (message.containerID !== "") {
      writer.uint32(26).string(message.containerID);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CheckHaveContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckHaveContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        case 3:
          message.containerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CheckHaveContainerRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      containerID: isSet(object.containerID) ? String(object.containerID) : "",
    };
  },

  toJSON(message: CheckHaveContainerRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.containerID !== undefined &&
      (obj.containerID = message.containerID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CheckHaveContainerRequest>, I>>(
    object: I
  ): CheckHaveContainerRequest {
    const message = createBaseCheckHaveContainerRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.containerID = object.containerID ?? "";
    return message;
  },
};

function createBaseSubRequest(): SubRequest {
  return { sessionKey: "", sub: "" };
}

export const SubRequest = {
  encode(
    message: SubRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: SubRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubRequest>, I>>(
    object: I
  ): SubRequest {
    const message = createBaseSubRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseSectionRequest(): SectionRequest {
  return { sessionKey: "", sectionID: "" };
}

export const SectionRequest = {
  encode(
    message: SectionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sectionID !== "") {
      writer.uint32(10).string(message.sectionID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SectionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSectionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sectionID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SectionRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sectionID: isSet(object.sectionID) ? String(object.sectionID) : "",
    };
  },

  toJSON(message: SectionRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sectionID !== undefined && (obj.sectionID = message.sectionID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SectionRequest>, I>>(
    object: I
  ): SectionRequest {
    const message = createBaseSectionRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sectionID = object.sectionID ?? "";
    return message;
  },
};

function createBaseSuccessStringReply(): SuccessStringReply {
  return { success: false, error: undefined };
}

export const SuccessStringReply = {
  encode(
    message: SuccessStringReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SuccessStringReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuccessStringReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SuccessStringReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SuccessStringReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SuccessStringReply>, I>>(
    object: I
  ): SuccessStringReply {
    const message = createBaseSuccessStringReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseStringReply(): StringReply {
  return { error: undefined };
}

export const StringReply = {
  encode(
    message: StringReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = Error.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StringReply {
    return {
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: StringReply): unknown {
    const obj: any = {};
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StringReply>, I>>(
    object: I
  ): StringReply {
    const message = createBaseStringReply();
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    return message;
  },
};

function createBaseListReply(): ListReply {
  return { error: [] };
}

export const ListReply = {
  encode(
    message: ListReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.error) {
      Error.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error.push(Error.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListReply {
    return {
      error: Array.isArray(object?.error)
        ? object.error.map((e: any) => Error.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListReply): unknown {
    const obj: any = {};
    if (message.error) {
      obj.error = message.error.map((e) => (e ? Error.toJSON(e) : undefined));
    } else {
      obj.error = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListReply>, I>>(
    object: I
  ): ListReply {
    const message = createBaseListReply();
    message.error = object.error?.map((e) => Error.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetUserDataRequest(): GetUserDataRequest {
  return { sessionKey: "", isSessionKey: false, sub: "" };
}

export const GetUserDataRequest = {
  encode(
    message: GetUserDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.isSessionKey === true) {
      writer.uint32(16).bool(message.isSessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.isSessionKey = reader.bool();
          break;
        case 1:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserDataRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      isSessionKey: isSet(object.isSessionKey)
        ? Boolean(object.isSessionKey)
        : false,
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: GetUserDataRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.isSessionKey !== undefined &&
      (obj.isSessionKey = message.isSessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserDataRequest>, I>>(
    object: I
  ): GetUserDataRequest {
    const message = createBaseGetUserDataRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.isSessionKey = object.isSessionKey ?? false;
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseGetUserDataReply(): GetUserDataReply {
  return {
    success: false,
    error: undefined,
    userId: "",
    role: "",
    semesterId: "",
    darkMode: false,
    bio: "",
  };
}

export const GetUserDataReply = {
  encode(
    message: GetUserDataReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.role !== "") {
      writer.uint32(58).string(message.role);
    }
    if (message.semesterId !== "") {
      writer.uint32(34).string(message.semesterId);
    }
    if (message.darkMode === true) {
      writer.uint32(40).bool(message.darkMode);
    }
    if (message.bio !== "") {
      writer.uint32(50).string(message.bio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserDataReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserDataReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.userId = reader.string();
          break;
        case 7:
          message.role = reader.string();
          break;
        case 4:
          message.semesterId = reader.string();
          break;
        case 5:
          message.darkMode = reader.bool();
          break;
        case 6:
          message.bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetUserDataReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      userId: isSet(object.userId) ? String(object.userId) : "",
      role: isSet(object.role) ? String(object.role) : "",
      semesterId: isSet(object.semesterId) ? String(object.semesterId) : "",
      darkMode: isSet(object.darkMode) ? Boolean(object.darkMode) : false,
      bio: isSet(object.bio) ? String(object.bio) : "",
    };
  },

  toJSON(message: GetUserDataReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.userId !== undefined && (obj.userId = message.userId);
    message.role !== undefined && (obj.role = message.role);
    message.semesterId !== undefined && (obj.semesterId = message.semesterId);
    message.darkMode !== undefined && (obj.darkMode = message.darkMode);
    message.bio !== undefined && (obj.bio = message.bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetUserDataReply>, I>>(
    object: I
  ): GetUserDataReply {
    const message = createBaseGetUserDataReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.userId = object.userId ?? "";
    message.role = object.role ?? "";
    message.semesterId = object.semesterId ?? "";
    message.darkMode = object.darkMode ?? false;
    message.bio = object.bio ?? "";
    return message;
  },
};

function createBaseUpdateUserDataRequest(): UpdateUserDataRequest {
  return { sessionKey: "", sub: "", darkMode: false, bio: "" };
}

export const UpdateUserDataRequest = {
  encode(
    message: UpdateUserDataRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    if (message.darkMode === true) {
      writer.uint32(40).bool(message.darkMode);
    }
    if (message.bio !== "") {
      writer.uint32(50).string(message.bio);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateUserDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        case 5:
          message.darkMode = reader.bool();
          break;
        case 6:
          message.bio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateUserDataRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      darkMode: isSet(object.darkMode) ? Boolean(object.darkMode) : false,
      bio: isSet(object.bio) ? String(object.bio) : "",
    };
  },

  toJSON(message: UpdateUserDataRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.darkMode !== undefined && (obj.darkMode = message.darkMode);
    message.bio !== undefined && (obj.bio = message.bio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateUserDataRequest>, I>>(
    object: I
  ): UpdateUserDataRequest {
    const message = createBaseUpdateUserDataRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.darkMode = object.darkMode ?? false;
    message.bio = object.bio ?? "";
    return message;
  },
};

function createBaseGetNotificationTokenReply(): GetNotificationTokenReply {
  return { success: false, error: undefined, notificationToken: "" };
}

export const GetNotificationTokenReply = {
  encode(
    message: GetNotificationTokenReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.notificationToken !== "") {
      writer.uint32(26).string(message.notificationToken);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetNotificationTokenReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNotificationTokenReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.notificationToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetNotificationTokenReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      notificationToken: isSet(object.notificationToken)
        ? String(object.notificationToken)
        : "",
    };
  },

  toJSON(message: GetNotificationTokenReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.notificationToken !== undefined &&
      (obj.notificationToken = message.notificationToken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetNotificationTokenReply>, I>>(
    object: I
  ): GetNotificationTokenReply {
    const message = createBaseGetNotificationTokenReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.notificationToken = object.notificationToken ?? "";
    return message;
  },
};

function createBaseSendNotificationRequest(): SendNotificationRequest {
  return {
    sessionKey: "",
    title: "",
    body: "",
    sender: "",
    receiver: "",
    allowReply: false,
    sectionId: "",
  };
}

export const SendNotificationRequest = {
  encode(
    message: SendNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(42).string(message.receiver);
    }
    if (message.allowReply === true) {
      writer.uint32(32).bool(message.allowReply);
    }
    if (message.sectionId !== "") {
      writer.uint32(50).string(message.sectionId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SendNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.body = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        case 5:
          message.receiver = reader.string();
          break;
        case 4:
          message.allowReply = reader.bool();
          break;
        case 6:
          message.sectionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendNotificationRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      title: isSet(object.title) ? String(object.title) : "",
      body: isSet(object.body) ? String(object.body) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      receiver: isSet(object.receiver) ? String(object.receiver) : "",
      allowReply: isSet(object.allowReply) ? Boolean(object.allowReply) : false,
      sectionId: isSet(object.sectionId) ? String(object.sectionId) : "",
    };
  },

  toJSON(message: SendNotificationRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    message.sender !== undefined && (obj.sender = message.sender);
    message.receiver !== undefined && (obj.receiver = message.receiver);
    message.allowReply !== undefined && (obj.allowReply = message.allowReply);
    message.sectionId !== undefined && (obj.sectionId = message.sectionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendNotificationRequest>, I>>(
    object: I
  ): SendNotificationRequest {
    const message = createBaseSendNotificationRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.title = object.title ?? "";
    message.body = object.body ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.allowReply = object.allowReply ?? false;
    message.sectionId = object.sectionId ?? "";
    return message;
  },
};

function createBaseSendNotificationAnnouncementRequest(): SendNotificationAnnouncementRequest {
  return {
    sessionKey: "",
    title: "",
    body: "",
    sender: "",
    sectionId: "",
    allowReply: false,
  };
}

export const SendNotificationAnnouncementRequest = {
  encode(
    message: SendNotificationAnnouncementRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.sectionId !== "") {
      writer.uint32(42).string(message.sectionId);
    }
    if (message.allowReply === true) {
      writer.uint32(32).bool(message.allowReply);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SendNotificationAnnouncementRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendNotificationAnnouncementRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.body = reader.string();
          break;
        case 3:
          message.sender = reader.string();
          break;
        case 5:
          message.sectionId = reader.string();
          break;
        case 4:
          message.allowReply = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendNotificationAnnouncementRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      title: isSet(object.title) ? String(object.title) : "",
      body: isSet(object.body) ? String(object.body) : "",
      sender: isSet(object.sender) ? String(object.sender) : "",
      sectionId: isSet(object.sectionId) ? String(object.sectionId) : "",
      allowReply: isSet(object.allowReply) ? Boolean(object.allowReply) : false,
    };
  },

  toJSON(message: SendNotificationAnnouncementRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.title !== undefined && (obj.title = message.title);
    message.body !== undefined && (obj.body = message.body);
    message.sender !== undefined && (obj.sender = message.sender);
    message.sectionId !== undefined && (obj.sectionId = message.sectionId);
    message.allowReply !== undefined && (obj.allowReply = message.allowReply);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<SendNotificationAnnouncementRequest>, I>
  >(object: I): SendNotificationAnnouncementRequest {
    const message = createBaseSendNotificationAnnouncementRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.title = object.title ?? "";
    message.body = object.body ?? "";
    message.sender = object.sender ?? "";
    message.sectionId = object.sectionId ?? "";
    message.allowReply = object.allowReply ?? false;
    return message;
  },
};

function createBaseSendNotificationReply(): SendNotificationReply {
  return { success: false, error: undefined, notificationId: "" };
}

export const SendNotificationReply = {
  encode(
    message: SendNotificationReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.notificationId !== "") {
      writer.uint32(26).string(message.notificationId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SendNotificationReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendNotificationReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.notificationId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendNotificationReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      notificationId: isSet(object.notificationId)
        ? String(object.notificationId)
        : "",
    };
  },

  toJSON(message: SendNotificationReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.notificationId !== undefined &&
      (obj.notificationId = message.notificationId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendNotificationReply>, I>>(
    object: I
  ): SendNotificationReply {
    const message = createBaseSendNotificationReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.notificationId = object.notificationId ?? "";
    return message;
  },
};

function createBaseUpdateNotificationTokenRequest(): UpdateNotificationTokenRequest {
  return { sessionKey: "", sub: "", token: "" };
}

export const UpdateNotificationTokenRequest = {
  encode(
    message: UpdateNotificationTokenRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateNotificationTokenRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateNotificationTokenRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateNotificationTokenRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: UpdateNotificationTokenRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateNotificationTokenRequest>, I>>(
    object: I
  ): UpdateNotificationTokenRequest {
    const message = createBaseUpdateNotificationTokenRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseChangeNotificationReadRequest(): ChangeNotificationReadRequest {
  return { sessionKey: "", userId: "", notificationId: [], read: false };
}

export const ChangeNotificationReadRequest = {
  encode(
    message: ChangeNotificationReadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.notificationId) {
      writer.uint32(18).string(v!);
    }
    if (message.read === true) {
      writer.uint32(24).bool(message.read);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ChangeNotificationReadRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeNotificationReadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.notificationId.push(reader.string());
          break;
        case 3:
          message.read = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChangeNotificationReadRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      notificationId: Array.isArray(object?.notificationId)
        ? object.notificationId.map((e: any) => String(e))
        : [],
      read: isSet(object.read) ? Boolean(object.read) : false,
    };
  },

  toJSON(message: ChangeNotificationReadRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.notificationId) {
      obj.notificationId = message.notificationId.map((e) => e);
    } else {
      obj.notificationId = [];
    }
    message.read !== undefined && (obj.read = message.read);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChangeNotificationReadRequest>, I>>(
    object: I
  ): ChangeNotificationReadRequest {
    const message = createBaseChangeNotificationReadRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    message.notificationId = object.notificationId?.map((e) => e) || [];
    message.read = object.read ?? false;
    return message;
  },
};

function createBaseRemoveNotificationRequest(): RemoveNotificationRequest {
  return { sessionKey: "", userId: "", notificationId: [] };
}

export const RemoveNotificationRequest = {
  encode(
    message: RemoveNotificationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.notificationId) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoveNotificationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveNotificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.notificationId.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveNotificationRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      notificationId: Array.isArray(object?.notificationId)
        ? object.notificationId.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: RemoveNotificationRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.notificationId) {
      obj.notificationId = message.notificationId.map((e) => e);
    } else {
      obj.notificationId = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveNotificationRequest>, I>>(
    object: I
  ): RemoveNotificationRequest {
    const message = createBaseRemoveNotificationRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    message.notificationId = object.notificationId?.map((e) => e) || [];
    return message;
  },
};

function createBaseUpdateSubscriptionRequest(): UpdateSubscriptionRequest {
  return { sessionKey: "", userId: "", token: "", semesterId: "" };
}

export const UpdateSubscriptionRequest = {
  encode(
    message: UpdateSubscriptionRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.semesterId !== "") {
      writer.uint32(26).string(message.semesterId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateSubscriptionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSubscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.token = reader.string();
          break;
        case 3:
          message.semesterId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSubscriptionRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      token: isSet(object.token) ? String(object.token) : "",
      semesterId: isSet(object.semesterId) ? String(object.semesterId) : "",
    };
  },

  toJSON(message: UpdateSubscriptionRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    message.token !== undefined && (obj.token = message.token);
    message.semesterId !== undefined && (obj.semesterId = message.semesterId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateSubscriptionRequest>, I>>(
    object: I
  ): UpdateSubscriptionRequest {
    const message = createBaseUpdateSubscriptionRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    message.token = object.token ?? "";
    message.semesterId = object.semesterId ?? "";
    return message;
  },
};

function createBaseGoogleOAuthReply(): GoogleOAuthReply {
  return { success: false, error: undefined, authURL: "" };
}

export const GoogleOAuthReply = {
  encode(
    message: GoogleOAuthReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.authURL !== "") {
      writer.uint32(26).string(message.authURL);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GoogleOAuthReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGoogleOAuthReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.authURL = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GoogleOAuthReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      authURL: isSet(object.authURL) ? String(object.authURL) : "",
    };
  },

  toJSON(message: GoogleOAuthReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.authURL !== undefined && (obj.authURL = message.authURL);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GoogleOAuthReply>, I>>(
    object: I
  ): GoogleOAuthReply {
    const message = createBaseGoogleOAuthReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.authURL = object.authURL ?? "";
    return message;
  },
};

function createBaseDownloadRequest(): DownloadRequest {
  return {
    sessionKey: "",
    sub: "",
    fileId: "",
    fileName: "",
    filePath: "",
    fileType: "",
  };
}

export const DownloadRequest = {
  encode(
    message: DownloadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(42).string(message.sub);
    }
    if (message.fileId !== "") {
      writer.uint32(10).string(message.fileId);
    }
    if (message.fileName !== "") {
      writer.uint32(18).string(message.fileName);
    }
    if (message.filePath !== "") {
      writer.uint32(26).string(message.filePath);
    }
    if (message.fileType !== "") {
      writer.uint32(34).string(message.fileType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DownloadRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.sub = reader.string();
          break;
        case 1:
          message.fileId = reader.string();
          break;
        case 2:
          message.fileName = reader.string();
          break;
        case 3:
          message.filePath = reader.string();
          break;
        case 4:
          message.fileType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      fileId: isSet(object.fileId) ? String(object.fileId) : "",
      fileName: isSet(object.fileName) ? String(object.fileName) : "",
      filePath: isSet(object.filePath) ? String(object.filePath) : "",
      fileType: isSet(object.fileType) ? String(object.fileType) : "",
    };
  },

  toJSON(message: DownloadRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.fileId !== undefined && (obj.fileId = message.fileId);
    message.fileName !== undefined && (obj.fileName = message.fileName);
    message.filePath !== undefined && (obj.filePath = message.filePath);
    message.fileType !== undefined && (obj.fileType = message.fileType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DownloadRequest>, I>>(
    object: I
  ): DownloadRequest {
    const message = createBaseDownloadRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.fileId = object.fileId ?? "";
    message.fileName = object.fileName ?? "";
    message.filePath = object.filePath ?? "";
    message.fileType = object.fileType ?? "";
    return message;
  },
};

function createBaseUploadRequest(): UploadRequest {
  return { sessionKey: "", sub: "", filePath: "", parentId: "", fileType: "" };
}

export const UploadRequest = {
  encode(
    message: UploadRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(42).string(message.sub);
    }
    if (message.filePath !== "") {
      writer.uint32(26).string(message.filePath);
    }
    if (message.parentId !== "") {
      writer.uint32(10).string(message.parentId);
    }
    if (message.fileType !== "") {
      writer.uint32(34).string(message.fileType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.sub = reader.string();
          break;
        case 3:
          message.filePath = reader.string();
          break;
        case 1:
          message.parentId = reader.string();
          break;
        case 4:
          message.fileType = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UploadRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      filePath: isSet(object.filePath) ? String(object.filePath) : "",
      parentId: isSet(object.parentId) ? String(object.parentId) : "",
      fileType: isSet(object.fileType) ? String(object.fileType) : "",
    };
  },

  toJSON(message: UploadRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.filePath !== undefined && (obj.filePath = message.filePath);
    message.parentId !== undefined && (obj.parentId = message.parentId);
    message.fileType !== undefined && (obj.fileType = message.fileType);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UploadRequest>, I>>(
    object: I
  ): UploadRequest {
    const message = createBaseUploadRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.filePath = object.filePath ?? "";
    message.parentId = object.parentId ?? "";
    message.fileType = object.fileType ?? "";
    return message;
  },
};

function createBaseAddTempContainerRequest(): AddTempContainerRequest {
  return {
    imageName: "",
    memLimit: 0,
    numCPU: 0,
    sessionKey: "",
    sub: "",
    accessRight: "",
  };
}

export const AddTempContainerRequest = {
  encode(
    message: AddTempContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.imageName !== "") {
      writer.uint32(338).string(message.imageName);
    }
    if (message.memLimit !== 0) {
      writer.uint32(45).float(message.memLimit);
    }
    if (message.numCPU !== 0) {
      writer.uint32(29).float(message.numCPU);
    }
    if (message.sessionKey !== "") {
      writer.uint32(10).string(message.sessionKey);
    }
    if (message.sub !== "") {
      writer.uint32(34).string(message.sub);
    }
    if (message.accessRight !== "") {
      writer.uint32(50).string(message.accessRight);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddTempContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddTempContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.imageName = reader.string();
          break;
        case 5:
          message.memLimit = reader.float();
          break;
        case 3:
          message.numCPU = reader.float();
          break;
        case 1:
          message.sessionKey = reader.string();
          break;
        case 4:
          message.sub = reader.string();
          break;
        case 6:
          message.accessRight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddTempContainerRequest {
    return {
      imageName: isSet(object.imageName) ? String(object.imageName) : "",
      memLimit: isSet(object.memLimit) ? Number(object.memLimit) : 0,
      numCPU: isSet(object.numCPU) ? Number(object.numCPU) : 0,
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
      accessRight: isSet(object.accessRight) ? String(object.accessRight) : "",
    };
  },

  toJSON(message: AddTempContainerRequest): unknown {
    const obj: any = {};
    message.imageName !== undefined && (obj.imageName = message.imageName);
    message.memLimit !== undefined && (obj.memLimit = message.memLimit);
    message.numCPU !== undefined && (obj.numCPU = message.numCPU);
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sub !== undefined && (obj.sub = message.sub);
    message.accessRight !== undefined &&
      (obj.accessRight = message.accessRight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddTempContainerRequest>, I>>(
    object: I
  ): AddTempContainerRequest {
    const message = createBaseAddTempContainerRequest();
    message.imageName = object.imageName ?? "";
    message.memLimit = object.memLimit ?? 0;
    message.numCPU = object.numCPU ?? 0;
    message.sessionKey = object.sessionKey ?? "";
    message.sub = object.sub ?? "";
    message.accessRight = object.accessRight ?? "";
    return message;
  },
};

function createBaseAddTempContainerReply(): AddTempContainerReply {
  return { success: false, error: undefined, tempContainerId: "" };
}

export const AddTempContainerReply = {
  encode(
    message: AddTempContainerReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.tempContainerId !== "") {
      writer.uint32(26).string(message.tempContainerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddTempContainerReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddTempContainerReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.tempContainerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddTempContainerReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      tempContainerId: isSet(object.tempContainerId)
        ? String(object.tempContainerId)
        : "",
    };
  },

  toJSON(message: AddTempContainerReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.tempContainerId !== undefined &&
      (obj.tempContainerId = message.tempContainerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddTempContainerReply>, I>>(
    object: I
  ): AddTempContainerReply {
    const message = createBaseAddTempContainerReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.tempContainerId = object.tempContainerId ?? "";
    return message;
  },
};

function createBaseRemoveTempContainerRequest(): RemoveTempContainerRequest {
  return { sessionKey: "", containerId: "", sub: "" };
}

export const RemoveTempContainerRequest = {
  encode(
    message: RemoveTempContainerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.containerId !== "") {
      writer.uint32(42).string(message.containerId);
    }
    if (message.sub !== "") {
      writer.uint32(10).string(message.sub);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RemoveTempContainerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveTempContainerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.containerId = reader.string();
          break;
        case 1:
          message.sub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveTempContainerRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      containerId: isSet(object.containerId) ? String(object.containerId) : "",
      sub: isSet(object.sub) ? String(object.sub) : "",
    };
  },

  toJSON(message: RemoveTempContainerRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.containerId !== undefined &&
      (obj.containerId = message.containerId);
    message.sub !== undefined && (obj.sub = message.sub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveTempContainerRequest>, I>>(
    object: I
  ): RemoveTempContainerRequest {
    const message = createBaseRemoveTempContainerRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.containerId = object.containerId ?? "";
    message.sub = object.sub ?? "";
    return message;
  },
};

function createBaseAddSandBoxImageRequest(): AddSandBoxImageRequest {
  return {
    sessionKey: "",
    userId: "",
    title: "",
    description: "",
    imageId: "",
  };
}

export const AddSandBoxImageRequest = {
  encode(
    message: AddSandBoxImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddSandBoxImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddSandBoxImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.userId = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 4:
          message.description = reader.string();
          break;
        case 1:
          message.imageId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddSandBoxImageRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
    };
  },

  toJSON(message: AddSandBoxImageRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.imageId !== undefined && (obj.imageId = message.imageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddSandBoxImageRequest>, I>>(
    object: I
  ): AddSandBoxImageRequest {
    const message = createBaseAddSandBoxImageRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.imageId = object.imageId ?? "";
    return message;
  },
};

function createBaseAddSandBoxImageReply(): AddSandBoxImageReply {
  return { success: false, error: undefined, sandBoxImageId: "" };
}

export const AddSandBoxImageReply = {
  encode(
    message: AddSandBoxImageReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.sandBoxImageId !== "") {
      writer.uint32(26).string(message.sandBoxImageId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AddSandBoxImageReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddSandBoxImageReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.sandBoxImageId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddSandBoxImageReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      sandBoxImageId: isSet(object.sandBoxImageId)
        ? String(object.sandBoxImageId)
        : "",
    };
  },

  toJSON(message: AddSandBoxImageReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.sandBoxImageId !== undefined &&
      (obj.sandBoxImageId = message.sandBoxImageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddSandBoxImageReply>, I>>(
    object: I
  ): AddSandBoxImageReply {
    const message = createBaseAddSandBoxImageReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.sandBoxImageId = object.sandBoxImageId ?? "";
    return message;
  },
};

function createBaseUpdateSandBoxImageRequest(): UpdateSandBoxImageRequest {
  return {
    sessionKey: "",
    sandBoxImageId: "",
    userId: "",
    title: "",
    description: "",
    tempContainerId: "",
  };
}

export const UpdateSandBoxImageRequest = {
  encode(
    message: UpdateSandBoxImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sandBoxImageId !== "") {
      writer.uint32(18).string(message.sandBoxImageId);
    }
    if (message.userId !== "") {
      writer.uint32(42).string(message.userId);
    }
    if (message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.tempContainerId !== "") {
      writer.uint32(34).string(message.tempContainerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UpdateSandBoxImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateSandBoxImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 2:
          message.sandBoxImageId = reader.string();
          break;
        case 5:
          message.userId = reader.string();
          break;
        case 3:
          message.title = reader.string();
          break;
        case 1:
          message.description = reader.string();
          break;
        case 4:
          message.tempContainerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSandBoxImageRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sandBoxImageId: isSet(object.sandBoxImageId)
        ? String(object.sandBoxImageId)
        : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      tempContainerId: isSet(object.tempContainerId)
        ? String(object.tempContainerId)
        : "",
    };
  },

  toJSON(message: UpdateSandBoxImageRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sandBoxImageId !== undefined &&
      (obj.sandBoxImageId = message.sandBoxImageId);
    message.userId !== undefined && (obj.userId = message.userId);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.tempContainerId !== undefined &&
      (obj.tempContainerId = message.tempContainerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateSandBoxImageRequest>, I>>(
    object: I
  ): UpdateSandBoxImageRequest {
    const message = createBaseUpdateSandBoxImageRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sandBoxImageId = object.sandBoxImageId ?? "";
    message.userId = object.userId ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.tempContainerId = object.tempContainerId ?? "";
    return message;
  },
};

function createBaseSandBoxImageIdRequest(): SandBoxImageIdRequest {
  return { sessionKey: "", sandBoxImageId: "", userId: "" };
}

export const SandBoxImageIdRequest = {
  encode(
    message: SandBoxImageIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sandBoxImageId !== "") {
      writer.uint32(42).string(message.sandBoxImageId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SandBoxImageIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSandBoxImageIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.sandBoxImageId = reader.string();
          break;
        case 3:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SandBoxImageIdRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sandBoxImageId: isSet(object.sandBoxImageId)
        ? String(object.sandBoxImageId)
        : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: SandBoxImageIdRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sandBoxImageId !== undefined &&
      (obj.sandBoxImageId = message.sandBoxImageId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SandBoxImageIdRequest>, I>>(
    object: I
  ): SandBoxImageIdRequest {
    const message = createBaseSandBoxImageIdRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sandBoxImageId = object.sandBoxImageId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseListSandBoxImageRequest(): ListSandBoxImageRequest {
  return { sessionKey: "", userId: "" };
}

export const ListSandBoxImageRequest = {
  encode(
    message: ListSandBoxImageRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.userId !== "") {
      writer.uint32(42).string(message.userId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListSandBoxImageRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSandBoxImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListSandBoxImageRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: ListSandBoxImageRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListSandBoxImageRequest>, I>>(
    object: I
  ): ListSandBoxImageRequest {
    const message = createBaseListSandBoxImageRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseListSandBoxImageReply(): ListSandBoxImageReply {
  return { success: false, error: undefined, sandboxImages: [] };
}

export const ListSandBoxImageReply = {
  encode(
    message: ListSandBoxImageReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sandboxImages) {
      ListSandBoxImageReply_SandBoxImage.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListSandBoxImageReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSandBoxImageReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 4:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.sandboxImages.push(
            ListSandBoxImageReply_SandBoxImage.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListSandBoxImageReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      sandboxImages: Array.isArray(object?.sandboxImages)
        ? object.sandboxImages.map((e: any) =>
            ListSandBoxImageReply_SandBoxImage.fromJSON(e)
          )
        : [],
    };
  },

  toJSON(message: ListSandBoxImageReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    if (message.sandboxImages) {
      obj.sandboxImages = message.sandboxImages.map((e) =>
        e ? ListSandBoxImageReply_SandBoxImage.toJSON(e) : undefined
      );
    } else {
      obj.sandboxImages = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListSandBoxImageReply>, I>>(
    object: I
  ): ListSandBoxImageReply {
    const message = createBaseListSandBoxImageReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.sandboxImages =
      object.sandboxImages?.map((e) =>
        ListSandBoxImageReply_SandBoxImage.fromPartial(e)
      ) || [];
    return message;
  },
};

function createBaseListSandBoxImageReply_SandBoxImage(): ListSandBoxImageReply_SandBoxImage {
  return { id: "", title: "", description: "", imageId: "", sandboxId: [] };
}

export const ListSandBoxImageReply_SandBoxImage = {
  encode(
    message: ListSandBoxImageReply_SandBoxImage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(58).string(message.description);
    }
    if (message.imageId !== "") {
      writer.uint32(26).string(message.imageId);
    }
    for (const v of message.sandboxId) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListSandBoxImageReply_SandBoxImage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListSandBoxImageReply_SandBoxImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.title = reader.string();
          break;
        case 7:
          message.description = reader.string();
          break;
        case 3:
          message.imageId = reader.string();
          break;
        case 6:
          message.sandboxId.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListSandBoxImageReply_SandBoxImage {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      imageId: isSet(object.imageId) ? String(object.imageId) : "",
      sandboxId: Array.isArray(object?.sandboxId)
        ? object.sandboxId.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ListSandBoxImageReply_SandBoxImage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.imageId !== undefined && (obj.imageId = message.imageId);
    if (message.sandboxId) {
      obj.sandboxId = message.sandboxId.map((e) => e);
    } else {
      obj.sandboxId = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<ListSandBoxImageReply_SandBoxImage>, I>
  >(object: I): ListSandBoxImageReply_SandBoxImage {
    const message = createBaseListSandBoxImageReply_SandBoxImage();
    message.id = object.id ?? "";
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.imageId = object.imageId ?? "";
    message.sandboxId = object.sandboxId?.map((e) => e) || [];
    return message;
  },
};

function createBaseAddSandBoxRequest(): AddSandBoxRequest {
  return { sessionKey: "", memLimit: 0, numCPU: 0, sandBoxImageId: "" };
}

export const AddSandBoxRequest = {
  encode(
    message: AddSandBoxRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.memLimit !== 0) {
      writer.uint32(45).float(message.memLimit);
    }
    if (message.numCPU !== 0) {
      writer.uint32(29).float(message.numCPU);
    }
    if (message.sandBoxImageId !== "") {
      writer.uint32(10).string(message.sandBoxImageId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddSandBoxRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddSandBoxRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.memLimit = reader.float();
          break;
        case 3:
          message.numCPU = reader.float();
          break;
        case 1:
          message.sandBoxImageId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddSandBoxRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      memLimit: isSet(object.memLimit) ? Number(object.memLimit) : 0,
      numCPU: isSet(object.numCPU) ? Number(object.numCPU) : 0,
      sandBoxImageId: isSet(object.sandBoxImageId)
        ? String(object.sandBoxImageId)
        : "",
    };
  },

  toJSON(message: AddSandBoxRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.memLimit !== undefined && (obj.memLimit = message.memLimit);
    message.numCPU !== undefined && (obj.numCPU = message.numCPU);
    message.sandBoxImageId !== undefined &&
      (obj.sandBoxImageId = message.sandBoxImageId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddSandBoxRequest>, I>>(
    object: I
  ): AddSandBoxRequest {
    const message = createBaseAddSandBoxRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.memLimit = object.memLimit ?? 0;
    message.numCPU = object.numCPU ?? 0;
    message.sandBoxImageId = object.sandBoxImageId ?? "";
    return message;
  },
};

function createBaseAddSandBoxReply(): AddSandBoxReply {
  return { success: false, error: undefined, sandBoxId: "" };
}

export const AddSandBoxReply = {
  encode(
    message: AddSandBoxReply,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== undefined) {
      Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.sandBoxId !== "") {
      writer.uint32(26).string(message.sandBoxId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddSandBoxReply {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddSandBoxReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.success = reader.bool();
          break;
        case 2:
          message.error = Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.sandBoxId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddSandBoxReply {
    return {
      success: isSet(object.success) ? Boolean(object.success) : false,
      error: isSet(object.error) ? Error.fromJSON(object.error) : undefined,
      sandBoxId: isSet(object.sandBoxId) ? String(object.sandBoxId) : "",
    };
  },

  toJSON(message: AddSandBoxReply): unknown {
    const obj: any = {};
    message.success !== undefined && (obj.success = message.success);
    message.error !== undefined &&
      (obj.error = message.error ? Error.toJSON(message.error) : undefined);
    message.sandBoxId !== undefined && (obj.sandBoxId = message.sandBoxId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddSandBoxReply>, I>>(
    object: I
  ): AddSandBoxReply {
    const message = createBaseAddSandBoxReply();
    message.success = object.success ?? false;
    message.error =
      object.error !== undefined && object.error !== null
        ? Error.fromPartial(object.error)
        : undefined;
    message.sandBoxId = object.sandBoxId ?? "";
    return message;
  },
};

function createBaseSandBoxIdRequest(): SandBoxIdRequest {
  return { sessionKey: "", sandBoxId: "", userId: "" };
}

export const SandBoxIdRequest = {
  encode(
    message: SandBoxIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.sessionKey !== "") {
      writer.uint32(338).string(message.sessionKey);
    }
    if (message.sandBoxId !== "") {
      writer.uint32(42).string(message.sandBoxId);
    }
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SandBoxIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSandBoxIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 42:
          message.sessionKey = reader.string();
          break;
        case 5:
          message.sandBoxId = reader.string();
          break;
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SandBoxIdRequest {
    return {
      sessionKey: isSet(object.sessionKey) ? String(object.sessionKey) : "",
      sandBoxId: isSet(object.sandBoxId) ? String(object.sandBoxId) : "",
      userId: isSet(object.userId) ? String(object.userId) : "",
    };
  },

  toJSON(message: SandBoxIdRequest): unknown {
    const obj: any = {};
    message.sessionKey !== undefined && (obj.sessionKey = message.sessionKey);
    message.sandBoxId !== undefined && (obj.sandBoxId = message.sandBoxId);
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SandBoxIdRequest>, I>>(
    object: I
  ): SandBoxIdRequest {
    const message = createBaseSandBoxIdRequest();
    message.sessionKey = object.sessionKey ?? "";
    message.sandBoxId = object.sandBoxId ?? "";
    message.userId = object.userId ?? "";
    return message;
  },
};

export const DockerService = {
  checkHaveContainer: {
    path: "/dockerGet.Docker/checkHaveContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CheckHaveContainerRequest) =>
      Buffer.from(CheckHaveContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      CheckHaveContainerRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  listContainers: {
    path: "/dockerGet.Docker/listContainers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubRequest) =>
      Buffer.from(SubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubRequest.decode(value),
    responseSerialize: (value: ListContainerReply) =>
      Buffer.from(ListContainerReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListContainerReply.decode(value),
  },
  listCourses: {
    path: "/dockerGet.Docker/listCourses",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubRequest) =>
      Buffer.from(SubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubRequest.decode(value),
    responseSerialize: (value: ListCoursesReply) =>
      Buffer.from(ListCoursesReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListCoursesReply.decode(value),
  },
  getSectionInfo: {
    path: "/dockerGet.Docker/getSectionInfo",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SectionAndSubRequest) =>
      Buffer.from(SectionAndSubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SectionAndSubRequest.decode(value),
    responseSerialize: (value: GetSectionInfoReply) =>
      Buffer.from(GetSectionInfoReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetSectionInfoReply.decode(value),
  },
  listEnvironments: {
    path: "/dockerGet.Docker/listEnvironments",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SectionAndSubRequest) =>
      Buffer.from(SectionAndSubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SectionAndSubRequest.decode(value),
    responseSerialize: (value: ListEnvironmentsReply) =>
      Buffer.from(ListEnvironmentsReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListEnvironmentsReply.decode(value),
  },
  listTemplates: {
    path: "/dockerGet.Docker/listTemplates",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SectionAndSubRequest) =>
      Buffer.from(SectionAndSubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SectionAndSubRequest.decode(value),
    responseSerialize: (value: ListTemplatesReply) =>
      Buffer.from(ListTemplatesReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListTemplatesReply.decode(value),
  },
  addContainer: {
    path: "/dockerGet.Docker/addContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddContainerRequest) =>
      Buffer.from(AddContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddContainerRequest.decode(value),
    responseSerialize: (value: AddContainerReply) =>
      Buffer.from(AddContainerReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddContainerReply.decode(value),
  },
  instantAddContainer: {
    path: "/dockerGet.Docker/instantAddContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: InstantAddContainerRequest) =>
      Buffer.from(InstantAddContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      InstantAddContainerRequest.decode(value),
    responseSerialize: (value: AddContainerReply) =>
      Buffer.from(AddContainerReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddContainerReply.decode(value),
  },
  removeContainer: {
    path: "/dockerGet.Docker/removeContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RemoveContainerRequest) =>
      Buffer.from(RemoveContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RemoveContainerRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  submitFiles: {
    path: "/dockerGet.Docker/submitFiles",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubmitFilesRequest) =>
      Buffer.from(SubmitFilesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubmitFilesRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  getContainerTime: {
    path: "/dockerGet.Docker/getContainerTime",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RemoveContainerRequest) =>
      Buffer.from(RemoveContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RemoveContainerRequest.decode(value),
    responseSerialize: (value: ContainerTimeReply) =>
      Buffer.from(ContainerTimeReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ContainerTimeReply.decode(value),
  },
  addTemplate: {
    path: "/dockerGet.Docker/addTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddTemplateRequest) =>
      Buffer.from(AddTemplateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddTemplateRequest.decode(value),
    responseSerialize: (value: AddTemplateReply) =>
      Buffer.from(AddTemplateReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddTemplateReply.decode(value),
  },
  updateTemplate: {
    path: "/dockerGet.Docker/updateTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateTemplateRequest) =>
      Buffer.from(UpdateTemplateRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateTemplateRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  activateTemplate: {
    path: "/dockerGet.Docker/activateTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TemplateIdRequest) =>
      Buffer.from(TemplateIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TemplateIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  deactivateTemplate: {
    path: "/dockerGet.Docker/deactivateTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TemplateIdRequest) =>
      Buffer.from(TemplateIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TemplateIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  removeTemplate: {
    path: "/dockerGet.Docker/removeTemplate",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TemplateIdRequest) =>
      Buffer.from(TemplateIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TemplateIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  getTemplateStudentWorkspace: {
    path: "/dockerGet.Docker/getTemplateStudentWorkspace",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: TemplateIdRequest) =>
      Buffer.from(TemplateIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TemplateIdRequest.decode(value),
    responseSerialize: (value: TemplateGetStudentWorkspaceReply) =>
      Buffer.from(TemplateGetStudentWorkspaceReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      TemplateGetStudentWorkspaceReply.decode(value),
  },
  addEnvironment: {
    path: "/dockerGet.Docker/addEnvironment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddEnvironmentRequest) =>
      Buffer.from(AddEnvironmentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddEnvironmentRequest.decode(value),
    responseSerialize: (value: AddEnvironmentReply) =>
      Buffer.from(AddEnvironmentReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddEnvironmentReply.decode(value),
  },
  updateEnvironment: {
    path: "/dockerGet.Docker/updateEnvironment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateEnvironmentRequest) =>
      Buffer.from(UpdateEnvironmentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      UpdateEnvironmentRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  buildEnvironment: {
    path: "/dockerGet.Docker/buildEnvironment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: BuildEnvironmentRequest) =>
      Buffer.from(BuildEnvironmentRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      BuildEnvironmentRequest.decode(value),
    responseSerialize: (value: AddEnvironmentReply) =>
      Buffer.from(AddEnvironmentReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddEnvironmentReply.decode(value),
  },
  removeEnvironment: {
    path: "/dockerGet.Docker/removeEnvironment",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EnvironmentIdRequest) =>
      Buffer.from(EnvironmentIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EnvironmentIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  addTempContainer: {
    path: "/dockerGet.Docker/addTempContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddTempContainerRequest) =>
      Buffer.from(AddTempContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      AddTempContainerRequest.decode(value),
    responseSerialize: (value: AddTempContainerReply) =>
      Buffer.from(AddTempContainerReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddTempContainerReply.decode(value),
  },
  removeTempContainer: {
    path: "/dockerGet.Docker/removeTempContainer",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RemoveTempContainerRequest) =>
      Buffer.from(RemoveTempContainerRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RemoveTempContainerRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  addSandboxImage: {
    path: "/dockerGet.Docker/addSandboxImage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddSandBoxImageRequest) =>
      Buffer.from(AddSandBoxImageRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddSandBoxImageRequest.decode(value),
    responseSerialize: (value: AddSandBoxImageReply) =>
      Buffer.from(AddSandBoxImageReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddSandBoxImageReply.decode(value),
  },
  updateSandboxImage: {
    path: "/dockerGet.Docker/updateSandboxImage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateSandBoxImageRequest) =>
      Buffer.from(UpdateSandBoxImageRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      UpdateSandBoxImageRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  removeSandboxImage: {
    path: "/dockerGet.Docker/removeSandboxImage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SandBoxImageIdRequest) =>
      Buffer.from(SandBoxImageIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SandBoxImageIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  listSandboxImage: {
    path: "/dockerGet.Docker/listSandboxImage",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListSandBoxImageRequest) =>
      Buffer.from(ListSandBoxImageRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      ListSandBoxImageRequest.decode(value),
    responseSerialize: (value: ListSandBoxImageReply) =>
      Buffer.from(ListSandBoxImageReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListSandBoxImageReply.decode(value),
  },
  addSandbox: {
    path: "/dockerGet.Docker/addSandbox",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddSandBoxRequest) =>
      Buffer.from(AddSandBoxRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddSandBoxRequest.decode(value),
    responseSerialize: (value: AddSandBoxReply) =>
      Buffer.from(AddSandBoxReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AddSandBoxReply.decode(value),
  },
  removeSandbox: {
    path: "/dockerGet.Docker/removeSandbox",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SandBoxIdRequest) =>
      Buffer.from(SandBoxIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SandBoxIdRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  getUserData: {
    path: "/dockerGet.Docker/getUserData",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetUserDataRequest) =>
      Buffer.from(GetUserDataRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetUserDataRequest.decode(value),
    responseSerialize: (value: GetUserDataReply) =>
      Buffer.from(GetUserDataReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetUserDataReply.decode(value),
  },
  updateUserData: {
    path: "/dockerGet.Docker/updateUserData",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateUserDataRequest) =>
      Buffer.from(UpdateUserDataRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateUserDataRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  getNotificationToken: {
    path: "/dockerGet.Docker/getNotificationToken",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SubRequest) =>
      Buffer.from(SubRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SubRequest.decode(value),
    responseSerialize: (value: GetNotificationTokenReply) =>
      Buffer.from(GetNotificationTokenReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      GetNotificationTokenReply.decode(value),
  },
  sendNotification: {
    path: "/dockerGet.Docker/sendNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendNotificationRequest) =>
      Buffer.from(SendNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      SendNotificationRequest.decode(value),
    responseSerialize: (value: SendNotificationReply) =>
      Buffer.from(SendNotificationReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SendNotificationReply.decode(value),
  },
  listNotifications: {
    path: "/dockerGet.Docker/listNotifications",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UserIdRequest) =>
      Buffer.from(UserIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UserIdRequest.decode(value),
    responseSerialize: (value: ListNotificationsReply) =>
      Buffer.from(ListNotificationsReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) =>
      ListNotificationsReply.decode(value),
  },
  changeNotificationRead: {
    path: "/dockerGet.Docker/changeNotificationRead",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ChangeNotificationReadRequest) =>
      Buffer.from(ChangeNotificationReadRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      ChangeNotificationReadRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  removeNotification: {
    path: "/dockerGet.Docker/removeNotification",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RemoveNotificationRequest) =>
      Buffer.from(RemoveNotificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RemoveNotificationRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  updateNotificationToken: {
    path: "/dockerGet.Docker/updateNotificationToken",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateNotificationTokenRequest) =>
      Buffer.from(UpdateNotificationTokenRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      UpdateNotificationTokenRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  updateSubscription: {
    path: "/dockerGet.Docker/updateSubscription",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateSubscriptionRequest) =>
      Buffer.from(UpdateSubscriptionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      UpdateSubscriptionRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  sendNotificationAnnouncement: {
    path: "/dockerGet.Docker/sendNotificationAnnouncement",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendNotificationAnnouncementRequest) =>
      Buffer.from(SendNotificationAnnouncementRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      SendNotificationAnnouncementRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  googleOAuth: {
    path: "/dockerGet.Docker/googleOAuth",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EmptyRequest) =>
      Buffer.from(EmptyRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EmptyRequest.decode(value),
    responseSerialize: (value: GoogleOAuthReply) =>
      Buffer.from(GoogleOAuthReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GoogleOAuthReply.decode(value),
  },
  requestAccessToken: {
    path: "/dockerGet.Docker/requestAccessToken",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CodeRequest) =>
      Buffer.from(CodeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CodeRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  googleListFile: {
    path: "/dockerGet.Docker/googleListFile",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListFilesRequest) =>
      Buffer.from(ListFilesRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListFilesRequest.decode(value),
    responseSerialize: (value: ChildrenReply) =>
      Buffer.from(ChildrenReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ChildrenReply.decode(value),
  },
  googleDownloadFiles: {
    path: "/dockerGet.Docker/googleDownloadFiles",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DownloadRequest) =>
      Buffer.from(DownloadRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DownloadRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
  googleUploadFiles: {
    path: "/dockerGet.Docker/googleUploadFiles",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UploadRequest) =>
      Buffer.from(UploadRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UploadRequest.decode(value),
    responseSerialize: (value: SuccessStringReply) =>
      Buffer.from(SuccessStringReply.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SuccessStringReply.decode(value),
  },
} as const;

export interface DockerServer extends UntypedServiceImplementation {
  checkHaveContainer: handleUnaryCall<
    CheckHaveContainerRequest,
    SuccessStringReply
  >;
  listContainers: handleUnaryCall<SubRequest, ListContainerReply>;
  listCourses: handleUnaryCall<SubRequest, ListCoursesReply>;
  getSectionInfo: handleUnaryCall<SectionAndSubRequest, GetSectionInfoReply>;
  listEnvironments: handleUnaryCall<
    SectionAndSubRequest,
    ListEnvironmentsReply
  >;
  listTemplates: handleUnaryCall<SectionAndSubRequest, ListTemplatesReply>;
  addContainer: handleUnaryCall<AddContainerRequest, AddContainerReply>;
  instantAddContainer: handleUnaryCall<
    InstantAddContainerRequest,
    AddContainerReply
  >;
  removeContainer: handleUnaryCall<RemoveContainerRequest, SuccessStringReply>;
  submitFiles: handleUnaryCall<SubmitFilesRequest, SuccessStringReply>;
  getContainerTime: handleUnaryCall<RemoveContainerRequest, ContainerTimeReply>;
  addTemplate: handleUnaryCall<AddTemplateRequest, AddTemplateReply>;
  updateTemplate: handleUnaryCall<UpdateTemplateRequest, SuccessStringReply>;
  activateTemplate: handleUnaryCall<TemplateIdRequest, SuccessStringReply>;
  deactivateTemplate: handleUnaryCall<TemplateIdRequest, SuccessStringReply>;
  removeTemplate: handleUnaryCall<TemplateIdRequest, SuccessStringReply>;
  getTemplateStudentWorkspace: handleUnaryCall<
    TemplateIdRequest,
    TemplateGetStudentWorkspaceReply
  >;
  addEnvironment: handleUnaryCall<AddEnvironmentRequest, AddEnvironmentReply>;
  updateEnvironment: handleUnaryCall<
    UpdateEnvironmentRequest,
    SuccessStringReply
  >;
  buildEnvironment: handleUnaryCall<
    BuildEnvironmentRequest,
    AddEnvironmentReply
  >;
  removeEnvironment: handleUnaryCall<EnvironmentIdRequest, SuccessStringReply>;
  addTempContainer: handleUnaryCall<
    AddTempContainerRequest,
    AddTempContainerReply
  >;
  removeTempContainer: handleUnaryCall<
    RemoveTempContainerRequest,
    SuccessStringReply
  >;
  addSandboxImage: handleUnaryCall<
    AddSandBoxImageRequest,
    AddSandBoxImageReply
  >;
  updateSandboxImage: handleUnaryCall<
    UpdateSandBoxImageRequest,
    SuccessStringReply
  >;
  removeSandboxImage: handleUnaryCall<
    SandBoxImageIdRequest,
    SuccessStringReply
  >;
  listSandboxImage: handleUnaryCall<
    ListSandBoxImageRequest,
    ListSandBoxImageReply
  >;
  addSandbox: handleUnaryCall<AddSandBoxRequest, AddSandBoxReply>;
  removeSandbox: handleUnaryCall<SandBoxIdRequest, SuccessStringReply>;
  getUserData: handleUnaryCall<GetUserDataRequest, GetUserDataReply>;
  updateUserData: handleUnaryCall<UpdateUserDataRequest, SuccessStringReply>;
  getNotificationToken: handleUnaryCall<SubRequest, GetNotificationTokenReply>;
  sendNotification: handleUnaryCall<
    SendNotificationRequest,
    SendNotificationReply
  >;
  listNotifications: handleUnaryCall<UserIdRequest, ListNotificationsReply>;
  changeNotificationRead: handleUnaryCall<
    ChangeNotificationReadRequest,
    SuccessStringReply
  >;
  removeNotification: handleUnaryCall<
    RemoveNotificationRequest,
    SuccessStringReply
  >;
  updateNotificationToken: handleUnaryCall<
    UpdateNotificationTokenRequest,
    SuccessStringReply
  >;
  updateSubscription: handleUnaryCall<
    UpdateSubscriptionRequest,
    SuccessStringReply
  >;
  sendNotificationAnnouncement: handleUnaryCall<
    SendNotificationAnnouncementRequest,
    SuccessStringReply
  >;
  googleOAuth: handleUnaryCall<EmptyRequest, GoogleOAuthReply>;
  requestAccessToken: handleUnaryCall<CodeRequest, SuccessStringReply>;
  googleListFile: handleUnaryCall<ListFilesRequest, ChildrenReply>;
  googleDownloadFiles: handleUnaryCall<DownloadRequest, SuccessStringReply>;
  googleUploadFiles: handleUnaryCall<UploadRequest, SuccessStringReply>;
}

export interface DockerClient extends Client {
  checkHaveContainer(
    request: CheckHaveContainerRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  checkHaveContainer(
    request: CheckHaveContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  checkHaveContainer(
    request: CheckHaveContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  listContainers(
    request: SubRequest,
    callback: (error: ServiceError | null, response: ListContainerReply) => void
  ): ClientUnaryCall;
  listContainers(
    request: SubRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListContainerReply) => void
  ): ClientUnaryCall;
  listContainers(
    request: SubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListContainerReply) => void
  ): ClientUnaryCall;
  listCourses(
    request: SubRequest,
    callback: (error: ServiceError | null, response: ListCoursesReply) => void
  ): ClientUnaryCall;
  listCourses(
    request: SubRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListCoursesReply) => void
  ): ClientUnaryCall;
  listCourses(
    request: SubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListCoursesReply) => void
  ): ClientUnaryCall;
  getSectionInfo(
    request: SectionAndSubRequest,
    callback: (
      error: ServiceError | null,
      response: GetSectionInfoReply
    ) => void
  ): ClientUnaryCall;
  getSectionInfo(
    request: SectionAndSubRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetSectionInfoReply
    ) => void
  ): ClientUnaryCall;
  getSectionInfo(
    request: SectionAndSubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetSectionInfoReply
    ) => void
  ): ClientUnaryCall;
  listEnvironments(
    request: SectionAndSubRequest,
    callback: (
      error: ServiceError | null,
      response: ListEnvironmentsReply
    ) => void
  ): ClientUnaryCall;
  listEnvironments(
    request: SectionAndSubRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListEnvironmentsReply
    ) => void
  ): ClientUnaryCall;
  listEnvironments(
    request: SectionAndSubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListEnvironmentsReply
    ) => void
  ): ClientUnaryCall;
  listTemplates(
    request: SectionAndSubRequest,
    callback: (error: ServiceError | null, response: ListTemplatesReply) => void
  ): ClientUnaryCall;
  listTemplates(
    request: SectionAndSubRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListTemplatesReply) => void
  ): ClientUnaryCall;
  listTemplates(
    request: SectionAndSubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListTemplatesReply) => void
  ): ClientUnaryCall;
  addContainer(
    request: AddContainerRequest,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  addContainer(
    request: AddContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  addContainer(
    request: AddContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  instantAddContainer(
    request: InstantAddContainerRequest,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  instantAddContainer(
    request: InstantAddContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  instantAddContainer(
    request: InstantAddContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AddContainerReply) => void
  ): ClientUnaryCall;
  removeContainer(
    request: RemoveContainerRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeContainer(
    request: RemoveContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeContainer(
    request: RemoveContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  submitFiles(
    request: SubmitFilesRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  submitFiles(
    request: SubmitFilesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  submitFiles(
    request: SubmitFilesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  getContainerTime(
    request: RemoveContainerRequest,
    callback: (error: ServiceError | null, response: ContainerTimeReply) => void
  ): ClientUnaryCall;
  getContainerTime(
    request: RemoveContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ContainerTimeReply) => void
  ): ClientUnaryCall;
  getContainerTime(
    request: RemoveContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ContainerTimeReply) => void
  ): ClientUnaryCall;
  addTemplate(
    request: AddTemplateRequest,
    callback: (error: ServiceError | null, response: AddTemplateReply) => void
  ): ClientUnaryCall;
  addTemplate(
    request: AddTemplateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AddTemplateReply) => void
  ): ClientUnaryCall;
  addTemplate(
    request: AddTemplateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AddTemplateReply) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateTemplate(
    request: UpdateTemplateRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  activateTemplate(
    request: TemplateIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  activateTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  activateTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  deactivateTemplate(
    request: TemplateIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  deactivateTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  deactivateTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeTemplate(
    request: TemplateIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeTemplate(
    request: TemplateIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  getTemplateStudentWorkspace(
    request: TemplateIdRequest,
    callback: (
      error: ServiceError | null,
      response: TemplateGetStudentWorkspaceReply
    ) => void
  ): ClientUnaryCall;
  getTemplateStudentWorkspace(
    request: TemplateIdRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: TemplateGetStudentWorkspaceReply
    ) => void
  ): ClientUnaryCall;
  getTemplateStudentWorkspace(
    request: TemplateIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: TemplateGetStudentWorkspaceReply
    ) => void
  ): ClientUnaryCall;
  addEnvironment(
    request: AddEnvironmentRequest,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  addEnvironment(
    request: AddEnvironmentRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  addEnvironment(
    request: AddEnvironmentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  updateEnvironment(
    request: UpdateEnvironmentRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateEnvironment(
    request: UpdateEnvironmentRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateEnvironment(
    request: UpdateEnvironmentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  buildEnvironment(
    request: BuildEnvironmentRequest,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  buildEnvironment(
    request: BuildEnvironmentRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  buildEnvironment(
    request: BuildEnvironmentRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: AddEnvironmentReply
    ) => void
  ): ClientUnaryCall;
  removeEnvironment(
    request: EnvironmentIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeEnvironment(
    request: EnvironmentIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeEnvironment(
    request: EnvironmentIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  addTempContainer(
    request: AddTempContainerRequest,
    callback: (
      error: ServiceError | null,
      response: AddTempContainerReply
    ) => void
  ): ClientUnaryCall;
  addTempContainer(
    request: AddTempContainerRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: AddTempContainerReply
    ) => void
  ): ClientUnaryCall;
  addTempContainer(
    request: AddTempContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: AddTempContainerReply
    ) => void
  ): ClientUnaryCall;
  removeTempContainer(
    request: RemoveTempContainerRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeTempContainer(
    request: RemoveTempContainerRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeTempContainer(
    request: RemoveTempContainerRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  addSandboxImage(
    request: AddSandBoxImageRequest,
    callback: (
      error: ServiceError | null,
      response: AddSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  addSandboxImage(
    request: AddSandBoxImageRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: AddSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  addSandboxImage(
    request: AddSandBoxImageRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: AddSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  updateSandboxImage(
    request: UpdateSandBoxImageRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateSandboxImage(
    request: UpdateSandBoxImageRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateSandboxImage(
    request: UpdateSandBoxImageRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeSandboxImage(
    request: SandBoxImageIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeSandboxImage(
    request: SandBoxImageIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeSandboxImage(
    request: SandBoxImageIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  listSandboxImage(
    request: ListSandBoxImageRequest,
    callback: (
      error: ServiceError | null,
      response: ListSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  listSandboxImage(
    request: ListSandBoxImageRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  listSandboxImage(
    request: ListSandBoxImageRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListSandBoxImageReply
    ) => void
  ): ClientUnaryCall;
  addSandbox(
    request: AddSandBoxRequest,
    callback: (error: ServiceError | null, response: AddSandBoxReply) => void
  ): ClientUnaryCall;
  addSandbox(
    request: AddSandBoxRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AddSandBoxReply) => void
  ): ClientUnaryCall;
  addSandbox(
    request: AddSandBoxRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AddSandBoxReply) => void
  ): ClientUnaryCall;
  removeSandbox(
    request: SandBoxIdRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeSandbox(
    request: SandBoxIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeSandbox(
    request: SandBoxIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  getUserData(
    request: GetUserDataRequest,
    callback: (error: ServiceError | null, response: GetUserDataReply) => void
  ): ClientUnaryCall;
  getUserData(
    request: GetUserDataRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetUserDataReply) => void
  ): ClientUnaryCall;
  getUserData(
    request: GetUserDataRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetUserDataReply) => void
  ): ClientUnaryCall;
  updateUserData(
    request: UpdateUserDataRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateUserData(
    request: UpdateUserDataRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateUserData(
    request: UpdateUserDataRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  getNotificationToken(
    request: SubRequest,
    callback: (
      error: ServiceError | null,
      response: GetNotificationTokenReply
    ) => void
  ): ClientUnaryCall;
  getNotificationToken(
    request: SubRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: GetNotificationTokenReply
    ) => void
  ): ClientUnaryCall;
  getNotificationToken(
    request: SubRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: GetNotificationTokenReply
    ) => void
  ): ClientUnaryCall;
  sendNotification(
    request: SendNotificationRequest,
    callback: (
      error: ServiceError | null,
      response: SendNotificationReply
    ) => void
  ): ClientUnaryCall;
  sendNotification(
    request: SendNotificationRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: SendNotificationReply
    ) => void
  ): ClientUnaryCall;
  sendNotification(
    request: SendNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: SendNotificationReply
    ) => void
  ): ClientUnaryCall;
  listNotifications(
    request: UserIdRequest,
    callback: (
      error: ServiceError | null,
      response: ListNotificationsReply
    ) => void
  ): ClientUnaryCall;
  listNotifications(
    request: UserIdRequest,
    metadata: Metadata,
    callback: (
      error: ServiceError | null,
      response: ListNotificationsReply
    ) => void
  ): ClientUnaryCall;
  listNotifications(
    request: UserIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (
      error: ServiceError | null,
      response: ListNotificationsReply
    ) => void
  ): ClientUnaryCall;
  changeNotificationRead(
    request: ChangeNotificationReadRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  changeNotificationRead(
    request: ChangeNotificationReadRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  changeNotificationRead(
    request: ChangeNotificationReadRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  removeNotification(
    request: RemoveNotificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateNotificationToken(
    request: UpdateNotificationTokenRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateNotificationToken(
    request: UpdateNotificationTokenRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateNotificationToken(
    request: UpdateNotificationTokenRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateSubscription(
    request: UpdateSubscriptionRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateSubscription(
    request: UpdateSubscriptionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  updateSubscription(
    request: UpdateSubscriptionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  sendNotificationAnnouncement(
    request: SendNotificationAnnouncementRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  sendNotificationAnnouncement(
    request: SendNotificationAnnouncementRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  sendNotificationAnnouncement(
    request: SendNotificationAnnouncementRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleOAuth(
    request: EmptyRequest,
    callback: (error: ServiceError | null, response: GoogleOAuthReply) => void
  ): ClientUnaryCall;
  googleOAuth(
    request: EmptyRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GoogleOAuthReply) => void
  ): ClientUnaryCall;
  googleOAuth(
    request: EmptyRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GoogleOAuthReply) => void
  ): ClientUnaryCall;
  requestAccessToken(
    request: CodeRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  requestAccessToken(
    request: CodeRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  requestAccessToken(
    request: CodeRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleListFile(
    request: ListFilesRequest,
    callback: (error: ServiceError | null, response: ChildrenReply) => void
  ): ClientUnaryCall;
  googleListFile(
    request: ListFilesRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ChildrenReply) => void
  ): ClientUnaryCall;
  googleListFile(
    request: ListFilesRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ChildrenReply) => void
  ): ClientUnaryCall;
  googleDownloadFiles(
    request: DownloadRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleDownloadFiles(
    request: DownloadRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleDownloadFiles(
    request: DownloadRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleUploadFiles(
    request: UploadRequest,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleUploadFiles(
    request: UploadRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
  googleUploadFiles(
    request: UploadRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SuccessStringReply) => void
  ): ClientUnaryCall;
}

export const DockerClient = makeGenericClientConstructor(
  DockerService,
  "dockerGet.Docker"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): DockerClient;
  service: typeof DockerService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
