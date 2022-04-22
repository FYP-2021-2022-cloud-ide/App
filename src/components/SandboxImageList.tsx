import { PlusIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import { useSandbox } from "../contexts/sandbox";
import { SandboxImage } from "../lib/cnails";
import SandboxImagesCard from "./SandboxImageCard";

export type Props = {
  sandboxImages: SandboxImage[];
  onCreateBtnClick: () => void;
  onSandboxClick?: (sandboxImage: SandboxImage) => void;
  menuItems: (sandboxImage: SandboxImage) => {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
};

const SandboxImageList = () => {
  const { sandboxImages, setCreateOpen } = useSandbox();

  const onCreate = useCallback(() => {
    setCreateOpen(true);
  }, [setCreateOpen]);

  return (
    <div
      id="sandbox-grid"
      className="sandbox-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {sandboxImages
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((sandboxImage, index) => (
          <SandboxImagesCard
            key={sandboxImage.id}
            sandboxImage={sandboxImage}
            zIndex={sandboxImages.length - index}
            id={`sandbox-card-${index}`}
          ></SandboxImagesCard>
        ))}
      {/* a button to create sanbox */}
      <div
        id="sandbox-create-btn"
        className="h-full min-h-[8rem] w-full rounded border-4 border-dashed border-gray-300 dark:border-gray-500 text-gray-300 dark:text-gray-500 flex justify-center transition items-center ease-in-out duration-300 bg-transparent cursor-pointer hover:bg-gray-500/10 dark:hover:bg-white/10"
        title="Create a personal workspace"
        onClick={onCreate}
      >
        <PlusIcon className="w-5 h-5"></PlusIcon>
      </div>
    </div>
  );
};

export default SandboxImageList;
