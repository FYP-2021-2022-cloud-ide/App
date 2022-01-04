import localforage from 'localforage'
import * as credentials from './googleCredential.json'
// import { google } from 'googleapis';

// import fs from 'fs';

const googleAPI = {
    getLocalToken: function (){
        return localforage.getItem('google_token')
    },
    setLocalToken: function (token: string){
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
    expandFolder: async function(folderId: string){
        const token = await this.getLocalToken()
        const response = await fetch("/api/google/listFiles",{
            method: "POST",
            body: JSON.stringify({
                credentials: credentials.web,
                token,
                folderId
            })
        })

        return await response.json()
    }
}

export {googleAPI}