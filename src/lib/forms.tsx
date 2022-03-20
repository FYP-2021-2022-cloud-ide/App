import { FormStructure, Section } from "../components/ModalForm";
import { Environment, SandboxImage, Template } from "./cnails";

import { Option } from "../components/ListBox";
import { containerAPI } from "./api/containerAPI";
import myToast from "../components/CustomToast";

const registry = process.env.NEXT_PUBLIC_REGISTRY;
// console.log(registry)
const rootImage = `${registry}/codeserver:latest`;
const CPU = 0.5;
const memory = 800;
const envChoices = [
  { value: "C++/C", id: `${registry}/cpp:latest` },
  { value: "Python3", id: `${registry}/python3:latest` },
  { value: "Java", id: `${registry}/java:latest` },
];

export const getValidName = (
  names: string[],
  prefix: string,
  update: boolean = false
): string => {
  for (let i = names.length + (update ? 0 : 1); ; i++) {
    if (names.every((name) => name != `${prefix} ${i}`))
      return `${prefix} ${i}`;
  }
};

function getEnvOptions(environments: Environment[]) {
  // building the environemnts list
  var options: Option[] = [];
  for (let i = 0; i < environments.length; i++) {
    options.push({
      id: environments[i].id,
      value: environments[i].name,
      imageId: environments[i].imageId,
    } as Option);
  }
  return options;
}

export const getCreateEnvironmentFormStructure = (
  environments: Environment[]
): FormStructure => {
  const validName = getValidName(
    environments.map((env) => env.name),
    "Environment"
  );
  return {
    create_environment: {
      displayTitle: false,
      entries: {
        is_predefined: {
          type: "toggle",
          defaultValue: true,
          label: "Use predefined environment? ",
          description: "whether this environment is a predefined environment",
          tooltip:
            "If you are not using a custom environment, you will be prompt to a temporary workspace where you can set up the environment.",
        },
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          label: "Pick the Programming Language",
          options: envChoices,
          conditional: (data) => {
            return data.is_predefined as boolean;
          },
        },
        name: {
          type: "input",
          defaultValue: "",
          label: "Name",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          validate: (data) => {
            if (environments.map((e) => e.name).includes(data.name))
              return { ok: false, message: "Name crash" };
            else return { ok: true };
          },
        },
        description: {
          type: "textarea",
          defaultValue: "",
          label: "Description",
        },
      },
    },
  };
};

export const getUpdateEnvironmentFormStructure = (
  sub: string,
  targetEnvironment: Environment,
  environments: Environment[]
): FormStructure => {
  if (!targetEnvironment || environments.length == 0) {
    return {};
  }
  const validName = getValidName(
    environments.map((env) => env.name),
    "Environment",
    true
  );
  return {
    update_environment: {
      displayTitle: false,
      entries: {
        update_internal: {
          type: "custom",
          defaultValue: "",
          label: "Update internal",
          tooltip: "Open a temp workspace for you to update the environment.",
          node: (onChange, currentValue) => {
            const { addTempContainer } = containerAPI;
            return (
              <div>
                {currentValue != "" ? (
                  <a
                    className="text-xs text-blue-500 underline justify-center"
                    href={
                      "https://codespace.ust.dev/user/container/" +
                      currentValue +
                      "/"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Go to temp workspace
                  </a>
                ) : (
                  <button
                    className="btn btn-wide btn-sm dark:btn-primary"
                    onClick={async (e) => {
                      const btn = e.currentTarget;
                      btn.classList.add("loading");
                      btn.textContent = "Loading";
                      const response = await addTempContainer(
                        memory,
                        CPU,
                        targetEnvironment.imageId,
                        sub,
                        "root"
                      );
                      btn.classList.remove("loading");
                      btn.textContent = "Click me";
                      if (response.success) {
                        const link =
                          "https://codespace.ust.dev/user/container/" +
                          response.containerID +
                          "/";

                        window.open(link);
                        onChange(response.containerID);
                      } else
                        myToast.error(
                          "fail to start temp container for this environment."
                        );
                    }}
                  >
                    Click me
                  </button>
                )}
              </div>
            );
          },
        },
        name: {
          type: "input",
          defaultValue: targetEnvironment.name,
          label: "Name",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          validate: (data) => {
            if (
              environments
                .map((e) => e.name)
                .filter((n) => n != targetEnvironment.name)
                .includes(data.name)
            )
              return { ok: false, message: "Name crash" };
            else return { ok: true };
          },
        },
        description: {
          type: "textarea",
          defaultValue: targetEnvironment.description,
          label: "Description",
        },
      },
    },
  };
};

export const getCreateTemplateFormStructure = (
  templates: Template[],
  environments: Environment[]
): FormStructure => {
  if (environments.length == 0) {
    return {};
  }
  const envOptions = getEnvOptions(environments);
  if (envOptions.length == 0)
    throw new Error("there is no environment. The form should not be called");
  const validName = getValidName(
    templates.map((t) => t.name),
    "Assignment Template"
  );
  return {
    create_template: {
      entries: {
        environment: {
          label: "Environment",
          type: "listbox",
          options: envOptions,
          defaultValue: envOptions[0],
        },
        name: {
          type: "input",
          defaultValue: "",
          label: "Name (Optional)",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          validate: (data) => {
            if (templates.map((t) => t.name).includes(data.name))
              return { ok: false, message: "Name crash" };
            else return { ok: true };
          },
        },
        description: {
          type: "textarea",
          placeholder: `e.g. ${validName} is about ...`,
          defaultValue: "",
          label: "Description (Optional)",
        },
        allow_notification: {
          type: "toggle",
          defaultValue: false,
          label: "Can students send question to You? ",
          description: "Can students send question to You?",
          tooltip:
            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials and laboraries.",
        },
        is_exam: {
          type: "toggle",
          defaultValue: false,
          label: "Exam mode",
          tooltip:
            "You can restrict the time span of the container if the template is for an exam.",
        },
        time_limit: {
          type: "input",
          defaultValue: "60",
          label: "Time Limit(in minutes) ",
          description: "Time Limit of the exam",
          conditional: (data) => {
            return data.is_exam as boolean;
          },
        },
      },
    },
  };
};

export const getUpdateTemplateFormStructure = (
  sub: string,
  targetTemplate: Template,
  templates: Template[],
  environments: Environment[]
): FormStructure => {
  if (!targetTemplate || templates.length == 0 || environments.length == 0)
    return {};
  const validName = getValidName(
    templates.map((t) => t.name),
    "Assignment Template"
  );
  return {
    update_template: {
      entries: {
        update_internal: {
          type: "custom",
          defaultValue: "",
          label: "Update internal",
          tooltip: "Open a temp workspace for you to update the template.",
          node: (onChange, currentValue) => {
            const { addTempContainer } = containerAPI;
            return (
              <div>
                {currentValue != "" ? (
                  <a
                    className="text-xs text-blue-500 underline justify-center"
                    href={
                      "https://codespace.ust.dev/user/container/" +
                      currentValue +
                      "/"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Go to temp workspace
                  </a>
                ) : (
                  <button
                    className="btn btn-wide btn-sm dark:btn-primary"
                    onClick={async (e) => {
                      const btn = e.currentTarget;
                      btn.classList.add("loading");
                      btn.textContent = "Loading";
                      const response = await addTempContainer(
                        memory,
                        CPU,
                        targetTemplate.imageId,
                        sub,
                        "root"
                      );
                      btn.classList.remove("loading");
                      btn.textContent = "Click me";
                      if (response.success) {
                        const link =
                          "https://codespace.ust.dev/user/container/" +
                          response.containerID +
                          "/";

                        window.open(link);
                        onChange(response.containerID);
                      } else
                        myToast.error(
                          "fail to start temp container for this template."
                        );
                    }}
                  >
                    Click me
                  </button>
                )}
              </div>
            );
          },
        },
        name: {
          type: "input",
          defaultValue: targetTemplate.name,
          label: "Name (Optional)",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          validate: (data) => {
            if (
              templates
                .map((t) => t.name)
                .filter((n) => n != targetTemplate.name)
                .includes(data.name)
            )
              return { ok: false, message: "Name crash" };
            else return { ok: true };
          },
        },
        description: {
          type: "textarea",
          placeholder: "e.g. The assignment is about ...",
          defaultValue: targetTemplate.description,
          label: "Description (Optional)",
        },
        allow_notification: {
          type: "toggle",
          defaultValue: targetTemplate.allow_notification,
          label: "Can students send question to You? ",
          description: "Can students send question to You?",
          tooltip:
            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials.",
        },
        is_exam: {
          type: "toggle",
          defaultValue: targetTemplate.isExam,
          label: "Exam mode",
          description: "whether this assignment is an exam",
          tooltip:
            "Whether this assignment is an exam. The environment would be restricted to simple editors without compliers.",
        },
        time_limit: {
          type: "input",
          defaultValue: String(targetTemplate.timeLimit),
          label: "Time Limit(in minutes) ",
          description: "Time Limit of the exam",
          conditional: (data) => {
            return data.is_exam as boolean;
          },
        },
      },
    },
  };
};

export const getMessageReplyFormStructure = (
  targets: { id: string; sub: string; name: string }[]
): FormStructure => {
  return {
    reply_message: {
      displayTitle: false,
      entries: {
        target: {
          label: "Reply to",
          type: "input",
          defaultValue: targets.map((t) => t.name).join(", "),
          disabled: true,
        },
        message: {
          label: "Message",
          type: "markdown",
          defaultValue: "",
        },
      },
    },
  };
};

export const getCreateSandboxFormStructure = (
  sandboxes: SandboxImage[]
): FormStructure => {
  const validName = getValidName(
    sandboxes.map((s) => s.title),
    "Personal workspace"
  );
  return {
    create_sandbox: {
      displayTitle: false,
      entries: {
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          label: "Pick the Programming Language",
          options: envChoices,
        },
        name: {
          type: "input",
          defaultValue: "",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          label: "Name (Optional)",
          validate: (data) => {
            if (sandboxes.map((s) => s.title).includes(data.name))
              return { ok: false, message: "Name crash" };
            return { ok: true };
          },
        },
        description: {
          type: "textarea",
          defaultValue: "",
          placeholder: "e.g. This workspace is about ...",
          label: "Description (Optional)",
        },
      },
    },
  };
};

export const getUpdateSandboxFormStructure = (
  sub: string,
  targetSandbox: SandboxImage,
  sandboxes: SandboxImage[]
): FormStructure => {
  const validName = getValidName(
    sandboxes.map((s) => s.title),
    "Personal workspace",
    true
  );
  return {
    update_section: {
      displayTitle: false,
      entries: {
        update_environment: {
          type: "custom",
          label: "Update Environment",
          defaultValue: "",
          tooltip:
            "If you need to update the environment of your workspace, click the button below. You will be prompt to a temporary environment to set up your workspace.",
          node: (onChange, currentValue) => {
            const { addTempContainer } = containerAPI;
            return (
              <div>
                {currentValue != "" ? (
                  <a
                    className="text-xs text-blue-500 underline justify-center"
                    href={
                      "https://codespace.ust.dev/user/container/" +
                      currentValue +
                      "/"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    Go to temp workspace
                  </a>
                ) : (
                  <button
                    className="btn btn-wide btn-sm dark:btn-primary"
                    onClick={async (e) => {
                      const btn = e.currentTarget;
                      btn.classList.add("loading");
                      btn.textContent = "Loading";
                      const response = await addTempContainer(
                        memory,
                        CPU,
                        targetSandbox.imageId,
                        sub,
                        "root"
                      );
                      btn.classList.remove("loading");
                      btn.textContent = "Click me";
                      if (response.success) {
                        const link =
                          "https://codespace.ust.dev/user/container/" +
                          response.containerID +
                          "/";

                        window.open(link);
                        onChange(response.containerID);
                      } else
                        myToast.error(
                          "fail to start temp container for this workspace."
                        );
                    }}
                  >
                    Click me
                  </button>
                )}
              </div>
            );
          },
        },
        name: {
          type: "input",
          defaultValue: targetSandbox?.title,
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          label: "Name (Optional)",
          validate: (data) => {
            if (
              sandboxes
                .map((s) => s.title)
                .filter((n) => n != targetSandbox.title)
                .includes(data.name)
            )
              return { ok: false, message: "Name crash" };
            return { ok: true };
          },
        },
        description: {
          type: "textarea",
          defaultValue: targetSandbox?.description,
          placeholder: "e.g. This workspace is about ...",
          label: "Description (Optional)",
        },
      },
    },
  };
};

export const getAnnouncementFormStructure = (): FormStructure => {
  return {
    course_announcement: {
      displayTitle: false,
      entries: {
        title: {
          type: "input",
          defaultValue: "",
          placeholder: ``,
          emptyValue: "",
          label: "Title",
        },
        announcement: {
          type: "markdown",
          defaultValue: "",
          label: "Announcement",
        },
        allow_reply: {
          type: "toggle",
          defaultValue: false,
          label: "Can people reply to this announcement? ",
          description: "Can people reply to this announcement?",
        },
      },
    },
  };
};
