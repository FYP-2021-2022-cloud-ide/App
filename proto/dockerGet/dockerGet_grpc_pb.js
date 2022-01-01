// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var dockerGet_pb = require('./dockerGet_pb.js');

function serialize_dockerGet_AddContainerReply(arg) {
  if (!(arg instanceof dockerGet_pb.AddContainerReply)) {
    throw new Error('Expected argument of type dockerGet.AddContainerReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddContainerReply(buffer_arg) {
  return dockerGet_pb.AddContainerReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_AddContainerRequest(arg) {
  if (!(arg instanceof dockerGet_pb.AddContainerRequest)) {
    throw new Error('Expected argument of type dockerGet.AddContainerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddContainerRequest(buffer_arg) {
  return dockerGet_pb.AddContainerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_AddEnvironmentReply(arg) {
  if (!(arg instanceof dockerGet_pb.AddEnvironmentReply)) {
    throw new Error('Expected argument of type dockerGet.AddEnvironmentReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddEnvironmentReply(buffer_arg) {
  return dockerGet_pb.AddEnvironmentReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_AddEnvironmentRequest(arg) {
  if (!(arg instanceof dockerGet_pb.AddEnvironmentRequest)) {
    throw new Error('Expected argument of type dockerGet.AddEnvironmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddEnvironmentRequest(buffer_arg) {
  return dockerGet_pb.AddEnvironmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_AddTemplateReply(arg) {
  if (!(arg instanceof dockerGet_pb.AddTemplateReply)) {
    throw new Error('Expected argument of type dockerGet.AddTemplateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddTemplateReply(buffer_arg) {
  return dockerGet_pb.AddTemplateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_AddTemplateRequest(arg) {
  if (!(arg instanceof dockerGet_pb.AddTemplateRequest)) {
    throw new Error('Expected argument of type dockerGet.AddTemplateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddTemplateRequest(buffer_arg) {
  return dockerGet_pb.AddTemplateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_BuildEnvironmentRequest(arg) {
  if (!(arg instanceof dockerGet_pb.BuildEnvironmentRequest)) {
    throw new Error('Expected argument of type dockerGet.BuildEnvironmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_BuildEnvironmentRequest(buffer_arg) {
  return dockerGet_pb.BuildEnvironmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_CheckHaveContainerRequest(arg) {
  if (!(arg instanceof dockerGet_pb.CheckHaveContainerRequest)) {
    throw new Error('Expected argument of type dockerGet.CheckHaveContainerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_CheckHaveContainerRequest(buffer_arg) {
  return dockerGet_pb.CheckHaveContainerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_DownloadReply(arg) {
  if (!(arg instanceof dockerGet_pb.DownloadReply)) {
    throw new Error('Expected argument of type dockerGet.DownloadReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_DownloadReply(buffer_arg) {
  return dockerGet_pb.DownloadReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_DownloadRequest(arg) {
  if (!(arg instanceof dockerGet_pb.DownloadRequest)) {
    throw new Error('Expected argument of type dockerGet.DownloadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_DownloadRequest(buffer_arg) {
  return dockerGet_pb.DownloadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_EnvironmentIdRequest(arg) {
  if (!(arg instanceof dockerGet_pb.EnvironmentIdRequest)) {
    throw new Error('Expected argument of type dockerGet.EnvironmentIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_EnvironmentIdRequest(buffer_arg) {
  return dockerGet_pb.EnvironmentIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_GetNotificationTokenReply(arg) {
  if (!(arg instanceof dockerGet_pb.GetNotificationTokenReply)) {
    throw new Error('Expected argument of type dockerGet.GetNotificationTokenReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_GetNotificationTokenReply(buffer_arg) {
  return dockerGet_pb.GetNotificationTokenReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_GetSectionInfoReply(arg) {
  if (!(arg instanceof dockerGet_pb.GetSectionInfoReply)) {
    throw new Error('Expected argument of type dockerGet.GetSectionInfoReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_GetSectionInfoReply(buffer_arg) {
  return dockerGet_pb.GetSectionInfoReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_GetUserDataReply(arg) {
  if (!(arg instanceof dockerGet_pb.GetUserDataReply)) {
    throw new Error('Expected argument of type dockerGet.GetUserDataReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_GetUserDataReply(buffer_arg) {
  return dockerGet_pb.GetUserDataReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_InstantAddContainerRequest(arg) {
  if (!(arg instanceof dockerGet_pb.InstantAddContainerRequest)) {
    throw new Error('Expected argument of type dockerGet.InstantAddContainerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_InstantAddContainerRequest(buffer_arg) {
  return dockerGet_pb.InstantAddContainerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListContainerReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListContainerReply)) {
    throw new Error('Expected argument of type dockerGet.ListContainerReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListContainerReply(buffer_arg) {
  return dockerGet_pb.ListContainerReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListCoursesReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListCoursesReply)) {
    throw new Error('Expected argument of type dockerGet.ListCoursesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListCoursesReply(buffer_arg) {
  return dockerGet_pb.ListCoursesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListEnvironmentsReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListEnvironmentsReply)) {
    throw new Error('Expected argument of type dockerGet.ListEnvironmentsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListEnvironmentsReply(buffer_arg) {
  return dockerGet_pb.ListEnvironmentsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListFolderReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListFolderReply)) {
    throw new Error('Expected argument of type dockerGet.ListFolderReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListFolderReply(buffer_arg) {
  return dockerGet_pb.ListFolderReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListNotificationsReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListNotificationsReply)) {
    throw new Error('Expected argument of type dockerGet.ListNotificationsReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListNotificationsReply(buffer_arg) {
  return dockerGet_pb.ListNotificationsReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListReply)) {
    throw new Error('Expected argument of type dockerGet.ListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListReply(buffer_arg) {
  return dockerGet_pb.ListReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_ListTemplatesReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListTemplatesReply)) {
    throw new Error('Expected argument of type dockerGet.ListTemplatesReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListTemplatesReply(buffer_arg) {
  return dockerGet_pb.ListTemplatesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_LoginRequest(arg) {
  if (!(arg instanceof dockerGet_pb.LoginRequest)) {
    throw new Error('Expected argument of type dockerGet.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_LoginRequest(buffer_arg) {
  return dockerGet_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_RemoveContainerRequest(arg) {
  if (!(arg instanceof dockerGet_pb.RemoveContainerRequest)) {
    throw new Error('Expected argument of type dockerGet.RemoveContainerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_RemoveContainerRequest(buffer_arg) {
  return dockerGet_pb.RemoveContainerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_RemoveFileRequest(arg) {
  if (!(arg instanceof dockerGet_pb.RemoveFileRequest)) {
    throw new Error('Expected argument of type dockerGet.RemoveFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_RemoveFileRequest(buffer_arg) {
  return dockerGet_pb.RemoveFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_RemoveNotificationRequest(arg) {
  if (!(arg instanceof dockerGet_pb.RemoveNotificationRequest)) {
    throw new Error('Expected argument of type dockerGet.RemoveNotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_RemoveNotificationRequest(buffer_arg) {
  return dockerGet_pb.RemoveNotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SectionAndSubRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SectionAndSubRequest)) {
    throw new Error('Expected argument of type dockerGet.SectionAndSubRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SectionAndSubRequest(buffer_arg) {
  return dockerGet_pb.SectionAndSubRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SendNotificationReply(arg) {
  if (!(arg instanceof dockerGet_pb.SendNotificationReply)) {
    throw new Error('Expected argument of type dockerGet.SendNotificationReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SendNotificationReply(buffer_arg) {
  return dockerGet_pb.SendNotificationReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SendNotificationRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SendNotificationRequest)) {
    throw new Error('Expected argument of type dockerGet.SendNotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SendNotificationRequest(buffer_arg) {
  return dockerGet_pb.SendNotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SubRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SubRequest)) {
    throw new Error('Expected argument of type dockerGet.SubRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SubRequest(buffer_arg) {
  return dockerGet_pb.SubRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SubmitFilesRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SubmitFilesRequest)) {
    throw new Error('Expected argument of type dockerGet.SubmitFilesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SubmitFilesRequest(buffer_arg) {
  return dockerGet_pb.SubmitFilesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_SuccessStringReply(arg) {
  if (!(arg instanceof dockerGet_pb.SuccessStringReply)) {
    throw new Error('Expected argument of type dockerGet.SuccessStringReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SuccessStringReply(buffer_arg) {
  return dockerGet_pb.SuccessStringReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_TemplateIdRequest(arg) {
  if (!(arg instanceof dockerGet_pb.TemplateIdRequest)) {
    throw new Error('Expected argument of type dockerGet.TemplateIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_TemplateIdRequest(buffer_arg) {
  return dockerGet_pb.TemplateIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UpdateEnvironmentRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UpdateEnvironmentRequest)) {
    throw new Error('Expected argument of type dockerGet.UpdateEnvironmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UpdateEnvironmentRequest(buffer_arg) {
  return dockerGet_pb.UpdateEnvironmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UpdateNotificationTokenRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UpdateNotificationTokenRequest)) {
    throw new Error('Expected argument of type dockerGet.UpdateNotificationTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UpdateNotificationTokenRequest(buffer_arg) {
  return dockerGet_pb.UpdateNotificationTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UpdateSubscriptionRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UpdateSubscriptionRequest)) {
    throw new Error('Expected argument of type dockerGet.UpdateSubscriptionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UpdateSubscriptionRequest(buffer_arg) {
  return dockerGet_pb.UpdateSubscriptionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UpdateTemplateRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UpdateTemplateRequest)) {
    throw new Error('Expected argument of type dockerGet.UpdateTemplateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UpdateTemplateRequest(buffer_arg) {
  return dockerGet_pb.UpdateTemplateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UpdateUserDataRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UpdateUserDataRequest)) {
    throw new Error('Expected argument of type dockerGet.UpdateUserDataRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UpdateUserDataRequest(buffer_arg) {
  return dockerGet_pb.UpdateUserDataRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UploadReply(arg) {
  if (!(arg instanceof dockerGet_pb.UploadReply)) {
    throw new Error('Expected argument of type dockerGet.UploadReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UploadReply(buffer_arg) {
  return dockerGet_pb.UploadReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UploadRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UploadRequest)) {
    throw new Error('Expected argument of type dockerGet.UploadRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UploadRequest(buffer_arg) {
  return dockerGet_pb.UploadRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_UserIdRequest(arg) {
  if (!(arg instanceof dockerGet_pb.UserIdRequest)) {
    throw new Error('Expected argument of type dockerGet.UserIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_UserIdRequest(buffer_arg) {
  return dockerGet_pb.UserIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var DockerService = exports.DockerService = {
  login: {
    path: '/dockerGet.Docker/login',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.LoginRequest,
    responseType: dockerGet_pb.ListReply,
    requestSerialize: serialize_dockerGet_LoginRequest,
    requestDeserialize: deserialize_dockerGet_LoginRequest,
    responseSerialize: serialize_dockerGet_ListReply,
    responseDeserialize: deserialize_dockerGet_ListReply,
  },
  checkHaveContainer: {
    path: '/dockerGet.Docker/checkHaveContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.CheckHaveContainerRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_CheckHaveContainerRequest,
    requestDeserialize: deserialize_dockerGet_CheckHaveContainerRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  listContainers: {
    path: '/dockerGet.Docker/listContainers',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.ListContainerReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_ListContainerReply,
    responseDeserialize: deserialize_dockerGet_ListContainerReply,
  },
  listCourses: {
    path: '/dockerGet.Docker/listCourses',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.ListCoursesReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_ListCoursesReply,
    responseDeserialize: deserialize_dockerGet_ListCoursesReply,
  },
  getSectionInfo: {
    path: '/dockerGet.Docker/getSectionInfo',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SectionAndSubRequest,
    responseType: dockerGet_pb.GetSectionInfoReply,
    requestSerialize: serialize_dockerGet_SectionAndSubRequest,
    requestDeserialize: deserialize_dockerGet_SectionAndSubRequest,
    responseSerialize: serialize_dockerGet_GetSectionInfoReply,
    responseDeserialize: deserialize_dockerGet_GetSectionInfoReply,
  },
  listEnvironments: {
    path: '/dockerGet.Docker/listEnvironments',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SectionAndSubRequest,
    responseType: dockerGet_pb.ListEnvironmentsReply,
    requestSerialize: serialize_dockerGet_SectionAndSubRequest,
    requestDeserialize: deserialize_dockerGet_SectionAndSubRequest,
    responseSerialize: serialize_dockerGet_ListEnvironmentsReply,
    responseDeserialize: deserialize_dockerGet_ListEnvironmentsReply,
  },
  listTemplates: {
    path: '/dockerGet.Docker/listTemplates',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SectionAndSubRequest,
    responseType: dockerGet_pb.ListTemplatesReply,
    requestSerialize: serialize_dockerGet_SectionAndSubRequest,
    requestDeserialize: deserialize_dockerGet_SectionAndSubRequest,
    responseSerialize: serialize_dockerGet_ListTemplatesReply,
    responseDeserialize: deserialize_dockerGet_ListTemplatesReply,
  },
  addContainer: {
    path: '/dockerGet.Docker/addContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.AddContainerRequest,
    responseType: dockerGet_pb.AddContainerReply,
    requestSerialize: serialize_dockerGet_AddContainerRequest,
    requestDeserialize: deserialize_dockerGet_AddContainerRequest,
    responseSerialize: serialize_dockerGet_AddContainerReply,
    responseDeserialize: deserialize_dockerGet_AddContainerReply,
  },
  instantAddContainer: {
    path: '/dockerGet.Docker/instantAddContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.InstantAddContainerRequest,
    responseType: dockerGet_pb.AddContainerReply,
    requestSerialize: serialize_dockerGet_InstantAddContainerRequest,
    requestDeserialize: deserialize_dockerGet_InstantAddContainerRequest,
    responseSerialize: serialize_dockerGet_AddContainerReply,
    responseDeserialize: deserialize_dockerGet_AddContainerReply,
  },
  removeContainer: {
    path: '/dockerGet.Docker/removeContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.RemoveContainerRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_RemoveContainerRequest,
    requestDeserialize: deserialize_dockerGet_RemoveContainerRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  submitFiles: {
    path: '/dockerGet.Docker/submitFiles',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubmitFilesRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_SubmitFilesRequest,
    requestDeserialize: deserialize_dockerGet_SubmitFilesRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  addTemplate: {
    path: '/dockerGet.Docker/addTemplate',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.AddTemplateRequest,
    responseType: dockerGet_pb.AddTemplateReply,
    requestSerialize: serialize_dockerGet_AddTemplateRequest,
    requestDeserialize: deserialize_dockerGet_AddTemplateRequest,
    responseSerialize: serialize_dockerGet_AddTemplateReply,
    responseDeserialize: deserialize_dockerGet_AddTemplateReply,
  },
  updateTemplate: {
    path: '/dockerGet.Docker/updateTemplate',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UpdateTemplateRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_UpdateTemplateRequest,
    requestDeserialize: deserialize_dockerGet_UpdateTemplateRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  activateTemplate: {
    path: '/dockerGet.Docker/activateTemplate',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.TemplateIdRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_TemplateIdRequest,
    requestDeserialize: deserialize_dockerGet_TemplateIdRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  deactivateTemplate: {
    path: '/dockerGet.Docker/deactivateTemplate',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.TemplateIdRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_TemplateIdRequest,
    requestDeserialize: deserialize_dockerGet_TemplateIdRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  removeTemplate: {
    path: '/dockerGet.Docker/removeTemplate',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.TemplateIdRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_TemplateIdRequest,
    requestDeserialize: deserialize_dockerGet_TemplateIdRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  addEnvironment: {
    path: '/dockerGet.Docker/addEnvironment',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.AddEnvironmentRequest,
    responseType: dockerGet_pb.AddEnvironmentReply,
    requestSerialize: serialize_dockerGet_AddEnvironmentRequest,
    requestDeserialize: deserialize_dockerGet_AddEnvironmentRequest,
    responseSerialize: serialize_dockerGet_AddEnvironmentReply,
    responseDeserialize: deserialize_dockerGet_AddEnvironmentReply,
  },
  updateEnvironment: {
    path: '/dockerGet.Docker/updateEnvironment',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UpdateEnvironmentRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_UpdateEnvironmentRequest,
    requestDeserialize: deserialize_dockerGet_UpdateEnvironmentRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  buildEnvironment: {
    path: '/dockerGet.Docker/buildEnvironment',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.BuildEnvironmentRequest,
    responseType: dockerGet_pb.AddEnvironmentReply,
    requestSerialize: serialize_dockerGet_BuildEnvironmentRequest,
    requestDeserialize: deserialize_dockerGet_BuildEnvironmentRequest,
    responseSerialize: serialize_dockerGet_AddEnvironmentReply,
    responseDeserialize: deserialize_dockerGet_AddEnvironmentReply,
  },
  removeEnvironment: {
    path: '/dockerGet.Docker/removeEnvironment',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.EnvironmentIdRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_EnvironmentIdRequest,
    requestDeserialize: deserialize_dockerGet_EnvironmentIdRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  getUserData: {
    path: '/dockerGet.Docker/getUserData',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.GetUserDataReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_GetUserDataReply,
    responseDeserialize: deserialize_dockerGet_GetUserDataReply,
  },
  updateUserData: {
    path: '/dockerGet.Docker/updateUserData',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UpdateUserDataRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_UpdateUserDataRequest,
    requestDeserialize: deserialize_dockerGet_UpdateUserDataRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  getNotificationToken: {
    path: '/dockerGet.Docker/getNotificationToken',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.GetNotificationTokenReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_GetNotificationTokenReply,
    responseDeserialize: deserialize_dockerGet_GetNotificationTokenReply,
  },
  sendNotification: {
    path: '/dockerGet.Docker/sendNotification',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SendNotificationRequest,
    responseType: dockerGet_pb.SendNotificationReply,
    requestSerialize: serialize_dockerGet_SendNotificationRequest,
    requestDeserialize: deserialize_dockerGet_SendNotificationRequest,
    responseSerialize: serialize_dockerGet_SendNotificationReply,
    responseDeserialize: deserialize_dockerGet_SendNotificationReply,
  },
  listNotifications: {
    path: '/dockerGet.Docker/listNotifications',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UserIdRequest,
    responseType: dockerGet_pb.ListNotificationsReply,
    requestSerialize: serialize_dockerGet_UserIdRequest,
    requestDeserialize: deserialize_dockerGet_UserIdRequest,
    responseSerialize: serialize_dockerGet_ListNotificationsReply,
    responseDeserialize: deserialize_dockerGet_ListNotificationsReply,
  },
  removeNotification: {
    path: '/dockerGet.Docker/removeNotification',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.RemoveNotificationRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_RemoveNotificationRequest,
    requestDeserialize: deserialize_dockerGet_RemoveNotificationRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  updateNotificationToken: {
    path: '/dockerGet.Docker/updateNotificationToken',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UpdateNotificationTokenRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_UpdateNotificationTokenRequest,
    requestDeserialize: deserialize_dockerGet_UpdateNotificationTokenRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  updateSubscription: {
    path: '/dockerGet.Docker/updateSubscription',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UpdateSubscriptionRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_UpdateSubscriptionRequest,
    requestDeserialize: deserialize_dockerGet_UpdateSubscriptionRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
  listFolders: {
    path: '/dockerGet.Docker/listFolders',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.UserIdRequest,
    responseType: dockerGet_pb.ListFolderReply,
    requestSerialize: serialize_dockerGet_UserIdRequest,
    requestDeserialize: deserialize_dockerGet_UserIdRequest,
    responseSerialize: serialize_dockerGet_ListFolderReply,
    responseDeserialize: deserialize_dockerGet_ListFolderReply,
  },
  downloadFile: {
    path: '/dockerGet.Docker/downloadFile',
    requestStream: false,
    responseStream: true,
    requestType: dockerGet_pb.DownloadRequest,
    responseType: dockerGet_pb.DownloadReply,
    requestSerialize: serialize_dockerGet_DownloadRequest,
    requestDeserialize: deserialize_dockerGet_DownloadRequest,
    responseSerialize: serialize_dockerGet_DownloadReply,
    responseDeserialize: deserialize_dockerGet_DownloadReply,
  },
  uploadFile: {
    path: '/dockerGet.Docker/uploadFile',
    requestStream: true,
    responseStream: false,
    requestType: dockerGet_pb.UploadRequest,
    responseType: dockerGet_pb.UploadReply,
    requestSerialize: serialize_dockerGet_UploadRequest,
    requestDeserialize: deserialize_dockerGet_UploadRequest,
    responseSerialize: serialize_dockerGet_UploadReply,
    responseDeserialize: deserialize_dockerGet_UploadReply,
  },
  removeFile: {
    path: '/dockerGet.Docker/removeFile',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.RemoveFileRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_RemoveFileRequest,
    requestDeserialize: deserialize_dockerGet_RemoveFileRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
};

exports.DockerClient = grpc.makeGenericClientConstructor(DockerService);
