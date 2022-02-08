import React from "react";
// import FolderIcon from "@material-ui/icons/Folder";
// import ImageIcon from "@material-ui/icons/Image";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import DescriptionIcon from "@material-ui/icons/Description";
import { getIconForFile, getIconForFolder, getIconForOpenFolder } from 'vscode-icons-js';

import { FolderIcon, FolderOpenIcon, PhotographIcon as ImageIcon, MenuAlt2Icon as ListAltIcon, DocumentTextIcon as DescriptionIcon } from '@heroicons/react/solid';
import Image from "next/image"

type Props = {
    droppable: boolean;
    fileType?: string;
    isOpen?: boolean;
    extension?: string;
    className: string;
    fileName?: string;
};

// const iconPath = "https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/"
const iconPath = "/icons/"

export const TypeIcon: React.FC<Props> = ({ droppable, fileName, fileType, extension, className, isOpen }: Props) => {
    if (droppable) {
        if (isOpen)
            // return <FolderOpenIcon className={className} />;
            return <div className={`h-[24px] w-[24px] flex justify-center items-center ${className}`}>
                <Image src={iconPath + getIconForOpenFolder(fileName as string)} width={16} height={16} />
            </div>
        else
            // return <FolderIcon className={className} />;
            return <div className={`h-[24px] w-[24px] flex justify-center items-center ${className}`}>
                <Image src={iconPath + getIconForFolder(fileName as string)} width={16} height={16} />
            </div>
    }

    // switch(extension){
    //   case "png": 
    //   case "svg" : 
    //   case "jpg" : 
    //   case "jpeg" :
    //   return <ImageIcon className={className} />;
    //   case "csv": return <ListAltIcon className={className} />;
    //   case "text": return <DescriptionIcon className={className} />;
    //   // default: return <div className={className}></div>;
    //   default: return <DescriptionIcon className={className} />;
    // }
    return <div className={`h-[24px] w-[24px] flex justify-center items-center ${className}`}>
        <Image src={iconPath + getIconForFile(extension ? extension : "")} width={16} height={16} />
    </div>
};