import { CubeTransparentIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { SandboxImage } from "../lib/cnails";
import EmptyDiv from "./EmptyDiv";
import SandboxImagesCard from "./SandboImagesCard";

export type Props = {
  sandboxImages: SandboxImage[];
  onCreateBtnClick: () => void;
  onSandboxClick: (sandboxImage: SandboxImage) => void;
  onSandboxDelete: (sandboxImage: SandboxImage) => void;
  onSandboxUpdate: (sandboxImage: SandboxImage) => void;
  onSandboxOpen : (sandboxImage: SandboxImage) => void;
  onSandboxClose: (sandboxImage: SandboxImage) => void;
};

const SandboxImageList = ({
  sandboxImages,
  onCreateBtnClick,
  onSandboxClick,
  onSandboxDelete,
  onSandboxUpdate,
  onSandboxOpen,
  onSandboxClose,
}: Props) => {
  return (
    <div className="env-list-container">
      <div className="env-list-header">
        <CubeTransparentIcon className="course-list-title-icon"></CubeTransparentIcon>
        <div className="env-grid-title">Sandboxes</div>
        <button
          onClick={() => {
            if (onCreateBtnClick) onCreateBtnClick();
          }}
        >
          {" "}
          <PlusCircleIcon className="course-list-title-add"></PlusCircleIcon>
        </button>
      </div>
      {
        // generate the sandbox cards
        sandboxImages.length == 0 ? (
          <EmptyDiv message="You have no sandbox yet."></EmptyDiv>
        ) : (
          <div className="env-grid grid-cols-2 lg:grid-cols-3">
            {sandboxImages.map((sandboxImage) => (
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
                onOpen={(sandboxImage) => {
                  if (onSandboxOpen) onSandboxOpen(sandboxImage);
                }}
                onClose={(sandboxImage) => {
                  if (onSandboxClose) onSandboxClose(sandboxImage);
                }}
              ></SandboxImagesCard>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default SandboxImageList;
