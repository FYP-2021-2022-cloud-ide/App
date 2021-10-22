import React, { useContext } from "react";

interface CnailsContextState {
    containerList: (sub: string) => Promise<any>,
    courseList: (sub:string) => Promise<any>,
    getSectionInfo:(sectionid:string, sub:string) => Promise<any>,

    environmentList: (sectionid:string, sub:string) => Promise<any>,
    templateList: (sectionid:string, sub:string) => Promise<any>,
    
    addContainer: (imageName :string,memLimit :Number,numCPU:Number,section_user_id :string,template_id :string,dbStored:boolean) => Promise<any>,
    removeContainer: (containerId:string) => Promise<any>,
    
    addTemplate: (templateName :string, description:string,section_user_id:string,assignment_config_id :string,containerId :string,active:boolean) => Promise<any>,
    activateTemplate:(templateId:string) => Promise<any>,
    deactivateTemplate:(templateId:string) => Promise<any>,
    removeTemplate: (templateId:string) => Promise<any>,
    
    addEnvironment: (libraries :string[],name :string, description:string,section_user_id:string)=> Promise<any>,
    buildEnvironment: (name :string,description:string, section_user_id:string,containerId:string)=> Promise<any>,
    removeEnvironment: (envId :string)=>  Promise<any>,
}

interface CnailsProviderProps {
  children: JSX.Element
}

const CnailsContext = React.createContext({} as CnailsContextState);
export const useCnails = () => useContext(CnailsContext);


// need to do it on server side --> cannot resolve the fs
export const CnailsProvider = (props: CnailsProviderProps) => {
    const containerList = async (sub: string) => {
        var res =  await fetch('/api/listContainers',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sub": sub,
            }),
        })
        return res.json()
    }

    const courseList = async (sub:string) => {
        var res =  await fetch('/api/listCourses',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sub": sub,
            }),
        })
        return res.json()
    }

    const getSectionInfo = async (sectionid:string, sub:string) =>{
        var res =  await fetch('/api/coursePage/getSectionInfo',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sectionid": sectionid,
                "sub": sub
            }),
        })
        return res.json()
    }

    const environmentList = async (sectionid:string, sub:string)=>{
        var res =  await fetch('/api/coursePage/listEnvironments',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sectionid": sectionid,
                "sub": sub
            }),
        })
        return res.json()
    }
    const templateList = async (sectionid:string,sub:string)=>{
        var res =  await fetch('/api/coursePage/listTemplates',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sectionid": sectionid,
                "sub":sub,
            }),
        })
        return res.json()
    }
    const addContainer = async (
        imageName :string,
        memLimit :Number,
        numCPU:Number,
        section_user_id :string,
        template_id :string,
        dbStored:boolean)=>{
        var res =  await fetch('/api/addContainer',{
            method: 'POST', 
            body:JSON.stringify({ 
                "imageName":imageName,
                "memLimit" : memLimit ,
                "numCPU":numCPU,
                "section_user_id" :section_user_id ,
                "template_id" :template_id,
                "dbStored":dbStored,
            }),
        })
        return res.json()
    }
    const removeContainer = async (containerId :string)=>{
        var res =  await fetch('/api/removeContainer',{
            method: 'POST', 
            body:JSON.stringify({ 
                "containerId":containerId,
            }),
        })
        return res.json()
    }
    const addTemplate = async (
        templateName :string,
        description:string,
        section_user_id:string,
        assignment_config_id :string,
        containerId :string,
        active:boolean
        )=>{
        var res =  await fetch('/api/coursePage/addTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateName":templateName,
                "description":description,
                "section_user_id":section_user_id,
                "assignment_config_id" :assignment_config_id ,
                "containerId" :containerId,
                "active":active,
            }),
        })
        return res.json()
    }

    const activateTemplate = async (templateId :string)=>{
        var res =  await fetch('/api/coursePage/activateTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
            }),
        })
        return res.json()
    }
    const deactivateTemplate = async (templateId :string)=>{
        var res =  await fetch('/api/coursePage/deactivateTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
            }),
        })
        return res.json()
    }

    const removeTemplate = async (templateId :string)=>{
        var res =  await fetch('/api/coursePage/removeTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
            }),
        })
        return res.json()
    }

    const addEnvironment = async (
        libraries :string[],
        name :string,
        description:string,
        section_user_id:string)=>{
        var res =  await fetch('/api/coursePage/addEnvironment',{
            method: 'POST', 
            body:JSON.stringify({ 
                "libraries":libraries,
                "name" : name ,
                "section_user_id":section_user_id,
                "description":description,
            }),
        })
        return res.json()
    }
    const buildEnvironment = async (
        name :string,
        description:string,
        section_user_id:string,
        containerId :string)=>{
        var res =  await fetch('/api/coursePage/buildEnvironment',{
            method: 'POST', 
            body:JSON.stringify({ 
                "name" : name ,
                "section_user_id":section_user_id,
                "containerId":containerId,
                "description":description,
            }),
        })
        return res.json()
    }
    const removeEnvironment = async (envId :string)=>{
        var res =  await fetch('/api/coursePage/removeEnvironment',{
            method: 'POST', 
            body:JSON.stringify({ 
                "envId":envId,
            }),
        })
        return res.json()
    }

    return (
        <CnailsContext.Provider
            value={{
                containerList,
                courseList,

                getSectionInfo,

                environmentList,
                templateList,

                addContainer,
                removeContainer,

                addTemplate,
                activateTemplate,
                deactivateTemplate,
                removeTemplate,

                addEnvironment,
                buildEnvironment,
                removeEnvironment,
            }}
        >
        { props.children }
        </CnailsContext.Provider>
    )  
}
