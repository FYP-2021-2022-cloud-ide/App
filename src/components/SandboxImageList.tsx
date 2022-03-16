import { CubeTransparentIcon } from "@heroicons/react/outline";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/solid";
import { SandboxImage } from "../lib/cnails";
import EmptyDiv from "./EmptyDiv";
import SandboxImagesCard from "./SandboImagesCard";

export type Props = {
  sandboxImages: SandboxImage[];
  onCreateBtnClick: () => void;
  onSandboxClick: (sandboxImage: SandboxImage) => void;
  onSandboxDelete: (sandboxImage: SandboxImage) => void;
  onSandboxUpdate: (sandboxImage: SandboxImage) => void;
  onSandboxStart: (sandboxImage: SandboxImage) => void;
  onSandboxStop: (sandboxImage: SandboxImage) => void;
};

const SandboxImageList = ({
  sandboxImages,
  onCreateBtnClick,
  onSandboxClick,
  onSandboxDelete,
  onSandboxUpdate,
  onSandboxStart,
  onSandboxStop,
}: Props) => {
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
            onClick={(sandboxImage) => {
              if (onSandboxClick) onSandboxClick(sandboxImage);
            }}
            onDelete={(sandboxImage) => {
              if (onSandboxDelete) onSandboxDelete(sandboxImage);
            }}
            onUpdate={(sandboxImage) => {
              if (onSandboxUpdate) onSandboxUpdate(sandboxImage);
            }}
            onStart={(sandboxImage) => {
              if (onSandboxStart) onSandboxStart(sandboxImage);
            }}
            onStop={(sandboxImage) => {
              if (onSandboxStop) onSandboxStop(sandboxImage);
            }}
            zIndex={sandboxImages.length - index}
            id={`sandbox-card-${index}`}
          ></SandboxImagesCard>
        ))}
      <div
        id="sandbox-create-btn"
        className="h-full min-h-[8rem] w-full rounded border-4 border-dashed border-gray-300 dark:border-gray-500 text-gray-300 dark:text-gray-500 flex justify-center items-center bg-transparent cursor-pointer"
        onClick={() => {
          if (onCreateBtnClick) onCreateBtnClick();
        }}
      >
        <PlusIcon className="w-5 h-5"></PlusIcon>
      </div>
    </div>
  );
};

export default SandboxImageList;
