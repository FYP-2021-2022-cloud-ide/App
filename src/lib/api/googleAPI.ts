import localforage from 'localforage'
import { 
    GoogleDriveListResponse ,
    SuccessStringResponse
  } from "./api";

const googleAPI = {
    getLocalToken: function (){
        return localforage.getItem('google_token')
    },
    setLocalToken: function (token){
        try{
            localforage.setItem('google_token', token)
        }catch(e){
            return e
        }
    },
    auth: async ()=>{
        // console.log(credentials.web)
        const response = await fetch("/api/google/auth",{
            method:"POST"
        })
        const {success, message} = await response.json()
        if(success)
            location.replace(message)
        else
            console.log(message)
    },
    getAccessToken: async(code, sub)=>{
        const response = await fetch("/api/google/getAccessToken",{
            method:"POST",
            body: JSON.stringify({
                code,
                sub
            })
        })
        const {success, message} = await response.json()
        if(!success)
            console.log(message)
    },
    expandFolder: async (folderId, sub):Promise<GoogleDriveListResponse>=>{
        const token = await googleAPI.getLocalToken()
        const response = await fetch("/api/google/listFiles",{
            method: "POST",
            body: JSON.stringify({
                folderId,
                sub
            })
        })
        const content = await response.json()
        if(!content.success){
            console.log(content.message)
            return ({
                success: false,
                message: content.message,
            })
        }
        return {
            success: true,
            message: "",
            loadedFiles: content.loadedFiles
        }
    },
    downloadFiles: async (
        sub, 
        fileId,
        fileName,
        filePath,
        fileType):Promise<SuccessStringResponse>=>{
        const response = await fetch("/api/google/downloadFiles",{
            method: "POST",
            body: JSON.stringify({
                sub,  fileId, fileName,filePath,fileType
            })
        })
        return response.json()
    },

    uploadFiles: async (
        sub,  
        filePath,
        parentId,
        fileType):Promise<SuccessStringResponse>=>{
        // const token = await this.getLocalToken()
        const response = await fetch("/api/google/uploadFiles",{
            method: "POST",
            body: JSON.stringify({
                sub,  filePath,parentId,fileType
            })
        })
        return response.json()
    },
   
}

export {googleAPI}