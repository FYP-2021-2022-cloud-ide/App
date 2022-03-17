import React from "react";
import {
  getIconForFile,
  getIconForFolder,
  getIconForOpenFolder,
} from "vscode-icons-js";
import path from "path";
import Image from "next/image";

type Props = {
  droppable: boolean;
  fileName: string;
  /**
   * if this file is a directory, whether it is open
   */
  isOpen?: boolean;
  /**
   * class name for styling
   */
  className?: string;
};

/**
 * src from https://github.com/vscode-icons/vscode-icons/tree/master/icons
 */
const iconPath = "/icons/";

/**
 * given a file name and `droppable` (whether it is a directory), return the icon for the file.
 */
export const TypeIcon: React.FC<Props> = ({
  droppable,
  fileName,
  className,
  isOpen,
}: Props) => {
  const size = 16;
  return (
    <div
      className={`h-[24px] w-[24px] flex justify-center items-center ${className}`}
    >
      {droppable ? (
        isOpen ? (
          <Image
            src={iconPath + getIconForOpenFolder(fileName)}
            width={size}
            height={size}
          />
        ) : (
          <Image
            src={iconPath + getIconForFolder(fileName)}
            width={size}
            height={size}
          />
        )
      ) : (
        <Image
          src={iconPath + getIconForFile(path.extname(fileName))}
          width={size}
          height={size}
        />
      )}
    </div>
  );
};
