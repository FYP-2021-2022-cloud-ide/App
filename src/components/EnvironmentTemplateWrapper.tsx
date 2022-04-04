import { useRouter } from "next/router";
import { useState } from "react";
import { useCnails } from "../contexts/cnails";
import { useInstructor } from "../contexts/instructor";
import { containerAPI } from "../lib/api/containerAPI";
import { envAPI } from "../lib/api/envAPI";
import { templateAPI } from "../lib/api/templateAPI";
import { Environment, Template } from "../lib/cnails";
import { CLICK_TO_DISMISS, CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import { memory, CPU, rootImage } from "../lib/formHelper";
import CreateEnvironmentForm from "./forms/CreateEnvironmentForm"
import UpdateEnvironmentForm from "./forms/UpdateEnvironmentForm"
import CreateTemplateForm from "./forms/CreateTemplateForm"
import UpdateTemplateForm from "./forms/UpdateTemplateForm"
import myToast from "./CustomToast";
import EnvironmentList from "./EnvironmentList";
import TemplateList from "./TemplateList";
import { useForceUpdate } from "./useForceUpdate";
import TempContainerToast from "./TempContainerToast";
import { useWarning } from "../contexts/warning";


const EnvironmentTemplateWrapper = () => {
    const router = useRouter();
    const { sub, fetchContainers, setContainers } = useCnails();
    const { environments, templates, fetch, sectionUserInfo, setHighlightedEnv, fetchEnvironments, fetchTemplates } =
        useInstructor();
    const { waitForConfirm } = useWarning();
    const { sectionUserId, sectionId } = sectionUserInfo;
    const [envCreateOpen, setEnvCreateOpen] = useState(false);
    const [envUpdateOpen, setEnvUpdateOpen] = useState(false);
    const [templateCreateOpen, setTemplateCreateOpen] = useState(false);
    const [templateUpdateOpen, setTemplateUpdateOpen] = useState(false);
    const [envUpdateTarget, setEnvUpdateTarget] = useState<Environment>(null);
    const [templateUpdateTarget, setTemplateUpdateTarget] =
        useState<Template>(null);
    const forceUpdate = useForceUpdate();

    const {
        removeTemplate,
        activateTemplate,
        deactivateTemplate,
        addTemplateContainer,
        removeTemplateContainer,
        updateTemplate
    } = templateAPI;
    const {
        removeEnvironment,
        updateEnvironment
    } = envAPI;
    const { addTempContainer } = containerAPI

    const addCreatingWorkspace = (source: Environment | Template, event: "ENV_CREATE" | "ENV_UPDATE" | "TEMPLATE_CREATE" | "TEMPLATE_UPDATE" | "TEMPLATE_START_WORKSPACE") => {
        setContainers(containers => {
            return [
                ...containers,
                {
                    title: source.name,
                    status: "CREATING",
                    subTitle: "",
                    startAt: "",
                    containerID: "",
                    type: event == "ENV_CREATE" || event == "ENV_UPDATE" ? "ENV" : "TEMPLATE",
                    isTemporary: event != "TEMPLATE_START_WORKSPACE",
                    redisPatch: {
                        tempId: "",
                        cause: event,
                        containerId: "",
                        sourceId: source.id,
                        title: source.name,
                    }
                }
            ]
        })
    }

    // if environments or templates has not fetch, don't need to go down
    if (!environments || !templates) return <></>;

    return (
        <>
            <div className="flex flex-row space-x-10 w-full">
                <EnvironmentList
                    environments={environments}
                    onEnvCreateBtnClick={() => {
                        setEnvCreateOpen(true);
                    }}
                    onEnvClick={() => {
                        // router.push(`${router.asPath}/${env.id}`);
                        // console.log(router.asPath);
                    }}
                    menuItems={
                        [
                            {
                                text: "Delete",
                                onClick: async (env) => {
                                    const numTemplates = templates.filter(
                                        (t) => t.environment_id === env.id
                                    ).length;
                                    if (numTemplates != 0) {
                                        myToast.error({
                                            title: "Fail to remove environment",
                                            description: `${numTemplates} template${numTemplates > 1 ? "s are" : " is"
                                                } still using ${env.name}.`,
                                            comment: CLICK_TO_DISMISS,
                                        });
                                    } else {
                                        if (await waitForConfirm("Are you sure you want to remove this environment? This action cannot be undo.") == false) return;
                                        const response = await removeEnvironment({
                                            envId: env.id,
                                            section_user_id: sectionUserId,
                                        });
                                        if (response.success) {
                                            myToast.success(
                                                `environment ${env.id} is successfully removed`
                                            );
                                        }
                                    }
                                    // fetch();
                                    await fetchEnvironments();
                                }
                            },
                            {
                                text: "Update Info",
                                onClick: (env) => {
                                    setEnvUpdateOpen(true);
                                    setEnvUpdateTarget(env);
                                }
                            }, {
                                text: "Highlight Templates",
                                onClick: (env) => {
                                    if (templates.some((t) => t.environment_id === env.id)) {
                                        setHighlightedEnv(env);
                                        forceUpdate();
                                    } else myToast.warning(`No template is using ${env.name}.`);
                                }
                            }, {
                                text: "Update Internal",
                                onClick: async (env) => {
                                    const id = myToast.loading("Creating a temporary workspace...")
                                    addCreatingWorkspace(env, "ENV_UPDATE")
                                    const response = await addTempContainer(
                                        {
                                            memLimit: memory,
                                            numCPU: CPU,
                                            imageId: env.imageId,
                                            sub: sub,
                                            accessRight: "root",
                                            event: "ENV_UPDATE",
                                            title: env.name,
                                            sourceId: env.id,
                                            formData: {
                                                name: env.name,
                                                description: env.description,
                                                containerId: "",
                                                section_user_id: sectionUserId,
                                                envId: env.id,
                                            }
                                        }
                                    );
                                    myToast.dismiss(id)
                                    // container is created 
                                    await fetchContainers()
                                    if (response.success) {
                                        const containerId = response.containerID
                                        const id = myToast.custom(
                                            <TempContainerToast
                                                containerId={containerId}
                                                getToastId={() => id}
                                                onCancel={async () => {
                                                    return await waitForConfirm("Are you sure that you want to cancel the commit? All your changes in the workspace will not be saved and the environment will not be updated.")
                                                }}
                                                onOK={async () => {
                                                    const response = await updateEnvironment(
                                                        {
                                                            envId: env.id,
                                                            name: env.name,
                                                            description: env.description,
                                                            section_user_id: sectionUserId,
                                                            containerId: containerId
                                                        }
                                                    )
                                                    if (response.success)
                                                        myToast.success("Environment is successfully updated.");
                                                    else
                                                        myToast.error({
                                                            title: "Fail to update environment",
                                                            description: errorToToastDescription(response.error),
                                                            comment: CLICK_TO_REPORT,
                                                        });
                                                    await fetchContainers()
                                                    await fetchEnvironments()
                                                    myToast.dismiss(id);
                                                }}
                                            ></TempContainerToast>,
                                            "toaster toaster-custom toaster-no-dismiss",
                                            "🗂"
                                        )
                                    } else {
                                        myToast.error({
                                            title: "Fail to create temporary workspace",
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT
                                        })
                                    }
                                }
                            }
                        ]
                    }
                ></EnvironmentList>
                <TemplateList
                    templates={templates}
                    onClick={(template) => {
                        // go to details
                        router.push(`${router.asPath}/${template.id}`);
                    }}
                    onCreate={() => {
                        if (environments.length == 0)
                            myToast.warning(
                                "You need to have at least one environment before creating a template."
                            );
                        else {
                            setTemplateCreateOpen(true);
                        }
                    }}
                    menuItems={[
                        {
                            text: "Delete",
                            onClick: async (template) => {
                                if (await waitForConfirm("Are you sure you want to delete this template? This action cannot be undo.") == false) return;
                                const response = await removeTemplate({
                                    templateId: template.id,
                                    section_user_id: sectionUserId
                                });
                                if (response.success) {
                                    myToast.success("Template is successfully deleted.");
                                }
                                await fetch();
                            }
                        },
                        {
                            text: "Update info",
                            onClick: (template) => {
                                setTemplateUpdateTarget(template);
                                setTemplateUpdateOpen(true);
                            }
                        }, {
                            text: (template) => template.containerID ? "Stop workspace" : "Start workspace",
                            onClick: async (template) => {
                                if (template.containerID) {
                                    const response = await removeTemplateContainer({
                                        containerId: template.containerID,
                                        sub: sub
                                    });
                                    if (response.success) {
                                        myToast.success("Template workspace is successfully stopped. ");
                                    } else
                                        myToast.error({
                                            title: `Fail to stop template workspace`,
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT,
                                        });
                                } else {
                                    const id = myToast.loading("Starting workspace...");
                                    const response = await addTemplateContainer(
                                        {
                                            imageName: template.imageId,
                                            memLimit: memory,
                                            numCPU: CPU,
                                            section_user_id: sectionUserId,
                                            template_id: template.id,
                                            accessRight: "student",
                                            useFresh: false,
                                            title: template.name,
                                            sub: sub,
                                            event: "TEMPLATE_START_WORKSPACE"
                                        }
                                    );
                                    myToast.dismiss(id);
                                    if (response.success) {
                                        myToast.success("Template workspace is successfully started.");
                                    } else
                                        myToast.error({
                                            title: `Fail to start template workspace`,
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT,
                                        });
                                }
                                await fetchContainers();
                            }
                        }, {
                            text: (template) => template.active ? "Unpublish" : "Publish",
                            onClick: async (template) => {
                                if (!template.active) {
                                    const id = myToast.loading(`Publishing the ${template.name}...`);
                                    const response = await activateTemplate(
                                        {
                                            templateId: template.id,
                                            section_user_id: sectionUserId
                                        }
                                    );
                                    myToast.dismiss(id);
                                    if (response.success) {
                                        myToast.success(`${template.name} is published.`);
                                    } else {
                                        myToast.error({
                                            title: `Fail to publish template`,
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT,
                                        });
                                    }
                                } else {
                                    const id = myToast.loading(
                                        `Unpublishing the ${template.name}...`
                                    );
                                    const response = await deactivateTemplate(
                                        {
                                            templateId: template.id,
                                            section_user_id: sectionUserId
                                        }
                                    );
                                    myToast.dismiss(id);
                                    if (response.success) {
                                        myToast.success(`${template.name} is unpublished.`);
                                    } else
                                        myToast.error({
                                            title: `Fail to unpublish template`,
                                            description: errorToToastDescription(response.error),
                                            comment: CLICK_TO_REPORT,
                                        });
                                }
                                fetch();
                            }
                        },
                        {
                            text: "Update Internal",
                            onClick: async (template) => {
                                const id = myToast.loading("Creating a temporary workspace...")
                                addCreatingWorkspace(template, "TEMPLATE_UPDATE")
                                const response = await addTempContainer(
                                    {
                                        memLimit: memory,
                                        numCPU: CPU,
                                        imageId: template.imageId,
                                        sub: sub,
                                        accessRight: "root",
                                        title: template.name,
                                        sourceId: template.id,
                                        event: "TEMPLATE_UPDATE",
                                        formData: {
                                            templateId: template.id,
                                            templateName: template.name,
                                            description: template.description,
                                            section_user_id: sectionUserId,
                                            containerId: "",
                                            isExam: template.isExam,
                                            timeLimit: template.timeLimit,
                                            allow_notification: template.allow_notification
                                        }
                                    }
                                )
                                myToast.dismiss(id)
                                await fetchContainers()
                                if (response.success) {
                                    const containerId = response.containerID
                                    const id = myToast.custom(
                                        <TempContainerToast
                                            containerId={containerId}
                                            getToastId={() => id}
                                            onCancel={async () => {
                                                return await waitForConfirm("Are you sure you want to cancel the commit? All your changes in the workspace will not be saved and the template will not be updated.")
                                            }}
                                            onOK={async () => {
                                                const response = await updateTemplate({
                                                    templateId: template.id,
                                                    templateName: template.name,
                                                    description: template.description,
                                                    section_user_id: sectionUserId,
                                                    containerId: containerId,
                                                    isExam: template.isExam,
                                                    timeLimit: template.timeLimit,
                                                    allow_notification: template.allow_notification
                                                })
                                                if (response.success)
                                                    myToast.success("Template is successfully updated.");
                                                else
                                                    myToast.error({
                                                        title: "Fail to update template",
                                                        description: errorToToastDescription(response.error),
                                                        comment: CLICK_TO_REPORT,
                                                    });
                                                await fetchContainers()
                                                await fetchTemplates();
                                                myToast.dismiss(id);
                                            }}
                                        ></TempContainerToast>,
                                        "toaster toaster-custom toaster-no-dismiss",
                                        "🗂"
                                    )
                                } else {
                                    myToast.error({
                                        title: "Fail to create temporary workspace",
                                        description: errorToToastDescription(response.error),
                                        comment: CLICK_TO_REPORT
                                    })
                                }
                            }
                        }
                    ]}
                    onWorkspaceCardClick={(template) => {
                        if (template.containerID) {
                            window.open(
                                "https://codespace.ust.dev/user/container/" +
                                template.containerID +
                                "/"
                            );
                        }
                    }}
                    environments={environments}
                    sectionUserID={sectionUserId}
                ></TemplateList>
            </div>
            {/* environment create form  */}
            <CreateEnvironmentForm isOpen={envCreateOpen} setOpen={setEnvCreateOpen} />
            {/* environment update form  */}
            <UpdateEnvironmentForm isOpen={envUpdateOpen && environments.length != 0} setOpen={setEnvUpdateOpen} target={envUpdateTarget} />
            {/* template create form   */}
            <CreateTemplateForm isOpen={templateCreateOpen && environments.length != 0} setOpen={setTemplateCreateOpen} />
            {/* template update form  */}
            <UpdateTemplateForm isOpen={templateUpdateOpen && environments.length != 0 && templates.length != 0} setOpen={setTemplateUpdateOpen} target={templateUpdateTarget} />
        </>
    );
};

export default EnvironmentTemplateWrapper