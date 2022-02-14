import { Section } from "../components/ModalForm";
import { Environment, Template } from "./cnails";

import { Option } from "../components/ListBox"

const registry = "143.89.223.188:5000";
const rootImage = "143.89.223.188:5000/codeserver:latest";
const CPU = 0.5;
const memory = 400;
const envChoices = [
    { value: "C++/C", id: `${registry}/codeserver:latest` },
    { value: "Python3", id: `${registry}/codeserver:latest` },
    { value: "Java", id: `${registry}/codeserver:latest` },
];

export const getValidEnvName = (environments: Environment[]): string => {
    for (let i = environments.length + 1; ; i++) {
        if (environments.every((env) => env.environmentName != `Environment ${i}`))
            return `Environment ${i}`;
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

export const getCreateEnvironmentFormStructure = (environments: Environment[]): { [title: string]: Section } => {
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
                    placeholder: `e.g. ${getValidEnvName(environments)}`,
                },
                environment_description: {
                    type: "textarea",
                    defaultValue: "",
                    text: "Environment Description",
                },
            },
        },
    }
}

export const getUpdateEnvironmentFormStructure = (targetEnvironment: Environment, environments: Environment[]): { [title: string]: Section } => {
    return {
        update_environment: {
            displayTitle: false,
            entries: {
                environment_name: {
                    type: "input",
                    defaultValue: "",
                    text: "Environment name",
                    placeholder: `e.g. ${getValidEnvName(environments)}`,
                },
                environment_description: {
                    type: "textarea",
                    defaultValue: "",
                    text: "Environment Description",
                },
            },
        },
    }
}

export const getTemplateCreateFormStructure = (templates: Template[], environments: Environment[]): { [title: string]: Section } => {
    const envOptions = getEnvOptions(environments)
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
    }
}

export const getTemplateUpdateFormStructure = (TargetTemplate: Template, templates: Template[], environments: Environment[]): { [title: string]: Section } => {
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
    }
}

