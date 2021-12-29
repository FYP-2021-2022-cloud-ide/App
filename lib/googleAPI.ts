import localforage from 'localforage'
import * as credentials from './googleCredential.json'

interface token{
    access_token: string
    expiry_date: number
    scope: string
    token_type: string
}

const googleAPI = {
    getLocalToken: function (){
        return localforage.getItem('google_token')
    },
    setLocalToken: function (token: token){
        try{
            localforage.setItem('google_token', token)
        }catch(e){
            return e
        }
    },
    auth: async function(){
        console.log(credentials.web)
        const response = await fetch("/api/google/auth",{
            method:"POST",
            body: JSON.stringify({
                credentials: credentials.web
            })
        })
        const {url} = await response.json()
        location.replace(url)
    },
    getAccessToken: async function(code: string){
        const response = await fetch("/api/google/getAccessToken",{
            method:"POST",
            body: JSON.stringify({
                credentials: credentials.web,
                code
            })
        })
        const {token} = await response.json()
        this.setLocalToken(token)
    },
    getFileList: async function(){
        const token = await this.getLocalToken()
        const response = await fetch("/api/google/listFiles",{
            method: "POST",
            body: JSON.stringify({
                credentials: credentials.web,
                token
            })
        })
        const {files} = await response.json()
        console.log("testing")
        console.log(files)
        return files
    }
}

export {googleAPI}