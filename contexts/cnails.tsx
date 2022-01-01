import React, { useContext, useState, useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { firebaseCloudMessaging } from "../lib/webpush";
// import {notificationStack} from "../lib/notificationStack";

import toast, { Toaster } from "react-hot-toast";
import { Notification,NotificationBody } from "../components/Notification";

import courseListData from "../data/testing/courseList"
import containerListData from "../data/testing/containerList"
import Layout from "../components/Layout";
import Loader from "../components/Loader";


interface CnailsContextState {
    updateUserData:(sub:string, darkMode:boolean,bio:string) => Promise<any>,
    getUserData:(sub:string)=> Promise<any>,
    containerList: (sub: string) => Promise<any>,
    courseList: (sub:string) => Promise<any>,
    getSectionInfo:(sectionid:string, sub:string) => Promise<any>,

    environmentList: (sectionid:string, sub:string ) => Promise<any>,
    templateList: (sectionid:string, sub:string ) => Promise<any>,
    
    addContainer: (imageName :string,memLimit :Number,numCPU:Number,section_user_id :string,template_id :string,dbStored:boolean,accessRight:string) => Promise<any>,
    removeContainer: (containerId:string, sub:string) => Promise<any>,
    submitFiles:(containerId:string, section_user_id:string ) => Promise<any>,

    addTemplate: (templateName :string, description:string,section_user_id:string,assignment_config_id :string,containerId :string,active:boolean,isExam:boolean,timeLimit:Number,allow_notification:boolean) => Promise<any>,
    updateTemplate:(templateId:string,templateName :string, description:string,section_user_id:string,containerId :string,isExam:boolean,timeLimit:Number,allow_notification:boolean) => Promise<any>,
    activateTemplate:(templateId:string, section_user_id:string ) => Promise<any>,
    deactivateTemplate:(templateId:string, section_user_id:string ) => Promise<any>,
    removeTemplate: (templateId:string, section_user_id:string ) => Promise<any>,
    
    addEnvironment: (libraries :string[],name :string, description:string,section_user_id:string)=> Promise<any>,
    updateEnvironment:(envId:string,name :string,description:string, section_user_id:string,containerId:string)=> Promise<any>,
    buildEnvironment: (name :string,description:string, section_user_id:string,containerId:string)=> Promise<any>,
    removeEnvironment: (envId :string, section_user_id:string )=>  Promise<any>,

    sendNotification:(title:string, body:string, sender:string, receiver:string, allowReply:boolean)=> Promise<any>,
    listNotifications:(userId:string)=> Promise<any>,
    removeNotification:(userId:string, notificationId:string)=> Promise<any>,

    listFolders:(userId:string)=> Promise<any>,
    downloadFile:(userId:string, filePath:string)=> Promise<any>,
    uploadFile:(userId:string, filePath:string,blob:Blob)=> Promise<any>,
    removeFile:(userId:string, filePath:string)=> Promise<any>,
    sub: string,
    name: string,
    email: string,
    userId: string,
    semesterId: string,
    bio:string
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
    const[bio, setBio] = useState('')
    useEffect(() => {
        init()
        // setupNotification();

        async function init(){
            const cookies = await fetch(`/api/fetchCookies`,{
                method: 'GET'
            })
            const cookiesContent = await cookies.json()
            console.log(cookiesContent)
            const { sub, name, email, userId, semesterId,bio } = cookiesContent
            setSub(sub)
            setName(name)
            setEmail(email)
            setUserId(userId)
            setSemesterId(semesterId)
            setBio(bio)
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
                  onMessage(messaging, async message => {
                    console.log("message recevied")
                    console.log(message.data)
                    const {title, body} = message.data!
                    // notificationStack.set(notificationStack.push((await notificationStack.get()),title, body))
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

    const updateUserData = async (sub:string, darkMode:boolean,bio:string) => {
        var res =  await fetch('/api/updateUserData?sub='+sub,{
            method: 'POST', 
            body:JSON.stringify({ 
                "darkMode":darkMode,
                "bio":bio,
            }),
        })
        return res.json()
    }

    const getUserData = async (sub:string) => {
        var res =  await fetch('/api/getUserData?sub='+sub,{
            method: 'GET', 
        })
        return res.json()
    }
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
        timeLimit:Number,
        allow_notification:boolean
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
                "allow_notification":allow_notification,
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
        timeLimit:Number,
        allow_notification:boolean
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
                "allow_notification":allow_notification,
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
    
    const sendNotification = async (title:string, body:string, sender:string, receiver:string, allowReply:boolean)=>{
        var res =  await fetch('/api/notification/sendNotification',{
            method: 'POST', 
            body:JSON.stringify({ 
                "title": title,
                "body": body,
                "sender": sender,
                "receiver": receiver,
                "allowReply": allowReply,
            }),
        })
        return res.json()
    }
      
    const listNotifications = async (userId:string)=>{
        var res =  await fetch('/api/notification/listNotifications?userId='+userId,{
            method: 'GET', 
        })
        return res.json()
    }  
    const removeNotification = async (userId:string, notificationId:string)=>{
        var res =  await fetch('/api/notification/removeNotification',{
            method: 'POST', 
            body:JSON.stringify({ 
                "userId":userId,
                "notificationId": notificationId,
            }),
        })
        return res.json()
    }

    const listFolders = async (userId:string)=>{
        var res =  await fetch('/api/cloudFile/listFolders?userId='+userId,{
            method: 'GET', 
        })
        return res.json()
    }
    const downloadFile = async (userId:string,filePath:string)=>{
        var res =  await fetch('/api/cloudFile/downloadFile?userId='+userId,{
            method: 'POST', 
            body:JSON.stringify({ 
                "filePath": filePath,
            }),
        })
        return res.json()
    }
    const uploadFile = async (userId:string,filePath:string,blob:Blob)=>{
        var content=new FormData()
        content.append("filePath",filePath)
        content.append("file",blob)
        // console.log(content)
        //var file = Buffer.from(blob)
        var res =  await fetch('/api/cloudFile/uploadFile?userId='+userId,{
            method: 'POST', 
            body:content,
        })
        return res.json()
    }
    const removeFile = async (userId:string,filePath:string)=>{
        var res =  await fetch('/api/cloudFile/removeFile?userId='+userId,{
            method: 'POST', 
            body:JSON.stringify({ 
                "filePath": filePath,
            }),
        })
        return res.json()
    }
    
    if (sub == "" || userId == "" ){
        return (
            // <Layout>
            //     <div className="flex h-screen w-full"><div className='m-auto'><Loader></Loader></div></div>
            // </Layout>
            <div></div>
        )
    }else{
        return (
            <CnailsContext.Provider
                value={{
                    updateUserData,
                    getUserData,
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

                    sendNotification ,
                    listNotifications,
                    removeNotification,

                    listFolders,
                    downloadFile,
                    uploadFile,
                    removeFile,

                    sub,
                    name,
                    email,
                    userId,
                    semesterId,
                    bio
                }}
            >
            <Toaster position="top-right" />
            { children }
            </CnailsContext.Provider>
        )  
    }
}
