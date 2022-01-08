import { useState } from 'react';
import {useCnails} from '../../contexts/cnails'




interface props{
    tree: treeLocal
}
  

const LocalFiles = ({tree}:props)=>{
    return(
        <div className="border rounded-lg h-96">
            {/* {console.log('render')} */}
              local volume
              {(tree===undefined)?<div></div>:
                <DisplayLocal tree={tree}></DisplayLocal>}     
          </div>
    )
}

export default LocalFiles


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

async function downloadFileURL(filePath:string){
    // console.log(document.getElementById( "downloadToken" ))
    var link=document.createElement('a');
    var fileName=filePath.slice(filePath.lastIndexOf('/') + 1);
    link.href = "/uploadTest/"+fileName;
    link.download = fileName
    link.click();
}

function FilesLocal({files}: filesLocalProps){
const { userId,downloadFile,removeFile,moveFile,removeFileLocal} = useCnails()

    return files.map((file) => {
    return(
        <div key={file.path} className='flex flex-row gap-x-2'>
            <div className="text-left text-gray-500">
                {file.name}
            </div > 
            <button className='bg-blue-500 hover:bg-blue-700 text-white   rounded '  
            onClick={async() => {
                const res = await downloadFile(userId,file.path)
                    if (res!=undefined){
                        console.log(res.filePath)
                        await downloadFileURL(res.filePath)                       
                    }
                //remove the temp local file after the download
                setTimeout(async()=>{
                    const res2 =await removeFileLocal(userId,res.filePath)
                    if (res.success){
                        window.location.reload()
                    }
                },10000);
            }
            } >download</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white rounded ' 
             onClick={async() => {
                    const res = await removeFile(userId,file.path)
                    if (res.success){
                        console.log(res)
                        window.location.reload()
                    }
            }}>remove</button>
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
    )
    })
}


function DisplayLocal({tree}:props){
    const childrenList = tree.children
    const { userId,uploadFile,makeFolder,removeFile} = useCnails()
    const [file, setFile] = useState(new Blob());
    const [createObjectURL, setCreateObjectURL] = useState("");
  
    const uploadToClient = (event:any) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setFile(i);
        setCreateObjectURL(URL.createObjectURL(i));
        console.log(i)
      }
    };

    return (
        <div>
            {childrenList.map(child=>{
                return(
                <div key={child.name} className="pl-5 ">
                    <div className="font-bold">
                   {/* { child.name} */}
                        {child.name.slice(child.name.indexOf("persist")+7,-1)}
                    </div>
                    <input type="file" name="upload" onChange={uploadToClient} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded '
                        onClick={async() => {
                            const res = await uploadFile(userId,child.name,file)
                            if (res.success){
                                console.log(res)
                                window.location.reload()
                            }
                        }}                    
                    >
                        upload!
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded '
                        onClick={async() => {
                            const res = await makeFolder(userId,child.name+"/test")
                            if (res.success){
                                console.log(res)
                                window.location.reload()
                            }
                        }}                    
                    >
                        makeDirectory
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded '
                        onClick={async() => {
                            const res = await removeFile(userId,child.name)
                            if (res.success){
                                console.log(res)
                                window.location.reload()
                            }
                        }}                    
                    >
                        DeleteDirectory(careful)
                    </button>


                    <div>
                        <DisplayLocal tree={child}></DisplayLocal>
                    </div>
                
                </div>
                )})}
            <div className="flex flex-col pl-5">
                    {/* @ts-ignore */}
                <FilesLocal files={tree.files}></FilesLocal>
            </div>
        </div>)
}
