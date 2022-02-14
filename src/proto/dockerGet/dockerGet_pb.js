// source: dockerGet.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.dockerGet.AddContainerReply', null, global);
goog.exportSymbol('proto.dockerGet.AddContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.AddEnvironmentReply', null, global);
goog.exportSymbol('proto.dockerGet.AddEnvironmentRequest', null, global);
goog.exportSymbol('proto.dockerGet.AddSandBoxImageReply', null, global);
goog.exportSymbol('proto.dockerGet.AddSandBoxImageRequest', null, global);
goog.exportSymbol('proto.dockerGet.AddSandBoxReply', null, global);
goog.exportSymbol('proto.dockerGet.AddSandBoxRequest', null, global);
goog.exportSymbol('proto.dockerGet.AddTempContainerReply', null, global);
goog.exportSymbol('proto.dockerGet.AddTempContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.AddTemplateReply', null, global);
goog.exportSymbol('proto.dockerGet.AddTemplateRequest', null, global);
goog.exportSymbol('proto.dockerGet.BuildEnvironmentRequest', null, global);
goog.exportSymbol('proto.dockerGet.CheckHaveContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.ChildrenReply', null, global);
goog.exportSymbol('proto.dockerGet.ChildrenReply.child', null, global);
goog.exportSymbol('proto.dockerGet.CodeRequest', null, global);
goog.exportSymbol('proto.dockerGet.ContainerTimeReply', null, global);
goog.exportSymbol('proto.dockerGet.DownloadRequest', null, global);
goog.exportSymbol('proto.dockerGet.EmptyRequest', null, global);
goog.exportSymbol('proto.dockerGet.EnvironmentIdRequest', null, global);
goog.exportSymbol('proto.dockerGet.GetNotificationTokenReply', null, global);
goog.exportSymbol('proto.dockerGet.GetSectionInfoReply', null, global);
goog.exportSymbol('proto.dockerGet.GetUserDataReply', null, global);
goog.exportSymbol('proto.dockerGet.GetUserDataRequest', null, global);
goog.exportSymbol('proto.dockerGet.InstantAddContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.ListContainerReply', null, global);
goog.exportSymbol('proto.dockerGet.ListContainerReply.Container', null, global);
goog.exportSymbol('proto.dockerGet.ListContainerReply.ContainersInfo', null, global);
goog.exportSymbol('proto.dockerGet.ListCoursesReply', null, global);
goog.exportSymbol('proto.dockerGet.ListCoursesReply.Course', null, global);
goog.exportSymbol('proto.dockerGet.ListEnvironmentsReply', null, global);
goog.exportSymbol('proto.dockerGet.ListEnvironmentsReply.Environment', null, global);
goog.exportSymbol('proto.dockerGet.ListFilesRequest', null, global);
goog.exportSymbol('proto.dockerGet.ListNotificationsReply', null, global);
goog.exportSymbol('proto.dockerGet.ListNotificationsReply.Notification', null, global);
goog.exportSymbol('proto.dockerGet.ListNotificationsReply.Notification.Sender', null, global);
goog.exportSymbol('proto.dockerGet.ListReply', null, global);
goog.exportSymbol('proto.dockerGet.ListSandBoxImageReply', null, global);
goog.exportSymbol('proto.dockerGet.ListSandBoxImageReply.SandBoxImage', null, global);
goog.exportSymbol('proto.dockerGet.ListSandBoxImageRequest', null, global);
goog.exportSymbol('proto.dockerGet.ListTemplatesReply', null, global);
goog.exportSymbol('proto.dockerGet.ListTemplatesReply.Template', null, global);
goog.exportSymbol('proto.dockerGet.RemoveContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.RemoveNotificationRequest', null, global);
goog.exportSymbol('proto.dockerGet.RemoveTempContainerRequest', null, global);
goog.exportSymbol('proto.dockerGet.SandBoxIdRequest', null, global);
goog.exportSymbol('proto.dockerGet.SandBoxImageIdRequest', null, global);
goog.exportSymbol('proto.dockerGet.SectionAndSubRequest', null, global);
goog.exportSymbol('proto.dockerGet.SectionRequest', null, global);
goog.exportSymbol('proto.dockerGet.SendNotificationReply', null, global);
goog.exportSymbol('proto.dockerGet.SendNotificationRequest', null, global);
goog.exportSymbol('proto.dockerGet.StringReply', null, global);
goog.exportSymbol('proto.dockerGet.SubRequest', null, global);
goog.exportSymbol('proto.dockerGet.SubmitFilesRequest', null, global);
goog.exportSymbol('proto.dockerGet.SuccessStringReply', null, global);
goog.exportSymbol('proto.dockerGet.TemplateIdRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateEnvironmentRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateNotificationTokenRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateSandBoxImageRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateSubscriptionRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateTemplateRequest', null, global);
goog.exportSymbol('proto.dockerGet.UpdateUserDataRequest', null, global);
goog.exportSymbol('proto.dockerGet.UploadRequest', null, global);
goog.exportSymbol('proto.dockerGet.UserIdRequest', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListFilesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListFilesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListFilesRequest.displayName = 'proto.dockerGet.ListFilesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ChildrenReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ChildrenReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ChildrenReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ChildrenReply.displayName = 'proto.dockerGet.ChildrenReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ChildrenReply.child = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ChildrenReply.child, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ChildrenReply.child.displayName = 'proto.dockerGet.ChildrenReply.child';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.CodeRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.CodeRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.CodeRequest.displayName = 'proto.dockerGet.CodeRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UserIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UserIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UserIdRequest.displayName = 'proto.dockerGet.UserIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListNotificationsReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListNotificationsReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListNotificationsReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListNotificationsReply.displayName = 'proto.dockerGet.ListNotificationsReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListNotificationsReply.Notification = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListNotificationsReply.Notification, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListNotificationsReply.Notification.displayName = 'proto.dockerGet.ListNotificationsReply.Notification';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListNotificationsReply.Notification.Sender, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListNotificationsReply.Notification.Sender.displayName = 'proto.dockerGet.ListNotificationsReply.Notification.Sender';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.EmptyRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.EmptyRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.EmptyRequest.displayName = 'proto.dockerGet.EmptyRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListContainerReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListContainerReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListContainerReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListContainerReply.displayName = 'proto.dockerGet.ListContainerReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListContainerReply.ContainersInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListContainerReply.ContainersInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListContainerReply.ContainersInfo.displayName = 'proto.dockerGet.ListContainerReply.ContainersInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListContainerReply.Container = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListContainerReply.Container, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListContainerReply.Container.displayName = 'proto.dockerGet.ListContainerReply.Container';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListCoursesReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListCoursesReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListCoursesReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListCoursesReply.displayName = 'proto.dockerGet.ListCoursesReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListCoursesReply.Course = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListCoursesReply.Course, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListCoursesReply.Course.displayName = 'proto.dockerGet.ListCoursesReply.Course';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.GetSectionInfoReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.GetSectionInfoReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.GetSectionInfoReply.displayName = 'proto.dockerGet.GetSectionInfoReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListEnvironmentsReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListEnvironmentsReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListEnvironmentsReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListEnvironmentsReply.displayName = 'proto.dockerGet.ListEnvironmentsReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListEnvironmentsReply.Environment = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListEnvironmentsReply.Environment, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListEnvironmentsReply.Environment.displayName = 'proto.dockerGet.ListEnvironmentsReply.Environment';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListTemplatesReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListTemplatesReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListTemplatesReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListTemplatesReply.displayName = 'proto.dockerGet.ListTemplatesReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListTemplatesReply.Template = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListTemplatesReply.Template.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListTemplatesReply.Template, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListTemplatesReply.Template.displayName = 'proto.dockerGet.ListTemplatesReply.Template';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddContainerRequest.displayName = 'proto.dockerGet.AddContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.InstantAddContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.InstantAddContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.InstantAddContainerRequest.displayName = 'proto.dockerGet.InstantAddContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddContainerReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddContainerReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddContainerReply.displayName = 'proto.dockerGet.AddContainerReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.RemoveContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.RemoveContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.RemoveContainerRequest.displayName = 'proto.dockerGet.RemoveContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SubmitFilesRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SubmitFilesRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SubmitFilesRequest.displayName = 'proto.dockerGet.SubmitFilesRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ContainerTimeReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ContainerTimeReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ContainerTimeReply.displayName = 'proto.dockerGet.ContainerTimeReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddTemplateRequest.displayName = 'proto.dockerGet.AddTemplateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateTemplateRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateTemplateRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateTemplateRequest.displayName = 'proto.dockerGet.UpdateTemplateRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.TemplateIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.TemplateIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.TemplateIdRequest.displayName = 'proto.dockerGet.TemplateIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddTemplateReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddTemplateReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddTemplateReply.displayName = 'proto.dockerGet.AddTemplateReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddEnvironmentRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.AddEnvironmentRequest.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.AddEnvironmentRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddEnvironmentRequest.displayName = 'proto.dockerGet.AddEnvironmentRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddEnvironmentReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddEnvironmentReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddEnvironmentReply.displayName = 'proto.dockerGet.AddEnvironmentReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.BuildEnvironmentRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.BuildEnvironmentRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.BuildEnvironmentRequest.displayName = 'proto.dockerGet.BuildEnvironmentRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateEnvironmentRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateEnvironmentRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateEnvironmentRequest.displayName = 'proto.dockerGet.UpdateEnvironmentRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.EnvironmentIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.EnvironmentIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.EnvironmentIdRequest.displayName = 'proto.dockerGet.EnvironmentIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SectionAndSubRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SectionAndSubRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SectionAndSubRequest.displayName = 'proto.dockerGet.SectionAndSubRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.CheckHaveContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.CheckHaveContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.CheckHaveContainerRequest.displayName = 'proto.dockerGet.CheckHaveContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SubRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SubRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SubRequest.displayName = 'proto.dockerGet.SubRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SectionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SectionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SectionRequest.displayName = 'proto.dockerGet.SectionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SuccessStringReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SuccessStringReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SuccessStringReply.displayName = 'proto.dockerGet.SuccessStringReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.StringReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.StringReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.StringReply.displayName = 'proto.dockerGet.StringReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListReply.displayName = 'proto.dockerGet.ListReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.GetUserDataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.GetUserDataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.GetUserDataRequest.displayName = 'proto.dockerGet.GetUserDataRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.GetUserDataReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.GetUserDataReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.GetUserDataReply.displayName = 'proto.dockerGet.GetUserDataReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateUserDataRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateUserDataRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateUserDataRequest.displayName = 'proto.dockerGet.UpdateUserDataRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.GetNotificationTokenReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.GetNotificationTokenReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.GetNotificationTokenReply.displayName = 'proto.dockerGet.GetNotificationTokenReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SendNotificationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SendNotificationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SendNotificationRequest.displayName = 'proto.dockerGet.SendNotificationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SendNotificationReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SendNotificationReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SendNotificationReply.displayName = 'proto.dockerGet.SendNotificationReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateNotificationTokenRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateNotificationTokenRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateNotificationTokenRequest.displayName = 'proto.dockerGet.UpdateNotificationTokenRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.RemoveNotificationRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.RemoveNotificationRequest.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.RemoveNotificationRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.RemoveNotificationRequest.displayName = 'proto.dockerGet.RemoveNotificationRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateSubscriptionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateSubscriptionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateSubscriptionRequest.displayName = 'proto.dockerGet.UpdateSubscriptionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.DownloadRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.DownloadRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.DownloadRequest.displayName = 'proto.dockerGet.DownloadRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UploadRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UploadRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UploadRequest.displayName = 'proto.dockerGet.UploadRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddTempContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddTempContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddTempContainerRequest.displayName = 'proto.dockerGet.AddTempContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddTempContainerReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddTempContainerReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddTempContainerReply.displayName = 'proto.dockerGet.AddTempContainerReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.RemoveTempContainerRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.RemoveTempContainerRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.RemoveTempContainerRequest.displayName = 'proto.dockerGet.RemoveTempContainerRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddSandBoxImageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddSandBoxImageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddSandBoxImageRequest.displayName = 'proto.dockerGet.AddSandBoxImageRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddSandBoxImageReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddSandBoxImageReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddSandBoxImageReply.displayName = 'proto.dockerGet.AddSandBoxImageReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.UpdateSandBoxImageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.UpdateSandBoxImageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.UpdateSandBoxImageRequest.displayName = 'proto.dockerGet.UpdateSandBoxImageRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SandBoxImageIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SandBoxImageIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SandBoxImageIdRequest.displayName = 'proto.dockerGet.SandBoxImageIdRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListSandBoxImageRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.ListSandBoxImageRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListSandBoxImageRequest.displayName = 'proto.dockerGet.ListSandBoxImageRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListSandBoxImageReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListSandBoxImageReply.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListSandBoxImageReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListSandBoxImageReply.displayName = 'proto.dockerGet.ListSandBoxImageReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.dockerGet.ListSandBoxImageReply.SandBoxImage.repeatedFields_, null);
};
goog.inherits(proto.dockerGet.ListSandBoxImageReply.SandBoxImage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.ListSandBoxImageReply.SandBoxImage.displayName = 'proto.dockerGet.ListSandBoxImageReply.SandBoxImage';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddSandBoxRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddSandBoxRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddSandBoxRequest.displayName = 'proto.dockerGet.AddSandBoxRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.AddSandBoxReply = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.AddSandBoxReply, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.AddSandBoxReply.displayName = 'proto.dockerGet.AddSandBoxReply';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.dockerGet.SandBoxIdRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.dockerGet.SandBoxIdRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.dockerGet.SandBoxIdRequest.displayName = 'proto.dockerGet.SandBoxIdRequest';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListFilesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListFilesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListFilesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListFilesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, ""),
    folderid: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListFilesRequest}
 */
proto.dockerGet.ListFilesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListFilesRequest;
  return proto.dockerGet.ListFilesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListFilesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListFilesRequest}
 */
proto.dockerGet.ListFilesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFolderid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListFilesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListFilesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListFilesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListFilesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFolderid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.ListFilesRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListFilesRequest} returns this
 */
proto.dockerGet.ListFilesRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.ListFilesRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListFilesRequest} returns this
 */
proto.dockerGet.ListFilesRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string folderId = 2;
 * @return {string}
 */
proto.dockerGet.ListFilesRequest.prototype.getFolderid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListFilesRequest} returns this
 */
proto.dockerGet.ListFilesRequest.prototype.setFolderid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ChildrenReply.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ChildrenReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ChildrenReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ChildrenReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ChildrenReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    filesList: jspb.Message.toObjectList(msg.getFilesList(),
    proto.dockerGet.ChildrenReply.child.toObject, includeInstance),
    foldersList: jspb.Message.toObjectList(msg.getFoldersList(),
    proto.dockerGet.ChildrenReply.child.toObject, includeInstance),
    success: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    message: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ChildrenReply}
 */
proto.dockerGet.ChildrenReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ChildrenReply;
  return proto.dockerGet.ChildrenReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ChildrenReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ChildrenReply}
 */
proto.dockerGet.ChildrenReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.dockerGet.ChildrenReply.child;
      reader.readMessage(value,proto.dockerGet.ChildrenReply.child.deserializeBinaryFromReader);
      msg.addFiles(value);
      break;
    case 2:
      var value = new proto.dockerGet.ChildrenReply.child;
      reader.readMessage(value,proto.dockerGet.ChildrenReply.child.deserializeBinaryFromReader);
      msg.addFolders(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ChildrenReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ChildrenReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ChildrenReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ChildrenReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.dockerGet.ChildrenReply.child.serializeBinaryToWriter
    );
  }
  f = message.getFoldersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.dockerGet.ChildrenReply.child.serializeBinaryToWriter
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ChildrenReply.child.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ChildrenReply.child.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ChildrenReply.child} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ChildrenReply.child.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ChildrenReply.child}
 */
proto.dockerGet.ChildrenReply.child.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ChildrenReply.child;
  return proto.dockerGet.ChildrenReply.child.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ChildrenReply.child} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ChildrenReply.child}
 */
proto.dockerGet.ChildrenReply.child.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ChildrenReply.child.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ChildrenReply.child.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ChildrenReply.child} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ChildrenReply.child.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ChildrenReply.child.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ChildrenReply.child} returns this
 */
proto.dockerGet.ChildrenReply.child.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.ChildrenReply.child.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ChildrenReply.child} returns this
 */
proto.dockerGet.ChildrenReply.child.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated child files = 1;
 * @return {!Array<!proto.dockerGet.ChildrenReply.child>}
 */
proto.dockerGet.ChildrenReply.prototype.getFilesList = function() {
  return /** @type{!Array<!proto.dockerGet.ChildrenReply.child>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ChildrenReply.child, 1));
};


/**
 * @param {!Array<!proto.dockerGet.ChildrenReply.child>} value
 * @return {!proto.dockerGet.ChildrenReply} returns this
*/
proto.dockerGet.ChildrenReply.prototype.setFilesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.dockerGet.ChildrenReply.child=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ChildrenReply.child}
 */
proto.dockerGet.ChildrenReply.prototype.addFiles = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.dockerGet.ChildrenReply.child, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ChildrenReply} returns this
 */
proto.dockerGet.ChildrenReply.prototype.clearFilesList = function() {
  return this.setFilesList([]);
};


/**
 * repeated child folders = 2;
 * @return {!Array<!proto.dockerGet.ChildrenReply.child>}
 */
proto.dockerGet.ChildrenReply.prototype.getFoldersList = function() {
  return /** @type{!Array<!proto.dockerGet.ChildrenReply.child>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ChildrenReply.child, 2));
};


/**
 * @param {!Array<!proto.dockerGet.ChildrenReply.child>} value
 * @return {!proto.dockerGet.ChildrenReply} returns this
*/
proto.dockerGet.ChildrenReply.prototype.setFoldersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.dockerGet.ChildrenReply.child=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ChildrenReply.child}
 */
proto.dockerGet.ChildrenReply.prototype.addFolders = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.dockerGet.ChildrenReply.child, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ChildrenReply} returns this
 */
proto.dockerGet.ChildrenReply.prototype.clearFoldersList = function() {
  return this.setFoldersList([]);
};


/**
 * optional bool success = 3;
 * @return {boolean}
 */
proto.dockerGet.ChildrenReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ChildrenReply} returns this
 */
proto.dockerGet.ChildrenReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.dockerGet.ChildrenReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ChildrenReply} returns this
 */
proto.dockerGet.ChildrenReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.CodeRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.CodeRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.CodeRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.CodeRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    code: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.CodeRequest}
 */
proto.dockerGet.CodeRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.CodeRequest;
  return proto.dockerGet.CodeRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.CodeRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.CodeRequest}
 */
proto.dockerGet.CodeRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCode(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.CodeRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.CodeRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.CodeRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.CodeRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getCode();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.CodeRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CodeRequest} returns this
 */
proto.dockerGet.CodeRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string code = 1;
 * @return {string}
 */
proto.dockerGet.CodeRequest.prototype.getCode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CodeRequest} returns this
 */
proto.dockerGet.CodeRequest.prototype.setCode = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sub = 2;
 * @return {string}
 */
proto.dockerGet.CodeRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CodeRequest} returns this
 */
proto.dockerGet.CodeRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UserIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UserIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UserIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UserIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UserIdRequest}
 */
proto.dockerGet.UserIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UserIdRequest;
  return proto.dockerGet.UserIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UserIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UserIdRequest}
 */
proto.dockerGet.UserIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UserIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UserIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UserIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UserIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UserIdRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UserIdRequest} returns this
 */
proto.dockerGet.UserIdRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string userId = 1;
 * @return {string}
 */
proto.dockerGet.UserIdRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UserIdRequest} returns this
 */
proto.dockerGet.UserIdRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListNotificationsReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListNotificationsReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListNotificationsReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListNotificationsReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    notificationsList: jspb.Message.toObjectList(msg.getNotificationsList(),
    proto.dockerGet.ListNotificationsReply.Notification.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListNotificationsReply}
 */
proto.dockerGet.ListNotificationsReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListNotificationsReply;
  return proto.dockerGet.ListNotificationsReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListNotificationsReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListNotificationsReply}
 */
proto.dockerGet.ListNotificationsReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListNotificationsReply.Notification;
      reader.readMessage(value,proto.dockerGet.ListNotificationsReply.Notification.deserializeBinaryFromReader);
      msg.addNotifications(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListNotificationsReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListNotificationsReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListNotificationsReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNotificationsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListNotificationsReply.Notification.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListNotificationsReply.Notification.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListNotificationsReply.Notification} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.Notification.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    body: jspb.Message.getFieldWithDefault(msg, 3, ""),
    sender: (f = msg.getSender()) && proto.dockerGet.ListNotificationsReply.Notification.Sender.toObject(includeInstance, f),
    allowReply: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    updatedAt: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListNotificationsReply.Notification}
 */
proto.dockerGet.ListNotificationsReply.Notification.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListNotificationsReply.Notification;
  return proto.dockerGet.ListNotificationsReply.Notification.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListNotificationsReply.Notification} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListNotificationsReply.Notification}
 */
proto.dockerGet.ListNotificationsReply.Notification.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setBody(value);
      break;
    case 4:
      var value = new proto.dockerGet.ListNotificationsReply.Notification.Sender;
      reader.readMessage(value,proto.dockerGet.ListNotificationsReply.Notification.Sender.deserializeBinaryFromReader);
      msg.setSender(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowReply(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdatedAt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListNotificationsReply.Notification.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListNotificationsReply.Notification} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.Notification.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getBody();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSender();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.dockerGet.ListNotificationsReply.Notification.Sender.serializeBinaryToWriter
    );
  }
  f = message.getAllowReply();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getUpdatedAt();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListNotificationsReply.Notification.Sender.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListNotificationsReply.Notification.Sender} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 2, ""),
    name: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListNotificationsReply.Notification.Sender}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListNotificationsReply.Notification.Sender;
  return proto.dockerGet.ListNotificationsReply.Notification.Sender.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListNotificationsReply.Notification.Sender} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListNotificationsReply.Notification.Sender}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListNotificationsReply.Notification.Sender.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListNotificationsReply.Notification.Sender} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification.Sender} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sub = 2;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification.Sender} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification.Sender} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.Sender.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string body = 3;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.setBody = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional Sender sender = 4;
 * @return {?proto.dockerGet.ListNotificationsReply.Notification.Sender}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getSender = function() {
  return /** @type{?proto.dockerGet.ListNotificationsReply.Notification.Sender} */ (
    jspb.Message.getWrapperField(this, proto.dockerGet.ListNotificationsReply.Notification.Sender, 4));
};


/**
 * @param {?proto.dockerGet.ListNotificationsReply.Notification.Sender|undefined} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
*/
proto.dockerGet.ListNotificationsReply.Notification.prototype.setSender = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.clearSender = function() {
  return this.setSender(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.hasSender = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional bool allow_reply = 6;
 * @return {boolean}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getAllowReply = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.setAllowReply = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional string updated_at = 5;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.getUpdatedAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply.Notification} returns this
 */
proto.dockerGet.ListNotificationsReply.Notification.prototype.setUpdatedAt = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListNotificationsReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListNotificationsReply} returns this
 */
proto.dockerGet.ListNotificationsReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.ListNotificationsReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListNotificationsReply} returns this
 */
proto.dockerGet.ListNotificationsReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Notification notifications = 3;
 * @return {!Array<!proto.dockerGet.ListNotificationsReply.Notification>}
 */
proto.dockerGet.ListNotificationsReply.prototype.getNotificationsList = function() {
  return /** @type{!Array<!proto.dockerGet.ListNotificationsReply.Notification>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListNotificationsReply.Notification, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListNotificationsReply.Notification>} value
 * @return {!proto.dockerGet.ListNotificationsReply} returns this
*/
proto.dockerGet.ListNotificationsReply.prototype.setNotificationsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListNotificationsReply.Notification=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListNotificationsReply.Notification}
 */
proto.dockerGet.ListNotificationsReply.prototype.addNotifications = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListNotificationsReply.Notification, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListNotificationsReply} returns this
 */
proto.dockerGet.ListNotificationsReply.prototype.clearNotificationsList = function() {
  return this.setNotificationsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.EmptyRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.EmptyRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.EmptyRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.EmptyRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.EmptyRequest}
 */
proto.dockerGet.EmptyRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.EmptyRequest;
  return proto.dockerGet.EmptyRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.EmptyRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.EmptyRequest}
 */
proto.dockerGet.EmptyRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.EmptyRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.EmptyRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.EmptyRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.EmptyRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.EmptyRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.EmptyRequest} returns this
 */
proto.dockerGet.EmptyRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListContainerReply.repeatedFields_ = [3,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListContainerReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListContainerReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListContainerReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 4, ""),
    containerinfo: (f = msg.getContainerinfo()) && proto.dockerGet.ListContainerReply.ContainersInfo.toObject(includeInstance, f),
    containersList: jspb.Message.toObjectList(msg.getContainersList(),
    proto.dockerGet.ListContainerReply.Container.toObject, includeInstance),
    tempcontainersList: jspb.Message.toObjectList(msg.getTempcontainersList(),
    proto.dockerGet.ListContainerReply.Container.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListContainerReply}
 */
proto.dockerGet.ListContainerReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListContainerReply;
  return proto.dockerGet.ListContainerReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListContainerReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListContainerReply}
 */
proto.dockerGet.ListContainerReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = new proto.dockerGet.ListContainerReply.ContainersInfo;
      reader.readMessage(value,proto.dockerGet.ListContainerReply.ContainersInfo.deserializeBinaryFromReader);
      msg.setContainerinfo(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListContainerReply.Container;
      reader.readMessage(value,proto.dockerGet.ListContainerReply.Container.deserializeBinaryFromReader);
      msg.addContainers(value);
      break;
    case 5:
      var value = new proto.dockerGet.ListContainerReply.Container;
      reader.readMessage(value,proto.dockerGet.ListContainerReply.Container.deserializeBinaryFromReader);
      msg.addTempcontainers(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListContainerReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListContainerReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListContainerReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getContainerinfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.dockerGet.ListContainerReply.ContainersInfo.serializeBinaryToWriter
    );
  }
  f = message.getContainersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListContainerReply.Container.serializeBinaryToWriter
    );
  }
  f = message.getTempcontainersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.dockerGet.ListContainerReply.Container.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListContainerReply.ContainersInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListContainerReply.ContainersInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.ContainersInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    containersalive: jspb.Message.getFieldWithDefault(msg, 1, 0),
    containerstotal: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListContainerReply.ContainersInfo}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListContainerReply.ContainersInfo;
  return proto.dockerGet.ListContainerReply.ContainersInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListContainerReply.ContainersInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListContainerReply.ContainersInfo}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setContainersalive(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setContainerstotal(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListContainerReply.ContainersInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListContainerReply.ContainersInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.ContainersInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContainersalive();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getContainerstotal();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 containersAlive = 1;
 * @return {number}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.getContainersalive = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.ListContainerReply.ContainersInfo} returns this
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.setContainersalive = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 containersTotal = 2;
 * @return {number}
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.getContainerstotal = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.ListContainerReply.ContainersInfo} returns this
 */
proto.dockerGet.ListContainerReply.ContainersInfo.prototype.setContainerstotal = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListContainerReply.Container.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListContainerReply.Container.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListContainerReply.Container} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.Container.toObject = function(includeInstance, msg) {
  var f, obj = {
    coursetitle: jspb.Message.getFieldWithDefault(msg, 1, ""),
    assignmentname: jspb.Message.getFieldWithDefault(msg, 2, ""),
    existedtime: jspb.Message.getFieldWithDefault(msg, 3, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListContainerReply.Container}
 */
proto.dockerGet.ListContainerReply.Container.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListContainerReply.Container;
  return proto.dockerGet.ListContainerReply.Container.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListContainerReply.Container} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListContainerReply.Container}
 */
proto.dockerGet.ListContainerReply.Container.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setCoursetitle(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssignmentname(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setExistedtime(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListContainerReply.Container.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListContainerReply.Container.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListContainerReply.Container} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListContainerReply.Container.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCoursetitle();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAssignmentname();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExistedtime();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string courseTitle = 1;
 * @return {string}
 */
proto.dockerGet.ListContainerReply.Container.prototype.getCoursetitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListContainerReply.Container} returns this
 */
proto.dockerGet.ListContainerReply.Container.prototype.setCoursetitle = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string assignmentName = 2;
 * @return {string}
 */
proto.dockerGet.ListContainerReply.Container.prototype.getAssignmentname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListContainerReply.Container} returns this
 */
proto.dockerGet.ListContainerReply.Container.prototype.setAssignmentname = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string existedTime = 3;
 * @return {string}
 */
proto.dockerGet.ListContainerReply.Container.prototype.getExistedtime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListContainerReply.Container} returns this
 */
proto.dockerGet.ListContainerReply.Container.prototype.setExistedtime = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string containerID = 4;
 * @return {string}
 */
proto.dockerGet.ListContainerReply.Container.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListContainerReply.Container} returns this
 */
proto.dockerGet.ListContainerReply.Container.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListContainerReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListContainerReply} returns this
 */
proto.dockerGet.ListContainerReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.dockerGet.ListContainerReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListContainerReply} returns this
 */
proto.dockerGet.ListContainerReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional ContainersInfo containerInfo = 2;
 * @return {?proto.dockerGet.ListContainerReply.ContainersInfo}
 */
proto.dockerGet.ListContainerReply.prototype.getContainerinfo = function() {
  return /** @type{?proto.dockerGet.ListContainerReply.ContainersInfo} */ (
    jspb.Message.getWrapperField(this, proto.dockerGet.ListContainerReply.ContainersInfo, 2));
};


/**
 * @param {?proto.dockerGet.ListContainerReply.ContainersInfo|undefined} value
 * @return {!proto.dockerGet.ListContainerReply} returns this
*/
proto.dockerGet.ListContainerReply.prototype.setContainerinfo = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.dockerGet.ListContainerReply} returns this
 */
proto.dockerGet.ListContainerReply.prototype.clearContainerinfo = function() {
  return this.setContainerinfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.dockerGet.ListContainerReply.prototype.hasContainerinfo = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated Container containers = 3;
 * @return {!Array<!proto.dockerGet.ListContainerReply.Container>}
 */
proto.dockerGet.ListContainerReply.prototype.getContainersList = function() {
  return /** @type{!Array<!proto.dockerGet.ListContainerReply.Container>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListContainerReply.Container, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListContainerReply.Container>} value
 * @return {!proto.dockerGet.ListContainerReply} returns this
*/
proto.dockerGet.ListContainerReply.prototype.setContainersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListContainerReply.Container=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListContainerReply.Container}
 */
proto.dockerGet.ListContainerReply.prototype.addContainers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListContainerReply.Container, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListContainerReply} returns this
 */
proto.dockerGet.ListContainerReply.prototype.clearContainersList = function() {
  return this.setContainersList([]);
};


/**
 * repeated Container tempContainers = 5;
 * @return {!Array<!proto.dockerGet.ListContainerReply.Container>}
 */
proto.dockerGet.ListContainerReply.prototype.getTempcontainersList = function() {
  return /** @type{!Array<!proto.dockerGet.ListContainerReply.Container>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListContainerReply.Container, 5));
};


/**
 * @param {!Array<!proto.dockerGet.ListContainerReply.Container>} value
 * @return {!proto.dockerGet.ListContainerReply} returns this
*/
proto.dockerGet.ListContainerReply.prototype.setTempcontainersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.dockerGet.ListContainerReply.Container=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListContainerReply.Container}
 */
proto.dockerGet.ListContainerReply.prototype.addTempcontainers = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.dockerGet.ListContainerReply.Container, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListContainerReply} returns this
 */
proto.dockerGet.ListContainerReply.prototype.clearTempcontainersList = function() {
  return this.setTempcontainersList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListCoursesReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListCoursesReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListCoursesReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListCoursesReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListCoursesReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    coursesList: jspb.Message.toObjectList(msg.getCoursesList(),
    proto.dockerGet.ListCoursesReply.Course.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListCoursesReply}
 */
proto.dockerGet.ListCoursesReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListCoursesReply;
  return proto.dockerGet.ListCoursesReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListCoursesReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListCoursesReply}
 */
proto.dockerGet.ListCoursesReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListCoursesReply.Course;
      reader.readMessage(value,proto.dockerGet.ListCoursesReply.Course.deserializeBinaryFromReader);
      msg.addCourses(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListCoursesReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListCoursesReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListCoursesReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListCoursesReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCoursesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListCoursesReply.Course.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListCoursesReply.Course.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListCoursesReply.Course} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListCoursesReply.Course.toObject = function(includeInstance, msg) {
  var f, obj = {
    sectionid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    coursecode: jspb.Message.getFieldWithDefault(msg, 2, ""),
    section: jspb.Message.getFieldWithDefault(msg, 3, ""),
    name: jspb.Message.getFieldWithDefault(msg, 4, ""),
    sectionrole: jspb.Message.getFieldWithDefault(msg, 5, ""),
    lastupdatetime: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListCoursesReply.Course}
 */
proto.dockerGet.ListCoursesReply.Course.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListCoursesReply.Course;
  return proto.dockerGet.ListCoursesReply.Course.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListCoursesReply.Course} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListCoursesReply.Course}
 */
proto.dockerGet.ListCoursesReply.Course.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCoursecode(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSection(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionrole(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setLastupdatetime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListCoursesReply.Course.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListCoursesReply.Course} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListCoursesReply.Course.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSectionid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCoursecode();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSection();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getSectionrole();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getLastupdatetime();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string sectionID = 1;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getSectionid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setSectionid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string courseCode = 2;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getCoursecode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setCoursecode = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string section = 3;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getSection = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setSection = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string name = 4;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string sectionRole = 5;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getSectionrole = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setSectionrole = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string lastUpdateTime = 6;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.Course.prototype.getLastupdatetime = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply.Course} returns this
 */
proto.dockerGet.ListCoursesReply.Course.prototype.setLastupdatetime = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListCoursesReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListCoursesReply} returns this
 */
proto.dockerGet.ListCoursesReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.ListCoursesReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListCoursesReply} returns this
 */
proto.dockerGet.ListCoursesReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Course courses = 3;
 * @return {!Array<!proto.dockerGet.ListCoursesReply.Course>}
 */
proto.dockerGet.ListCoursesReply.prototype.getCoursesList = function() {
  return /** @type{!Array<!proto.dockerGet.ListCoursesReply.Course>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListCoursesReply.Course, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListCoursesReply.Course>} value
 * @return {!proto.dockerGet.ListCoursesReply} returns this
*/
proto.dockerGet.ListCoursesReply.prototype.setCoursesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListCoursesReply.Course=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListCoursesReply.Course}
 */
proto.dockerGet.ListCoursesReply.prototype.addCourses = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListCoursesReply.Course, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListCoursesReply} returns this
 */
proto.dockerGet.ListCoursesReply.prototype.clearCoursesList = function() {
  return this.setCoursesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.GetSectionInfoReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.GetSectionInfoReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.GetSectionInfoReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetSectionInfoReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sectionuserid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    coursename: jspb.Message.getFieldWithDefault(msg, 4, ""),
    role: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.GetSectionInfoReply}
 */
proto.dockerGet.GetSectionInfoReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.GetSectionInfoReply;
  return proto.dockerGet.GetSectionInfoReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.GetSectionInfoReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.GetSectionInfoReply}
 */
proto.dockerGet.GetSectionInfoReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionuserid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setCoursename(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setRole(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.GetSectionInfoReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.GetSectionInfoReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.GetSectionInfoReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetSectionInfoReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSectionuserid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCoursename();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getRole();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.GetSectionInfoReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.GetSectionInfoReply} returns this
 */
proto.dockerGet.GetSectionInfoReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.GetSectionInfoReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetSectionInfoReply} returns this
 */
proto.dockerGet.GetSectionInfoReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string sectionUserID = 3;
 * @return {string}
 */
proto.dockerGet.GetSectionInfoReply.prototype.getSectionuserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetSectionInfoReply} returns this
 */
proto.dockerGet.GetSectionInfoReply.prototype.setSectionuserid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string courseName = 4;
 * @return {string}
 */
proto.dockerGet.GetSectionInfoReply.prototype.getCoursename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetSectionInfoReply} returns this
 */
proto.dockerGet.GetSectionInfoReply.prototype.setCoursename = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string role = 5;
 * @return {string}
 */
proto.dockerGet.GetSectionInfoReply.prototype.getRole = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetSectionInfoReply} returns this
 */
proto.dockerGet.GetSectionInfoReply.prototype.setRole = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListEnvironmentsReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListEnvironmentsReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListEnvironmentsReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListEnvironmentsReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 4, ""),
    environmentsList: jspb.Message.toObjectList(msg.getEnvironmentsList(),
    proto.dockerGet.ListEnvironmentsReply.Environment.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListEnvironmentsReply}
 */
proto.dockerGet.ListEnvironmentsReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListEnvironmentsReply;
  return proto.dockerGet.ListEnvironmentsReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListEnvironmentsReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListEnvironmentsReply}
 */
proto.dockerGet.ListEnvironmentsReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListEnvironmentsReply.Environment;
      reader.readMessage(value,proto.dockerGet.ListEnvironmentsReply.Environment.deserializeBinaryFromReader);
      msg.addEnvironments(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListEnvironmentsReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListEnvironmentsReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListEnvironmentsReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getEnvironmentsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListEnvironmentsReply.Environment.serializeBinaryToWriter
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListEnvironmentsReply.Environment.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListEnvironmentsReply.Environment} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListEnvironmentsReply.Environment.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    imageid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    environmentname: jspb.Message.getFieldWithDefault(msg, 3, ""),
    libraries: jspb.Message.getFieldWithDefault(msg, 5, ""),
    description: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListEnvironmentsReply.Environment;
  return proto.dockerGet.ListEnvironmentsReply.Environment.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListEnvironmentsReply.Environment} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentname(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setLibraries(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListEnvironmentsReply.Environment.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListEnvironmentsReply.Environment} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListEnvironmentsReply.Environment.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getImageid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getEnvironmentname();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getLibraries();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment} returns this
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string imageId = 2;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.getImageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment} returns this
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.setImageid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string environmentName = 3;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.getEnvironmentname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment} returns this
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.setEnvironmentname = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string libraries = 5;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.getLibraries = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment} returns this
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.setLibraries = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment} returns this
 */
proto.dockerGet.ListEnvironmentsReply.Environment.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListEnvironmentsReply} returns this
 */
proto.dockerGet.ListEnvironmentsReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListEnvironmentsReply} returns this
 */
proto.dockerGet.ListEnvironmentsReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated Environment environments = 3;
 * @return {!Array<!proto.dockerGet.ListEnvironmentsReply.Environment>}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.getEnvironmentsList = function() {
  return /** @type{!Array<!proto.dockerGet.ListEnvironmentsReply.Environment>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListEnvironmentsReply.Environment, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListEnvironmentsReply.Environment>} value
 * @return {!proto.dockerGet.ListEnvironmentsReply} returns this
*/
proto.dockerGet.ListEnvironmentsReply.prototype.setEnvironmentsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListEnvironmentsReply.Environment=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListEnvironmentsReply.Environment}
 */
proto.dockerGet.ListEnvironmentsReply.prototype.addEnvironments = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListEnvironmentsReply.Environment, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListEnvironmentsReply} returns this
 */
proto.dockerGet.ListEnvironmentsReply.prototype.clearEnvironmentsList = function() {
  return this.setEnvironmentsList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListTemplatesReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListTemplatesReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListTemplatesReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListTemplatesReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListTemplatesReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 4, ""),
    templatesList: jspb.Message.toObjectList(msg.getTemplatesList(),
    proto.dockerGet.ListTemplatesReply.Template.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListTemplatesReply}
 */
proto.dockerGet.ListTemplatesReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListTemplatesReply;
  return proto.dockerGet.ListTemplatesReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListTemplatesReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListTemplatesReply}
 */
proto.dockerGet.ListTemplatesReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListTemplatesReply.Template;
      reader.readMessage(value,proto.dockerGet.ListTemplatesReply.Template.deserializeBinaryFromReader);
      msg.addTemplates(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListTemplatesReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListTemplatesReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListTemplatesReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListTemplatesReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTemplatesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListTemplatesReply.Template.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListTemplatesReply.Template.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListTemplatesReply.Template.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListTemplatesReply.Template} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListTemplatesReply.Template.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 7, ""),
    environmentId: jspb.Message.getFieldWithDefault(msg, 12, ""),
    imageid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    assignmentConfigId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    storage: jspb.Message.getFieldWithDefault(msg, 5, ""),
    active: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    isExam: jspb.Message.getBooleanFieldWithDefault(msg, 10, false),
    timeLimit: jspb.Message.getFieldWithDefault(msg, 9, 0),
    allowNotification: jspb.Message.getBooleanFieldWithDefault(msg, 11, false),
    containeridList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListTemplatesReply.Template}
 */
proto.dockerGet.ListTemplatesReply.Template.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListTemplatesReply.Template;
  return proto.dockerGet.ListTemplatesReply.Template.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListTemplatesReply.Template} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListTemplatesReply.Template}
 */
proto.dockerGet.ListTemplatesReply.Template.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssignmentConfigId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setStorage(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActive(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsExam(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimeLimit(value);
      break;
    case 11:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowNotification(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListTemplatesReply.Template.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListTemplatesReply.Template} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListTemplatesReply.Template.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getEnvironmentId();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getImageid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAssignmentConfigId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getStorage();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getActive();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getIsExam();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
  f = message.getTimeLimit();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getAllowNotification();
  if (f) {
    writer.writeBool(
      11,
      f
    );
  }
  f = message.getContaineridList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 7;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string environment_id = 12;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getEnvironmentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setEnvironmentId = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional string imageId = 3;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getImageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setImageid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string assignment_config_id = 4;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getAssignmentConfigId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setAssignmentConfigId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string storage = 5;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getStorage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setStorage = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool active = 8;
 * @return {boolean}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional bool is_exam = 10;
 * @return {boolean}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getIsExam = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setIsExam = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};


/**
 * optional int64 time_limit = 9;
 * @return {number}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getTimeLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setTimeLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool allow_notification = 11;
 * @return {boolean}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getAllowNotification = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 11, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setAllowNotification = function(value) {
  return jspb.Message.setProto3BooleanField(this, 11, value);
};


/**
 * repeated string ContainerId = 6;
 * @return {!Array<string>}
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.getContaineridList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.setContaineridList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.addContainerid = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListTemplatesReply.Template} returns this
 */
proto.dockerGet.ListTemplatesReply.Template.prototype.clearContaineridList = function() {
  return this.setContaineridList([]);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListTemplatesReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListTemplatesReply} returns this
 */
proto.dockerGet.ListTemplatesReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.dockerGet.ListTemplatesReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListTemplatesReply} returns this
 */
proto.dockerGet.ListTemplatesReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated Template templates = 3;
 * @return {!Array<!proto.dockerGet.ListTemplatesReply.Template>}
 */
proto.dockerGet.ListTemplatesReply.prototype.getTemplatesList = function() {
  return /** @type{!Array<!proto.dockerGet.ListTemplatesReply.Template>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListTemplatesReply.Template, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListTemplatesReply.Template>} value
 * @return {!proto.dockerGet.ListTemplatesReply} returns this
*/
proto.dockerGet.ListTemplatesReply.prototype.setTemplatesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListTemplatesReply.Template=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListTemplatesReply.Template}
 */
proto.dockerGet.ListTemplatesReply.prototype.addTemplates = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListTemplatesReply.Template, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListTemplatesReply} returns this
 */
proto.dockerGet.ListTemplatesReply.prototype.clearTemplatesList = function() {
  return this.setTemplatesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    imagename: jspb.Message.getFieldWithDefault(msg, 1, ""),
    environmentId: jspb.Message.getFieldWithDefault(msg, 12, ""),
    memlimit: jspb.Message.getFloatingPointFieldWithDefault(msg, 2, 0.0),
    numcpu: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    templateId: jspb.Message.getFieldWithDefault(msg, 5, ""),
    accessright: jspb.Message.getFieldWithDefault(msg, 7, ""),
    usefresh: jspb.Message.getBooleanFieldWithDefault(msg, 8, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddContainerRequest}
 */
proto.dockerGet.AddContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddContainerRequest;
  return proto.dockerGet.AddContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddContainerRequest}
 */
proto.dockerGet.AddContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setImagename(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMemlimit(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setNumcpu(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateId(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessright(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setUsefresh(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getImagename();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getEnvironmentId();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getMemlimit();
  if (f !== 0.0) {
    writer.writeFloat(
      2,
      f
    );
  }
  f = message.getNumcpu();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getTemplateId();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAccessright();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getUsefresh();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string imageName = 1;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getImagename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setImagename = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string environment_id = 12;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getEnvironmentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setEnvironmentId = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional float memLimit = 2;
 * @return {number}
 */
proto.dockerGet.AddContainerRequest.prototype.getMemlimit = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 2, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setMemlimit = function(value) {
  return jspb.Message.setProto3FloatField(this, 2, value);
};


/**
 * optional float numCPU = 3;
 * @return {number}
 */
proto.dockerGet.AddContainerRequest.prototype.getNumcpu = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setNumcpu = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string template_id = 5;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getTemplateId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setTemplateId = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string accessRight = 7;
 * @return {string}
 */
proto.dockerGet.AddContainerRequest.prototype.getAccessright = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setAccessright = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional bool useFresh = 8;
 * @return {boolean}
 */
proto.dockerGet.AddContainerRequest.prototype.getUsefresh = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddContainerRequest} returns this
 */
proto.dockerGet.AddContainerRequest.prototype.setUsefresh = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.InstantAddContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.InstantAddContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.InstantAddContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.InstantAddContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, ""),
    templateId: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.InstantAddContainerRequest}
 */
proto.dockerGet.InstantAddContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.InstantAddContainerRequest;
  return proto.dockerGet.InstantAddContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.InstantAddContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.InstantAddContainerRequest}
 */
proto.dockerGet.InstantAddContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.InstantAddContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.InstantAddContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.InstantAddContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.InstantAddContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTemplateId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.InstantAddContainerRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.InstantAddContainerRequest} returns this
 */
proto.dockerGet.InstantAddContainerRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.InstantAddContainerRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.InstantAddContainerRequest} returns this
 */
proto.dockerGet.InstantAddContainerRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string template_id = 2;
 * @return {string}
 */
proto.dockerGet.InstantAddContainerRequest.prototype.getTemplateId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.InstantAddContainerRequest} returns this
 */
proto.dockerGet.InstantAddContainerRequest.prototype.setTemplateId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddContainerReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddContainerReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddContainerReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddContainerReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddContainerReply}
 */
proto.dockerGet.AddContainerReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddContainerReply;
  return proto.dockerGet.AddContainerReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddContainerReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddContainerReply}
 */
proto.dockerGet.AddContainerReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddContainerReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddContainerReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddContainerReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddContainerReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddContainerReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddContainerReply} returns this
 */
proto.dockerGet.AddContainerReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddContainerReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerReply} returns this
 */
proto.dockerGet.AddContainerReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string containerID = 3;
 * @return {string}
 */
proto.dockerGet.AddContainerReply.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddContainerReply} returns this
 */
proto.dockerGet.AddContainerReply.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.RemoveContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.RemoveContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.RemoveContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.RemoveContainerRequest}
 */
proto.dockerGet.RemoveContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.RemoveContainerRequest;
  return proto.dockerGet.RemoveContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.RemoveContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.RemoveContainerRequest}
 */
proto.dockerGet.RemoveContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.RemoveContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.RemoveContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.RemoveContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.RemoveContainerRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveContainerRequest} returns this
 */
proto.dockerGet.RemoveContainerRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string containerID = 1;
 * @return {string}
 */
proto.dockerGet.RemoveContainerRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveContainerRequest} returns this
 */
proto.dockerGet.RemoveContainerRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sub = 2;
 * @return {string}
 */
proto.dockerGet.RemoveContainerRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveContainerRequest} returns this
 */
proto.dockerGet.RemoveContainerRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SubmitFilesRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SubmitFilesRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SubmitFilesRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SubmitFilesRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SubmitFilesRequest}
 */
proto.dockerGet.SubmitFilesRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SubmitFilesRequest;
  return proto.dockerGet.SubmitFilesRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SubmitFilesRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SubmitFilesRequest}
 */
proto.dockerGet.SubmitFilesRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SubmitFilesRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SubmitFilesRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SubmitFilesRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SubmitFilesRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SubmitFilesRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SubmitFilesRequest} returns this
 */
proto.dockerGet.SubmitFilesRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string containerID = 2;
 * @return {string}
 */
proto.dockerGet.SubmitFilesRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SubmitFilesRequest} returns this
 */
proto.dockerGet.SubmitFilesRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.SubmitFilesRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SubmitFilesRequest} returns this
 */
proto.dockerGet.SubmitFilesRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ContainerTimeReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ContainerTimeReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ContainerTimeReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ContainerTimeReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    isExam: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    timeLimit: jspb.Message.getFieldWithDefault(msg, 4, ""),
    createdAt: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ContainerTimeReply}
 */
proto.dockerGet.ContainerTimeReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ContainerTimeReply;
  return proto.dockerGet.ContainerTimeReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ContainerTimeReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ContainerTimeReply}
 */
proto.dockerGet.ContainerTimeReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsExam(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimeLimit(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCreatedAt(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ContainerTimeReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ContainerTimeReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ContainerTimeReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ContainerTimeReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getIsExam();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getTimeLimit();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getCreatedAt();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ContainerTimeReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ContainerTimeReply} returns this
 */
proto.dockerGet.ContainerTimeReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.ContainerTimeReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ContainerTimeReply} returns this
 */
proto.dockerGet.ContainerTimeReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bool is_exam = 3;
 * @return {boolean}
 */
proto.dockerGet.ContainerTimeReply.prototype.getIsExam = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ContainerTimeReply} returns this
 */
proto.dockerGet.ContainerTimeReply.prototype.setIsExam = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional string time_limit = 4;
 * @return {string}
 */
proto.dockerGet.ContainerTimeReply.prototype.getTimeLimit = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ContainerTimeReply} returns this
 */
proto.dockerGet.ContainerTimeReply.prototype.setTimeLimit = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string created_at = 5;
 * @return {string}
 */
proto.dockerGet.ContainerTimeReply.prototype.getCreatedAt = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ContainerTimeReply} returns this
 */
proto.dockerGet.ContainerTimeReply.prototype.setCreatedAt = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTemplateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 6, ""),
    environmentId: jspb.Message.getFieldWithDefault(msg, 12, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    assignmentConfigId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    active: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    isExam: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    timeLimit: jspb.Message.getFieldWithDefault(msg, 9, 0),
    allowNotification: jspb.Message.getBooleanFieldWithDefault(msg, 10, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddTemplateRequest}
 */
proto.dockerGet.AddTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddTemplateRequest;
  return proto.dockerGet.AddTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddTemplateRequest}
 */
proto.dockerGet.AddTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssignmentConfigId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActive(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsExam(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimeLimit(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowNotification(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTemplateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getEnvironmentId();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAssignmentConfigId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getActive();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getIsExam();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getTimeLimit();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getAllowNotification();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 6;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string environment_id = 12;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getEnvironmentId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setEnvironmentId = function(value) {
  return jspb.Message.setProto3StringField(this, 12, value);
};


/**
 * optional string containerID = 5;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string assignment_config_id = 3;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getAssignmentConfigId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setAssignmentConfigId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.AddTemplateRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool active = 7;
 * @return {boolean}
 */
proto.dockerGet.AddTemplateRequest.prototype.getActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional bool is_exam = 8;
 * @return {boolean}
 */
proto.dockerGet.AddTemplateRequest.prototype.getIsExam = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setIsExam = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional int64 time_limit = 9;
 * @return {number}
 */
proto.dockerGet.AddTemplateRequest.prototype.getTimeLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setTimeLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool allow_notification = 10;
 * @return {boolean}
 */
proto.dockerGet.AddTemplateRequest.prototype.getAllowNotification = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddTemplateRequest} returns this
 */
proto.dockerGet.AddTemplateRequest.prototype.setAllowNotification = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateTemplateRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateTemplateRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateTemplateRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    templateid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 6, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    assignmentConfigId: jspb.Message.getFieldWithDefault(msg, 3, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    active: jspb.Message.getBooleanFieldWithDefault(msg, 7, false),
    isExam: jspb.Message.getBooleanFieldWithDefault(msg, 8, false),
    timeLimit: jspb.Message.getFieldWithDefault(msg, 9, 0),
    allowNotification: jspb.Message.getBooleanFieldWithDefault(msg, 10, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateTemplateRequest}
 */
proto.dockerGet.UpdateTemplateRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateTemplateRequest;
  return proto.dockerGet.UpdateTemplateRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateTemplateRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateTemplateRequest}
 */
proto.dockerGet.UpdateTemplateRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAssignmentConfigId(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setActive(value);
      break;
    case 8:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsExam(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimeLimit(value);
      break;
    case 10:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowNotification(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateTemplateRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateTemplateRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateTemplateRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getTemplateid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAssignmentConfigId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getActive();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
  f = message.getIsExam();
  if (f) {
    writer.writeBool(
      8,
      f
    );
  }
  f = message.getTimeLimit();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getAllowNotification();
  if (f) {
    writer.writeBool(
      10,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string templateID = 1;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getTemplateid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setTemplateid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 6;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string containerID = 5;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string assignment_config_id = 3;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getAssignmentConfigId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setAssignmentConfigId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool active = 7;
 * @return {boolean}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getActive = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setActive = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};


/**
 * optional bool is_exam = 8;
 * @return {boolean}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getIsExam = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 8, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setIsExam = function(value) {
  return jspb.Message.setProto3BooleanField(this, 8, value);
};


/**
 * optional int64 time_limit = 9;
 * @return {number}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getTimeLimit = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setTimeLimit = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional bool allow_notification = 10;
 * @return {boolean}
 */
proto.dockerGet.UpdateTemplateRequest.prototype.getAllowNotification = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 10, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.UpdateTemplateRequest} returns this
 */
proto.dockerGet.UpdateTemplateRequest.prototype.setAllowNotification = function(value) {
  return jspb.Message.setProto3BooleanField(this, 10, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.TemplateIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.TemplateIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.TemplateIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.TemplateIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    templateid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.TemplateIdRequest}
 */
proto.dockerGet.TemplateIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.TemplateIdRequest;
  return proto.dockerGet.TemplateIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.TemplateIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.TemplateIdRequest}
 */
proto.dockerGet.TemplateIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.TemplateIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.TemplateIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.TemplateIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.TemplateIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getTemplateid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.TemplateIdRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.TemplateIdRequest} returns this
 */
proto.dockerGet.TemplateIdRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string templateID = 1;
 * @return {string}
 */
proto.dockerGet.TemplateIdRequest.prototype.getTemplateid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.TemplateIdRequest} returns this
 */
proto.dockerGet.TemplateIdRequest.prototype.setTemplateid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.TemplateIdRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.TemplateIdRequest} returns this
 */
proto.dockerGet.TemplateIdRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddTemplateReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddTemplateReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddTemplateReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTemplateReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    templateid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddTemplateReply}
 */
proto.dockerGet.AddTemplateReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddTemplateReply;
  return proto.dockerGet.AddTemplateReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddTemplateReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddTemplateReply}
 */
proto.dockerGet.AddTemplateReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTemplateid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddTemplateReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddTemplateReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddTemplateReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTemplateReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTemplateid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddTemplateReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddTemplateReply} returns this
 */
proto.dockerGet.AddTemplateReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddTemplateReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateReply} returns this
 */
proto.dockerGet.AddTemplateReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string templateID = 3;
 * @return {string}
 */
proto.dockerGet.AddTemplateReply.prototype.getTemplateid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTemplateReply} returns this
 */
proto.dockerGet.AddTemplateReply.prototype.setTemplateid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.AddEnvironmentRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddEnvironmentRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddEnvironmentRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddEnvironmentRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    librariesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 2, ""),
    name: jspb.Message.getFieldWithDefault(msg, 3, ""),
    description: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddEnvironmentRequest}
 */
proto.dockerGet.AddEnvironmentRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddEnvironmentRequest;
  return proto.dockerGet.AddEnvironmentRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddEnvironmentRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddEnvironmentRequest}
 */
proto.dockerGet.AddEnvironmentRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addLibraries(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddEnvironmentRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddEnvironmentRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddEnvironmentRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getLibrariesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * repeated string libraries = 1;
 * @return {!Array<string>}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.getLibrariesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.setLibrariesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.addLibraries = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.clearLibrariesList = function() {
  return this.setLibrariesList([]);
};


/**
 * optional string section_user_id = 2;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string name = 3;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentRequest} returns this
 */
proto.dockerGet.AddEnvironmentRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddEnvironmentReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddEnvironmentReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddEnvironmentReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddEnvironmentReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    environmentid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddEnvironmentReply}
 */
proto.dockerGet.AddEnvironmentReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddEnvironmentReply;
  return proto.dockerGet.AddEnvironmentReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddEnvironmentReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddEnvironmentReply}
 */
proto.dockerGet.AddEnvironmentReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddEnvironmentReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddEnvironmentReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddEnvironmentReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddEnvironmentReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getEnvironmentid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddEnvironmentReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddEnvironmentReply} returns this
 */
proto.dockerGet.AddEnvironmentReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentReply} returns this
 */
proto.dockerGet.AddEnvironmentReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string environmentID = 3;
 * @return {string}
 */
proto.dockerGet.AddEnvironmentReply.prototype.getEnvironmentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddEnvironmentReply} returns this
 */
proto.dockerGet.AddEnvironmentReply.prototype.setEnvironmentid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.BuildEnvironmentRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.BuildEnvironmentRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.BuildEnvironmentRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.BuildEnvironmentRequest}
 */
proto.dockerGet.BuildEnvironmentRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.BuildEnvironmentRequest;
  return proto.dockerGet.BuildEnvironmentRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.BuildEnvironmentRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.BuildEnvironmentRequest}
 */
proto.dockerGet.BuildEnvironmentRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.BuildEnvironmentRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.BuildEnvironmentRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.BuildEnvironmentRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.BuildEnvironmentRequest} returns this
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.BuildEnvironmentRequest} returns this
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 1;
 * @return {string}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.BuildEnvironmentRequest} returns this
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.BuildEnvironmentRequest} returns this
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string containerID = 5;
 * @return {string}
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.BuildEnvironmentRequest} returns this
 */
proto.dockerGet.BuildEnvironmentRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateEnvironmentRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateEnvironmentRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateEnvironmentRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    environmentid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateEnvironmentRequest}
 */
proto.dockerGet.UpdateEnvironmentRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateEnvironmentRequest;
  return proto.dockerGet.UpdateEnvironmentRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateEnvironmentRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateEnvironmentRequest}
 */
proto.dockerGet.UpdateEnvironmentRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateEnvironmentRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateEnvironmentRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateEnvironmentRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getEnvironmentid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string environmentID = 1;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getEnvironmentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setEnvironmentid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string containerID = 5;
 * @return {string}
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateEnvironmentRequest} returns this
 */
proto.dockerGet.UpdateEnvironmentRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.EnvironmentIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.EnvironmentIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.EnvironmentIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.EnvironmentIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    environmentid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sectionUserId: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.EnvironmentIdRequest}
 */
proto.dockerGet.EnvironmentIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.EnvironmentIdRequest;
  return proto.dockerGet.EnvironmentIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.EnvironmentIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.EnvironmentIdRequest}
 */
proto.dockerGet.EnvironmentIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEnvironmentid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.EnvironmentIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.EnvironmentIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.EnvironmentIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.EnvironmentIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getEnvironmentid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSectionUserId();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.EnvironmentIdRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.EnvironmentIdRequest} returns this
 */
proto.dockerGet.EnvironmentIdRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string environmentID = 1;
 * @return {string}
 */
proto.dockerGet.EnvironmentIdRequest.prototype.getEnvironmentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.EnvironmentIdRequest} returns this
 */
proto.dockerGet.EnvironmentIdRequest.prototype.setEnvironmentid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string section_user_id = 4;
 * @return {string}
 */
proto.dockerGet.EnvironmentIdRequest.prototype.getSectionUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.EnvironmentIdRequest} returns this
 */
proto.dockerGet.EnvironmentIdRequest.prototype.setSectionUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SectionAndSubRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SectionAndSubRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SectionAndSubRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SectionAndSubRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sectionid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SectionAndSubRequest}
 */
proto.dockerGet.SectionAndSubRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SectionAndSubRequest;
  return proto.dockerGet.SectionAndSubRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SectionAndSubRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SectionAndSubRequest}
 */
proto.dockerGet.SectionAndSubRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SectionAndSubRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SectionAndSubRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SectionAndSubRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SectionAndSubRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSectionid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SectionAndSubRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SectionAndSubRequest} returns this
 */
proto.dockerGet.SectionAndSubRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sectionID = 1;
 * @return {string}
 */
proto.dockerGet.SectionAndSubRequest.prototype.getSectionid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SectionAndSubRequest} returns this
 */
proto.dockerGet.SectionAndSubRequest.prototype.setSectionid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sub = 2;
 * @return {string}
 */
proto.dockerGet.SectionAndSubRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SectionAndSubRequest} returns this
 */
proto.dockerGet.SectionAndSubRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.CheckHaveContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.CheckHaveContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.CheckHaveContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.CheckHaveContainerRequest}
 */
proto.dockerGet.CheckHaveContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.CheckHaveContainerRequest;
  return proto.dockerGet.CheckHaveContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.CheckHaveContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.CheckHaveContainerRequest}
 */
proto.dockerGet.CheckHaveContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.CheckHaveContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.CheckHaveContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.CheckHaveContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CheckHaveContainerRequest} returns this
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CheckHaveContainerRequest} returns this
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string containerID = 3;
 * @return {string}
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.CheckHaveContainerRequest} returns this
 */
proto.dockerGet.CheckHaveContainerRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SubRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SubRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SubRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SubRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SubRequest}
 */
proto.dockerGet.SubRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SubRequest;
  return proto.dockerGet.SubRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SubRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SubRequest}
 */
proto.dockerGet.SubRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SubRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SubRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SubRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SubRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SubRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SubRequest} returns this
 */
proto.dockerGet.SubRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.SubRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SubRequest} returns this
 */
proto.dockerGet.SubRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SectionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SectionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SectionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SectionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sectionid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SectionRequest}
 */
proto.dockerGet.SectionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SectionRequest;
  return proto.dockerGet.SectionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SectionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SectionRequest}
 */
proto.dockerGet.SectionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSectionid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SectionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SectionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SectionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SectionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSectionid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SectionRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SectionRequest} returns this
 */
proto.dockerGet.SectionRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sectionID = 1;
 * @return {string}
 */
proto.dockerGet.SectionRequest.prototype.getSectionid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SectionRequest} returns this
 */
proto.dockerGet.SectionRequest.prototype.setSectionid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SuccessStringReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SuccessStringReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SuccessStringReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SuccessStringReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SuccessStringReply}
 */
proto.dockerGet.SuccessStringReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SuccessStringReply;
  return proto.dockerGet.SuccessStringReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SuccessStringReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SuccessStringReply}
 */
proto.dockerGet.SuccessStringReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SuccessStringReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SuccessStringReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SuccessStringReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SuccessStringReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.SuccessStringReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.SuccessStringReply} returns this
 */
proto.dockerGet.SuccessStringReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.SuccessStringReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SuccessStringReply} returns this
 */
proto.dockerGet.SuccessStringReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.StringReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.StringReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.StringReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.StringReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.StringReply}
 */
proto.dockerGet.StringReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.StringReply;
  return proto.dockerGet.StringReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.StringReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.StringReply}
 */
proto.dockerGet.StringReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.StringReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.StringReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.StringReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.StringReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.dockerGet.StringReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.StringReply} returns this
 */
proto.dockerGet.StringReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListReply.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    messageList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListReply}
 */
proto.dockerGet.ListReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListReply;
  return proto.dockerGet.ListReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListReply}
 */
proto.dockerGet.ListReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessageList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * repeated string message = 1;
 * @return {!Array<string>}
 */
proto.dockerGet.ListReply.prototype.getMessageList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.dockerGet.ListReply} returns this
 */
proto.dockerGet.ListReply.prototype.setMessageList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListReply} returns this
 */
proto.dockerGet.ListReply.prototype.addMessage = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListReply} returns this
 */
proto.dockerGet.ListReply.prototype.clearMessageList = function() {
  return this.setMessageList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.GetUserDataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.GetUserDataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.GetUserDataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetUserDataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    isSessionKey: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    sub: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.GetUserDataRequest}
 */
proto.dockerGet.GetUserDataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.GetUserDataRequest;
  return proto.dockerGet.GetUserDataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.GetUserDataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.GetUserDataRequest}
 */
proto.dockerGet.GetUserDataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.GetUserDataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.GetUserDataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.GetUserDataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetUserDataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getIsSessionKey();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.GetUserDataRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataRequest} returns this
 */
proto.dockerGet.GetUserDataRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional bool is_session_key = 2;
 * @return {boolean}
 */
proto.dockerGet.GetUserDataRequest.prototype.getIsSessionKey = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.GetUserDataRequest} returns this
 */
proto.dockerGet.GetUserDataRequest.prototype.setIsSessionKey = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.GetUserDataRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataRequest} returns this
 */
proto.dockerGet.GetUserDataRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.GetUserDataReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.GetUserDataReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.GetUserDataReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetUserDataReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    role: jspb.Message.getFieldWithDefault(msg, 7, ""),
    semesterid: jspb.Message.getFieldWithDefault(msg, 4, ""),
    darkmode: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    bio: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.GetUserDataReply}
 */
proto.dockerGet.GetUserDataReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.GetUserDataReply;
  return proto.dockerGet.GetUserDataReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.GetUserDataReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.GetUserDataReply}
 */
proto.dockerGet.GetUserDataReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setRole(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSemesterid(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDarkmode(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setBio(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.GetUserDataReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.GetUserDataReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.GetUserDataReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetUserDataReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getRole();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getSemesterid();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getDarkmode();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getBio();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.GetUserDataReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.GetUserDataReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string userId = 3;
 * @return {string}
 */
proto.dockerGet.GetUserDataReply.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string role = 7;
 * @return {string}
 */
proto.dockerGet.GetUserDataReply.prototype.getRole = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setRole = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string semesterId = 4;
 * @return {string}
 */
proto.dockerGet.GetUserDataReply.prototype.getSemesterid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setSemesterid = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional bool darkMode = 5;
 * @return {boolean}
 */
proto.dockerGet.GetUserDataReply.prototype.getDarkmode = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setDarkmode = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string bio = 6;
 * @return {string}
 */
proto.dockerGet.GetUserDataReply.prototype.getBio = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetUserDataReply} returns this
 */
proto.dockerGet.GetUserDataReply.prototype.setBio = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateUserDataRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateUserDataRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateUserDataRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, ""),
    darkmode: jspb.Message.getBooleanFieldWithDefault(msg, 5, false),
    bio: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateUserDataRequest}
 */
proto.dockerGet.UpdateUserDataRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateUserDataRequest;
  return proto.dockerGet.UpdateUserDataRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateUserDataRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateUserDataRequest}
 */
proto.dockerGet.UpdateUserDataRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setDarkmode(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setBio(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateUserDataRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateUserDataRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateUserDataRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDarkmode();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
  f = message.getBio();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateUserDataRequest} returns this
 */
proto.dockerGet.UpdateUserDataRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateUserDataRequest} returns this
 */
proto.dockerGet.UpdateUserDataRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool darkMode = 5;
 * @return {boolean}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.getDarkmode = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.UpdateUserDataRequest} returns this
 */
proto.dockerGet.UpdateUserDataRequest.prototype.setDarkmode = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};


/**
 * optional string bio = 6;
 * @return {string}
 */
proto.dockerGet.UpdateUserDataRequest.prototype.getBio = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateUserDataRequest} returns this
 */
proto.dockerGet.UpdateUserDataRequest.prototype.setBio = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.GetNotificationTokenReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.GetNotificationTokenReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.GetNotificationTokenReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetNotificationTokenReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    notificationToken: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.GetNotificationTokenReply}
 */
proto.dockerGet.GetNotificationTokenReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.GetNotificationTokenReply;
  return proto.dockerGet.GetNotificationTokenReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.GetNotificationTokenReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.GetNotificationTokenReply}
 */
proto.dockerGet.GetNotificationTokenReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNotificationToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.GetNotificationTokenReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.GetNotificationTokenReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.GetNotificationTokenReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.GetNotificationTokenReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNotificationToken();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.GetNotificationTokenReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.GetNotificationTokenReply} returns this
 */
proto.dockerGet.GetNotificationTokenReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.GetNotificationTokenReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetNotificationTokenReply} returns this
 */
proto.dockerGet.GetNotificationTokenReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string notification_token = 3;
 * @return {string}
 */
proto.dockerGet.GetNotificationTokenReply.prototype.getNotificationToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.GetNotificationTokenReply} returns this
 */
proto.dockerGet.GetNotificationTokenReply.prototype.setNotificationToken = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SendNotificationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SendNotificationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SendNotificationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SendNotificationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    title: jspb.Message.getFieldWithDefault(msg, 1, ""),
    body: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sender: jspb.Message.getFieldWithDefault(msg, 3, ""),
    receiver: jspb.Message.getFieldWithDefault(msg, 5, ""),
    allowReply: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SendNotificationRequest}
 */
proto.dockerGet.SendNotificationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SendNotificationRequest;
  return proto.dockerGet.SendNotificationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SendNotificationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SendNotificationRequest}
 */
proto.dockerGet.SendNotificationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setBody(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSender(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setReceiver(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllowReply(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SendNotificationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SendNotificationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SendNotificationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SendNotificationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getBody();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSender();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getReceiver();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getAllowReply();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SendNotificationRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string title = 1;
 * @return {string}
 */
proto.dockerGet.SendNotificationRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string body = 2;
 * @return {string}
 */
proto.dockerGet.SendNotificationRequest.prototype.getBody = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setBody = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string sender = 3;
 * @return {string}
 */
proto.dockerGet.SendNotificationRequest.prototype.getSender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setSender = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string receiver = 5;
 * @return {string}
 */
proto.dockerGet.SendNotificationRequest.prototype.getReceiver = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setReceiver = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional bool allow_reply = 4;
 * @return {boolean}
 */
proto.dockerGet.SendNotificationRequest.prototype.getAllowReply = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.SendNotificationRequest} returns this
 */
proto.dockerGet.SendNotificationRequest.prototype.setAllowReply = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SendNotificationReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SendNotificationReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SendNotificationReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SendNotificationReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    notificationId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SendNotificationReply}
 */
proto.dockerGet.SendNotificationReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SendNotificationReply;
  return proto.dockerGet.SendNotificationReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SendNotificationReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SendNotificationReply}
 */
proto.dockerGet.SendNotificationReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setNotificationId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SendNotificationReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SendNotificationReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SendNotificationReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SendNotificationReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getNotificationId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.SendNotificationReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.SendNotificationReply} returns this
 */
proto.dockerGet.SendNotificationReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.SendNotificationReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationReply} returns this
 */
proto.dockerGet.SendNotificationReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string notification_Id = 3;
 * @return {string}
 */
proto.dockerGet.SendNotificationReply.prototype.getNotificationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SendNotificationReply} returns this
 */
proto.dockerGet.SendNotificationReply.prototype.setNotificationId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateNotificationTokenRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateNotificationTokenRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateNotificationTokenRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, ""),
    token: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateNotificationTokenRequest}
 */
proto.dockerGet.UpdateNotificationTokenRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateNotificationTokenRequest;
  return proto.dockerGet.UpdateNotificationTokenRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateNotificationTokenRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateNotificationTokenRequest}
 */
proto.dockerGet.UpdateNotificationTokenRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateNotificationTokenRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateNotificationTokenRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateNotificationTokenRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateNotificationTokenRequest} returns this
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateNotificationTokenRequest} returns this
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string token = 2;
 * @return {string}
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateNotificationTokenRequest} returns this
 */
proto.dockerGet.UpdateNotificationTokenRequest.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.RemoveNotificationRequest.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.RemoveNotificationRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.RemoveNotificationRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.RemoveNotificationRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveNotificationRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    notificationidList: (f = jspb.Message.getRepeatedField(msg, 2)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.RemoveNotificationRequest}
 */
proto.dockerGet.RemoveNotificationRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.RemoveNotificationRequest;
  return proto.dockerGet.RemoveNotificationRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.RemoveNotificationRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.RemoveNotificationRequest}
 */
proto.dockerGet.RemoveNotificationRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.addNotificationid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.RemoveNotificationRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.RemoveNotificationRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.RemoveNotificationRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveNotificationRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNotificationidList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      2,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.RemoveNotificationRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveNotificationRequest} returns this
 */
proto.dockerGet.RemoveNotificationRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string userId = 1;
 * @return {string}
 */
proto.dockerGet.RemoveNotificationRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveNotificationRequest} returns this
 */
proto.dockerGet.RemoveNotificationRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * repeated string notificationId = 2;
 * @return {!Array<string>}
 */
proto.dockerGet.RemoveNotificationRequest.prototype.getNotificationidList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.dockerGet.RemoveNotificationRequest} returns this
 */
proto.dockerGet.RemoveNotificationRequest.prototype.setNotificationidList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.RemoveNotificationRequest} returns this
 */
proto.dockerGet.RemoveNotificationRequest.prototype.addNotificationid = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.RemoveNotificationRequest} returns this
 */
proto.dockerGet.RemoveNotificationRequest.prototype.clearNotificationidList = function() {
  return this.setNotificationidList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateSubscriptionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateSubscriptionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateSubscriptionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    token: jspb.Message.getFieldWithDefault(msg, 2, ""),
    semesterid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateSubscriptionRequest}
 */
proto.dockerGet.UpdateSubscriptionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateSubscriptionRequest;
  return proto.dockerGet.UpdateSubscriptionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateSubscriptionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateSubscriptionRequest}
 */
proto.dockerGet.UpdateSubscriptionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSemesterid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateSubscriptionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateSubscriptionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateSubscriptionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSemesterid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSubscriptionRequest} returns this
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string userId = 1;
 * @return {string}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSubscriptionRequest} returns this
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string token = 2;
 * @return {string}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSubscriptionRequest} returns this
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.setToken = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string semesterId = 3;
 * @return {string}
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.getSemesterid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSubscriptionRequest} returns this
 */
proto.dockerGet.UpdateSubscriptionRequest.prototype.setSemesterid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.DownloadRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.DownloadRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.DownloadRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.DownloadRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 5, ""),
    fileid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filename: jspb.Message.getFieldWithDefault(msg, 2, ""),
    filepath: jspb.Message.getFieldWithDefault(msg, 3, ""),
    filetype: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.DownloadRequest}
 */
proto.dockerGet.DownloadRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.DownloadRequest;
  return proto.dockerGet.DownloadRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.DownloadRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.DownloadRequest}
 */
proto.dockerGet.DownloadRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFileid(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilename(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilepath(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setFiletype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.DownloadRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.DownloadRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.DownloadRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.DownloadRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFileid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFilename();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getFilepath();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getFiletype();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 5;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string fileId = 1;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getFileid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setFileid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string fileName = 2;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getFilename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setFilename = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string filePath = 3;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getFilepath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setFilepath = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string fileType = 4;
 * @return {string}
 */
proto.dockerGet.DownloadRequest.prototype.getFiletype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.DownloadRequest} returns this
 */
proto.dockerGet.DownloadRequest.prototype.setFiletype = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UploadRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UploadRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UploadRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UploadRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 5, ""),
    filepath: jspb.Message.getFieldWithDefault(msg, 3, ""),
    parentid: jspb.Message.getFieldWithDefault(msg, 1, ""),
    filetype: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UploadRequest}
 */
proto.dockerGet.UploadRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UploadRequest;
  return proto.dockerGet.UploadRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UploadRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UploadRequest}
 */
proto.dockerGet.UploadRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setFilepath(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setParentid(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setFiletype(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UploadRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UploadRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UploadRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UploadRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getFilepath();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getParentid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFiletype();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UploadRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UploadRequest} returns this
 */
proto.dockerGet.UploadRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sub = 5;
 * @return {string}
 */
proto.dockerGet.UploadRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UploadRequest} returns this
 */
proto.dockerGet.UploadRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string filePath = 3;
 * @return {string}
 */
proto.dockerGet.UploadRequest.prototype.getFilepath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UploadRequest} returns this
 */
proto.dockerGet.UploadRequest.prototype.setFilepath = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string parentId = 1;
 * @return {string}
 */
proto.dockerGet.UploadRequest.prototype.getParentid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UploadRequest} returns this
 */
proto.dockerGet.UploadRequest.prototype.setParentid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string fileType = 4;
 * @return {string}
 */
proto.dockerGet.UploadRequest.prototype.getFiletype = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UploadRequest} returns this
 */
proto.dockerGet.UploadRequest.prototype.setFiletype = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddTempContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddTempContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddTempContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTempContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    imagename: jspb.Message.getFieldWithDefault(msg, 42, ""),
    memlimit: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    numcpu: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    sessionkey: jspb.Message.getFieldWithDefault(msg, 1, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 4, ""),
    accessright: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddTempContainerRequest}
 */
proto.dockerGet.AddTempContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddTempContainerRequest;
  return proto.dockerGet.AddTempContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddTempContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddTempContainerRequest}
 */
proto.dockerGet.AddTempContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setImagename(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMemlimit(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setNumcpu(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionkey(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setAccessright(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddTempContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddTempContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddTempContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTempContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getImagename();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getMemlimit();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getNumcpu();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getSessionkey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getAccessright();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional string imageName = 42;
 * @return {string}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getImagename = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setImagename = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional float memLimit = 5;
 * @return {number}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getMemlimit = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setMemlimit = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float numCPU = 3;
 * @return {number}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getNumcpu = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setNumcpu = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string sessionKey = 1;
 * @return {string}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getSessionkey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setSessionkey = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string sub = 4;
 * @return {string}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string accessRight = 6;
 * @return {string}
 */
proto.dockerGet.AddTempContainerRequest.prototype.getAccessright = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerRequest} returns this
 */
proto.dockerGet.AddTempContainerRequest.prototype.setAccessright = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddTempContainerReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddTempContainerReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddTempContainerReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTempContainerReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    tempcontainerid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddTempContainerReply}
 */
proto.dockerGet.AddTempContainerReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddTempContainerReply;
  return proto.dockerGet.AddTempContainerReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddTempContainerReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddTempContainerReply}
 */
proto.dockerGet.AddTempContainerReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTempcontainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddTempContainerReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddTempContainerReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddTempContainerReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddTempContainerReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTempcontainerid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddTempContainerReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddTempContainerReply} returns this
 */
proto.dockerGet.AddTempContainerReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddTempContainerReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerReply} returns this
 */
proto.dockerGet.AddTempContainerReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string tempContainerId = 3;
 * @return {string}
 */
proto.dockerGet.AddTempContainerReply.prototype.getTempcontainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddTempContainerReply} returns this
 */
proto.dockerGet.AddTempContainerReply.prototype.setTempcontainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.RemoveTempContainerRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.RemoveTempContainerRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveTempContainerRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    containerid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    sub: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.RemoveTempContainerRequest}
 */
proto.dockerGet.RemoveTempContainerRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.RemoveTempContainerRequest;
  return proto.dockerGet.RemoveTempContainerRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.RemoveTempContainerRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.RemoveTempContainerRequest}
 */
proto.dockerGet.RemoveTempContainerRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setContainerid(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSub(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.RemoveTempContainerRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.RemoveTempContainerRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.RemoveTempContainerRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getContainerid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getSub();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveTempContainerRequest} returns this
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string containerId = 5;
 * @return {string}
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.getContainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveTempContainerRequest} returns this
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.setContainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string sub = 1;
 * @return {string}
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.getSub = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.RemoveTempContainerRequest} returns this
 */
proto.dockerGet.RemoveTempContainerRequest.prototype.setSub = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddSandBoxImageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddSandBoxImageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxImageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    description: jspb.Message.getFieldWithDefault(msg, 4, ""),
    imageId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddSandBoxImageRequest}
 */
proto.dockerGet.AddSandBoxImageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddSandBoxImageRequest;
  return proto.dockerGet.AddSandBoxImageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddSandBoxImageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddSandBoxImageRequest}
 */
proto.dockerGet.AddSandBoxImageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddSandBoxImageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddSandBoxImageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxImageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getImageId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageRequest} returns this
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string userId = 2;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageRequest} returns this
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageRequest} returns this
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 4;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageRequest} returns this
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string image_id = 1;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.getImageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageRequest} returns this
 */
proto.dockerGet.AddSandBoxImageRequest.prototype.setImageId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddSandBoxImageReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddSandBoxImageReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddSandBoxImageReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxImageReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sandboximageid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddSandBoxImageReply}
 */
proto.dockerGet.AddSandBoxImageReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddSandBoxImageReply;
  return proto.dockerGet.AddSandBoxImageReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddSandBoxImageReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddSandBoxImageReply}
 */
proto.dockerGet.AddSandBoxImageReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboximageid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddSandBoxImageReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddSandBoxImageReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddSandBoxImageReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxImageReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSandboximageid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddSandBoxImageReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddSandBoxImageReply} returns this
 */
proto.dockerGet.AddSandBoxImageReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageReply} returns this
 */
proto.dockerGet.AddSandBoxImageReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string sandBoxImageId = 3;
 * @return {string}
 */
proto.dockerGet.AddSandBoxImageReply.prototype.getSandboximageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxImageReply} returns this
 */
proto.dockerGet.AddSandBoxImageReply.prototype.setSandboximageid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.UpdateSandBoxImageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.UpdateSandBoxImageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateSandBoxImageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sandboximageid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    title: jspb.Message.getFieldWithDefault(msg, 3, ""),
    description: jspb.Message.getFieldWithDefault(msg, 1, ""),
    tempcontainerid: jspb.Message.getFieldWithDefault(msg, 4, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest}
 */
proto.dockerGet.UpdateSandBoxImageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.UpdateSandBoxImageRequest;
  return proto.dockerGet.UpdateSandBoxImageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.UpdateSandBoxImageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest}
 */
proto.dockerGet.UpdateSandBoxImageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboximageid(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTempcontainerid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.UpdateSandBoxImageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.UpdateSandBoxImageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.UpdateSandBoxImageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSandboximageid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTempcontainerid();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sandBoxImageId = 2;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getSandboximageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setSandboximageid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string userId = 5;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string title = 3;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string description = 1;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string tempContainerId = 4;
 * @return {string}
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.getTempcontainerid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.UpdateSandBoxImageRequest} returns this
 */
proto.dockerGet.UpdateSandBoxImageRequest.prototype.setTempcontainerid = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SandBoxImageIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SandBoxImageIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SandBoxImageIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sandboximageid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SandBoxImageIdRequest}
 */
proto.dockerGet.SandBoxImageIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SandBoxImageIdRequest;
  return proto.dockerGet.SandBoxImageIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SandBoxImageIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SandBoxImageIdRequest}
 */
proto.dockerGet.SandBoxImageIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboximageid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SandBoxImageIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SandBoxImageIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SandBoxImageIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSandboximageid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxImageIdRequest} returns this
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sandBoxImageId = 5;
 * @return {string}
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.getSandboximageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxImageIdRequest} returns this
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.setSandboximageid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string user_id = 3;
 * @return {string}
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxImageIdRequest} returns this
 */
proto.dockerGet.SandBoxImageIdRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListSandBoxImageRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListSandBoxImageRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    userid: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListSandBoxImageRequest}
 */
proto.dockerGet.ListSandBoxImageRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListSandBoxImageRequest;
  return proto.dockerGet.ListSandBoxImageRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListSandBoxImageRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListSandBoxImageRequest}
 */
proto.dockerGet.ListSandBoxImageRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListSandBoxImageRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListSandBoxImageRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageRequest} returns this
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string userId = 5;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.getUserid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageRequest} returns this
 */
proto.dockerGet.ListSandBoxImageRequest.prototype.setUserid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListSandBoxImageReply.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListSandBoxImageReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListSandBoxImageReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 4, ""),
    sandboximagesList: jspb.Message.toObjectList(msg.getSandboximagesList(),
    proto.dockerGet.ListSandBoxImageReply.SandBoxImage.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListSandBoxImageReply}
 */
proto.dockerGet.ListSandBoxImageReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListSandBoxImageReply;
  return proto.dockerGet.ListSandBoxImageReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListSandBoxImageReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListSandBoxImageReply}
 */
proto.dockerGet.ListSandBoxImageReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = new proto.dockerGet.ListSandBoxImageReply.SandBoxImage;
      reader.readMessage(value,proto.dockerGet.ListSandBoxImageReply.SandBoxImage.deserializeBinaryFromReader);
      msg.addSandboximages(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListSandBoxImageReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListSandBoxImageReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getSandboximagesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.dockerGet.ListSandBoxImageReply.SandBoxImage.serializeBinaryToWriter
    );
  }
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.ListSandBoxImageReply.SandBoxImage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    title: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 7, ""),
    imageid: jspb.Message.getFieldWithDefault(msg, 3, ""),
    sandboxidList: (f = jspb.Message.getRepeatedField(msg, 6)) == null ? undefined : f
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.ListSandBoxImageReply.SandBoxImage;
  return proto.dockerGet.ListSandBoxImageReply.SandBoxImage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTitle(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setImageid(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.addSandboxid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.ListSandBoxImageReply.SandBoxImage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTitle();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getImageid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getSandboxidList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      6,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string title = 2;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.getTitle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.setTitle = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 7;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


/**
 * optional string imageId = 3;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.getImageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.setImageid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * repeated string sandboxId = 6;
 * @return {!Array<string>}
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.getSandboxidList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 6));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.setSandboxidList = function(value) {
  return jspb.Message.setField(this, 6, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.addSandboxid = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 6, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage} returns this
 */
proto.dockerGet.ListSandBoxImageReply.SandBoxImage.prototype.clearSandboxidList = function() {
  return this.setSandboxidList([]);
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.ListSandBoxImageReply} returns this
 */
proto.dockerGet.ListSandBoxImageReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 4;
 * @return {string}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.ListSandBoxImageReply} returns this
 */
proto.dockerGet.ListSandBoxImageReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * repeated SandBoxImage sandboxImages = 3;
 * @return {!Array<!proto.dockerGet.ListSandBoxImageReply.SandBoxImage>}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.getSandboximagesList = function() {
  return /** @type{!Array<!proto.dockerGet.ListSandBoxImageReply.SandBoxImage>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.dockerGet.ListSandBoxImageReply.SandBoxImage, 3));
};


/**
 * @param {!Array<!proto.dockerGet.ListSandBoxImageReply.SandBoxImage>} value
 * @return {!proto.dockerGet.ListSandBoxImageReply} returns this
*/
proto.dockerGet.ListSandBoxImageReply.prototype.setSandboximagesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage=} opt_value
 * @param {number=} opt_index
 * @return {!proto.dockerGet.ListSandBoxImageReply.SandBoxImage}
 */
proto.dockerGet.ListSandBoxImageReply.prototype.addSandboximages = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.dockerGet.ListSandBoxImageReply.SandBoxImage, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.dockerGet.ListSandBoxImageReply} returns this
 */
proto.dockerGet.ListSandBoxImageReply.prototype.clearSandboximagesList = function() {
  return this.setSandboximagesList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddSandBoxRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddSandBoxRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddSandBoxRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    memlimit: jspb.Message.getFloatingPointFieldWithDefault(msg, 5, 0.0),
    numcpu: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
    sandboximageid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddSandBoxRequest}
 */
proto.dockerGet.AddSandBoxRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddSandBoxRequest;
  return proto.dockerGet.AddSandBoxRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddSandBoxRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddSandBoxRequest}
 */
proto.dockerGet.AddSandBoxRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setMemlimit(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setNumcpu(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboximageid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddSandBoxRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddSandBoxRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddSandBoxRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getMemlimit();
  if (f !== 0.0) {
    writer.writeFloat(
      5,
      f
    );
  }
  f = message.getNumcpu();
  if (f !== 0.0) {
    writer.writeFloat(
      3,
      f
    );
  }
  f = message.getSandboximageid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.AddSandBoxRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxRequest} returns this
 */
proto.dockerGet.AddSandBoxRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional float memLimit = 5;
 * @return {number}
 */
proto.dockerGet.AddSandBoxRequest.prototype.getMemlimit = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 5, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddSandBoxRequest} returns this
 */
proto.dockerGet.AddSandBoxRequest.prototype.setMemlimit = function(value) {
  return jspb.Message.setProto3FloatField(this, 5, value);
};


/**
 * optional float numCPU = 3;
 * @return {number}
 */
proto.dockerGet.AddSandBoxRequest.prototype.getNumcpu = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.dockerGet.AddSandBoxRequest} returns this
 */
proto.dockerGet.AddSandBoxRequest.prototype.setNumcpu = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional string sandBoxImageId = 1;
 * @return {string}
 */
proto.dockerGet.AddSandBoxRequest.prototype.getSandboximageid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxRequest} returns this
 */
proto.dockerGet.AddSandBoxRequest.prototype.setSandboximageid = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.AddSandBoxReply.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.AddSandBoxReply.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.AddSandBoxReply} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxReply.toObject = function(includeInstance, msg) {
  var f, obj = {
    success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    message: jspb.Message.getFieldWithDefault(msg, 2, ""),
    sandboxid: jspb.Message.getFieldWithDefault(msg, 3, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.AddSandBoxReply}
 */
proto.dockerGet.AddSandBoxReply.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.AddSandBoxReply;
  return proto.dockerGet.AddSandBoxReply.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.AddSandBoxReply} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.AddSandBoxReply}
 */
proto.dockerGet.AddSandBoxReply.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboxid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.AddSandBoxReply.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.AddSandBoxReply.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.AddSandBoxReply} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.AddSandBoxReply.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getSandboxid();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.dockerGet.AddSandBoxReply.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.dockerGet.AddSandBoxReply} returns this
 */
proto.dockerGet.AddSandBoxReply.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.dockerGet.AddSandBoxReply.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxReply} returns this
 */
proto.dockerGet.AddSandBoxReply.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string sandBoxId = 3;
 * @return {string}
 */
proto.dockerGet.AddSandBoxReply.prototype.getSandboxid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.AddSandBoxReply} returns this
 */
proto.dockerGet.AddSandBoxReply.prototype.setSandboxid = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.dockerGet.SandBoxIdRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.dockerGet.SandBoxIdRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.dockerGet.SandBoxIdRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SandBoxIdRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    sessionKey: jspb.Message.getFieldWithDefault(msg, 42, ""),
    sandboxid: jspb.Message.getFieldWithDefault(msg, 5, ""),
    userId: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.dockerGet.SandBoxIdRequest}
 */
proto.dockerGet.SandBoxIdRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.dockerGet.SandBoxIdRequest;
  return proto.dockerGet.SandBoxIdRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.dockerGet.SandBoxIdRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.dockerGet.SandBoxIdRequest}
 */
proto.dockerGet.SandBoxIdRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 42:
      var value = /** @type {string} */ (reader.readString());
      msg.setSessionKey(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setSandboxid(value);
      break;
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setUserId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.dockerGet.SandBoxIdRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.dockerGet.SandBoxIdRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.dockerGet.SandBoxIdRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.dockerGet.SandBoxIdRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSessionKey();
  if (f.length > 0) {
    writer.writeString(
      42,
      f
    );
  }
  f = message.getSandboxid();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getUserId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string session_key = 42;
 * @return {string}
 */
proto.dockerGet.SandBoxIdRequest.prototype.getSessionKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 42, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxIdRequest} returns this
 */
proto.dockerGet.SandBoxIdRequest.prototype.setSessionKey = function(value) {
  return jspb.Message.setProto3StringField(this, 42, value);
};


/**
 * optional string sandBoxId = 5;
 * @return {string}
 */
proto.dockerGet.SandBoxIdRequest.prototype.getSandboxid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxIdRequest} returns this
 */
proto.dockerGet.SandBoxIdRequest.prototype.setSandboxid = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string user_id = 1;
 * @return {string}
 */
proto.dockerGet.SandBoxIdRequest.prototype.getUserId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.dockerGet.SandBoxIdRequest} returns this
 */
proto.dockerGet.SandBoxIdRequest.prototype.setUserId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.dockerGet);
