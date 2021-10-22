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

function serialize_dockerGet_GetSectionInfoReply(arg) {
  if (!(arg instanceof dockerGet_pb.GetSectionInfoReply)) {
    throw new Error('Expected argument of type dockerGet.GetSectionInfoReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_GetSectionInfoReply(buffer_arg) {
  return dockerGet_pb.GetSectionInfoReply.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_dockerGet_RemoveEnvironmentRequest(arg) {
  if (!(arg instanceof dockerGet_pb.RemoveEnvironmentRequest)) {
    throw new Error('Expected argument of type dockerGet.RemoveEnvironmentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_RemoveEnvironmentRequest(buffer_arg) {
  return dockerGet_pb.RemoveEnvironmentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_RemoveTemplateRequest(arg) {
  if (!(arg instanceof dockerGet_pb.RemoveTemplateRequest)) {
    throw new Error('Expected argument of type dockerGet.RemoveTemplateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_RemoveTemplateRequest(buffer_arg) {
  return dockerGet_pb.RemoveTemplateRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_dockerGet_SubRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SubRequest)) {
    throw new Error('Expected argument of type dockerGet.SubRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SubRequest(buffer_arg) {
  return dockerGet_pb.SubRequest.deserializeBinary(new Uint8Array(buffer_arg));
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
    requestType: dockerGet_pb.RemoveTemplateRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_RemoveTemplateRequest,
    requestDeserialize: deserialize_dockerGet_RemoveTemplateRequest,
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
    requestType: dockerGet_pb.RemoveEnvironmentRequest,
    responseType: dockerGet_pb.SuccessStringReply,
    requestSerialize: serialize_dockerGet_RemoveEnvironmentRequest,
    requestDeserialize: deserialize_dockerGet_RemoveEnvironmentRequest,
    responseSerialize: serialize_dockerGet_SuccessStringReply,
    responseDeserialize: deserialize_dockerGet_SuccessStringReply,
  },
};

exports.DockerClient = grpc.makeGenericClientConstructor(DockerService);
