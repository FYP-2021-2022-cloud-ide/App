import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import {
  Container,
  Environment,
  SectionUserInfo,
  StudentWorkspace,
  Template,
} from "../lib/cnails";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";
import { envAPI } from "../lib/api/envAPI";
import { templateAPI } from "../lib/api/templateAPI";
import {
  apiEnvironmentToUiEnvironment,
  patchEnvironments,
} from "../lib/environmentHelper";
import {
  apiTemplatesToUiTemplates,
  patchTemplates,
} from "../lib/templateHelper";
import { useCancelablePromise } from "../hooks/useCancelablePromise";
import {
  EnvironmentAddResponse,
  EnvironmentListResponse,
  TemplateListResponse,
} from "../lib/api/api";
import { useContainers } from "./containers";
import { useMessaging } from "./messaging";
import courseAPI from "../lib/api/courses";
import { useWarning } from "./warning";
import Loader from "../components/Loader";
import { useSection } from "./section";

type InstructorContextState = {
  // fetchSectionUserInfo: (sectionId: string) => Promise<void>;
  environments: Environment[];
  getEnvironment: (id: string) => Environment;
  setEnvironments: React.Dispatch<React.SetStateAction<Environment[]>>;
  /**
   * a function to fetch the new environment list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of environments,
   * using the returned value is not suggested. You should use the `environments`
   * from the context instead.
   */
  fetchEnvironments: () => Promise<Environment[]>;
  templates: Template[];
  getTemplate: (id: string) => Template;
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
  /**
   * a function to fetch the new template list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of templates,
   * using the returned value is not suggested. You should use the `templates`
   * from the context instead.
   */
  fetchTemplates: () => Promise<Template[]>;
  /**
   * This will fetch environments, templates and user containers.
   * This is called when the context first render in `useEffect()`.
   *
   * @remark
   * it is suggested not to use this fetch in your component because it is a batch fetching.
   * Instead using separate `fetchTemplates` and `fetchEnvironments`
   */
  fetch: () => Promise<void>;
  sectionUserInfo: SectionUserInfo;
  highlightedEnv: Environment;
  setHighlightedEnv: React.Dispatch<React.SetStateAction<Environment>>;
  broadcastAnnouncement: (
    title: string,
    content: string,
    allowReply: boolean
  ) => Promise<void>;

  /**
   * this can create a predefined environment or build a custom environment
   * @param id if this is a string, it is a container id. If this is a string[],
   * it refers the libraries.
   */
  createEnvironment: (
    name: string,
    description: string,
    id: string | string[]
  ) => Promise<void>;
  /**
   * @param envId the update target
   * @param name new name
   * @param description new description
   */
  updateEnvironmentInfo: (
    envId: string,
    name: string,
    description: string
  ) => Promise<void>;
  updateEnvironmentInternal: (
    envId: string,
    containerId: string
  ) => Promise<void>;
  removeEnvironment: (envId: string) => Promise<void>;
  createTemplate: (
    name: string,
    description: string,
    environmentId: string,
    containerId: string,
    active: boolean,
    isExam: boolean,
    timeLimit: number,
    allowNotification: boolean
  ) => Promise<void>;
  updateTemplateInfo: (
    templateId: string,
    name: string,
    description: string,
    isExam: boolean,
    timeLimit: number,
    allowNotification: boolean
  ) => Promise<void>;
  updateTemplateInternal: (
    templateId: string,
    containerId: string
  ) => Promise<void>;
  removeTemplate: (templateId: string) => Promise<void>;
  publishTemplate: (templateId: string) => Promise<void>;
  unpublishTemplate: (templateId: string) => Promise<void>;
  getTemplateStudentWorkspaces: (
    templateId: string
  ) => Promise<StudentWorkspace[]>;
};

const InstructorContext = createContext({} as InstructorContextState);
/**
 * The instructor context provide all the data for an instructor in a section.
 * This context will fetch environments, templates and containers when it renders.
 */
export const useInstructor = () => useContext(InstructorContext);

export const InstructorProvider = ({ children }: { children: JSX.Element }) => {
  const { sectionUserInfo } = useSection();
  const { sub, userId } = useCnails();
  const { containers, fetchContainers } = useContainers();
  const { sendNotificationAnnouncement } = courseAPI;
  const { fetchMessages } = useMessaging();
  const [environments, setEnvironments] = useState<Environment[]>();
  const [templates, setTemplates] = useState<Template[]>();
  const [highlightedEnv, setHighlightedEnv] = useState<Environment>();
  const { cancelablePromise } = useCancelablePromise();
  const { waitForConfirm } = useWarning();

  const getEnvironment = (id: string) =>
    environments.find((env) => env.id == id);

  const getTemplate = (id: string) => templates.find((t) => t.id == id);

  const fetchEnvironments = async (
    _containers: Container[] = containers,
    _sectionUserInfo: SectionUserInfo = sectionUserInfo
  ) => {
    const afterResponse = (
      response: EnvironmentListResponse,
      mount: boolean = true
    ) => {
      if (response.success) {
        const environments = patchEnvironments(
          apiEnvironmentToUiEnvironment(response.environments),
          _containers
        );
        if (mount) setEnvironments(environments);
        return environments;
      } else {
        myToast.error({
          title: "Fail to fetch environments.",
          description: errorToToastDescription(response.error),
        });
      }
    };
    try {
      const response = await cancelablePromise(
        envAPI.listEnvironments({
          sectionId: _sectionUserInfo.sectionId,
          sub: sub,
        })
      );
      return afterResponse(response);
    } catch (error) {
      if (error.isCanceled) {
        return afterResponse(error.value as EnvironmentListResponse, false);
      } else {
        console.error(error);
      }
    }
  };

  const fetchTemplates = async (
    _containers: Container[] = containers,
    _sectionUserInfo: SectionUserInfo = sectionUserInfo
  ) => {
    const afterResponse = (
      response: TemplateListResponse,
      mount: boolean = true
    ) => {
      if (response.success) {
        const templates = patchTemplates(
          apiTemplatesToUiTemplates(response.templates),
          _containers
        );
        if (mount) setTemplates(templates);
        return templates;
      } else {
        myToast.error({
          title: "Fail to fetch templates.",
          description: errorToToastDescription(response.error),
        });
      }
    };
    const response = await templateAPI.listTemplates({
      sectionid: _sectionUserInfo.sectionId,
      sub: sub,
    });
    return afterResponse(response);
  };

  const broadcastAnnouncement = async (
    title: string,
    content: string,
    allowReply: boolean
  ) => {
    const response = await sendNotificationAnnouncement({
      title,
      body: content,
      allowReply,
      senderId: userId,
      sectionId: sectionUserInfo.sectionId,
    });
    if (response.success) myToast.success("The course announcement is sent.");
    else
      myToast.error({
        title: "Fail to send course announcement",
        description: errorToToastDescription(response.error),
      });
    await fetchMessages();
  };

  const createEnvironment = async (
    name: string,
    description: string,
    id: string | string[]
  ) => {
    let response: EnvironmentAddResponse;
    if (typeof id == "string") {
      // this is a custom environment
      response = await myToast.promise(
        "Building a custom environment...",
        envAPI.buildEnvironment({
          name: name,
          description: description,
          section_user_id: sectionUserInfo.sectionUserId,
          containerId: id,
        })
      );
    } else {
      // this is a predefined environment
      response = await myToast.promise(
        "Creating the environment...",
        envAPI.addEnvironment({
          libraries: id,
          name: name,
          description: description,
          section_user_id: sectionUserInfo.sectionUserId,
        })
      );
    }
    if (response.success) {
      myToast.success("Environment is created successfully.");
    } else {
      myToast.error({
        title: "Fail to create environment.",
        description: errorToToastDescription(response.error),
      });
    }
    // we need the fetchContainers() because the build environment api
    // not only create a env but also remove the temp container
    // therefore these two places need rerender.
    await fetchContainers();
    await fetchEnvironments();
  };

  const updateEnvironmentInfo = async (
    envId: string,
    name: string,
    description: string
  ) => {
    const response = await myToast.promise(
      "Updating an environment...",
      envAPI.updateEnvironment({
        envId,
        name,
        description,
        section_user_id: sectionUserInfo.sectionUserId,
        containerId: "",
      })
    );
    if (response.success) {
      myToast.success("Environment is updated.");
    } else {
      myToast.error({
        title: "Fail to update environment",
        description: errorToToastDescription(response.error),
      });
    }
    await fetchEnvironments();
  };

  const updateEnvironmentInternal = async (
    envId: string,
    containerId: string
  ) => {
    const env = getEnvironment(envId);
    const response = await myToast.promise(
      "Updating the environment...",
      envAPI.updateEnvironment({
        envId: env.id,
        name: env.name,
        description: env.description,
        section_user_id: sectionUserInfo.sectionUserId,
        containerId: containerId,
      })
    );
    if (response.success)
      myToast.success("Environment is successfully updated.");
    else
      myToast.error({
        title: "Fail to update environment",
        description: errorToToastDescription(response.error),
      });
    await fetchContainers();
    await fetchEnvironments();
  };

  const removeEnvironment = async (envId: string) => {
    const numTemplates = templates.filter(
      (t) => t.environment_id === envId
    ).length;
    if (numTemplates != 0) {
      myToast.error({
        title: "Fail to remove environment",
        description: `${numTemplates} template${
          numTemplates > 1 ? "s are" : " is"
        } still using ${getEnvironment(envId).name}.`,
      });
    } else {
      if (
        (await waitForConfirm(
          "Are you sure you want to remove this environment? This action cannot be undo."
        )) == false
      )
        return;
      const response = await myToast.promise(
        "Removing the environment...",
        envAPI.removeEnvironment({
          envId: envId,
          section_user_id: sectionUserInfo.sectionUserId,
        })
      );
      if (response.success) {
        myToast.success(`The environment is successfully removed`);
      } else {
        myToast.error({
          title: "Fail to remove environment",
          description: errorToToastDescription(response.error),
        });
      }
    }
    await fetchEnvironments();
  };

  const createTemplate = async (
    name: string,
    description: string,
    environmentId: string,
    containerId: string,
    active: boolean,
    isExam: boolean,
    timeLimit: number,
    allowNotification: boolean
  ) => {
    const response = await myToast.promise(
      "Building your templates...",
      templateAPI.addTemplate({
        templateName: name,
        description: description,
        section_user_id: sectionUserInfo.sectionUserId,
        environment_id: environmentId,
        assignment_config_id: "",
        containerId: containerId,
        active: active,
        isExam: isExam,
        timeLimit: Number(timeLimit),
        allow_notification: allowNotification,
      })
    );
    if (response.success) {
      myToast.success("Template is created successfully");
    } else {
      myToast.error({
        title: "Fail to create template",
        description: errorToToastDescription(response.error),
      });
    }
    await fetchContainers();
    await fetchTemplates();
  };

  const updateTemplateInfo = async (
    templateId: string,
    name: string,
    description: string,
    isExam: boolean,
    timeLimit: number,
    allowNotification: boolean
  ) => {
    const response = await myToast.promise(
      "Updating the template...",
      templateAPI.updateTemplate({
        templateId,
        templateName: name,
        description,
        section_user_id: sectionUserInfo.sectionUserId,
        containerId: "",
        isExam,
        timeLimit,
        allow_notification: allowNotification,
      })
    );
    if (response.success) {
      myToast.success("Template is updated.");
    } else {
      myToast.error({
        title: "Fail to update template",
        description: errorToToastDescription(response.error),
      });
    }
    await fetchTemplates();
  };

  const removeTemplate = async (templateId: string) => {
    if (
      (await waitForConfirm(
        "Are you sure you want to delete this template? This action cannot be undo."
      )) == false
    )
      return;
    const response = await templateAPI.removeTemplate({
      templateId,
      section_user_id: sectionUserInfo.sectionUserId,
    });
    if (response.success) {
      myToast.success("Template is successfully deleted.");
    } else {
      myToast.error({
        title: "Fail to remove template",
        description: errorToToastDescription(response.error),
      });
    }
  };

  const publishTemplate = async (templateId: string) => {
    const template = getTemplate(templateId);
    const response = await myToast.promise(
      `Publishing the ${template.name}...`,
      templateAPI.activateTemplate({
        templateId: template.id,
        section_user_id: sectionUserInfo.sectionUserId,
      })
    );
    if (response.success) {
      myToast.success(`${template.name} is published.`);
    } else {
      myToast.error({
        title: `Fail to publish template`,
        description: errorToToastDescription(response.error),
      });
    }
    await fetchTemplates();
  };

  const unpublishTemplate = async (templateId: string) => {
    const template = getTemplate(templateId);
    const response = await myToast.promise(
      `Unpublishing the ${template.name}...`,
      templateAPI.deactivateTemplate({
        templateId: template.id,
        section_user_id: sectionUserInfo.sectionUserId,
      })
    );
    if (response.success) {
      myToast.success(`${template.name} is unpublished.`);
    } else
      myToast.error({
        title: `Fail to unpublish template`,
        description: errorToToastDescription(response.error),
      });
    await fetchTemplates();
  };

  const updateTemplateInternal = async (
    templateId: string,
    containerId: string
  ) => {
    const template = getTemplate(templateId);
    const response = await myToast.promise(
      "Updating the templates...",
      templateAPI.updateTemplate({
        templateId: template.id,
        templateName: template.name,
        description: template.description,
        section_user_id: sectionUserInfo.sectionUserId,
        containerId: containerId,
        isExam: template.isExam,
        timeLimit: template.timeLimit,
        allow_notification: template.allow_notification,
      })
    );
    if (response.success) myToast.success("Template is successfully updated.");
    else
      myToast.error({
        title: "Fail to update template",
        description: errorToToastDescription(response.error),
      });
    await fetchContainers();
    await fetchTemplates();
  };

  const getTemplateStudentWorkspaces = async (templateId: string) => {
    const response = await templateAPI.getTemplateStudentWorkspace({
      templateId: templateId,
      section_user_id: sectionUserInfo.sectionUserId,
    });
    if (response.success) {
      return response.studentWorkspaces.map((w) => ({
        status: w.status as "ON" | "OFF",
        workspaceId: w.workspaceId,
        student: {
          name: w.student.name,
          sub: w.student.sub,
        },
      }));
    } else {
      myToast.error({
        title: "Fail to get studnet workspaces",
        description: errorToToastDescription(response.error),
      });
    }
  };

  /**
   * the hook will change the status of environments and templates base on the change in containers
   */
  useEffect(() => {
    if (environments && containers) {
      setEnvironments((environments) =>
        patchEnvironments(environments, containers)
      );
    }
    if (templates && containers) {
      setTemplates((templates) => patchTemplates(templates, containers));
    }
  }, [containers]);

  const fetch = async () => {
    await fetchEnvironments(containers);
    await fetchTemplates(containers);
  };

  /**
   * this hook do the initial fetching
   */
  useEffect(() => {
    fetch();
  }, []);

  if (!environments || !templates || !sectionUserInfo) return <Loader />;

  return (
    <InstructorContext.Provider
      value={{
        environments,
        getEnvironment,
        setEnvironments,
        fetchEnvironments,
        templates,
        getTemplate,
        setTemplates,
        fetchTemplates,
        fetch,
        sectionUserInfo,
        highlightedEnv,
        setHighlightedEnv,
        broadcastAnnouncement,
        createEnvironment,
        updateEnvironmentInfo,
        removeEnvironment,
        updateEnvironmentInternal,
        createTemplate,
        updateTemplateInfo,
        removeTemplate,
        publishTemplate,
        unpublishTemplate,
        updateTemplateInternal,
        getTemplateStudentWorkspaces,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};
