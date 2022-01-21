import {googleAPI} from "../lib/googleAPI"
import React, {useEffect, useState, Fragment, useRef} from "react"
import { MenuIcon, FolderIcon, DocumentIcon } from "@heroicons/react/outline"
import {Menu, Transition, Dialog} from "@headlessui/react"
import { useCnails } from "../contexts/cnails"
import {toast} from "react-hot-toast"

// two type of object (file or folder)
// folder have files property while file have no
import LocalFiles from "../components/cloud/localFiles"
import Modal from "../components/Modal"
import Loader from "../components/Loader"
import { NotificationBody, Notification } from "../components/Notification"
// import {useE}
function Files({files,sub}){
  return files.map((file) => {
    return(
      <div key={file.id} className="pl-5 flex flex-row space-x-1 items-center">
        <DocumentIcon className="w-4 h-4 text-gray-500"/>
        <div className="text-gray-500">
          {file.name}
        </div>
        <ItemMenu fileId={file.id} fileName={file.name}  type={"file"} sub={sub}/>
      </div>
    )
  })
}

async function updateTree(tree, id, prevPath, sub){
  // const {sub} = useCnails()
  // const stack = [tree]
  // while (stack.length != 0){
  //   var currentTree = stack.pop()
  //   if(currentTree.id == id){
  //     if(currentTree.closed == false){
  //       if(currentTree.children.length == 0 && currentTree.files.length == 0){
  //         // fetch data
  //         const response = await googleAPI.expandFolder(currentTree.id, sub)
  //         const {loadedFiles:{files, folders}} = response
  //         currentTree.children = folders.map((child)=>({
  //           id: child.id,
  //           name: child.name,
  //           path: prevPath+"/"+child.name,
  //           closed: true,
  //           children: [],
  //           files: []
  //         }))
  //         currentTree.files = files.map((file)=>({
  //           id: file.id,
  //           name: file.name,
  //           path: prevPath+"/"+file.name
  //         }))
  //         break;
  //       }
  //     }
  //   }else{
  //     for(let i = 0; i<currentTree.length; i++)
  //       stack.push(currentTree.children[i])
  //   }
  // }
  return await new Promise(async (resolve, reject)=>{
    var treeCopy = tree
    if (treeCopy.id == id){
      treeCopy.closed = !treeCopy.closed
      if (treeCopy.closed == false){
        if(treeCopy.children.length == 0 && treeCopy.files.length == 0){
          // fetch data
          const response = await googleAPI.expandFolder(treeCopy.id, sub)
          const {loadedFiles:{files, folders}} = response
          treeCopy.children = folders.map((child)=>({
            id: child.id,
            name: child.name,
            path: prevPath+"/"+child.name,
            closed: true,
            children: [],
            files: []
          }))
          treeCopy.files = files.map((file)=>({
            id: file.id,
            name: file.name,
            path: prevPath+"/"+file.name
          }))
        }
      }
    }else{
      treeCopy.children =  await Promise.all(
        treeCopy.children.map(async (child)=>{
          return(updateTree(child, id, prevPath, sub))
        })
      )
    }
    resolve(treeCopy)
  }) 
}

function ItemMenu({fileId, fileName, type,sub}){
  const [loading, setLoading] = useState(false)
  return(
    <Menu as="div" className="relative text-left">
      <div className="flex flex-row space-x-2">
        <Menu.Button>
          <MenuIcon className="w-4 h-4"/>
        </Menu.Button>
        {loading?(<div>loading</div>):(<div>finished</div>)}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 w-56 border rounded bg-white z-40">
          <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">
            <button className="w-full" onClick={async ()=>{
              setLoading(true)
              const {success, message} = await googleAPI.downloadFiles(sub, fileId,fileName,"/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/3", type)
              setLoading(false)
              console.log(success, message)
              if (success){
                toast.custom((t) =>(
                  <Notification trigger={t}>
                    <NotificationBody title={"Download File"} body={"Download file success"} success={true} id = {t.id}></NotificationBody>
                  </Notification>
                ))
              }else{
                toast.custom((t) =>(
                  <Notification trigger={t}>
                    <NotificationBody title={"Download File"} body={message} success={false} id = {t.id}></NotificationBody>
                  </Notification>
                ))
              }
            }}>
              download
            </button>
          </Menu.Item>
          {type=="folder"?
          <Menu.Item as="div" className="w-full flex justify-center hover:bg-gray-200">
            <button className="w-full" onClick={async ()=>{
              setLoading(true)
              if (type == "folder"){
                const{success, message} = await googleAPI.uploadFiles(sub, "/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/3",fileId, "folder")
                setLoading(false)
                console.log(success, message)
                if (success){
                  toast.custom((t) =>(
                    <Notification trigger={t}>
                      <NotificationBody title={"Upload File"} body={"Upload file success"} success={true} id = {t.id}></NotificationBody>
                    </Notification>
                  ))
                }else{
                  toast.custom((t) =>(
                    <Notification trigger={t}>
                      <NotificationBody title={"Upload File"} body={message} success={false} id = {t.id}></NotificationBody>
                    </Notification>
                  ))
                }
              }
              // else
              // await googleAPI.uploadFiles(sub, "/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/1",fileId, "file")
            }}>
              upload
            </button>
          </Menu.Item>:<div></div>}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function Display({allTree, tree, setFiles, prevPath, sub}){
  const childrenList = tree.children
  return (
    <div>
      <div className="flex flex-row space-x-1 items-center">
        <FolderIcon className="w-4 h-4 text-gray-500"/>
        <button onClick={async ()=>{
            await updateTree(allTree, tree.id, prevPath, sub)
            setFiles({
              name:"root",
              id: "root",
              closed: false,
              children: [],
              files: []
            })
            console.log(allTree)
            setFiles(allTree)
        }} className="font-bold">
            {tree.name}
        </button>
        <ItemMenu fileId={tree.id} fileName={tree.name} type={"folder"} sub={sub}/>
      </div>
      
      {childrenList.map((child)=>{
        return(
          <div key={child.id} className="pl-5">
                {child.closed?(
                  <div className="flex flex-row space-x-1 items-center">
                    <FolderIcon className="w-4 h-4 text-gray-500"/>
                    <button onClick={async ()=>{
                        await updateTree(allTree, child.id, prevPath+'/'+tree.name+'/'+child.name, sub)
                        setFiles({
                          name:"root",
                          id: "root",
                          closed: false,
                          children: [],
                          files: []
                        })
                        setFiles(allTree)
                    }} className="font-bold">
                        {child.name}
                    </button>
                    <ItemMenu fileId={child.id} fileName={child.name}  type={"folder"} sub={sub}/>
                  </div>
                ):(
                  <div>
                    <Display allTree={allTree} tree={child} setFiles={setFiles} prevPath={prevPath+"/"+tree.name} sub={sub}></Display>
                  </div>
                )}
          </div>
        )
      })}
    <div>
      <Files files={tree.files} sub={sub}></Files>
    </div>
    </div>
  )
}

const FunctionLoader = React.forwardRef(({}, ref) =>{
  const dialogClass = "inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]"
  return(
    //@ts-ignore
    <div ref={ref} className={dialogClass}>
        <Loader></Loader>
    </div>
  )
})

export default ()=>{
    const { listFolders,userId, sub} = useCnails()
    const [localFolders, setLocalFolders]=useState(undefined)
    const [flag, setFlag] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [files, setFiles] = useState({
      name:"root",
      id: "root",
      closed: false,
      path: "/root",
      children: [],
      files: []
    })
    useEffect(()=>{
      const GetlocalFolders = async() => {
        const res=  await listFolders(userId)
        if (res.success){
          setLocalFolders(res.root)
        }
      }
      const fetchToken = async() => {
        const response = await googleAPI.expandFolder("root", sub)
        if(response.success){
          const {loadedFiles:{files, folders}} = response
          console.log(files.length)
          setFiles({
            name: "root",
            id: "root",
            closed: false,
            path: "/root",
            children: folders.map((child)=>({
              id: child.id,
              name: child.name,
              path: "/root/"+child.name,
              closed: true,
              children: [],
              files: []
            })),
            files: files.map((file)=>({
              id: file.id,
              name: file.name,
              path: '/root/'+file.name
            }))
          })
          setFlag(true)
        }
        }
        if(!flag){
          fetchToken()
        }
        GetlocalFolders()
    },[])
    // console.log(files)
    
    const [source, setSource] = useState("")
    const [dest, setDest] = useState("")
    let ref = useRef()

    return(
        <div className="grid grid-cols-2 text-black w-full p-10 gap-x-6">
            {/* @ts-ignore */}
            <LocalFiles opened={true} tree={localFolders!} ></LocalFiles>
            {/* <div className="border rounded-lg h-96 flex flex-col space-y-2">
                <div>
                  Local volume
                </div>
                <div className="flex flex-row space-x-2 font-medium text-sm text-gray-500">
                  <label>Upload source: </label>
                  <input className="border rounded text-black px-2" value={source} onChange={(e)=>{
                    setSource(e.target.value)
                  }}/>
                </div>
                <div className="flex flex-row space-x-2 font-medium text-sm text-gray-500">
                  <label>Upload destination (folder parent id): </label>
                  <input className="border rounded text-black px-2" value={dest} onChange={(e)=>{
                    setDest(e.target.value)
                  }}/>
                </div>
                <button className="border rounded px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white" onClick={async ()=>{
                  await googleAPI.uploadFile(source)
                }}>
                  upload file
                </button>
                <button className="border rounded px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white" onClick={async ()=>{
                  const response = await googleAPI.uploadFolder(source, dest)
                  console.log(response)
                }}>
                  upload folder
                </button>
            </div> */}
            <div className="border rounded-lg h-96 overflow-scroll">
                cloud drive
                {flag?(
                    <div>
                      <h2>active</h2>
                      <Display allTree={files} tree={files} setFiles={setFiles} prevPath={''} sub={sub}></Display>
                    </div>
                ):(
                    <div>
                        <div>Please login to Google to access the file in drive</div>
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={async ()=>{
                            setIsOpen(true)
                            await googleAPI.auth()
                            setIsOpen(false)
                        }}
                        >Click here
                        </button>
                    </div>
                )}
            </div>
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
              <FunctionLoader ref={ref}/>
            </Modal>
        </div>
    )
}