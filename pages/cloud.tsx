import {googleAPI} from "../lib/googleAPI"
import {useEffect, useState} from "react"
import { useCnails } from '../contexts/cnails'
// import {useE}
interface displayProps{
    tree: tree
}

interface filesProps{
    files: {
        id: string
        name: string
    }[]
}

interface tree{
    id: string
    name: string
    children: tree[]
    files: {
        id: string
        name: string
    }[]
}

function Files({files}: filesProps){
  return files.map((file) => {
    return(
      <div className="text-gray-500">
        {file.name}
      </div>
    )
  })
}

function Display({tree}:displayProps){
  const childrenList = tree.children
  return childrenList.map((child)=>{
    return(
      <div className="pl-5">
        <div className="font-bold">
          {child.name}
        </div>
        <div>
          <Display tree={child}></Display>
        </div>
        <div>
          <Files files={tree.files}></Files>
        </div>
      </div>
    )
  })
}


interface displayLocalProps{
  tree: treeLocal
}

interface filesLocalProps{
  files: {
      name: string
      path: string
  }[]
}

interface treeLocal{
  name: string
  children: treeLocal[]
  files: {
      name: string
      path: string
  }[]
}

function FilesLocal({files}: filesLocalProps){
return files.map((file) => {
  return(
    <div className="text-gray-500">
      {file.name}
    </div>
  )
})
}

function DisplayLocal({tree}:displayLocalProps){
  const childrenList = tree.children
  return (
    <div>
      {childrenList.map(child=>{
        return(
          <div className="pl-5">
            <div className="font-bold">
              {child.name}
            </div>
            <div>
              <DisplayLocal tree={child}></DisplayLocal>
            </div>
          
          </div>
        )})}
      <div className="pl-5">
        <FilesLocal files={tree.files}></FilesLocal>
      </div>
    </div>)
}

export default ()=>{
    var [flag, setFlag] = useState(false)
    const [files, setFiles] = useState([])
    const [localFiles, setLocalFiles] = useState()
    const { userId,listFolders} = useCnails()
    useEffect(()=>{
      const fetchLocal = async() => {
        const local = await listFolders(userId)
        if (local.success){
          console.log(local.root)
          setLocalFiles(local.root)
        }
      }
      fetchLocal()

      const fetchToken = async() => {
          // await googleAPI.setLocalToken("asdasdasdas")
          // console.log(await googleAPI.getLocalToken())
          const token =  await googleAPI.getLocalToken()
          console.log(token)
          if (token !== null){
            // googleAPI.setCredential(token)
            const loadedFiles = await googleAPI.getFileList()
            console.log(loadedFiles)
            setFiles(loadedFiles)
            setFlag(true)
          }
      }
      if(!flag)
        fetchToken()
      else{

      }
    },[])

    
    return(
        <div className="grid grid-cols-2 text-black w-full p-10 gap-x-6">
            <div className="border rounded-lg h-96">
                local volume
                {(localFiles===undefined)?<div></div>:
                  <DisplayLocal tree={localFiles}></DisplayLocal>}                
            </div>
            <div className="border rounded-lg h-96">
                cloud drive
                {flag?(
                    <div>
                      <h2>active</h2>
                      <Display tree={files}></Display>
                    </div>
                ):(
                    <div>
                        <div>Please login to Google to access the file in drive</div>
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={()=>{
                            googleAPI.auth()
                        }}
                        >Click here
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}