
import React, { useState, useEffect, useRef } from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { TypeIcon } from "./TypeIcon";
import { Dialog, Transition } from "@headlessui/react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import path from "path"


export function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        // document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('contextmenu', handleClickOutside, true)
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            // document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener("contextmenu", handleClickOutside, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}

export type CustomData = {
    fileType?: string;
    fileSize?: string;
    fileName?: string;
    filePath?: string;
}

type Props = {
    node: NodeModel<CustomData>;
    depth: number;
    isOpen: boolean;
    handleDrop?: <T extends File>  (acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent, node?: NodeModel<CustomData>) => Promise<NodeModel<CustomData>[]>,
    onToggle: (id: NodeModel["id"]) => void;
    getFilesAndReset: (data?: NodeModel<CustomData>[]) => Promise<void>,
    createFolder?: (node: NodeModel<CustomData>, name: string) => Promise<NodeModel<CustomData>[]>,
    duplicate?: (node: NodeModel<CustomData>) => Promise<NodeModel<CustomData>[]>,
    getInfo?: (node: NodeModel<CustomData>) => Promise<any>,
    remove?: (node: NodeModel<CustomData>) => Promise<NodeModel<CustomData>[]>,
    edit?: (node: NodeModel<CustomData>, newName: string) => Promise<NodeModel<CustomData>[]>,
    download?: (node: NodeModel<CustomData>) => Promise<void>,
    onClick?: (node: NodeModel<CustomData>) => Promise<void> | Promise<NodeModel<CustomData>[]> | Promise<boolean>,
    onDragStart?: (node: NodeModel<CustomData>) => Promise<void>,
    onDragEnd?: (node: NodeModel<CustomData>) => Promise<void>,
    convertor?: (data: any) => NodeModel<CustomData>[],
};

const CustomNode: React.FC<Props> = (props) => {
    const { isOpen, handleDrop, getFilesAndReset, createFolder, duplicate, getInfo, remove, edit, download, onClick, onDragStart, onDragEnd, node } = props
    const [menuLocation, setMenuLocation] = useState([0, 0]);
    const { droppable, data } = node;
    const [dragOver, setDragOver] = useState(false);
    const folderNameInputRef = React.createRef<HTMLInputElement>()
    const fileNameInputRef = React.createRef<HTMLInputElement>()
    const [showCreateFolderPopup, setShowCreateFolderPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [info, setInfo] = useState("");
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    let thisRef = useRef<any>();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        noClick: true,
        onDragEnter: () => {
            setDragOver(true)
        },
        onDragLeave: () => setDragOver(false),
        onDrop: async (acceptedFiles, fileRejections, event) => {
            setDragOver(false)
            if (handleDrop) {
                const data = await handleDrop(acceptedFiles, fileRejections, event, node)
                await getFilesAndReset(data)
            }
        }
    });


    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        // nodeOpenRef.current[node.id] = !nodeOpenRef.current[node.id]
        props.onToggle(node.id);
        if (onClick) {
            const result = await onClick(node)
            if (result == true || typeof (result) == "object") {
                if (result == true) {
                    await getFilesAndReset()
                } else {
                    await getFilesAndReset(result)
                }
            }
        }
    };

    const _createFolder = async (folderName: string) => {
        setIsComponentVisible(false)
        const res = await createFolder(node, folderName)
        await getFilesAndReset(res)
    }

    const _duplicate = async () => {
        setIsComponentVisible(false)
        const res = await duplicate(node)
        await getFilesAndReset(res)
    }

    const _edit = async (newName: string) => {
        setIsComponentVisible(false)
        const res = await edit(node, newName)
        await getFilesAndReset(res)
    }

    const _getInfo = async () => {
        setIsComponentVisible(false)
        if (getInfo) {
            return await getInfo(node)
        }
        return data
    }

    const _remove = async () => {
        setIsComponentVisible(false)
        const res = await remove(node)
        await getFilesAndReset(res)
    }

    const _download = async () => {
        setIsComponentVisible(false)
        await download(node)
    }

    return (
        <div className="" {...getRootProps({})}>
            <button
                ref={thisRef}
                onClick={async () => {
                    if (onClick) {
                        const result = await onClick(node)
                        if (result == true || typeof (result) == "object") {
                            if (result == true) {
                                await getFilesAndReset()
                            } else {
                                await getFilesAndReset(result)
                            }
                        }
                    }
                }}
                onDragStart={() => {
                    if (onDragStart)
                        onDragStart(node)
                }}
                onDragEnd={() => {
                    if (onDragEnd) {
                        onDragEnd(node)
                    }
                }}
                className={` flex flex-row items-center px-2 hover:bg-blue-200 dark:hover:bg-gray-700 w-full ${dragOver && "bg-blue-200 dark:bg-gray-500"}`}
                // draggable={false}
                onContextMenu={(e: any) => {
                    e.preventDefault()
                    if (duplicate || createFolder || remove || getInfo || download || edit) {
                        setIsComponentVisible(true)
                    }
                    setMenuLocation([e.clientX, e.clientY])
                }}
                draggable
            >
                <input {...getInputProps()} />
                {
                    Array(props.depth).fill(0).map((i, index) => {
                        return <div key={index} className="w-[24px] h-[24px] relative min-w-[24px]">
                            <div className="absolute h-full w-[1px] bg-gray-400 left-[50%]"></div>
                        </div>
                    })
                }
                {
                    props.depth == 0 && node.droppable && <div className="w-[24px] h-[24px] min-w-[24px] relative">
                        {props.isOpen ? <ChevronDownIcon onClick={handleToggle} className="openArrow" /> : <ChevronRightIcon onClick={handleToggle} className="openArrow" />}
                    </div> ||
                    props.depth == 0 && !node.droppable && <div className="w-[24px] h-[24px] min-w-[24px]"></div> ||
                    props.depth != 0 && node.droppable && <div className="w-[24px] h-[24px] min-w-[24px] relative">
                        {props.isOpen ? <ChevronDownIcon onClick={handleToggle} className="openArrow" /> : <ChevronRightIcon onClick={handleToggle} className="openArrow" />}
                    </div>
                }
                {
                    !droppable && <div className=""></div>
                }
                <TypeIcon className={`w-6 h-6 text-gray-600 `} fileName={data?.fileName} droppable={droppable} isOpen={props.isOpen} fileType={data?.fileType} extension={path.extname(data?.fileName as string)} />

                <p className="truncate w-full text-left">{node.text}</p>
            </button>
            <Transition show={isComponentVisible}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className=" ">
                <Dialog ref={ref} onClose={() => { setIsComponentVisible(false) }} style={{
                    left: menuLocation[0] + "px",
                    top: menuLocation[1] + "px",
                }} className="z-10 shadow-lg rounded-md left-[100%] absolute bg-white p-2 dark:bg-gray-700 text-gray-600 dark:text-gray-200 w-fit" >
                    <div className="flex flex-col">
                        {
                            duplicate && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left whitespace-nowrap" onClick={() => _duplicate()}>duplicate</button>
                        }
                        {
                            remove && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left  whitespace-nowrap" onClick={() => _remove()}>delete</button>
                        }
                        {
                            download && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left  whitespace-nowrap" onClick={() => _download()}>download</button>
                        }
                        {
                            edit && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left  whitespace-nowrap" onClick={() => {
                                setIsComponentVisible(false)
                                setIsEditing(true)
                            }}>edit</button>
                        }
                        {
                            createFolder && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left whitespace-nowrap" onClick={() => {
                                setIsComponentVisible(false)
                                setShowCreateFolderPopup(true)
                            }}>create folder</button>
                        }
                        {
                            getInfo && <button className="hover:bg-gray-200 dark:hover:bg-gray-500 rounded  px-2 text-left  whitespace-nowrap" onClick={async () => {
                                const stats = await _getInfo()
                                setInfo(JSON.stringify(data, null, 4))
                            }}>get info</button>
                        }
                    </div>
                </Dialog>
            </Transition>
            <Transition
                show={showCreateFolderPopup}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"

            >
                <Dialog onClose={() => { setShowCreateFolderPopup(false) }} className={`absolute shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-30 inset-0 overflow-y-auto bg-white w-fit h-fit dark:bg-gray-600 `}>
                    <div className="p-3 z-10">
                        <p>folder name :</p>
                        <input className="outline-none px-2 bg-white border border-gray-400 rounded mr-3 w-96 dark:bg-gray-700 dark:text-white text-gray-600" ref={folderNameInputRef} />
                        <button className="bg-green-400 text-white px-2 rounded" onClick={() => {
                            if (folderNameInputRef.current)
                                if (folderNameInputRef.current.value != "")
                                    _createFolder(folderNameInputRef.current.value)
                            setShowCreateFolderPopup(false)
                        }}>OK</button>
                    </div>
                </Dialog>
            </Transition>

            <Transition
                show={isEditing}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Dialog onClose={() => { setIsEditing(false) }} className={`absolute shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-30 inset-0 overflow-y-auto bg-white dark:bg-gray-600 w-fit h-fit`}>
                    <div className="p-3 z-10">
                        <p>new file name :</p>
                        <input className="outline-none px-2 bg-white dark:bg-gray-700 border border-gray-400 rounded mr-3 w-96 text-gray-600 dark:text-white" ref={fileNameInputRef} defaultValue={path.basename(data?.fileName as string)} />
                        <button className="bg-green-400 text-white px-2 rounded" onClick={() => {
                            if (fileNameInputRef.current)
                                if (fileNameInputRef.current.value != "")
                                    _edit(fileNameInputRef.current.value)
                            setIsEditing(false)
                        }}>OK</button>
                    </div>
                </Dialog>
            </Transition>

            <Transition
                show={info != ""}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            // className="absolute h-screen w-screen flex justify-center items-center"
            >
                <Dialog onClose={() => { setInfo("") }} className={"absolute shadow-lg top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-30 inset-0 overflow-y-auto bg-white w-fit h-fit dark:bg-gray-700"}>
                    <div className="p-3 z-10">
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Info of <span className="underline">{data?.fileName}</span></p>
                        <div className="text-gray-600 dark:text-gray-200 ">
                            <p className="whitespace-pre-line">
                                {info}
                            </p>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >

    );
};

export default React.memo(CustomNode, (prevProps, nextProps) => {
    return prevProps.isOpen == nextProps.isOpen
}) 