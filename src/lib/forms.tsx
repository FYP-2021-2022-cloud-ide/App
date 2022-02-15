import { FormStructure, Section } from "../components/ModalForm";
import { Environment, SandboxImage, Template } from "./cnails";

import { Option } from "../components/ListBox";
import { containerAPI } from "./api/containerAPI";
import myToast from "../components/CustomToast";

const registry = "143.89.223.188:5000";
const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;
const envChoices = [
  { value: "C++/C", id: `${registry}/codeserver:latest` },
  { value: "Python3", id: `${registry}/codeserver:latest` },
  { value: "Java", id: `${registry}/codeserver:latest` },
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
      value:
        environments[i].environmentName + " (" + environments[i].imageId + ")",
      imageId: environments[i].imageId,
    } as Option);
  }
  return options;
}

export const getCreateEnvironmentFormStructure = (
  environments: Environment[]
): FormStructure => {
  return {
    create_environment: {
      displayTitle: false,
      entries: {
        is_predefined: {
          type: "toggle",
          defaultValue: true,
          text: "Use predefined environment? ",
          description: "whether this environment is a predefined environment",
          tooltip:
            "whether this environment is a predefined environment. You will be prompt to a temporary workspace where you can set up the environment",
        },
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          text: "Pick the Programming Language",
          description: "Pick the Programming Language",
          tooltip: "Pick the Programming Language",
          options: envChoices,
          conditional: (data) => {
            return data.is_predefined as boolean;
          },
        },
        environment_name: {
          type: "input",
          defaultValue: "",
          text: "Environment name",
          placeholder: `e.g. ${getValidName(
            environments.map((env) => env.environmentName),
            "Environment"
          )}`,
        },
        environment_description: {
          type: "textarea",
          defaultValue: "",
          text: "Environment Description",
        },
      },
    },
  };
};

export const getUpdateEnvironmentFormStructure = (
  targetEnvironment: Environment,
  environments: Environment[]
): FormStructure => {
  return {
    update_environment: {
      displayTitle: false,
      entries: {
        environment_name: {
          type: "input",
          defaultValue: "",
          text: "Environment name",
          placeholder: `e.g. ${getValidName(
            environments.map((env) => env.environmentName),
            "Environment"
          )}`,
        },
        environment_description: {
          type: "textarea",
          defaultValue: "",
          text: "Environment Description",
        },
      },
    },
  };
};

export const getTemplateCreateFormStructure = (
  templates: Template[],
  environments: Environment[]
): FormStructure => {
  const envOptions = getEnvOptions(environments);
  if (envOptions.length == 0)
    throw new Error("there is no environment. The form should not be called");
  return {
    create_template: {
      entries: {
        environment: {
          text: "Environment",
          type: "listbox",
          options: envOptions,
          tooltip: "Pick an environment which has been defined in the course.",
          defaultValue: envOptions[0],
        },
        name: {
          type: "input",
          defaultValue: "",
          text: "Template name",
          placeholder: `e.g. ${getValidName(
            templates.map((t) => t.name),
            "Assignment Template"
          )}`,
        },
        description: {
          type: "textarea",
          placeholder: `e.g. ${getValidName(
            templates.map((t) => t.name),
            "Assignment Template"
          )} is about ...`,
          defaultValue: "",
          text: "Description (Optional)",
        },
        allow_notification: {
          type: "toggle",
          defaultValue: false,
          text: "Can students send question to You? ",
          description: "Can students send question to You?",
          tooltip:
            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials.",
        },
        is_exam: {
          type: "toggle",
          defaultValue: false,
          text: "Is it an Exam? ",
          description: "whether this assignment is an exam",
          tooltip:
            "Whether this assignment is an exam. The environment would be restricted to simple editors without compliers.",
        },
        time_limit: {
          type: "input",
          defaultValue: "60",
          text: "Time Limit(in minutes) ",
          description: "Time Limit of the exam",
          conditional: (data) => {
            return data.is_exam as boolean;
          },
        },
      },
    },
  };
};

export const getTemplateUpdateFormStructure = (
  TargetTemplate: Template,
  templates: Template[],
  environments: Environment[]
): FormStructure => {
  return {
    update_template: {
      entries: {
        name: {
          type: "input",
          defaultValue: "",
          text: "Template name",
          placeholder: "e.g. Assignment 1",
        },
        description: {
          type: "textarea",
          placeholder: "e.g. Assignment 1 is about ...",
          defaultValue: "",
          text: "Description (Optional)",
        },
        allow_notification: {
          type: "toggle",
          defaultValue: false,
          text: "Can students send question to You? ",
          description: "Can students send question to You?",
          tooltip:
            "Student can send comment to you by highlighting the code, useful for real-time interaction in tutorials.",
        },
        is_exam: {
          type: "toggle",
          defaultValue: false,
          text: "Is it an Exam? ",
          description: "whether this assignment is an exam",
          tooltip:
            "Whether this assignment is an exam. The environment would be restricted to simple editors without compliers.",
        },
        time_limit: {
          type: "input",
          defaultValue: "60",
          text: "Time Limit(in minutes) ",
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
          text: "Reply to",
          type: "input",
          defaultValue: targets.map((t) => t.name).join(", "),
          disabled: true,
        },
        message: {
          text: "Message",
          type: "textarea",
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
    "Sandbox"
  );
  return {
    create_sandbox: {
      displayTitle: false,
      entries: {
        environment_choice: {
          type: "listbox",
          defaultValue: envChoices[0],
          text: "Pick the Programming Language",
          description: "Pick the Programming Language",
          tooltip: "Pick the Programming Language",
          options: envChoices,
        },
        name: {
          type: "input",
          defaultValue: "",
          placeholder: `e.g. ${validName}`,
          emptyValue: validName,
          text: "Name (Optional)",
        },
        description: {
          type: "textarea",
          defaultValue: "",
          placeholder: "e.g. This sandbox is about ...",
          text: "Description (Optional)",
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
    "Sandbox",
    true
  );
  return {
    update_section: {
      displayTitle: false,
      entries: {
        update_environment: {
          type: "custom",
          text: "Update Environment",
          defaultValue: "",
          tooltip:
            "If you need to update the environment of your sandbox, click the button below. You will be prompt to a temporary environment to set up your sandbox.",
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
                    Go to temp container
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
                          "fail to start temp container for this sandbox."
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
          text: "Name (Optional)",
        },
        description: {
          type: "textarea",
          defaultValue: targetSandbox?.description,
          placeholder: "e.g. This sandbox is about ...",
          text: "Description (Optional)",
        },
      },
    },
  };
};
