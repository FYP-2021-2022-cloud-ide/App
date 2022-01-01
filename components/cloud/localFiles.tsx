import { useState } from 'react';
import {useCnails} from '../../contexts/cnails'




interface props{
    tree: treeLocal
}
  

const LocalFiles = ({tree}:props)=>{
    return(
        <div className="border rounded-lg h-96">
            {console.log('render')}
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

function FilesLocal({files}: filesLocalProps){
const { userId,downloadFile,removeFile} = useCnails()

    return files.map((file) => {
    return(
        <div key={file.path} className='flex flex-row gap-x-2'>
            <div className="text-left text-gray-500">
                {file.name}
            </div > 
            <button className='bg-blue-500 hover:bg-blue-700 text-white   rounded '  
            onClick={async() => {
                const res = await downloadFile(userId,file.path)
                if (res.success){
                    console.log(res)
                }
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
        </div>
    )
    })
}

function DisplayLocal({tree}:props){
    const childrenList = tree.children
    const { userId,uploadFile} = useCnails()
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
                <div key={child.name} className="pl-5">
                    <div className="font-bold">
                        {child.name.slice(child.name.indexOf("_data")+5,-1)}
                    </div>
                    <input type="file" name="upload" onChange={uploadToClient} />
                    <button className='bg-blue-500 hover:bg-blue-700 text-white rounded '
                        onClick={async() => {
                            const res = await uploadFile(userId,child.name,file)
                            if (res.success){
                                console.log(res)
                                // window.location.reload()
                            }
                        }}                    
                    >
                        upload!
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
