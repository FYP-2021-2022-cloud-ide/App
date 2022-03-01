// package: dockerGet
// file: dockerGet.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Error extends jspb.Message { 
    getStatus(): string;
    setStatus(value: string): Error;
    getError(): string;
    setError(value: string): Error;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Error.AsObject;
    static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Error;
    static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
    export type AsObject = {
        status: string,
        error: string,
    }
}

export class ListFilesRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): ListFilesRequest;
    getSub(): string;
    setSub(value: string): ListFilesRequest;
    getFolderid(): string;
    setFolderid(value: string): ListFilesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListFilesRequest): ListFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListFilesRequest;
    static deserializeBinaryFromReader(message: ListFilesRequest, reader: jspb.BinaryReader): ListFilesRequest;
}

export namespace ListFilesRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        folderid: string,
    }
}

export class ChildrenReply extends jspb.Message { 
    clearFilesList(): void;
    getFilesList(): Array<ChildrenReply.child>;
    setFilesList(value: Array<ChildrenReply.child>): ChildrenReply;
    addFiles(value?: ChildrenReply.child, index?: number): ChildrenReply.child;
    clearFoldersList(): void;
    getFoldersList(): Array<ChildrenReply.child>;
    setFoldersList(value: Array<ChildrenReply.child>): ChildrenReply;
    addFolders(value?: ChildrenReply.child, index?: number): ChildrenReply.child;
    getSuccess(): boolean;
    setSuccess(value: boolean): ChildrenReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ChildrenReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChildrenReply.AsObject;
    static toObject(includeInstance: boolean, msg: ChildrenReply): ChildrenReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChildrenReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChildrenReply;
    static deserializeBinaryFromReader(message: ChildrenReply, reader: jspb.BinaryReader): ChildrenReply;
}

export namespace ChildrenReply {
    export type AsObject = {
        filesList: Array<ChildrenReply.child.AsObject>,
        foldersList: Array<ChildrenReply.child.AsObject>,
        success: boolean,
        error?: Error.AsObject,
    }


    export class child extends jspb.Message { 
        getId(): string;
        setId(value: string): child;
        getName(): string;
        setName(value: string): child;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): child.AsObject;
        static toObject(includeInstance: boolean, msg: child): child.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: child, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): child;
        static deserializeBinaryFromReader(message: child, reader: jspb.BinaryReader): child;
    }

    export namespace child {
        export type AsObject = {
            id: string,
            name: string,
        }
    }

}

export class CodeRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): CodeRequest;
    getCode(): string;
    setCode(value: string): CodeRequest;
    getSub(): string;
    setSub(value: string): CodeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CodeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CodeRequest): CodeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CodeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CodeRequest;
    static deserializeBinaryFromReader(message: CodeRequest, reader: jspb.BinaryReader): CodeRequest;
}

export namespace CodeRequest {
    export type AsObject = {
        sessionKey: string,
        code: string,
        sub: string,
    }
}

export class UserIdRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UserIdRequest;
    getUserid(): string;
    setUserid(value: string): UserIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserIdRequest): UserIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserIdRequest;
    static deserializeBinaryFromReader(message: UserIdRequest, reader: jspb.BinaryReader): UserIdRequest;
}

export namespace UserIdRequest {
    export type AsObject = {
        sessionKey: string,
        userid: string,
    }
}

export class ListNotificationsReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListNotificationsReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListNotificationsReply;
    clearNotificationsList(): void;
    getNotificationsList(): Array<ListNotificationsReply.Notification>;
    setNotificationsList(value: Array<ListNotificationsReply.Notification>): ListNotificationsReply;
    addNotifications(value?: ListNotificationsReply.Notification, index?: number): ListNotificationsReply.Notification;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListNotificationsReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListNotificationsReply): ListNotificationsReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListNotificationsReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListNotificationsReply;
    static deserializeBinaryFromReader(message: ListNotificationsReply, reader: jspb.BinaryReader): ListNotificationsReply;
}

export namespace ListNotificationsReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        notificationsList: Array<ListNotificationsReply.Notification.AsObject>,
    }


    export class Notification extends jspb.Message { 
        getId(): string;
        setId(value: string): Notification;
        getTitle(): string;
        setTitle(value: string): Notification;
        getBody(): string;
        setBody(value: string): Notification;

        hasSender(): boolean;
        clearSender(): void;
        getSender(): ListNotificationsReply.Notification.Sender | undefined;
        setSender(value?: ListNotificationsReply.Notification.Sender): Notification;
        getAllowReply(): boolean;
        setAllowReply(value: boolean): Notification;
        getUpdatedAt(): string;
        setUpdatedAt(value: string): Notification;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Notification.AsObject;
        static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Notification;
        static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
    }

    export namespace Notification {
        export type AsObject = {
            id: string,
            title: string,
            body: string,
            sender?: ListNotificationsReply.Notification.Sender.AsObject,
            allowReply: boolean,
            updatedAt: string,
        }


        export class Sender extends jspb.Message { 
            getId(): string;
            setId(value: string): Sender;
            getSub(): string;
            setSub(value: string): Sender;
            getName(): string;
            setName(value: string): Sender;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Sender.AsObject;
            static toObject(includeInstance: boolean, msg: Sender): Sender.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Sender, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Sender;
            static deserializeBinaryFromReader(message: Sender, reader: jspb.BinaryReader): Sender;
        }

        export namespace Sender {
            export type AsObject = {
                id: string,
                sub: string,
                name: string,
            }
        }

    }

}

export class EmptyRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): EmptyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyRequest;
    static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
    export type AsObject = {
        sessionKey: string,
    }
}

export class ListContainerReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListContainerReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListContainerReply;

    hasContainerinfo(): boolean;
    clearContainerinfo(): void;
    getContainerinfo(): ListContainerReply.ContainersInfo | undefined;
    setContainerinfo(value?: ListContainerReply.ContainersInfo): ListContainerReply;
    clearContainersList(): void;
    getContainersList(): Array<ListContainerReply.Container>;
    setContainersList(value: Array<ListContainerReply.Container>): ListContainerReply;
    addContainers(value?: ListContainerReply.Container, index?: number): ListContainerReply.Container;
    clearTempcontainersList(): void;
    getTempcontainersList(): Array<ListContainerReply.Container>;
    setTempcontainersList(value: Array<ListContainerReply.Container>): ListContainerReply;
    addTempcontainers(value?: ListContainerReply.Container, index?: number): ListContainerReply.Container;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListContainerReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListContainerReply): ListContainerReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListContainerReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListContainerReply;
    static deserializeBinaryFromReader(message: ListContainerReply, reader: jspb.BinaryReader): ListContainerReply;
}

export namespace ListContainerReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        containerinfo?: ListContainerReply.ContainersInfo.AsObject,
        containersList: Array<ListContainerReply.Container.AsObject>,
        tempcontainersList: Array<ListContainerReply.Container.AsObject>,
    }


    export class ContainersInfo extends jspb.Message { 
        getContainersalive(): number;
        setContainersalive(value: number): ContainersInfo;
        getContainerstotal(): number;
        setContainerstotal(value: number): ContainersInfo;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): ContainersInfo.AsObject;
        static toObject(includeInstance: boolean, msg: ContainersInfo): ContainersInfo.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: ContainersInfo, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): ContainersInfo;
        static deserializeBinaryFromReader(message: ContainersInfo, reader: jspb.BinaryReader): ContainersInfo;
    }

    export namespace ContainersInfo {
        export type AsObject = {
            containersalive: number,
            containerstotal: number,
        }
    }

    export class Container extends jspb.Message { 
        getCoursetitle(): string;
        setCoursetitle(value: string): Container;
        getAssignmentname(): string;
        setAssignmentname(value: string): Container;
        getExistedtime(): string;
        setExistedtime(value: string): Container;
        getContainerid(): string;
        setContainerid(value: string): Container;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Container.AsObject;
        static toObject(includeInstance: boolean, msg: Container): Container.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Container, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Container;
        static deserializeBinaryFromReader(message: Container, reader: jspb.BinaryReader): Container;
    }

    export namespace Container {
        export type AsObject = {
            coursetitle: string,
            assignmentname: string,
            existedtime: string,
            containerid: string,
        }
    }

}

export class ListCoursesReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListCoursesReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListCoursesReply;
    clearCoursesList(): void;
    getCoursesList(): Array<ListCoursesReply.Course>;
    setCoursesList(value: Array<ListCoursesReply.Course>): ListCoursesReply;
    addCourses(value?: ListCoursesReply.Course, index?: number): ListCoursesReply.Course;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListCoursesReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListCoursesReply): ListCoursesReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListCoursesReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListCoursesReply;
    static deserializeBinaryFromReader(message: ListCoursesReply, reader: jspb.BinaryReader): ListCoursesReply;
}

export namespace ListCoursesReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        coursesList: Array<ListCoursesReply.Course.AsObject>,
    }


    export class Course extends jspb.Message { 
        getSectionid(): string;
        setSectionid(value: string): Course;
        getCoursecode(): string;
        setCoursecode(value: string): Course;
        getSection(): string;
        setSection(value: string): Course;
        getName(): string;
        setName(value: string): Course;
        getSectionrole(): string;
        setSectionrole(value: string): Course;
        getLastupdatetime(): string;
        setLastupdatetime(value: string): Course;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Course.AsObject;
        static toObject(includeInstance: boolean, msg: Course): Course.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Course, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Course;
        static deserializeBinaryFromReader(message: Course, reader: jspb.BinaryReader): Course;
    }

    export namespace Course {
        export type AsObject = {
            sectionid: string,
            coursecode: string,
            section: string,
            name: string,
            sectionrole: string,
            lastupdatetime: string,
        }
    }

}

export class GetSectionInfoReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetSectionInfoReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): GetSectionInfoReply;
    getSectionuserid(): string;
    setSectionuserid(value: string): GetSectionInfoReply;
    getCoursename(): string;
    setCoursename(value: string): GetSectionInfoReply;
    getRole(): string;
    setRole(value: string): GetSectionInfoReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSectionInfoReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetSectionInfoReply): GetSectionInfoReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSectionInfoReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSectionInfoReply;
    static deserializeBinaryFromReader(message: GetSectionInfoReply, reader: jspb.BinaryReader): GetSectionInfoReply;
}

export namespace GetSectionInfoReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        sectionuserid: string,
        coursename: string,
        role: string,
    }
}

export class ListEnvironmentsReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListEnvironmentsReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListEnvironmentsReply;
    clearEnvironmentsList(): void;
    getEnvironmentsList(): Array<ListEnvironmentsReply.Environment>;
    setEnvironmentsList(value: Array<ListEnvironmentsReply.Environment>): ListEnvironmentsReply;
    addEnvironments(value?: ListEnvironmentsReply.Environment, index?: number): ListEnvironmentsReply.Environment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListEnvironmentsReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListEnvironmentsReply): ListEnvironmentsReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListEnvironmentsReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListEnvironmentsReply;
    static deserializeBinaryFromReader(message: ListEnvironmentsReply, reader: jspb.BinaryReader): ListEnvironmentsReply;
}

export namespace ListEnvironmentsReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        environmentsList: Array<ListEnvironmentsReply.Environment.AsObject>,
    }


    export class Environment extends jspb.Message { 
        getId(): string;
        setId(value: string): Environment;
        getImageid(): string;
        setImageid(value: string): Environment;
        getEnvironmentname(): string;
        setEnvironmentname(value: string): Environment;
        getLibraries(): string;
        setLibraries(value: string): Environment;
        getDescription(): string;
        setDescription(value: string): Environment;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Environment.AsObject;
        static toObject(includeInstance: boolean, msg: Environment): Environment.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Environment, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Environment;
        static deserializeBinaryFromReader(message: Environment, reader: jspb.BinaryReader): Environment;
    }

    export namespace Environment {
        export type AsObject = {
            id: string,
            imageid: string,
            environmentname: string,
            libraries: string,
            description: string,
        }
    }

}

export class ListTemplatesReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListTemplatesReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListTemplatesReply;
    clearTemplatesList(): void;
    getTemplatesList(): Array<ListTemplatesReply.Template>;
    setTemplatesList(value: Array<ListTemplatesReply.Template>): ListTemplatesReply;
    addTemplates(value?: ListTemplatesReply.Template, index?: number): ListTemplatesReply.Template;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListTemplatesReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListTemplatesReply): ListTemplatesReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListTemplatesReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListTemplatesReply;
    static deserializeBinaryFromReader(message: ListTemplatesReply, reader: jspb.BinaryReader): ListTemplatesReply;
}

export namespace ListTemplatesReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        templatesList: Array<ListTemplatesReply.Template.AsObject>,
    }


    export class Template extends jspb.Message { 
        getId(): string;
        setId(value: string): Template;
        getName(): string;
        setName(value: string): Template;
        getDescription(): string;
        setDescription(value: string): Template;
        getEnvironmentId(): string;
        setEnvironmentId(value: string): Template;
        getImageid(): string;
        setImageid(value: string): Template;
        getAssignmentConfigId(): string;
        setAssignmentConfigId(value: string): Template;
        getStorage(): string;
        setStorage(value: string): Template;
        getActive(): boolean;
        setActive(value: boolean): Template;
        getIsExam(): boolean;
        setIsExam(value: boolean): Template;
        getTimeLimit(): number;
        setTimeLimit(value: number): Template;
        getAllowNotification(): boolean;
        setAllowNotification(value: boolean): Template;
        clearContaineridList(): void;
        getContaineridList(): Array<string>;
        setContaineridList(value: Array<string>): Template;
        addContainerid(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Template.AsObject;
        static toObject(includeInstance: boolean, msg: Template): Template.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Template, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Template;
        static deserializeBinaryFromReader(message: Template, reader: jspb.BinaryReader): Template;
    }

    export namespace Template {
        export type AsObject = {
            id: string,
            name: string,
            description: string,
            environmentId: string,
            imageid: string,
            assignmentConfigId: string,
            storage: string,
            active: boolean,
            isExam: boolean,
            timeLimit: number,
            allowNotification: boolean,
            containeridList: Array<string>,
        }
    }

}

export class AddContainerRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): AddContainerRequest;
    getImagename(): string;
    setImagename(value: string): AddContainerRequest;
    getEnvironmentId(): string;
    setEnvironmentId(value: string): AddContainerRequest;
    getMemlimit(): number;
    setMemlimit(value: number): AddContainerRequest;
    getNumcpu(): number;
    setNumcpu(value: number): AddContainerRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): AddContainerRequest;
    getTemplateId(): string;
    setTemplateId(value: string): AddContainerRequest;
    getAccessright(): string;
    setAccessright(value: string): AddContainerRequest;
    getUsefresh(): boolean;
    setUsefresh(value: boolean): AddContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddContainerRequest): AddContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddContainerRequest;
    static deserializeBinaryFromReader(message: AddContainerRequest, reader: jspb.BinaryReader): AddContainerRequest;
}

export namespace AddContainerRequest {
    export type AsObject = {
        sessionKey: string,
        imagename: string,
        environmentId: string,
        memlimit: number,
        numcpu: number,
        sectionUserId: string,
        templateId: string,
        accessright: string,
        usefresh: boolean,
    }
}

export class InstantAddContainerRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): InstantAddContainerRequest;
    getSub(): string;
    setSub(value: string): InstantAddContainerRequest;
    getTemplateId(): string;
    setTemplateId(value: string): InstantAddContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InstantAddContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: InstantAddContainerRequest): InstantAddContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InstantAddContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InstantAddContainerRequest;
    static deserializeBinaryFromReader(message: InstantAddContainerRequest, reader: jspb.BinaryReader): InstantAddContainerRequest;
}

export namespace InstantAddContainerRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        templateId: string,
    }
}

export class AddContainerReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddContainerReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddContainerReply;
    getContainerid(): string;
    setContainerid(value: string): AddContainerReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddContainerReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddContainerReply): AddContainerReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddContainerReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddContainerReply;
    static deserializeBinaryFromReader(message: AddContainerReply, reader: jspb.BinaryReader): AddContainerReply;
}

export namespace AddContainerReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        containerid: string,
    }
}

export class RemoveContainerRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): RemoveContainerRequest;
    getContainerid(): string;
    setContainerid(value: string): RemoveContainerRequest;
    getSub(): string;
    setSub(value: string): RemoveContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveContainerRequest): RemoveContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveContainerRequest;
    static deserializeBinaryFromReader(message: RemoveContainerRequest, reader: jspb.BinaryReader): RemoveContainerRequest;
}

export namespace RemoveContainerRequest {
    export type AsObject = {
        sessionKey: string,
        containerid: string,
        sub: string,
    }
}

export class SubmitFilesRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SubmitFilesRequest;
    getContainerid(): string;
    setContainerid(value: string): SubmitFilesRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): SubmitFilesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitFilesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitFilesRequest): SubmitFilesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitFilesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitFilesRequest;
    static deserializeBinaryFromReader(message: SubmitFilesRequest, reader: jspb.BinaryReader): SubmitFilesRequest;
}

export namespace SubmitFilesRequest {
    export type AsObject = {
        sessionKey: string,
        containerid: string,
        sectionUserId: string,
    }
}

export class ContainerTimeReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ContainerTimeReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ContainerTimeReply;
    getIsExam(): boolean;
    setIsExam(value: boolean): ContainerTimeReply;
    getTimeLimit(): string;
    setTimeLimit(value: string): ContainerTimeReply;
    getCreatedAt(): string;
    setCreatedAt(value: string): ContainerTimeReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContainerTimeReply.AsObject;
    static toObject(includeInstance: boolean, msg: ContainerTimeReply): ContainerTimeReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContainerTimeReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContainerTimeReply;
    static deserializeBinaryFromReader(message: ContainerTimeReply, reader: jspb.BinaryReader): ContainerTimeReply;
}

export namespace ContainerTimeReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        isExam: boolean,
        timeLimit: string,
        createdAt: string,
    }
}

export class AddTemplateRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): AddTemplateRequest;
    getName(): string;
    setName(value: string): AddTemplateRequest;
    getDescription(): string;
    setDescription(value: string): AddTemplateRequest;
    getEnvironmentId(): string;
    setEnvironmentId(value: string): AddTemplateRequest;
    getContainerid(): string;
    setContainerid(value: string): AddTemplateRequest;
    getAssignmentConfigId(): string;
    setAssignmentConfigId(value: string): AddTemplateRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): AddTemplateRequest;
    getActive(): boolean;
    setActive(value: boolean): AddTemplateRequest;
    getIsExam(): boolean;
    setIsExam(value: boolean): AddTemplateRequest;
    getTimeLimit(): number;
    setTimeLimit(value: number): AddTemplateRequest;
    getAllowNotification(): boolean;
    setAllowNotification(value: boolean): AddTemplateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddTemplateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddTemplateRequest): AddTemplateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddTemplateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddTemplateRequest;
    static deserializeBinaryFromReader(message: AddTemplateRequest, reader: jspb.BinaryReader): AddTemplateRequest;
}

export namespace AddTemplateRequest {
    export type AsObject = {
        sessionKey: string,
        name: string,
        description: string,
        environmentId: string,
        containerid: string,
        assignmentConfigId: string,
        sectionUserId: string,
        active: boolean,
        isExam: boolean,
        timeLimit: number,
        allowNotification: boolean,
    }
}

export class UpdateTemplateRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateTemplateRequest;
    getTemplateid(): string;
    setTemplateid(value: string): UpdateTemplateRequest;
    getName(): string;
    setName(value: string): UpdateTemplateRequest;
    getDescription(): string;
    setDescription(value: string): UpdateTemplateRequest;
    getContainerid(): string;
    setContainerid(value: string): UpdateTemplateRequest;
    getAssignmentConfigId(): string;
    setAssignmentConfigId(value: string): UpdateTemplateRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): UpdateTemplateRequest;
    getActive(): boolean;
    setActive(value: boolean): UpdateTemplateRequest;
    getIsExam(): boolean;
    setIsExam(value: boolean): UpdateTemplateRequest;
    getTimeLimit(): number;
    setTimeLimit(value: number): UpdateTemplateRequest;
    getAllowNotification(): boolean;
    setAllowNotification(value: boolean): UpdateTemplateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateTemplateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateTemplateRequest): UpdateTemplateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateTemplateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateTemplateRequest;
    static deserializeBinaryFromReader(message: UpdateTemplateRequest, reader: jspb.BinaryReader): UpdateTemplateRequest;
}

export namespace UpdateTemplateRequest {
    export type AsObject = {
        sessionKey: string,
        templateid: string,
        name: string,
        description: string,
        containerid: string,
        assignmentConfigId: string,
        sectionUserId: string,
        active: boolean,
        isExam: boolean,
        timeLimit: number,
        allowNotification: boolean,
    }
}

export class TemplateIdRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): TemplateIdRequest;
    getTemplateid(): string;
    setTemplateid(value: string): TemplateIdRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): TemplateIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TemplateIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TemplateIdRequest): TemplateIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TemplateIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TemplateIdRequest;
    static deserializeBinaryFromReader(message: TemplateIdRequest, reader: jspb.BinaryReader): TemplateIdRequest;
}

export namespace TemplateIdRequest {
    export type AsObject = {
        sessionKey: string,
        templateid: string,
        sectionUserId: string,
    }
}

export class AddTemplateReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddTemplateReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddTemplateReply;
    getTemplateid(): string;
    setTemplateid(value: string): AddTemplateReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddTemplateReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddTemplateReply): AddTemplateReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddTemplateReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddTemplateReply;
    static deserializeBinaryFromReader(message: AddTemplateReply, reader: jspb.BinaryReader): AddTemplateReply;
}

export namespace AddTemplateReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        templateid: string,
    }
}

export class TemplateGetStudentWorkspaceReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): TemplateGetStudentWorkspaceReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): TemplateGetStudentWorkspaceReply;
    clearStudentworkspacesList(): void;
    getStudentworkspacesList(): Array<TemplateGetStudentWorkspaceReply.StudentWorkspace>;
    setStudentworkspacesList(value: Array<TemplateGetStudentWorkspaceReply.StudentWorkspace>): TemplateGetStudentWorkspaceReply;
    addStudentworkspaces(value?: TemplateGetStudentWorkspaceReply.StudentWorkspace, index?: number): TemplateGetStudentWorkspaceReply.StudentWorkspace;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TemplateGetStudentWorkspaceReply.AsObject;
    static toObject(includeInstance: boolean, msg: TemplateGetStudentWorkspaceReply): TemplateGetStudentWorkspaceReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TemplateGetStudentWorkspaceReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TemplateGetStudentWorkspaceReply;
    static deserializeBinaryFromReader(message: TemplateGetStudentWorkspaceReply, reader: jspb.BinaryReader): TemplateGetStudentWorkspaceReply;
}

export namespace TemplateGetStudentWorkspaceReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        studentworkspacesList: Array<TemplateGetStudentWorkspaceReply.StudentWorkspace.AsObject>,
    }


    export class StudentWorkspace extends jspb.Message { 
        getStatus(): string;
        setStatus(value: string): StudentWorkspace;
        getWorkspaceid(): string;
        setWorkspaceid(value: string): StudentWorkspace;

        hasStudent(): boolean;
        clearStudent(): void;
        getStudent(): TemplateGetStudentWorkspaceReply.StudentWorkspace.Student | undefined;
        setStudent(value?: TemplateGetStudentWorkspaceReply.StudentWorkspace.Student): StudentWorkspace;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): StudentWorkspace.AsObject;
        static toObject(includeInstance: boolean, msg: StudentWorkspace): StudentWorkspace.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: StudentWorkspace, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): StudentWorkspace;
        static deserializeBinaryFromReader(message: StudentWorkspace, reader: jspb.BinaryReader): StudentWorkspace;
    }

    export namespace StudentWorkspace {
        export type AsObject = {
            status: string,
            workspaceid: string,
            student?: TemplateGetStudentWorkspaceReply.StudentWorkspace.Student.AsObject,
        }


        export class Student extends jspb.Message { 
            getName(): string;
            setName(value: string): Student;
            getSub(): string;
            setSub(value: string): Student;
            getUserid(): string;
            setUserid(value: string): Student;

            serializeBinary(): Uint8Array;
            toObject(includeInstance?: boolean): Student.AsObject;
            static toObject(includeInstance: boolean, msg: Student): Student.AsObject;
            static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
            static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
            static serializeBinaryToWriter(message: Student, writer: jspb.BinaryWriter): void;
            static deserializeBinary(bytes: Uint8Array): Student;
            static deserializeBinaryFromReader(message: Student, reader: jspb.BinaryReader): Student;
        }

        export namespace Student {
            export type AsObject = {
                name: string,
                sub: string,
                userid: string,
            }
        }

    }

}

export class AddEnvironmentRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): AddEnvironmentRequest;
    clearLibrariesList(): void;
    getLibrariesList(): Array<string>;
    setLibrariesList(value: Array<string>): AddEnvironmentRequest;
    addLibraries(value: string, index?: number): string;
    getSectionUserId(): string;
    setSectionUserId(value: string): AddEnvironmentRequest;
    getName(): string;
    setName(value: string): AddEnvironmentRequest;
    getDescription(): string;
    setDescription(value: string): AddEnvironmentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddEnvironmentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddEnvironmentRequest): AddEnvironmentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddEnvironmentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddEnvironmentRequest;
    static deserializeBinaryFromReader(message: AddEnvironmentRequest, reader: jspb.BinaryReader): AddEnvironmentRequest;
}

export namespace AddEnvironmentRequest {
    export type AsObject = {
        sessionKey: string,
        librariesList: Array<string>,
        sectionUserId: string,
        name: string,
        description: string,
    }
}

export class AddEnvironmentReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddEnvironmentReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddEnvironmentReply;
    getEnvironmentid(): string;
    setEnvironmentid(value: string): AddEnvironmentReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddEnvironmentReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddEnvironmentReply): AddEnvironmentReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddEnvironmentReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddEnvironmentReply;
    static deserializeBinaryFromReader(message: AddEnvironmentReply, reader: jspb.BinaryReader): AddEnvironmentReply;
}

export namespace AddEnvironmentReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        environmentid: string,
    }
}

export class BuildEnvironmentRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): BuildEnvironmentRequest;
    getName(): string;
    setName(value: string): BuildEnvironmentRequest;
    getDescription(): string;
    setDescription(value: string): BuildEnvironmentRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): BuildEnvironmentRequest;
    getContainerid(): string;
    setContainerid(value: string): BuildEnvironmentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildEnvironmentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BuildEnvironmentRequest): BuildEnvironmentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildEnvironmentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildEnvironmentRequest;
    static deserializeBinaryFromReader(message: BuildEnvironmentRequest, reader: jspb.BinaryReader): BuildEnvironmentRequest;
}

export namespace BuildEnvironmentRequest {
    export type AsObject = {
        sessionKey: string,
        name: string,
        description: string,
        sectionUserId: string,
        containerid: string,
    }
}

export class UpdateEnvironmentRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateEnvironmentRequest;
    getEnvironmentid(): string;
    setEnvironmentid(value: string): UpdateEnvironmentRequest;
    getName(): string;
    setName(value: string): UpdateEnvironmentRequest;
    getDescription(): string;
    setDescription(value: string): UpdateEnvironmentRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): UpdateEnvironmentRequest;
    getContainerid(): string;
    setContainerid(value: string): UpdateEnvironmentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateEnvironmentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateEnvironmentRequest): UpdateEnvironmentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateEnvironmentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateEnvironmentRequest;
    static deserializeBinaryFromReader(message: UpdateEnvironmentRequest, reader: jspb.BinaryReader): UpdateEnvironmentRequest;
}

export namespace UpdateEnvironmentRequest {
    export type AsObject = {
        sessionKey: string,
        environmentid: string,
        name: string,
        description: string,
        sectionUserId: string,
        containerid: string,
    }
}

export class EnvironmentIdRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): EnvironmentIdRequest;
    getEnvironmentid(): string;
    setEnvironmentid(value: string): EnvironmentIdRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): EnvironmentIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EnvironmentIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EnvironmentIdRequest): EnvironmentIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EnvironmentIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EnvironmentIdRequest;
    static deserializeBinaryFromReader(message: EnvironmentIdRequest, reader: jspb.BinaryReader): EnvironmentIdRequest;
}

export namespace EnvironmentIdRequest {
    export type AsObject = {
        sessionKey: string,
        environmentid: string,
        sectionUserId: string,
    }
}

export class SectionAndSubRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SectionAndSubRequest;
    getSectionid(): string;
    setSectionid(value: string): SectionAndSubRequest;
    getSub(): string;
    setSub(value: string): SectionAndSubRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SectionAndSubRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SectionAndSubRequest): SectionAndSubRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SectionAndSubRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SectionAndSubRequest;
    static deserializeBinaryFromReader(message: SectionAndSubRequest, reader: jspb.BinaryReader): SectionAndSubRequest;
}

export namespace SectionAndSubRequest {
    export type AsObject = {
        sessionKey: string,
        sectionid: string,
        sub: string,
    }
}

export class CheckHaveContainerRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): CheckHaveContainerRequest;
    getSub(): string;
    setSub(value: string): CheckHaveContainerRequest;
    getContainerid(): string;
    setContainerid(value: string): CheckHaveContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckHaveContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CheckHaveContainerRequest): CheckHaveContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckHaveContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckHaveContainerRequest;
    static deserializeBinaryFromReader(message: CheckHaveContainerRequest, reader: jspb.BinaryReader): CheckHaveContainerRequest;
}

export namespace CheckHaveContainerRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        containerid: string,
    }
}

export class SubRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SubRequest;
    getSub(): string;
    setSub(value: string): SubRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubRequest): SubRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubRequest;
    static deserializeBinaryFromReader(message: SubRequest, reader: jspb.BinaryReader): SubRequest;
}

export namespace SubRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
    }
}

export class SectionRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SectionRequest;
    getSectionid(): string;
    setSectionid(value: string): SectionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SectionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SectionRequest): SectionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SectionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SectionRequest;
    static deserializeBinaryFromReader(message: SectionRequest, reader: jspb.BinaryReader): SectionRequest;
}

export namespace SectionRequest {
    export type AsObject = {
        sessionKey: string,
        sectionid: string,
    }
}

export class SuccessStringReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SuccessStringReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): SuccessStringReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SuccessStringReply.AsObject;
    static toObject(includeInstance: boolean, msg: SuccessStringReply): SuccessStringReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SuccessStringReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SuccessStringReply;
    static deserializeBinaryFromReader(message: SuccessStringReply, reader: jspb.BinaryReader): SuccessStringReply;
}

export namespace SuccessStringReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
    }
}

export class StringReply extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): StringReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StringReply.AsObject;
    static toObject(includeInstance: boolean, msg: StringReply): StringReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StringReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StringReply;
    static deserializeBinaryFromReader(message: StringReply, reader: jspb.BinaryReader): StringReply;
}

export namespace StringReply {
    export type AsObject = {
        error?: Error.AsObject,
    }
}

export class ListReply extends jspb.Message { 
    clearErrorList(): void;
    getErrorList(): Array<Error>;
    setErrorList(value: Array<Error>): ListReply;
    addError(value?: Error, index?: number): Error;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListReply): ListReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListReply;
    static deserializeBinaryFromReader(message: ListReply, reader: jspb.BinaryReader): ListReply;
}

export namespace ListReply {
    export type AsObject = {
        errorList: Array<Error.AsObject>,
    }
}

export class GetUserDataRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): GetUserDataRequest;
    getIsSessionKey(): boolean;
    setIsSessionKey(value: boolean): GetUserDataRequest;
    getSub(): string;
    setSub(value: string): GetUserDataRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserDataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserDataRequest): GetUserDataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserDataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserDataRequest;
    static deserializeBinaryFromReader(message: GetUserDataRequest, reader: jspb.BinaryReader): GetUserDataRequest;
}

export namespace GetUserDataRequest {
    export type AsObject = {
        sessionKey: string,
        isSessionKey: boolean,
        sub: string,
    }
}

export class GetUserDataReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetUserDataReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): GetUserDataReply;
    getUserid(): string;
    setUserid(value: string): GetUserDataReply;
    getRole(): string;
    setRole(value: string): GetUserDataReply;
    getSemesterid(): string;
    setSemesterid(value: string): GetUserDataReply;
    getDarkmode(): boolean;
    setDarkmode(value: boolean): GetUserDataReply;
    getBio(): string;
    setBio(value: string): GetUserDataReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserDataReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserDataReply): GetUserDataReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserDataReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserDataReply;
    static deserializeBinaryFromReader(message: GetUserDataReply, reader: jspb.BinaryReader): GetUserDataReply;
}

export namespace GetUserDataReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        userid: string,
        role: string,
        semesterid: string,
        darkmode: boolean,
        bio: string,
    }
}

export class UpdateUserDataRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateUserDataRequest;
    getSub(): string;
    setSub(value: string): UpdateUserDataRequest;
    getDarkmode(): boolean;
    setDarkmode(value: boolean): UpdateUserDataRequest;
    getBio(): string;
    setBio(value: string): UpdateUserDataRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserDataRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserDataRequest): UpdateUserDataRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserDataRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserDataRequest;
    static deserializeBinaryFromReader(message: UpdateUserDataRequest, reader: jspb.BinaryReader): UpdateUserDataRequest;
}

export namespace UpdateUserDataRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        darkmode: boolean,
        bio: string,
    }
}

export class GetNotificationTokenReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetNotificationTokenReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): GetNotificationTokenReply;
    getNotificationToken(): string;
    setNotificationToken(value: string): GetNotificationTokenReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetNotificationTokenReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetNotificationTokenReply): GetNotificationTokenReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetNotificationTokenReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetNotificationTokenReply;
    static deserializeBinaryFromReader(message: GetNotificationTokenReply, reader: jspb.BinaryReader): GetNotificationTokenReply;
}

export namespace GetNotificationTokenReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        notificationToken: string,
    }
}

export class SendNotificationRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SendNotificationRequest;
    getTitle(): string;
    setTitle(value: string): SendNotificationRequest;
    getBody(): string;
    setBody(value: string): SendNotificationRequest;
    getSender(): string;
    setSender(value: string): SendNotificationRequest;
    getReceiver(): string;
    setReceiver(value: string): SendNotificationRequest;
    getAllowReply(): boolean;
    setAllowReply(value: boolean): SendNotificationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendNotificationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendNotificationRequest): SendNotificationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendNotificationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendNotificationRequest;
    static deserializeBinaryFromReader(message: SendNotificationRequest, reader: jspb.BinaryReader): SendNotificationRequest;
}

export namespace SendNotificationRequest {
    export type AsObject = {
        sessionKey: string,
        title: string,
        body: string,
        sender: string,
        receiver: string,
        allowReply: boolean,
    }
}

export class SendNotificationReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SendNotificationReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): SendNotificationReply;
    getNotificationId(): string;
    setNotificationId(value: string): SendNotificationReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendNotificationReply.AsObject;
    static toObject(includeInstance: boolean, msg: SendNotificationReply): SendNotificationReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendNotificationReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendNotificationReply;
    static deserializeBinaryFromReader(message: SendNotificationReply, reader: jspb.BinaryReader): SendNotificationReply;
}

export namespace SendNotificationReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        notificationId: string,
    }
}

export class UpdateNotificationTokenRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateNotificationTokenRequest;
    getSub(): string;
    setSub(value: string): UpdateNotificationTokenRequest;
    getToken(): string;
    setToken(value: string): UpdateNotificationTokenRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateNotificationTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateNotificationTokenRequest): UpdateNotificationTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateNotificationTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateNotificationTokenRequest;
    static deserializeBinaryFromReader(message: UpdateNotificationTokenRequest, reader: jspb.BinaryReader): UpdateNotificationTokenRequest;
}

export namespace UpdateNotificationTokenRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        token: string,
    }
}

export class RemoveNotificationRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): RemoveNotificationRequest;
    getUserid(): string;
    setUserid(value: string): RemoveNotificationRequest;
    clearNotificationidList(): void;
    getNotificationidList(): Array<string>;
    setNotificationidList(value: Array<string>): RemoveNotificationRequest;
    addNotificationid(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveNotificationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveNotificationRequest): RemoveNotificationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveNotificationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveNotificationRequest;
    static deserializeBinaryFromReader(message: RemoveNotificationRequest, reader: jspb.BinaryReader): RemoveNotificationRequest;
}

export namespace RemoveNotificationRequest {
    export type AsObject = {
        sessionKey: string,
        userid: string,
        notificationidList: Array<string>,
    }
}

export class UpdateSubscriptionRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateSubscriptionRequest;
    getUserid(): string;
    setUserid(value: string): UpdateSubscriptionRequest;
    getToken(): string;
    setToken(value: string): UpdateSubscriptionRequest;
    getSemesterid(): string;
    setSemesterid(value: string): UpdateSubscriptionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSubscriptionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSubscriptionRequest): UpdateSubscriptionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSubscriptionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSubscriptionRequest;
    static deserializeBinaryFromReader(message: UpdateSubscriptionRequest, reader: jspb.BinaryReader): UpdateSubscriptionRequest;
}

export namespace UpdateSubscriptionRequest {
    export type AsObject = {
        sessionKey: string,
        userid: string,
        token: string,
        semesterid: string,
    }
}

export class GoogleOAuthReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GoogleOAuthReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): GoogleOAuthReply;
    getAuthurl(): string;
    setAuthurl(value: string): GoogleOAuthReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GoogleOAuthReply.AsObject;
    static toObject(includeInstance: boolean, msg: GoogleOAuthReply): GoogleOAuthReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GoogleOAuthReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GoogleOAuthReply;
    static deserializeBinaryFromReader(message: GoogleOAuthReply, reader: jspb.BinaryReader): GoogleOAuthReply;
}

export namespace GoogleOAuthReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        authurl: string,
    }
}

export class DownloadRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): DownloadRequest;
    getSub(): string;
    setSub(value: string): DownloadRequest;
    getFileid(): string;
    setFileid(value: string): DownloadRequest;
    getFilename(): string;
    setFilename(value: string): DownloadRequest;
    getFilepath(): string;
    setFilepath(value: string): DownloadRequest;
    getFiletype(): string;
    setFiletype(value: string): DownloadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadRequest): DownloadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadRequest;
    static deserializeBinaryFromReader(message: DownloadRequest, reader: jspb.BinaryReader): DownloadRequest;
}

export namespace DownloadRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        fileid: string,
        filename: string,
        filepath: string,
        filetype: string,
    }
}

export class UploadRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UploadRequest;
    getSub(): string;
    setSub(value: string): UploadRequest;
    getFilepath(): string;
    setFilepath(value: string): UploadRequest;
    getParentid(): string;
    setParentid(value: string): UploadRequest;
    getFiletype(): string;
    setFiletype(value: string): UploadRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UploadRequest): UploadRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadRequest;
    static deserializeBinaryFromReader(message: UploadRequest, reader: jspb.BinaryReader): UploadRequest;
}

export namespace UploadRequest {
    export type AsObject = {
        sessionKey: string,
        sub: string,
        filepath: string,
        parentid: string,
        filetype: string,
    }
}

export class AddTempContainerRequest extends jspb.Message { 
    getImagename(): string;
    setImagename(value: string): AddTempContainerRequest;
    getMemlimit(): number;
    setMemlimit(value: number): AddTempContainerRequest;
    getNumcpu(): number;
    setNumcpu(value: number): AddTempContainerRequest;
    getSessionkey(): string;
    setSessionkey(value: string): AddTempContainerRequest;
    getSub(): string;
    setSub(value: string): AddTempContainerRequest;
    getAccessright(): string;
    setAccessright(value: string): AddTempContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddTempContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddTempContainerRequest): AddTempContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddTempContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddTempContainerRequest;
    static deserializeBinaryFromReader(message: AddTempContainerRequest, reader: jspb.BinaryReader): AddTempContainerRequest;
}

export namespace AddTempContainerRequest {
    export type AsObject = {
        imagename: string,
        memlimit: number,
        numcpu: number,
        sessionkey: string,
        sub: string,
        accessright: string,
    }
}

export class AddTempContainerReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddTempContainerReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddTempContainerReply;
    getTempcontainerid(): string;
    setTempcontainerid(value: string): AddTempContainerReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddTempContainerReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddTempContainerReply): AddTempContainerReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddTempContainerReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddTempContainerReply;
    static deserializeBinaryFromReader(message: AddTempContainerReply, reader: jspb.BinaryReader): AddTempContainerReply;
}

export namespace AddTempContainerReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        tempcontainerid: string,
    }
}

export class RemoveTempContainerRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): RemoveTempContainerRequest;
    getContainerid(): string;
    setContainerid(value: string): RemoveTempContainerRequest;
    getSub(): string;
    setSub(value: string): RemoveTempContainerRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveTempContainerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveTempContainerRequest): RemoveTempContainerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveTempContainerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveTempContainerRequest;
    static deserializeBinaryFromReader(message: RemoveTempContainerRequest, reader: jspb.BinaryReader): RemoveTempContainerRequest;
}

export namespace RemoveTempContainerRequest {
    export type AsObject = {
        sessionKey: string,
        containerid: string,
        sub: string,
    }
}

export class AddSandBoxImageRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): AddSandBoxImageRequest;
    getUserid(): string;
    setUserid(value: string): AddSandBoxImageRequest;
    getTitle(): string;
    setTitle(value: string): AddSandBoxImageRequest;
    getDescription(): string;
    setDescription(value: string): AddSandBoxImageRequest;
    getImageId(): string;
    setImageId(value: string): AddSandBoxImageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddSandBoxImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddSandBoxImageRequest): AddSandBoxImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddSandBoxImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddSandBoxImageRequest;
    static deserializeBinaryFromReader(message: AddSandBoxImageRequest, reader: jspb.BinaryReader): AddSandBoxImageRequest;
}

export namespace AddSandBoxImageRequest {
    export type AsObject = {
        sessionKey: string,
        userid: string,
        title: string,
        description: string,
        imageId: string,
    }
}

export class AddSandBoxImageReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddSandBoxImageReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddSandBoxImageReply;
    getSandboximageid(): string;
    setSandboximageid(value: string): AddSandBoxImageReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddSandBoxImageReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddSandBoxImageReply): AddSandBoxImageReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddSandBoxImageReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddSandBoxImageReply;
    static deserializeBinaryFromReader(message: AddSandBoxImageReply, reader: jspb.BinaryReader): AddSandBoxImageReply;
}

export namespace AddSandBoxImageReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        sandboximageid: string,
    }
}

export class UpdateSandBoxImageRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): UpdateSandBoxImageRequest;
    getSandboximageid(): string;
    setSandboximageid(value: string): UpdateSandBoxImageRequest;
    getUserid(): string;
    setUserid(value: string): UpdateSandBoxImageRequest;
    getTitle(): string;
    setTitle(value: string): UpdateSandBoxImageRequest;
    getDescription(): string;
    setDescription(value: string): UpdateSandBoxImageRequest;
    getTempcontainerid(): string;
    setTempcontainerid(value: string): UpdateSandBoxImageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateSandBoxImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateSandBoxImageRequest): UpdateSandBoxImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateSandBoxImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateSandBoxImageRequest;
    static deserializeBinaryFromReader(message: UpdateSandBoxImageRequest, reader: jspb.BinaryReader): UpdateSandBoxImageRequest;
}

export namespace UpdateSandBoxImageRequest {
    export type AsObject = {
        sessionKey: string,
        sandboximageid: string,
        userid: string,
        title: string,
        description: string,
        tempcontainerid: string,
    }
}

export class SandBoxImageIdRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SandBoxImageIdRequest;
    getSandboximageid(): string;
    setSandboximageid(value: string): SandBoxImageIdRequest;
    getUserId(): string;
    setUserId(value: string): SandBoxImageIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SandBoxImageIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SandBoxImageIdRequest): SandBoxImageIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SandBoxImageIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SandBoxImageIdRequest;
    static deserializeBinaryFromReader(message: SandBoxImageIdRequest, reader: jspb.BinaryReader): SandBoxImageIdRequest;
}

export namespace SandBoxImageIdRequest {
    export type AsObject = {
        sessionKey: string,
        sandboximageid: string,
        userId: string,
    }
}

export class ListSandBoxImageRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): ListSandBoxImageRequest;
    getUserid(): string;
    setUserid(value: string): ListSandBoxImageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSandBoxImageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListSandBoxImageRequest): ListSandBoxImageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSandBoxImageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSandBoxImageRequest;
    static deserializeBinaryFromReader(message: ListSandBoxImageRequest, reader: jspb.BinaryReader): ListSandBoxImageRequest;
}

export namespace ListSandBoxImageRequest {
    export type AsObject = {
        sessionKey: string,
        userid: string,
    }
}

export class ListSandBoxImageReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListSandBoxImageReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): ListSandBoxImageReply;
    clearSandboximagesList(): void;
    getSandboximagesList(): Array<ListSandBoxImageReply.SandBoxImage>;
    setSandboximagesList(value: Array<ListSandBoxImageReply.SandBoxImage>): ListSandBoxImageReply;
    addSandboximages(value?: ListSandBoxImageReply.SandBoxImage, index?: number): ListSandBoxImageReply.SandBoxImage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListSandBoxImageReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListSandBoxImageReply): ListSandBoxImageReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListSandBoxImageReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListSandBoxImageReply;
    static deserializeBinaryFromReader(message: ListSandBoxImageReply, reader: jspb.BinaryReader): ListSandBoxImageReply;
}

export namespace ListSandBoxImageReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        sandboximagesList: Array<ListSandBoxImageReply.SandBoxImage.AsObject>,
    }


    export class SandBoxImage extends jspb.Message { 
        getId(): string;
        setId(value: string): SandBoxImage;
        getTitle(): string;
        setTitle(value: string): SandBoxImage;
        getDescription(): string;
        setDescription(value: string): SandBoxImage;
        getImageid(): string;
        setImageid(value: string): SandBoxImage;
        clearSandboxidList(): void;
        getSandboxidList(): Array<string>;
        setSandboxidList(value: Array<string>): SandBoxImage;
        addSandboxid(value: string, index?: number): string;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): SandBoxImage.AsObject;
        static toObject(includeInstance: boolean, msg: SandBoxImage): SandBoxImage.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: SandBoxImage, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): SandBoxImage;
        static deserializeBinaryFromReader(message: SandBoxImage, reader: jspb.BinaryReader): SandBoxImage;
    }

    export namespace SandBoxImage {
        export type AsObject = {
            id: string,
            title: string,
            description: string,
            imageid: string,
            sandboxidList: Array<string>,
        }
    }

}

export class AddSandBoxRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): AddSandBoxRequest;
    getMemlimit(): number;
    setMemlimit(value: number): AddSandBoxRequest;
    getNumcpu(): number;
    setNumcpu(value: number): AddSandBoxRequest;
    getSandboximageid(): string;
    setSandboximageid(value: string): AddSandBoxRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddSandBoxRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddSandBoxRequest): AddSandBoxRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddSandBoxRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddSandBoxRequest;
    static deserializeBinaryFromReader(message: AddSandBoxRequest, reader: jspb.BinaryReader): AddSandBoxRequest;
}

export namespace AddSandBoxRequest {
    export type AsObject = {
        sessionKey: string,
        memlimit: number,
        numcpu: number,
        sandboximageid: string,
    }
}

export class AddSandBoxReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddSandBoxReply;

    hasError(): boolean;
    clearError(): void;
    getError(): Error | undefined;
    setError(value?: Error): AddSandBoxReply;
    getSandboxid(): string;
    setSandboxid(value: string): AddSandBoxReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddSandBoxReply.AsObject;
    static toObject(includeInstance: boolean, msg: AddSandBoxReply): AddSandBoxReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddSandBoxReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddSandBoxReply;
    static deserializeBinaryFromReader(message: AddSandBoxReply, reader: jspb.BinaryReader): AddSandBoxReply;
}

export namespace AddSandBoxReply {
    export type AsObject = {
        success: boolean,
        error?: Error.AsObject,
        sandboxid: string,
    }
}

export class SandBoxIdRequest extends jspb.Message { 
    getSessionKey(): string;
    setSessionKey(value: string): SandBoxIdRequest;
    getSandboxid(): string;
    setSandboxid(value: string): SandBoxIdRequest;
    getUserId(): string;
    setUserId(value: string): SandBoxIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SandBoxIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SandBoxIdRequest): SandBoxIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SandBoxIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SandBoxIdRequest;
    static deserializeBinaryFromReader(message: SandBoxIdRequest, reader: jspb.BinaryReader): SandBoxIdRequest;
}

export namespace SandBoxIdRequest {
    export type AsObject = {
        sessionKey: string,
        sandboxid: string,
        userId: string,
    }
}
