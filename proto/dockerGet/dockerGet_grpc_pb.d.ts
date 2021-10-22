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
    getSectionInfo: IDockerService_IgetSectionInfo;
    listEnvironments: IDockerService_IlistEnvironments;
    listTemplates: IDockerService_IlistTemplates;
    addContainer: IDockerService_IaddContainer;
    removeContainer: IDockerService_IremoveContainer;
    addTemplate: IDockerService_IaddTemplate;
    activateTemplate: IDockerService_IactivateTemplate;
    deactivateTemplate: IDockerService_IdeactivateTemplate;
    removeTemplate: IDockerService_IremoveTemplate;
    addEnvironment: IDockerService_IaddEnvironment;
    buildEnvironment: IDockerService_IbuildEnvironment;
    removeEnvironment: IDockerService_IremoveEnvironment;
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
interface IDockerService_IcheckHaveContainer extends grpc.MethodDefinition<dockerGet_pb.CheckHaveContainerRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/checkHaveContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.CheckHaveContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.CheckHaveContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}
interface IDockerService_IlistContainers extends grpc.MethodDefinition<dockerGet_pb.SubRequest, dockerGet_pb.ListContainerReply> {
    path: "/dockerGet.Docker/listContainers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListContainerReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListContainerReply>;
}
interface IDockerService_IlistCourses extends grpc.MethodDefinition<dockerGet_pb.SubRequest, dockerGet_pb.ListCoursesReply> {
    path: "/dockerGet.Docker/listCourses";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListCoursesReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListCoursesReply>;
}
interface IDockerService_IgetSectionInfo extends grpc.MethodDefinition<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.GetSectionInfoReply> {
    path: "/dockerGet.Docker/getSectionInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SectionAndSubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SectionAndSubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.GetSectionInfoReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.GetSectionInfoReply>;
}
interface IDockerService_IlistEnvironments extends grpc.MethodDefinition<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.ListEnvironmentsReply> {
    path: "/dockerGet.Docker/listEnvironments";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SectionAndSubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SectionAndSubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListEnvironmentsReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListEnvironmentsReply>;
}
interface IDockerService_IlistTemplates extends grpc.MethodDefinition<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.ListTemplatesReply> {
    path: "/dockerGet.Docker/listTemplates";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.SectionAndSubRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.SectionAndSubRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.ListTemplatesReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.ListTemplatesReply>;
}
interface IDockerService_IaddContainer extends grpc.MethodDefinition<dockerGet_pb.AddContainerRequest, dockerGet_pb.AddContainerReply> {
    path: "/dockerGet.Docker/addContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.AddContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.AddContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.AddContainerReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.AddContainerReply>;
}
interface IDockerService_IremoveContainer extends grpc.MethodDefinition<dockerGet_pb.RemoveContainerRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/removeContainer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.RemoveContainerRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.RemoveContainerRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}
interface IDockerService_IaddTemplate extends grpc.MethodDefinition<dockerGet_pb.AddTemplateRequest, dockerGet_pb.AddTemplateReply> {
    path: "/dockerGet.Docker/addTemplate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.AddTemplateRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.AddTemplateRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.AddTemplateReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.AddTemplateReply>;
}
interface IDockerService_IactivateTemplate extends grpc.MethodDefinition<dockerGet_pb.TemplateIdRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/activateTemplate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.TemplateIdRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.TemplateIdRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}
interface IDockerService_IdeactivateTemplate extends grpc.MethodDefinition<dockerGet_pb.TemplateIdRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/deactivateTemplate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.TemplateIdRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.TemplateIdRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}
interface IDockerService_IremoveTemplate extends grpc.MethodDefinition<dockerGet_pb.RemoveTemplateRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/removeTemplate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.RemoveTemplateRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.RemoveTemplateRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}
interface IDockerService_IaddEnvironment extends grpc.MethodDefinition<dockerGet_pb.AddEnvironmentRequest, dockerGet_pb.AddEnvironmentReply> {
    path: "/dockerGet.Docker/addEnvironment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.AddEnvironmentRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.AddEnvironmentRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.AddEnvironmentReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.AddEnvironmentReply>;
}
interface IDockerService_IbuildEnvironment extends grpc.MethodDefinition<dockerGet_pb.BuildEnvironmentRequest, dockerGet_pb.AddEnvironmentReply> {
    path: "/dockerGet.Docker/buildEnvironment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.BuildEnvironmentRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.BuildEnvironmentRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.AddEnvironmentReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.AddEnvironmentReply>;
}
interface IDockerService_IremoveEnvironment extends grpc.MethodDefinition<dockerGet_pb.RemoveEnvironmentRequest, dockerGet_pb.SuccessStringReply> {
    path: "/dockerGet.Docker/removeEnvironment";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dockerGet_pb.RemoveEnvironmentRequest>;
    requestDeserialize: grpc.deserialize<dockerGet_pb.RemoveEnvironmentRequest>;
    responseSerialize: grpc.serialize<dockerGet_pb.SuccessStringReply>;
    responseDeserialize: grpc.deserialize<dockerGet_pb.SuccessStringReply>;
}

export const DockerService: IDockerService;

export interface IDockerServer {
    login: grpc.handleUnaryCall<dockerGet_pb.LoginRequest, dockerGet_pb.ListReply>;
    checkHaveContainer: grpc.handleUnaryCall<dockerGet_pb.CheckHaveContainerRequest, dockerGet_pb.SuccessStringReply>;
    listContainers: grpc.handleUnaryCall<dockerGet_pb.SubRequest, dockerGet_pb.ListContainerReply>;
    listCourses: grpc.handleUnaryCall<dockerGet_pb.SubRequest, dockerGet_pb.ListCoursesReply>;
    getSectionInfo: grpc.handleUnaryCall<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.GetSectionInfoReply>;
    listEnvironments: grpc.handleUnaryCall<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.ListEnvironmentsReply>;
    listTemplates: grpc.handleUnaryCall<dockerGet_pb.SectionAndSubRequest, dockerGet_pb.ListTemplatesReply>;
    addContainer: grpc.handleUnaryCall<dockerGet_pb.AddContainerRequest, dockerGet_pb.AddContainerReply>;
    removeContainer: grpc.handleUnaryCall<dockerGet_pb.RemoveContainerRequest, dockerGet_pb.SuccessStringReply>;
    addTemplate: grpc.handleUnaryCall<dockerGet_pb.AddTemplateRequest, dockerGet_pb.AddTemplateReply>;
    activateTemplate: grpc.handleUnaryCall<dockerGet_pb.TemplateIdRequest, dockerGet_pb.SuccessStringReply>;
    deactivateTemplate: grpc.handleUnaryCall<dockerGet_pb.TemplateIdRequest, dockerGet_pb.SuccessStringReply>;
    removeTemplate: grpc.handleUnaryCall<dockerGet_pb.RemoveTemplateRequest, dockerGet_pb.SuccessStringReply>;
    addEnvironment: grpc.handleUnaryCall<dockerGet_pb.AddEnvironmentRequest, dockerGet_pb.AddEnvironmentReply>;
    buildEnvironment: grpc.handleUnaryCall<dockerGet_pb.BuildEnvironmentRequest, dockerGet_pb.AddEnvironmentReply>;
    removeEnvironment: grpc.handleUnaryCall<dockerGet_pb.RemoveEnvironmentRequest, dockerGet_pb.SuccessStringReply>;
}

export interface IDockerClient {
    login(request: dockerGet_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    listEnvironments(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    listTemplates(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    addTemplate(request: dockerGet_pb.AddTemplateRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    addTemplate(request: dockerGet_pb.AddTemplateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    addTemplate(request: dockerGet_pb.AddTemplateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    activateTemplate(request: dockerGet_pb.TemplateIdRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    activateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    activateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
}

export class DockerClient extends grpc.Client implements IDockerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public login(request: dockerGet_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public login(request: dockerGet_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public checkHaveContainer(request: dockerGet_pb.CheckHaveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    public listContainers(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListContainerReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    public listCourses(request: dockerGet_pb.SubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListCoursesReply) => void): grpc.ClientUnaryCall;
    public getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    public getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    public getSectionInfo(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.GetSectionInfoReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    public listEnvironments(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListEnvironmentsReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionAndSubRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    public listTemplates(request: dockerGet_pb.SectionAndSubRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.ListTemplatesReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    public addContainer(request: dockerGet_pb.AddContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddContainerReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeContainer(request: dockerGet_pb.RemoveContainerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public addTemplate(request: dockerGet_pb.AddTemplateRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    public addTemplate(request: dockerGet_pb.AddTemplateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    public addTemplate(request: dockerGet_pb.AddTemplateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddTemplateReply) => void): grpc.ClientUnaryCall;
    public activateTemplate(request: dockerGet_pb.TemplateIdRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public activateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public activateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public deactivateTemplate(request: dockerGet_pb.TemplateIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeTemplate(request: dockerGet_pb.RemoveTemplateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public addEnvironment(request: dockerGet_pb.AddEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public buildEnvironment(request: dockerGet_pb.BuildEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.AddEnvironmentReply) => void): grpc.ClientUnaryCall;
    public removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
    public removeEnvironment(request: dockerGet_pb.RemoveEnvironmentRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dockerGet_pb.SuccessStringReply) => void): grpc.ClientUnaryCall;
}
