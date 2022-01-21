import localforage from 'localforage'
import credentials from './googleCredential.json'

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
    auth: async function(){
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
    getAccessToken: async function(code, sub){
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
    expandFolder: async function(folderId, sub){
        const token = await this.getLocalToken()
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
                loadedFiles: null
            })
        }
        return {
            success: true,
            message: "",
            loadedFiles: {
                files: content.files,
                folders: content.folders
            }
        }
    },
    downloadFiles: async function(sub,  fileId, fileName,filePath,fileType){
        const response = await fetch("/api/google/downloadFiles",{
            method: "POST",
            body: JSON.stringify({
                sub,  fileId, fileName,filePath,fileType
            })
        })
        return await response.json()
    },
    // downloadFolder: async function(folderName, folderId){
    //     const token = await this.getLocalToken()
    //     const response = await fetch("/api/google/downloadFolder",{
    //         method: "POST",
    //         body: JSON.stringify({
    //             credentials: credentials.web,
    //             token,
    //             folderName,
    //             folderId
    //         })
    //     })
    //     return await response.json()
    // },
    uploadFiles: async function(sub,  filePath,parentId,fileType){
        // const token = await this.getLocalToken()
        const response = await fetch("/api/google/uploadFiles",{
            method: "POST",
            body: JSON.stringify({
                sub,  filePath,parentId,fileType
            })
        })
        return await response.json()
    },
    // uploadFolder: async function(filePath, parent){
    //     const token = await this.getLocalToken()
    //     const response = await fetch("/api/google/uploadFolder",{
    //         method: "POST",
    //         body: JSON.stringify({
    //             credentials: credentials.web,
    //             token,
    //             filePath,
    //             parent
    //         })
    //     })
    //     return await response.json()
    // }    
}

export {googleAPI}