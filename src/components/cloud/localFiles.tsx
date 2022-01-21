import { useState} from 'react';
import { ItemMenu } from './menus';
import { FolderIcon, DocumentIcon } from "@heroicons/react/outline"
import {useCnails} from '../../contexts/cnails'
interface props{
    tree: directoryTree.DirectoryTree
    opened:boolean
}  

const LocalFiles = ({tree,}:props)=>{ 
    const[mkdirOpen, setMkdirNameOpen]=useState(false)
    const[mkdirName, setMkdirName]=useState("")
    const { userId,makeFolder} = useCnails()
    return(
        <div className="border rounded-lg  h-96">
            {(tree===undefined)?<div></div>:
            <div>
                <div className="flex flex-row">
                    <button className="font-bold" >/local drive(Root)</button>
                    <ItemMenu  item={tree} type={"folder"} root={true} setMkdirNameOpen={setMkdirNameOpen}></ItemMenu>
                </div>
               {mkdirOpen?
               <div className=" flex ">
                   <input className="border  font-bold rounded w-1/2 broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg ml-12" 
                   type="text"
                   value={mkdirName}
                   onChange={(e)=>{setMkdirName(e.target.value)}}
                   ></input>
                <button className="border rounded  font-bold broder-blue-200 dark:border-blue-700 shadow-sm rounded-lg bg-blue-300"
                onClick={
                   async () => {
                        const res = await makeFolder(userId,tree.path+"/"+mkdirName)
                        if (res.success){
                            window.location.reload()
                        }
                   }
                }
                >make</button></div>
               :<div></div>}
                <DisplayLocal opened={true} tree={tree} ></DisplayLocal>
            </div>}
          </div>
    )
}

export default LocalFiles

function DisplayLocal({opened,tree}:props){
    const childrenList = tree.children

    return (
        <div>
            {opened?
            <div>
                {childrenList.map(child=>{fileOrFolder(child)})}
            </div>:
            <div></div>}
        </div>)
}

function fileOrFolder(child){
    const { userId,makeFolder} = useCnails()
    const[mkdirOpen, setMkdirNameOpen]=useState(false)
    const[mkdirName, setMkdirName]=useState("")
    const[opened,setOpened]=useState(false)
    return(
    <div key={child.path}>
        {child.type=="directory"?
        <div className="pl-6 flex flex-col py-1">
            <div className="flex flex-row gap-x-1">
                <FolderIcon className="w-4 h-4 text-gray-500"/>
                <button className="font-bold border broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg pr-4" onClick={()=>{
                    setOpened(!opened)}}>
                    {child.name}
                </button>
                <ItemMenu  item={child}  type={"folder"} root={false}setMkdirNameOpen={setMkdirNameOpen} /> 
            </div>
            {mkdirOpen?
            <div className=" flex ">
                <input className="border font-bold rounded w-1/2 broder-gray-200 dark:border-gray-700 shadow-sm rounded-lg ml-10" 
                type="text"
                value={mkdirName}
                onChange={(e)=>{setMkdirName(e.target.value)}}
                ></input>
                <button className="border  font-bold rounded broder-blue-200 dark:border-blue-700 shadow-sm rounded-lg bg-blue-300"
                onClick={
                async () => {
                    const res = await makeFolder(userId,child.path+"/"+mkdirName)
                    if (res.success){
                        window.location.reload()
                    }
                }
                }
                >make</button></div>
            :<div></div>}
            <div>
                <DisplayLocal opened={opened} tree={child} ></DisplayLocal>
            </div>
        </div>
        :
        // it is files
        <div className="flex flex-col pl-6 py-1">
        {/* @ts-ignore */}
            <div key={child.path} className='flex flex-row gap-x-2'>
                <DocumentIcon className="w-4 h-4 text-gray-500"/>
                <div className="text-left text-gray-500">
                    {child.name}
                </div > 
                <ItemMenu  item={child}  type={"file"} root={false} setMkdirNameOpen={setMkdirNameOpen}/>
            {/* <button className='bg-blue-500 hover:bg-blue-700 text-white rounded '
                    onClick={async() => {
                        const res = await moveFile(userId,file.path,"/volumes/7fac6d26-4f01-41c8-9b40-a9f372c7a691/persist/3/"+file.name)
                        if (res.success){
                            console.log(res)
                            window.location.reload()
                        }
                    }}                    
                >
                    moveFileTest
                </button> */}
            </div>
        </div> 
        }
    </div>
    )
}