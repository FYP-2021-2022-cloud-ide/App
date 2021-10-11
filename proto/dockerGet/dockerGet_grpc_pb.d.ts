// package: dockerGet
// file: dockerGet.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as dockerGet_pb from "./dockerGet_pb";

interface IDockerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    login: IDockerService_Ilogin;
    checkHaveContainer: IDockerService_IcheckHaveContainer;
    listContainers: IDockerService_IlistContainers;
    listCourses: IDockerService_IlistCourses;
    listEnvironments: IDockerService_IlistEnvironments;
    listTemplates: IDockerService_IlistTemplates;
    addContainer: IDockerService_IaddContainer;
    removeContainer: IDockerService_IremoveContainer;
}

interface IDockerService_Ilogin extends grpc.MethodDefinition<dockerGet_pb.LoginRequest, dockerGet_pb.ListReply> {
    path: "/dockerGet.Docker/login";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.LoginRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListReply>;
}
interface IDockerService_IcheckHaveContainer extends grpc.MethodDefinition<dockerGet_pb.CheckHaveContainerRequest, dockerGet_pb.StringReply> {
    path: "/dockerGet.Docker/checkHaveContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.CheckHaveContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.CheckHaveContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.StringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.StringReply>;
}
interface IDockerService_IlistContainers extends grpc.MethodDefinition<dockerGet_pb.SubRequest, dockerGet_pb.ListReply> {
    path: "/dockerGet.Docker/listContainers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListReply>;
}
interface IDockerService_IlistCourses extends grpc.MethodDefinition<dockerGet_pb.SubRequest, dockerGet_pb.ListReply> {
    path: "/dockerGet.Docker/listCourses";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListReply>;
}
interface IDockerService_IlistEnvironments extends grpc.MethodDefinition<dockerGet_pb.SectionRequest, dockerGet_pb.ListReply> {
    path: "/dockerGet.Docker/listEnvironments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SectionRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SectionRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListReply>;
}
interface IDockerService_IlistTemplates extends grpc.MethodDefinition<dockerGet_pb.SectionRequest, dockerGet_pb.ListReply> {
    path: "/dockerGet.Docker/listTemplates";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SectionRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SectionRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListReply>;
}
interface IDockerService_IaddContainer extends grpc.MethodDefinition<dockerGet_pb.AddContainerRequest, dockerGet_pb.StringReply> {
    path: "/dockerGet.Docker/addContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.AddContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.AddContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.StringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.StringReply>;
}
interface IDockerService_IremoveContainer extends grpc.MethodDefinition<dockerGet_pb.RemoveContainerRequest, dockerGet_pb.StringReply> {
    path: "/dockerGet.Docker/removeContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.RemoveContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.RemoveContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.StringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.StringReply>;
}

export const DockerService: IDockerService;

export interface IDockerServer {
    login: grpc.handleUnaryCall<dockerGet_pb.LoginRequest, dockerGet_pb.ListReply>;
    checkHaveContainer: grpc.handleUnaryCall<dockerGet_pb.CheckHaveContainerRequest, dockerGet_pb.StringReply>;
    listContainers: grpc.handleUnaryCall<dockerGet_pb.SubRequest, dockerGet_pb.ListReply>;
    listCourses: grpc.handleUnaryCall<dockerGet_pb.SubRequest, dockerGet_pb.ListReply>;
    listEnvironments: grpc.handleUnaryCall<dockerGet_pb.SectionRequest, dockerGet_pb.ListReply>;
    listTemplates: grpc.handleUnaryCall<dockerGet_pb.SectionRequest, dockerGet_pb.ListReply>;
    addContainer: grpc.handleUnaryCall<dockerGet_pb.AddContainerRequest, dockerGet_pb.StringReply>;
    removeContainer: grpc.handleUnaryCall<dockerGet_pb.RemoveContainerRequest, dockerGet_pb.StringReply>;
}

export interface IDockerClient {
    login(request: dockerGet_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
}

export class DockerClient extends grpc.Client implements IDockerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public login(request: dockerGet_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.StringReply) => void): grpc.ClientUnaryCall;
}
