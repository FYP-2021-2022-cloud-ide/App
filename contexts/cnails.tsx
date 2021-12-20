import React, { useContext, useState, useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
import { notificationStack} from "../lib/notificationStack";

import toast, { Toaster } from "react-hot-toast";
import { Notification,NotificationBody } from "../components/Notification";

import courseListData from "../data/testing/courseList"
import containerListData from "../data/testing/containerList"

interface CnailsContextState {
    containerList: (sub: string) => Promise<any>,
    courseList: (sub:string) => Promise<any>,
    getSectionInfo:(sectionid:string, sub:string) => Promise<any>,

    environmentList: (sectionid:string, sub:string ) => Promise<any>,
    templateList: (sectionid:string, sub:string ) => Promise<any>,
    
    addContainer: (imageName :string,memLimit :Number,numCPU:Number,section_user_id :string,template_id :string,dbStored:boolean,accessRight:string) => Promise<any>,
    removeContainer: (containerId:string, sub:string) => Promise<any>,
    submitFiles:(containerId:string, section_user_id:string ) => Promise<any>,

    addTemplate: (templateName :string, description:string,section_user_id:string,assignment_config_id :string,containerId :string,active:boolean,isExam:boolean,timeLimit:Number) => Promise<any>,
    updateTemplate:(templateId:string,templateName :string, description:string,section_user_id:string,containerId :string,isExam:boolean,timeLimit:Number) => Promise<any>,
    activateTemplate:(templateId:string, section_user_id:string ) => Promise<any>,
    deactivateTemplate:(templateId:string, section_user_id:string ) => Promise<any>,
    removeTemplate: (templateId:string, section_user_id:string ) => Promise<any>,
    
    addEnvironment: (libraries :string[],name :string, description:string,section_user_id:string)=> Promise<any>,
    updateEnvironment:(envId:string,name :string,description:string, section_user_id:string,containerId:string)=> Promise<any>,
    buildEnvironment: (name :string,description:string, section_user_id:string,containerId:string)=> Promise<any>,
    removeEnvironment: (envId :string, section_user_id:string )=>  Promise<any>,

    sub: string,
    name: string,
    email: string,
    userId: string,
    semesterId: string
}

interface CnailsProviderProps {
    children: JSX.Element
}

const CnailsContext = React.createContext({} as CnailsContextState);
export const useCnails = () => useContext(CnailsContext);


// need to do it on server side --> cannot resolve the fs
export const CnailsProvider = ({children}: CnailsProviderProps) => {
    console.log('init of cnails providers')
    const[sub, setSub] =  useState('')
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[userId, setUserId] = useState('')
    const[semesterId, setSemesterId] = useState('')
    useEffect(() => {
        init()
        // setupNotification();

        async function init(){
            const cookies = await fetch(`/api/fetchCookies`,{
                method: 'GET'
            })
            const cookiesContent = await cookies.json()
            console.log(cookiesContent)
            const { sub, name, email, userId, semesterId } = cookiesContent
            setSub(sub)
            setName(name)
            setEmail(email)
            setUserId(userId)
            setSemesterId(semesterId)
            try {
                const token = await firebaseCloudMessaging.init();
                console.log('after token')
                console.log(token)
                if(token) {
                  const messaging = getMessaging();
                  // TODO: call API to fetch lastest notification 
                  console.log('calling noti API')
                  const notiRes = await fetch(`/api/notification/getNotification`,{
                    method: 'POST',
                    body:JSON.stringify({
                        sub:sub
                    })
                  });
                  const noti = await notiRes.json()
                  const notification = noti.notification
                  console.log('testing 1')
                  console.log(token, notification)
                  // if the fetch token is not the same as DB
                  if(token != notification){
                    console.log("updating")
                    // update the DB one
                    const response = await fetch(`/api/notification/update`,{
                      method: 'POST',
                      body: JSON.stringify({
                        registrationToken: token,
                        userId,
                        semesterId
                      })
                    });
                    console.log(await response.json())
                    console.log("updated")
                  }
                //   toast.custom((t)=>(
                //     <Notification trigger={t}>
                //         <NotificationBody title={"testing"} body={"testing"} success={false} id = {t.id}></NotificationBody>
                //     </Notification>
                //   ))
                  onMessage(messaging, message => {
                    console.log("message recevied")
                    console.log(message.data!.title)
                    console.log(message.data!.body)
                    const {title, body} = message.data!
                    toast.custom((t) =>(
                      <Notification trigger={t}>
                        <NotificationBody title={title} body={body} success={true} id = {t.id}></NotificationBody>
                      </Notification>
                    ))
                  });
                }
              } catch (error) {
                console.log(error);
              }
        }

        // async function setupNotification() {
          
        // }
    }, [])

    const containerList = async (sub: string) => {
        var res =  await fetch('/api/container/listContainers?sub='+sub,{
            method: 'GET'
        })
        return res.json()
    }

    const courseList = async (sub:string) => {
        var res =  await fetch('/api/listCourses?sub='+sub,{
            method: 'GET', 
        })
        return res.json()
    }

    const getSectionInfo = async (sectionid:string, sub:string) =>{
        var res =  await fetch('/api/getSectionInfo?sectionid='+sectionid+'&sub='+sub,{
            method: 'GET'
        })
        return res.json()
    }

    const environmentList = async (sectionid:string, sub:string)=>{
        var res =  await fetch('/api/environment/listEnvironments?sectionid='+sectionid+'&sub='+sub,{
            method: 'GET', 
        })
        return res.json()
    }
    const templateList = async (sectionid:string,sub:string)=>{
        var res =  await fetch('/api/template/listTemplates?sectionid='+sectionid+'&sub='+sub,{
            method: 'GET', 
        })
        return res.json()
    }
    const addContainer = async (
        imageName :string,
        memLimit :Number,
        numCPU:Number,
        section_user_id :string,
        template_id :string,
        dbStored:boolean,
        accessRight:string)=>{
        var res =  await fetch('/api/container/addContainer',{
            method: 'POST', 
            body:JSON.stringify({ 
                "imageName":imageName,
                "memLimit" : memLimit ,
                "numCPU":numCPU,
                "section_user_id" :section_user_id ,
                "template_id" :template_id,
                "dbStored":dbStored,
                "accessRight":accessRight,
            }),
        })
        return res.json()
    }
    const removeContainer = async (containerId :string, sub:string)=>{
        var res =  await fetch('/api/container/removeContainer',{
            method: 'POST', 
            body:JSON.stringify({ 
                "containerId":containerId,
                "sub": sub
            }),
        })
        return res.json()
    }
    const submitFiles = async (containerId :string, section_user_id:string)=>{
        var res =  await fetch('/api/container/submitFiles',{
            method: 'POST', 
            body:JSON.stringify({ 
                "containerId":containerId,
                "section_user_id":section_user_id,
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
        active:boolean,
        isExam:boolean,
        timeLimit:Number
        )=>{
        var res =  await fetch('/api/template/addTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateName":templateName,
                "description":description,
                "section_user_id":section_user_id,
                "assignment_config_id" :assignment_config_id ,
                "containerId" :containerId,
                "active":active,
                "isExam":isExam,
                "timeLimit":timeLimit,
            }),
        })
        return res.json()
    }
    const updateTemplate = async (
        templateId:string,
        templateName :string,
        description:string,
        section_user_id:string,
        containerId :string,
        isExam:boolean,
        timeLimit:Number
        )=>{
        var res =  await fetch('/api/template/updateTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
                "templateName":templateName,
                "description":description,
                "section_user_id":section_user_id,
                "containerId" :containerId,
                "isExam":isExam,
                "timeLimit":timeLimit,
            }),
        })
        return res.json()
    }
    const activateTemplate = async (templateId :string, section_user_id:string)=>{
        var res =  await fetch('/api/template/activateTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
                "section_user_id": section_user_id,
            }),
        })
        return res.json()
    }
    const deactivateTemplate = async (templateId :string, section_user_id:string)=>{
        var res =  await fetch('/api/template/deactivateTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
                "section_user_id": section_user_id,
            }),
        })
        return res.json()
    }

    const removeTemplate = async (templateId :string, section_user_id:string)=>{
        var res =  await fetch('/api/template/removeTemplate',{
            method: 'POST', 
            body:JSON.stringify({ 
                "templateId":templateId,
                "section_user_id": section_user_id,
            }),
        })
        return res.json()
    }

    const addEnvironment = async (
        libraries :string[],
        name :string,
        description:string,
        section_user_id:string)=>{
        var res =  await fetch('/api/environment/addEnvironment',{
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
    const updateEnvironment = async (
        envId:string,
        name :string,
        description:string,
        section_user_id:string,
        containerId :string)=>{
        var res =  await fetch('/api/environment/updateEnvironment',{
            method: 'POST', 
            body:JSON.stringify({ 
                "envId":envId,
                "name" : name ,
                "section_user_id":section_user_id,
                "containerId":containerId,
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
        var res =  await fetch('/api/environment/buildEnvironment',{
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
    const removeEnvironment = async (envId :string, section_user_id:string)=>{
        var res =  await fetch('/api/environment/removeEnvironment',{
            method: 'POST', 
            body:JSON.stringify({ 
                "envId":envId,
                "section_user_id": section_user_id,
            }),
        })
        return res.json()
    }
    if (sub == ""){
        return (
            <div></div>
        )
    }else{
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
                    submitFiles,
    
                    addTemplate,
                    updateTemplate,
                    activateTemplate,
                    deactivateTemplate,
                    removeTemplate,
    
                    addEnvironment,
                    updateEnvironment,
                    buildEnvironment,
                    removeEnvironment,
    
                    sub,
                    name,
                    email,
                    userId,
                    semesterId
                }}
            >
            <Toaster position="top-right" />
            { children }
            </CnailsContext.Provider>
        )  
    }
}
