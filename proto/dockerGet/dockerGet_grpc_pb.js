// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var dockerGet_pb = require('./dockerGet_pb.js');

function serialize_dockerGet_AddContainerRequest(arg) {
  if (!(arg instanceof dockerGet_pb.AddContainerRequest)) {
    throw new Error('Expected argument of type dockerGet.AddContainerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_AddContainerRequest(buffer_arg) {
  return dockerGet_pb.AddContainerRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_dockerGet_ListReply(arg) {
  if (!(arg instanceof dockerGet_pb.ListReply)) {
    throw new Error('Expected argument of type dockerGet.ListReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_ListReply(buffer_arg) {
  return dockerGet_pb.ListReply.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_dockerGet_SectionRequest(arg) {
  if (!(arg instanceof dockerGet_pb.SectionRequest)) {
    throw new Error('Expected argument of type dockerGet.SectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_SectionRequest(buffer_arg) {
  return dockerGet_pb.SectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dockerGet_StringReply(arg) {
  if (!(arg instanceof dockerGet_pb.StringReply)) {
    throw new Error('Expected argument of type dockerGet.StringReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dockerGet_StringReply(buffer_arg) {
  return dockerGet_pb.StringReply.deserializeBinary(new Uint8Array(buffer_arg));
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
    responseType: dockerGet_pb.StringReply,
    requestSerialize: serialize_dockerGet_CheckHaveContainerRequest,
    requestDeserialize: deserialize_dockerGet_CheckHaveContainerRequest,
    responseSerialize: serialize_dockerGet_StringReply,
    responseDeserialize: deserialize_dockerGet_StringReply,
  },
  listContainers: {
    path: '/dockerGet.Docker/listContainers',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.ListReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_ListReply,
    responseDeserialize: deserialize_dockerGet_ListReply,
  },
  listCourses: {
    path: '/dockerGet.Docker/listCourses',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SubRequest,
    responseType: dockerGet_pb.ListReply,
    requestSerialize: serialize_dockerGet_SubRequest,
    requestDeserialize: deserialize_dockerGet_SubRequest,
    responseSerialize: serialize_dockerGet_ListReply,
    responseDeserialize: deserialize_dockerGet_ListReply,
  },
  listEnvironments: {
    path: '/dockerGet.Docker/listEnvironments',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SectionRequest,
    responseType: dockerGet_pb.ListReply,
    requestSerialize: serialize_dockerGet_SectionRequest,
    requestDeserialize: deserialize_dockerGet_SectionRequest,
    responseSerialize: serialize_dockerGet_ListReply,
    responseDeserialize: deserialize_dockerGet_ListReply,
  },
  listTemplates: {
    path: '/dockerGet.Docker/listTemplates',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.SectionRequest,
    responseType: dockerGet_pb.ListReply,
    requestSerialize: serialize_dockerGet_SectionRequest,
    requestDeserialize: deserialize_dockerGet_SectionRequest,
    responseSerialize: serialize_dockerGet_ListReply,
    responseDeserialize: deserialize_dockerGet_ListReply,
  },
  addContainer: {
    path: '/dockerGet.Docker/addContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.AddContainerRequest,
    responseType: dockerGet_pb.StringReply,
    requestSerialize: serialize_dockerGet_AddContainerRequest,
    requestDeserialize: deserialize_dockerGet_AddContainerRequest,
    responseSerialize: serialize_dockerGet_StringReply,
    responseDeserialize: deserialize_dockerGet_StringReply,
  },
  removeContainer: {
    path: '/dockerGet.Docker/removeContainer',
    requestStream: false,
    responseStream: false,
    requestType: dockerGet_pb.RemoveContainerRequest,
    responseType: dockerGet_pb.StringReply,
    requestSerialize: serialize_dockerGet_RemoveContainerRequest,
    requestDeserialize: deserialize_dockerGet_RemoveContainerRequest,
    responseSerialize: serialize_dockerGet_StringReply,
    responseDeserialize: deserialize_dockerGet_StringReply,
  },
};

exports.DockerClient = grpc.makeGenericClientConstructor(DockerService);
