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
