import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { Container, Environment, SectionUserInfo, Template } from "../lib/cnails";
import { CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";
import { envAPI } from "../lib/api/envAPI";
import { templateAPI } from "../lib/api/templateAPI";
import { apiEnvironmentToUiEnvironment, patchEnvironments } from "../lib/environmentHelper";
import { apiTemplatesToUiTemplates, patchTemplates } from "../lib/templateHelper"
import { useCancelablePromise } from "../components/useCancelablePromise";
import { EnvironmentAddResponse, EnvironmentListResponse, TemplateListResponse } from "../lib/api/api";
import { useContainers } from "./containers";
import { useMessaging } from "./messaging";
import courseAPI from "../lib/api/courses";

type InstructorContextState = {
    environments: Environment[];
    setEnvironments: React.Dispatch<React.SetStateAction<Environment[]>>;
    /**
   * a function to fetch the new environment list.
   * It will update the context and hence update all affected UI.
   * Therefore, even if this function will return an array of environments, 
   * using the returned value is not suggested. You should use the `environments`
   * from the context instead.
   */
    fetchEnvironments: () => Promise<Environment[]>
    templates: Template[];
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
     * it is suggested no to use this fetch in your component because it is a batch fetching.
     * Instead using separate `fetchTemplates` and `fetchEnvironments`
     */
    fetch: () => Promise<void>;
    sectionUserInfo: SectionUserInfo;
    highlightedEnv: Environment;
    setHighlightedEnv: React.Dispatch<React.SetStateAction<Environment>>;
    broadcastAnnouncement: (title: string, content: string, allowReply: boolean) => Promise<void>;

    /**
     * this can create a predefined environment or build a custom environment 
     * @param id if this is a string, it is a container id. If this is a string[], 
     * it refers the libraries. 
     */
    createEnvironment: (name: string, description: string, id: string | string[]) => Promise<void>;
};


const InstructorContext = createContext({} as InstructorContextState);
/**
 * The instructor context provide all the data for an instructor in a section.
 * This context will fetch environments, templates and containers when it renders.
 */
export const useInstructor = () => useContext(InstructorContext);

export const InstructorProvider = ({
    children,
    sectionUserInfo,
}: {
    children: JSX.Element;
    sectionUserInfo: SectionUserInfo;
}) => {
    const { listEnvironments, addEnvironment, buildEnvironment } = envAPI;
    const { listTemplates } = templateAPI;
    const { sub, userId } = useCnails();
    const { containers, setContainers, fetchContainers } = useContainers();
    const { sendNotificationAnnouncement } = courseAPI
    const { fetchMessages } = useMessaging()
    const [environments, setEnvironments] = useState<Environment[]>();
    const [templates, setTemplates] = useState<Template[]>();
    const [highlightedEnv, setHighlightedEnv] = useState<Environment>();
    const { cancelablePromise } = useCancelablePromise();

    const fetchEnvironments = async (_containers: Container[] = containers) => {
        const afterResponse = (response: EnvironmentListResponse, mount: boolean = true) => {
            if (response.success) {
                const environments = patchEnvironments(apiEnvironmentToUiEnvironment(response.environments), _containers)
                if (mount) setEnvironments(environments);
                return environments
            } else {
                myToast.error({
                    title: "Fail to fetch environments.",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
            }
        }
        try {
            const response = await cancelablePromise(listEnvironments({
                sectionId: sectionUserInfo.sectionId, sub: sub
            }));
            return afterResponse(response)
        } catch (error) {
            if (error.isCanceled) {
                return afterResponse(error.value as EnvironmentListResponse, false)
            } else {
                console.error(error)
            }
        }

    }

    const fetchTemplates = async (_containers: Container[] = containers) => {
        const afterResponse = (response: TemplateListResponse, mount: boolean = true) => {
            if (response.success) {
                const templates = patchTemplates(apiTemplatesToUiTemplates(response.templates), _containers)
                if (mount) setTemplates(templates);
                return templates
            } else {
                myToast.error({
                    title: "Fail to fetch templates.",
                    description: errorToToastDescription(response.error),
                    comment: CLICK_TO_REPORT,
                });
            }
        }
        const response = await listTemplates({
            sectionid: sectionUserInfo.sectionId, sub: sub
        });
        return afterResponse(response)
    }

    const broadcastAnnouncement = async (title: string, content: string, allowReply: boolean) => {
        const response = await sendNotificationAnnouncement(
            {
                title,
                body: content,
                allowReply,
                senderId: userId,
                sectionId: sectionUserInfo.sectionId
            }
        );
        if (response.success)
            myToast.success("The course announcement is sent.");
        else
            myToast.error({
                title: "Fail to send course announcement",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            });
        await fetchMessages()
    }

    const createEnvironment = async (name: string, description: string, id: string | string[]) => {
        const toastId = myToast.loading(typeof id == "string" ? "Building a custom environment..." : "Creating the environment...");
        let response: EnvironmentAddResponse
        if (typeof id == "string") {
            // this is a custom environment 
            response = await buildEnvironment(
                {
                    name: name,
                    description: description,
                    section_user_id: sectionUserInfo.sectionUserId,
                    containerId: id,
                }
            );
        } else {
            // this is a predefined environment 
            response = await addEnvironment({
                libraries: id,
                name: name,
                description: description,
                section_user_id: sectionUserInfo.sectionUserId,
            })
        }
        if (response.success) {
            myToast.success("Environment is created successfully.")
        } else {
            myToast.error({
                title: "Fail to create environment.",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT
            })
        }
        await fetchEnvironments();
        myToast.dismiss(toastId);
    }

    const fetch = async () => {
        const containers = await fetchContainers();
        await fetchEnvironments(containers);
        await fetchTemplates(containers)
    };

    /**
     * the hook will change the status of environments and templates base on the change in containers 
     */
    useEffect(() => {
        if (environments && containers) {
            setEnvironments(environments => patchEnvironments(environments, containers))
        }
        if (templates && containers) {
            setTemplates(templates => patchTemplates(templates, containers))
        }
    }, [containers])

    useEffect(() => {
        fetch();
    }, []);


    if (!environments || !templates || !sectionUserInfo) return <></>;

    return (
        <InstructorContext.Provider
            value={{
                environments,
                setEnvironments,
                fetchEnvironments,
                templates,
                setTemplates,
                fetchTemplates,
                fetch,
                sectionUserInfo,
                highlightedEnv,
                setHighlightedEnv,
                broadcastAnnouncement,
                createEnvironment,
            }}
        >
            {children}
        </InstructorContext.Provider>
    );
};