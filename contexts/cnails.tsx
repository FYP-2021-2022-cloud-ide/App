import React, { useContext } from "react";

interface CnailsContextState {
    containerList: (sub: string) => Promise<any>,
    courseList: (sub:string) => Promise<any>,
    environmentList: (sectionid:string) => Promise<any>,
    templateList: (sectionid:string) => Promise<any>,
    addContainer: (imageName :string,memLimit :Number,numCPU:Number,section_user_id :string,template_id :string) => Promise<any>,
    removeContainer: (containerId:string) => Promise<any>,
}

interface CnailsProviderProps {
  children: JSX.Element
}

const CnailsContext = React.createContext({} as CnailsContextState);
export const useCnails = () => useContext(CnailsContext);


// need to do it on server side --> cannot resolve the fs
export const CnailsProvider = (props: CnailsProviderProps) => {
    // var sessionList:Course[] = []
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

    const environmentList = async (sectionid:string)=>{
        var res =  await fetch('/api/listEnvironments',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sectionid": sectionid,
            }),
        })
        return res.json()
    }
    const templateList = async (sectionid:string)=>{
        var res =  await fetch('/api/listTemplates',{
            method: 'POST', 
            body:JSON.stringify({ 
                "sectionid": sectionid,
            }),
        })
        return res.json()
    }
    const addContainer = async (
        imageName :string,
        memLimit :Number,
        numCPU:Number,
        section_user_id :string,
        template_id :string)=>{
        var res =  await fetch('/api/addContainer',{
            method: 'POST', 
            body:JSON.stringify({ 
                "imageName":imageName,
                "memLimit" : memLimit ,
                "numCPU":numCPU,
                "section_user_id" :section_user_id ,
                "template_id" :template_id,
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
    return (
        <CnailsContext.Provider
            value={{
                containerList,
                courseList,
                environmentList,
                templateList,
                addContainer,
                removeContainer,
            }}
        >
        { props.children }
        </CnailsContext.Provider>
    )  
}
