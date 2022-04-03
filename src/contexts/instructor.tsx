import React, { createContext, useContext, useEffect, useState } from "react";
import myToast from "../components/CustomToast";
import { Environment, SectionUserInfo, Template } from "../lib/cnails";
import { CLICK_TO_REPORT } from "../lib/constants";
import { errorToToastDescription } from "../lib/errorHelper";
import { useCnails } from "./cnails";
import { envAPI } from "../lib/api/envAPI";
import { templateAPI } from "../lib/api/templateAPI";

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
     */
    fetch: () => Promise<void>;
    sectionUserInfo: SectionUserInfo;
    highlightedEnv: Environment;
    setHighlightedEnv: React.Dispatch<React.SetStateAction<Environment>>;
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
    const { listEnvironments } = envAPI;
    const { listTemplates } = templateAPI;
    const { sub, fetchContainers } = useCnails();
    const [environments, setEnvironments] = useState<Environment[]>(null);
    const [templates, setTemplates] = useState<Template[]>(null);
    const [highlightedEnv, setHighlightedEnv] = useState<Environment>(null);

    const fetchEnvironments = async () => {
        const response = await listEnvironments({
            sectionId: sectionUserInfo.sectionId, sub: sub
        });
        if (response.success) {
            const environments = response.environments.map((e) => ({
                ...e,
                name: e.environmentName,
            }))
            setEnvironments(environments);
            return environments
        } else {
            myToast.error({
                title: "Fail to fetch environments.",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            });
        }
    }

    const fetchTemplates = async () => {
        const response = await listTemplates({
            sectionid: sectionUserInfo.sectionId, sub: sub
        });
        if (response.success) {
            const templates = response.templates.map((t) => ({
                id: t.id,
                name: t.name,
                description: t.description,
                imageId: t.imageId,
                assignment_config_id: t.assignment_config_id,
                storage: t.storage,
                containerID: t.containerID,
                environment_id: t.environment_id,
                active: t.active,
                isExam: t.isExam,
                timeLimit: t.timeLimit,
                allow_notification: t.allow_notification,
            }))
            setTemplates(templates);
            return templates
        } else {
            myToast.error({
                title: "Fail to fetch templates.",
                description: errorToToastDescription(response.error),
                comment: CLICK_TO_REPORT,
            });
        }
    }

    const fetch = async () => {
        await fetchEnvironments();
        await fetchTemplates()
        await fetchContainers();
    };

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
            }}
        >
            {children}
        </InstructorContext.Provider>
    );
};