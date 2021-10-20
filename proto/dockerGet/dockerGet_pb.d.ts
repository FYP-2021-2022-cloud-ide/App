// package: dockerGet
// file: dockerGet.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

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
        getImagename(): string;
        setImagename(value: string): Environment;
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
            imagename: string,
            description: string,
        }
    }

}

export class ListTemplatesReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): ListTemplatesReply;
    getMessage(): string;
    setMessage(value: string): ListTemplatesReply;
    clearSectioninfoList(): void;
    getSectioninfoList(): Array<string>;
    setSectioninfoList(value: Array<string>): ListTemplatesReply;
    addSectioninfo(value: string, index?: number): string;
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
        sectioninfoList: Array<string>,
        templatesList: Array<ListTemplatesReply.Template.AsObject>,
    }


    export class Template extends jspb.Message { 
        getId(): string;
        setId(value: string): Template;
        getName(): string;
        setName(value: string): Template;
        getImageid(): string;
        setImageid(value: string): Template;
        getAssignmentConfigId(): string;
        setAssignmentConfigId(value: string): Template;
        getStorage(): string;
        setStorage(value: string): Template;

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
            imageid: string,
            assignmentConfigId: string,
            storage: string,
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

export class AddTemplateRequest extends jspb.Message { 
    getEnvironmentid(): string;
    setEnvironmentid(value: string): AddTemplateRequest;
    getName(): string;
    setName(value: string): AddTemplateRequest;
    getAssignmentConfigId(): string;
    setAssignmentConfigId(value: string): AddTemplateRequest;
    getSectionUserId(): string;
    setSectionUserId(value: string): AddTemplateRequest;
    getContainerid(): string;
    setContainerid(value: string): AddTemplateRequest;

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
        environmentid: string,
        name: string,
        assignmentConfigId: string,
        sectionUserId: string,
        containerid: string,
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

export class RemoveTemplateRequest extends jspb.Message { 
    getTemplateid(): string;
    setTemplateid(value: string): RemoveTemplateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveTemplateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveTemplateRequest): RemoveTemplateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveTemplateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveTemplateRequest;
    static deserializeBinaryFromReader(message: RemoveTemplateRequest, reader: jspb.BinaryReader): RemoveTemplateRequest;
}

export namespace RemoveTemplateRequest {
    export type AsObject = {
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

export class RemoveEnvironmentRequest extends jspb.Message { 
    getEnvironmentid(): string;
    setEnvironmentid(value: string): RemoveEnvironmentRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveEnvironmentRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveEnvironmentRequest): RemoveEnvironmentRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveEnvironmentRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveEnvironmentRequest;
    static deserializeBinaryFromReader(message: RemoveEnvironmentRequest, reader: jspb.BinaryReader): RemoveEnvironmentRequest;
}

export namespace RemoveEnvironmentRequest {
    export type AsObject = {
        environmentid: string,
    }
}

export class CheckHaveContainerRequest extends jspb.Message { 
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
        sub: string,
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
