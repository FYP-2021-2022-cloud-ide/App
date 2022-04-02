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
import ModalForm from "./ModalForm/ModalForm";
import TempContainerToast from "./TempContainerToast";
import TemplateList from "./TemplateList";
import { useForceUpdate } from "./useForceUpdate";


const EnvironmentTemplateWrapper = () => {
    const router = useRouter();
    const { sub } = useCnails();
    const { environments, templates, fetch, sectionUserInfo, setHighlightedEnv } =
        useInstructor();
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
        removeTemplateContainer
    } = templateAPI;
    const {
        removeEnvironment,
    } = envAPI;
    const { addTempContainer } = containerAPI

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
                    onEnvDelete={async (env) => {
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
                        fetch();
                    }}
                    onEnvUpdate={(env) => {
                        setEnvUpdateOpen(true);
                        setEnvUpdateTarget(env);
                    }}
                    onEnvHighlight={(env) => {
                        if (templates.some((t) => t.environment_id === env.id)) {
                            setHighlightedEnv(env);
                            forceUpdate();
                        } else myToast.warning(`No template is using ${env.name}.`);
                    }}
                    onEnvUpdateInternal={async (env) => {
                        const response = await addTempContainer(
                            {
                                memLimit: memory,
                                numCPU: CPU,
                                imageId: env.imageId,
                                sub: sub,
                                accessRight: "root",
                                event: "ENV_CREATE",
                                title: env.name,
                                formData: {
                                    name: env.name,
                                    description: env.description,
                                    containerId: "",
                                    section_user_id: sectionUserId
                                }
                            }
                        );
                    }}
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
                    onDelete={async (template) => {
                        const response = await removeTemplate({
                            templateId: template.id,
                            section_user_id: sectionUserId
                        });
                        if (response.success) {
                            myToast.success("Template is successfully deleted.");
                        }
                        fetch();
                    }}
                    onUpdate={(template) => {
                        setTemplateUpdateTarget(template);
                        setTemplateUpdateOpen(true);
                    }}
                    onWorkspaceCardClick={(template) => {
                        if (template.containerID) {
                            window.open(
                                "https://codespace.ust.dev/user/container/" +
                                template.containerID +
                                "/"
                            );
                        }
                    }}
                    onToggle={async (template) => {
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
                        fetch();
                    }}
                    onToggleActivation={async (template) => {
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