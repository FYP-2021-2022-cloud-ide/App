// package: dockerGet
// file: dockerGet.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class UserIdRequest extends jspb.Message { 
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
        userid: string,
    }
}

export class ListNotificationsReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListNotificationsReply;
    getMessage(): string;
    setMessage(value: string): ListNotificationsReply;
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
        message: string,
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

export class LoginRequest extends jspb.Message { 
    getSub(): string;
    setSub(value: string): LoginRequest;
    getName(): string;
    setName(value: string): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        sub: string,
        name: string,
    }
}

export class EmptyRequest extends jspb.Message { 

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
    }
}

export class ListContainerReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListContainerReply;
    getMessage(): string;
    setMessage(value: string): ListContainerReply;

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
        message: string,
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
    getMessage(): string;
    setMessage(value: string): ListCoursesReply;
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
        message: string,
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
    getMessage(): string;
    setMessage(value: string): GetSectionInfoReply;
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
        message: string,
        sectionuserid: string,
        coursename: string,
        role: string,
    }
}

export class ListEnvironmentsReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListEnvironmentsReply;
    getMessage(): string;
    setMessage(value: string): ListEnvironmentsReply;
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
        message: string,
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
    getMessage(): string;
    setMessage(value: string): ListTemplatesReply;
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
        message: string,
        templatesList: Array<ListTemplatesReply.Template.AsObject>,
    }


    export class Template extends jspb.Message { 
        getId(): string;
        setId(value: string): Template;
        getName(): string;
        setName(value: string): Template;
        getDescription(): string;
        setDescription(value: string): Template;
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
    getImagename(): string;
    setImagename(value: string): AddContainerRequest;
    getMemlimit(): number;
    setMemlimit(value: number): AddContainerRequest;
    getNumcpu(): number;
    setNumcpu(value: number): AddContainerRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): AddContainerRequest;
    getTemplateId(): string;
    setTemplateId(value: string): AddContainerRequest;
    getDbstored(): boolean;
    setDbstored(value: boolean): AddContainerRequest;
    getAccessright(): string;
    setAccessright(value: string): AddContainerRequest;

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
        imagename: string,
        memlimit: number,
        numcpu: number,
        sectionUserId: string,
        templateId: string,
        dbstored: boolean,
        accessright: string,
    }
}

export class InstantAddContainerRequest extends jspb.Message { 
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
        sub: string,
        templateId: string,
    }
}

export class AddContainerReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddContainerReply;
    getMessage(): string;
    setMessage(value: string): AddContainerReply;
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
        message: string,
        containerid: string,
    }
}

export class RemoveContainerRequest extends jspb.Message { 
    getContainerid(): string;
    setContainerid(value: string): RemoveContainerRequest;

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
        containerid: string,
    }
}

export class SubmitFilesRequest extends jspb.Message { 
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
        containerid: string,
        sectionUserId: string,
    }
}

export class AddTemplateRequest extends jspb.Message { 
    getName(): string;
    setName(value: string): AddTemplateRequest;
    getDescription(): string;
    setDescription(value: string): AddTemplateRequest;
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

export class UpdateTemplateRequest extends jspb.Message { 
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
        templateid: string,
        sectionUserId: string,
    }
}

export class AddTemplateReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddTemplateReply;
    getMessage(): string;
    setMessage(value: string): AddTemplateReply;
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
        message: string,
        templateid: string,
    }
}

export class AddEnvironmentRequest extends jspb.Message { 
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
        librariesList: Array<string>,
        sectionUserId: string,
        name: string,
        description: string,
    }
}

export class AddEnvironmentReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): AddEnvironmentReply;
    getMessage(): string;
    setMessage(value: string): AddEnvironmentReply;
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
        message: string,
        environmentid: string,
    }
}

export class BuildEnvironmentRequest extends jspb.Message { 
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
        name: string,
        description: string,
        sectionUserId: string,
        containerid: string,
    }
}

export class UpdateEnvironmentRequest extends jspb.Message { 
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
        environmentid: string,
        name: string,
        description: string,
        sectionUserId: string,
        containerid: string,
    }
}

export class EnvironmentIdRequest extends jspb.Message { 
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
        environmentid: string,
        sectionUserId: string,
    }
}

export class SectionAndSubRequest extends jspb.Message { 
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
        sectionid: string,
        sub: string,
    }
}

export class CheckHaveContainerRequest extends jspb.Message { 
    getSectionUserId(): string;
    setSectionUserId(value: string): CheckHaveContainerRequest;
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
        sectionUserId: string,
        containerid: string,
    }
}

export class SubRequest extends jspb.Message { 
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
        sub: string,
    }
}

export class SectionRequest extends jspb.Message { 
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
        sectionid: string,
    }
}

export class SuccessStringReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SuccessStringReply;
    getMessage(): string;
    setMessage(value: string): SuccessStringReply;

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
        message: string,
    }
}

export class StringReply extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): StringReply;

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
        message: string,
    }
}

export class ListReply extends jspb.Message { 
    clearMessageList(): void;
    getMessageList(): Array<string>;
    setMessageList(value: Array<string>): ListReply;
    addMessage(value: string, index?: number): string;

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
        messageList: Array<string>,
    }
}

export class GetUserDataReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetUserDataReply;
    getMessage(): string;
    setMessage(value: string): GetUserDataReply;
    getUserid(): string;
    setUserid(value: string): GetUserDataReply;
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
        message: string,
        userid: string,
        semesterid: string,
        darkmode: boolean,
        bio: string,
    }
}

export class UpdateUserDataRequest extends jspb.Message { 
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
        sub: string,
        darkmode: boolean,
        bio: string,
    }
}

export class GetNotificationTokenReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetNotificationTokenReply;
    getMessage(): string;
    setMessage(value: string): GetNotificationTokenReply;
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
        message: string,
        notificationToken: string,
    }
}

export class SendNotificationRequest extends jspb.Message { 
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
    getMessage(): string;
    setMessage(value: string): SendNotificationReply;
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
        message: string,
        notificationId: string,
    }
}

export class UpdateNotificationTokenRequest extends jspb.Message { 
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
        sub: string,
        token: string,
    }
}

export class RemoveNotificationRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): RemoveNotificationRequest;
    getNotificationid(): string;
    setNotificationid(value: string): RemoveNotificationRequest;

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
        userid: string,
        notificationid: string,
    }
}

export class UpdateSubscriptionRequest extends jspb.Message { 
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
        userid: string,
        token: string,
        semesterid: string,
    }
}

export class ListFolderReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListFolderReply;
    getMessage(): string;
    setMessage(value: string): ListFolderReply;

    hasRoot(): boolean;
    clearRoot(): void;
    getRoot(): Folder | undefined;
    setRoot(value?: Folder): ListFolderReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListFolderReply.AsObject;
    static toObject(includeInstance: boolean, msg: ListFolderReply): ListFolderReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListFolderReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListFolderReply;
    static deserializeBinaryFromReader(message: ListFolderReply, reader: jspb.BinaryReader): ListFolderReply;
}

export namespace ListFolderReply {
    export type AsObject = {
        success: boolean,
        message: string,
        root?: Folder.AsObject,
    }
}

export class Folder extends jspb.Message { 
    getName(): string;
    setName(value: string): Folder;
    clearChildrenList(): void;
    getChildrenList(): Array<Folder>;
    setChildrenList(value: Array<Folder>): Folder;
    addChildren(value?: Folder, index?: number): Folder;
    clearFilesList(): void;
    getFilesList(): Array<Folder.Files>;
    setFilesList(value: Array<Folder.Files>): Folder;
    addFiles(value?: Folder.Files, index?: number): Folder.Files;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Folder.AsObject;
    static toObject(includeInstance: boolean, msg: Folder): Folder.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Folder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Folder;
    static deserializeBinaryFromReader(message: Folder, reader: jspb.BinaryReader): Folder;
}

export namespace Folder {
    export type AsObject = {
        name: string,
        childrenList: Array<Folder.AsObject>,
        filesList: Array<Folder.Files.AsObject>,
    }


    export class Files extends jspb.Message { 
        getName(): string;
        setName(value: string): Files;
        getPath(): string;
        setPath(value: string): Files;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Files.AsObject;
        static toObject(includeInstance: boolean, msg: Files): Files.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Files, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Files;
        static deserializeBinaryFromReader(message: Files, reader: jspb.BinaryReader): Files;
    }

    export namespace Files {
        export type AsObject = {
            name: string,
            path: string,
        }
    }

}

export class DownloadRequest extends jspb.Message { 
    getFilepath(): string;
    setFilepath(value: string): DownloadRequest;
    getUserid(): string;
    setUserid(value: string): DownloadRequest;

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
        filepath: string,
        userid: string,
    }
}

export class DownloadReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DownloadReply;
    getMessage(): string;
    setMessage(value: string): DownloadReply;
    getContent(): Uint8Array | string;
    getContent_asU8(): Uint8Array;
    getContent_asB64(): string;
    setContent(value: Uint8Array | string): DownloadReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DownloadReply.AsObject;
    static toObject(includeInstance: boolean, msg: DownloadReply): DownloadReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DownloadReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DownloadReply;
    static deserializeBinaryFromReader(message: DownloadReply, reader: jspb.BinaryReader): DownloadReply;
}

export namespace DownloadReply {
    export type AsObject = {
        success: boolean,
        message: string,
        content: Uint8Array | string,
    }
}

export class UploadRequest extends jspb.Message { 

    hasContent(): boolean;
    clearContent(): void;
    getContent(): Uint8Array | string;
    getContent_asU8(): Uint8Array;
    getContent_asB64(): string;
    setContent(value: Uint8Array | string): UploadRequest;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): UploadRequest.UploadMetadata | undefined;
    setMetadata(value?: UploadRequest.UploadMetadata): UploadRequest;

    getDataCase(): UploadRequest.DataCase;

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
        content: Uint8Array | string,
        metadata?: UploadRequest.UploadMetadata.AsObject,
    }


    export class UploadMetadata extends jspb.Message { 
        getFilepath(): string;
        setFilepath(value: string): UploadMetadata;
        getUserid(): string;
        setUserid(value: string): UploadMetadata;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): UploadMetadata.AsObject;
        static toObject(includeInstance: boolean, msg: UploadMetadata): UploadMetadata.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: UploadMetadata, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): UploadMetadata;
        static deserializeBinaryFromReader(message: UploadMetadata, reader: jspb.BinaryReader): UploadMetadata;
    }

    export namespace UploadMetadata {
        export type AsObject = {
            filepath: string,
            userid: string,
        }
    }


    export enum DataCase {
        DATA_NOT_SET = 0,
        CONTENT = 2,
        METADATA = 1,
    }

}

export class UploadReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): UploadReply;
    getMessage(): string;
    setMessage(value: string): UploadReply;
    getSize(): number;
    setSize(value: number): UploadReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UploadReply.AsObject;
    static toObject(includeInstance: boolean, msg: UploadReply): UploadReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UploadReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UploadReply;
    static deserializeBinaryFromReader(message: UploadReply, reader: jspb.BinaryReader): UploadReply;
}

export namespace UploadReply {
    export type AsObject = {
        success: boolean,
        message: string,
        size: number,
    }
}

export class PathRequest extends jspb.Message { 
    getPath(): string;
    setPath(value: string): PathRequest;
    getUserid(): string;
    setUserid(value: string): PathRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PathRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PathRequest): PathRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PathRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PathRequest;
    static deserializeBinaryFromReader(message: PathRequest, reader: jspb.BinaryReader): PathRequest;
}

export namespace PathRequest {
    export type AsObject = {
        path: string,
        userid: string,
    }
}

export class MoveFileRequest extends jspb.Message { 
    getSource(): string;
    setSource(value: string): MoveFileRequest;
    getTarget(): string;
    setTarget(value: string): MoveFileRequest;
    getUserid(): string;
    setUserid(value: string): MoveFileRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveFileRequest.AsObject;
    static toObject(includeInstance: boolean, msg: MoveFileRequest): MoveFileRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveFileRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveFileRequest;
    static deserializeBinaryFromReader(message: MoveFileRequest, reader: jspb.BinaryReader): MoveFileRequest;
}

export namespace MoveFileRequest {
    export type AsObject = {
        source: string,
        target: string,
        userid: string,
    }
}
