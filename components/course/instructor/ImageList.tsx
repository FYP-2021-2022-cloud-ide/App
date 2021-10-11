import Environment from "./Environment"
import {CubeIcon} from "@heroicons/react/outline"
import {PlusCircleIcon} from "@heroicons/react/solid"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Modal from "../../Modal"
import ListBox from "../../ListBox"

interface image{
    imageId:string
    imageName: string
    description: string
}

interface props{
    images: image[]
}
 
const ImageList = ({images}:props)=>{//
    // var images=[
    //     { name: "fdgsdd",
    //     description: "sdfgdga gdfgggfdgdgdfgdf dfg sdfgsfd gsd gs dd"},
    //     { name: "fdgsdd",
    //     description: "sdfgdga gdfgggfdgdgdfgdf dfg sdfgsfd gsd gs dd"}
    // ]
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false)
    }

    return(
        <div className="flex flex-col justify-start">
            <div className="flex flex-row text-gray-600 justify-start gap-x-4 pb-4">
                {/* <img src="/coursePage/dockerWhale.svg"  className="" /> */}
                <CubeIcon className="w-7 h-7"></CubeIcon>
                <div className="text-lg">Environments</div>
                <button onClick={openModal}>
                    <PlusCircleIcon className="w-7 h-7 hover:scale-110 transition transition-all ease-in-out duration-300"></PlusCircleIcon>
                </button>
            </div>
            {images?.length? 
            <div className="grid grid-cols-2 gap-8 pr-4"> {images.map((image)=>{
                return(
                    <Environment image={image}></Environment>
                );
                })}</div>
                :
            <button className="border broder-gray-200 shadow-sm rounded-lg bg-white
            p-4 hover:shadow-lg transition-all ease-in-out duration-300 h-24"
            onClick ={(e) =>{
                }}
                tabIndex={0}
            >
                <div className="ml-4 mt-2 font-semibold text-sm text-gray-500">
                    There is no environment for this course yet.
                </div>
            </button>}
            <Modal isOpen={isOpen} setOpen={setIsOpen}>
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-[#415A6E]">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6"
                    >
                        Add Environment
                    </Dialog.Title>
                    <div className="mt-2 font-medium mt-4">
                        Pick Libray needed
                    </div>
                    <ListBox></ListBox>

                    <div className="mt-2 font-medium mt-4">
                        Environment name
                    </div>
                    
                    <div className="p-1 border flex text-gray-500 flex-row space-x-2 focus:border-black-600 text-left rounded-xl w-96 shadow-lg">
                        <input placeholder="e.g. COMP2012" className="focus:outline-none"></input>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            onClick={()=>{}}
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-[#65A9E0] text-base leading-6 font-medium text-white shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Done
                            </button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <button onClick={closeModal} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-500 shadow-sm hover:text-gray-900 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                            </button>
                        </span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ImageList