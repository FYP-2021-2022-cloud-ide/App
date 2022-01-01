import {googleAPI} from "../lib/googleAPI"
import {useEffect, useState} from "react"
import { useCnails } from '../contexts/cnails'
import LocalFiles from "../components/cloud/localFiles"

// import {useE}
function Files({files}){
  return files.map((file) => {
    console.log(file.name)
    return(
      <div key={file.id} className="text-gray-500 pl-5">
        {file.name}
      </div>
    )
  })
}

async function updateTree(tree, id){
  return await new Promise(async (resolve, reject)=>{
    var treeCopy = tree
    if (treeCopy.id == id){
      treeCopy.closed = !treeCopy.closed
      if (treeCopy.closed == false){
        if(treeCopy.children.length == 0 || treeCopy.files.length == 0){
          // fetch data
          const response = await googleAPI.expandFolder(treeCopy.id)
          treeCopy.children = response.children
          treeCopy.files = response.files
        }
      }
    }else{
      treeCopy.children =  await Promise.all(
        treeCopy.children.map(async (child)=>{
          return(updateTree(child, id))
        })
      )
    }
    resolve(treeCopy)
  }) 
}

function Display({allTree, tree, setFiles}){
  const childrenList = tree.children
  return (
    <div>
      <button onClick={async ()=>{
          console.log('update id: '+tree.id)
          const newTree = await updateTree(allTree, tree.id)
          console.log('done update')
          setFiles({
            name:"root",
            id: "root",
            closed: false,
            children: [],
            files: []
          })
          setFiles(newTree)
      }} className="font-bold">
          {tree.name}
      </button>
      
      {childrenList.map((child)=>{
        console.log(child.closed)
        return(
          <div key={child.id} className="pl-5">
                {child.closed?(
                  <button onClick={async ()=>{
                      console.log('update id: '+child.id)
                      const newTree = await updateTree(allTree, child.id)
                      console.log('done update')
                      setFiles({
                        name:"root",
                        id: "root",
                        closed: false,
                        children: [],
                        files: []
                      })
                      setFiles(newTree)
                  }} className="font-bold">
                      {child.name}
                  </button>
                ):(
                  <div>
                    <Display allTree={allTree} tree={child} setFiles={setFiles}></Display>
                  </div>
                )}
          </div>
        )
      })}
    <div>
      <Files files={tree.files}></Files>
    </div>
    </div>
  )
}



const Cloud = ()=>{
  var [flag, setFlag] = useState(false)
  const [counter, setCounter] = useState(0)
  const [files, setFiles] = useState({
    name:"root",
    id: "root",
    closed: false,
    children: [],
    files: []
  })

  const [local, setLocal] = useState(undefined)
  const { userId,listFolders} = useCnails()

  useEffect(()=>{
    const fetchLocal = async() => {
      const local = await listFolders(userId)
      if (local.success){
        console.log(local.root)
        setLocal(local.root)
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
        const loadedFiles = await googleAPI.expandFolder("root")
        console.log('loadedFiles')
        console.log(loadedFiles)
        setFiles({
          name: "root",
          id: "root",
          closed: false,
          children: loadedFiles.children,
          files: loadedFiles.files
        })
        setFlag(true)
      }
    }
    if(!flag)
      fetchToken()
  },[])
  console.log("global")
  console.log(files)
  
  return(
      <div className="grid grid-cols-2 text-black w-full p-10 gap-x-6">
          {/* @ts-ignore */}
          <LocalFiles tree={local!}></LocalFiles>
          <div className="border rounded-lg h-96">
              cloud drive
              {flag?(
                  <div>
                    <h2>active</h2>
                    <Display allTree={files} tree={files} setFiles={setFiles}></Display>
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

export default Cloud