import Router, { useRouter } from "next/router";
import CourseBar from "../components/course/CourseBar";
import React, { useEffect, useState } from 'react';
import { useCnails } from "../contexts/cnails";
import Loader from "../components/Loader"; 
import Breadcrumbs from "../components/Breadcrumbs";
import { TerminalIcon } from "@heroicons/react/solid";
import SandboxList from "../components/sandbox/SandboxList";
import {sandboxAPI} from "../lib/sandboxAPI";


const TitleBar = () => {

    return (
        
      <div className="flex flex-row justify-between text-gray-700 dark:text-gray-300">
          <div className="flex flex-row justify-start gap-x-4 items-center">
              <TerminalIcon className="w-7 h-7"> </TerminalIcon> 
              <p className="text-lg">Sandbox</p>
          </div>
          {/* <div className="flex flex-row gap-x-4 justify-end">
              <button className="hover:scale-110 transition ease-in-out duration-300">
                  <CogIcon className="w-7 h-7"></CogIcon>
              </button>
          </div> */}
          
      </div>
       
    )
}

const Sandbox = () => {
  const [sandboxImageList,setSandboxImageList] = useState([]);
  const {  sub ,userId} = useCnails();
  const{listSandboxImage}=sandboxAPI; 
  // data fetching from API 
  useEffect(() => {
    const fetchSandboxImages = async () => {
      const response = await listSandboxImage(userId)
      if (response.success ) {
        setSandboxImageList(response.sandboxImages)
      }
    }

    fetchSandboxImages()
    
  }, [])

  return (
    <div className="w-full">
        <div className="flex flex-col font-bold px-8 w-full pt-10 min-h-screen space-y-5">
          <Breadcrumbs elements={[{
            name: "Dashboard",
            path: "/"
          },
          {
            name: "Sandbox",
            path: `/sandbox`
          }]} />
          <SandboxList sandboxes={sandboxImageList!}/>
        </div>

    </div>
  )
}

export default Sandbox