import { Option } from "../ListBox";
import { useCnails } from "../../contexts/cnails";
import { useInstructor } from "../../contexts/instructor";
import ModalForm from "../ModalForm/ModalForm";
import myToast from "../CustomToast";
import { CPU, getEnvOptions, getValidName, memory } from "../../lib/formHelper";
import { containerAPI } from "../../lib/api/containerAPI";
import TempContainerToast from "../TempContainerToast";
import { templateAPI } from "../../lib/api/templateAPI";
import { FormStructure } from "../ModalForm/types";
import { AddTemplateRequest, TemplateAddResponse } from "../../lib/api/api";
import { Template } from "../../lib/cnails";
import { errorToToastDescription } from "../../lib/errorHelper";
import { CLICK_TO_REPORT } from "../../lib/constants";
import { useWarning } from "../../contexts/warning";
import { useContainers } from "../../contexts/containers";

export type CreateTemplateFormData = {
  create_template: {
    environment: Option;
    name: string;
    description: string;
    allow_notification: boolean;
    is_exam: boolean;
    time_limit: string;
  };
};

export type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTemplateForm = ({ isOpen, setOpen }: Props) => {
  const { sub } = useCnails();
  const { setContainers, createContainer } = useContainers();
  const { environments, templates, sectionUserInfo, createTemplate } =
    useInstructor();
  const { waitForConfirm } = useWarning();
  const envOptions = getEnvOptions(environments);
  const validName = getValidName(
    templates.map((t) => t.name),
    "Assignment Template"
  );
  // const addCreatingWorkspace = (req: AddTemplateRequest) => {
  //     setContainers(containers => {
  //         return [
  //             ...containers,
  //             {
  //                 title: req.templateName,
  //                 status: "CREATING",
  //                 subTitle: "",
  //                 startAt: "",
  //                 containerId: "",
  //                 type: "SANDBOX",
  //                 isTemporary: true,
  //                 redisPatch: {
  //                     tempId: "",
  //                     cause: "TEMPLATE_CREATE",
  //                     containerId: "",
  //                     sourceId: "",
  //                     title: req.templateName,
  //                 }
  //             }
  //         ]
  //     })
  // }

  return (
    <ModalForm
      clickOutsideToClose
      escToClose
      isOpen={isOpen}
      setOpen={setOpen}
      formStructure={
        {
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
                  if (
                    templates
                      .map((t) => t.name)
                      .includes(data.create_template.name)
                  )
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
                label: "Time Limit (in minutes) ",
                description: "Time Limit of the exam",
                conditional: (data) => {
                  return data.create_template.is_exam;
                },
                validate: (data) => {
                  return Number(data.create_template.time_limit) > 0
                    ? { ok: true }
                    : { ok: false, message: "Time limit must be positive." };
                },
              },
            },
          },
        } as FormStructure<CreateTemplateFormData>
      }
      title="Create Template"
      onEnter={async ({ create_template: data }) => {
        const {
          name,
          description,
          environment,
          allow_notification,
          is_exam,
          time_limit,
        } = data;
        await createContainer(
          {
            memLimit: memory,
            numCPU: CPU,
            imageId: data.environment.imageId,
            sub: sub,
            accessRight: "root",
            event: "TEMPLATE_CREATE",
            title: data.name,
            sourceId: "",
            formData: {
              templateName: data.name,
              description: data.description,
              section_user_id: sectionUserInfo.sectionUserId,
              environment_id: data.environment.id,
              assignment_config_id: "",
              containerId: "",
              active: false,
              isExam: data.is_exam,
              timeLimit: Number(data.time_limit),
              allow_notification: data.allow_notification,
            },
          },
          (containerId) => {
            const id = myToast.custom(
              <TempContainerToast
                getToastId={() => id}
                containerId={containerId}
                onCancel={async () => {
                  return await waitForConfirm(
                    "Are you sure you want to cancel the commmit? All you changes in the workspace will not be saved and no template will be created."
                  );
                }}
                onOK={async () => {
                  createTemplate(
                    name,
                    description,
                    environment.id,
                    containerId,
                    false,
                    is_exam,
                    Number(time_limit),
                    allow_notification
                  );
                }}
              />,
              {
                className: "toaster toaster-custom toaster-no-dismiss",
                icon: "🗂",
              }
            );
          }
        );
      }}
    ></ModalForm>
  );
};

export default CreateTemplateForm;
