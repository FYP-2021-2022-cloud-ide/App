import { MenuItem } from "../components/CardMenu";
import { useCnails } from "../contexts/cnails";
import { useContainers } from "../contexts/containers";
import { useSandbox } from "../contexts/sandbox";
import { Container, SandboxImage } from "../lib/cnails";
import { CPU, memory } from "../lib/formHelper";
import useContainerCard from "./useContainerCard";

type Return = {
  container: Container;
  onClick: (e: React.MouseEvent) => void;
  color: "gray" | "yellow" | "green";
  menuItems: MenuItem[];
  duration: string;
  comment: string;
};

const useSandboxImageCard = (sandboxImage: SandboxImage): Return => {
  const { sub, userId } = useCnails();
  const { containers, createContainer, removeContainer } = useContainers();
  const { setUpdateOpen, setUpdateTarget, removeSandboxImage } = useSandbox();
  const { status } = sandboxImage;
  const container = containers.find(
    (c) => c.redisPatch.sourceId == sandboxImage.id
  );
  const { onClick, duration } = useContainerCard(container);

  const color =
    (!container && "gray") ||
    (container.status == "DEFAULT" && "green") ||
    "yellow";

  const getComment = () => {
    if (container) {
      const { isTemporary, status } = container;
      if (isTemporary) {
        return (
          (status == "CREATING" && "starting temporary workspace...") ||
          (status == "REMOVING" && "stopping temporary workspace...") ||
          "internal being updated..."
        );
      }
      return (
        (status == "CREATING" && "starting workspace...") ||
        (status == "REMOVING" && "stopping workspace...") ||
        "running..."
      );
    }
    return (
      (status == "CREATING" && "being created...") ||
      (status == "UPDATING" && "being updated...") ||
      (status == "REMOVING" && "being removed...")
    );
  };

  const comment = getComment();

  const menuItems = [
    {
      text: "Update Info",
      onClick: () => {
        setUpdateOpen(true);
        setUpdateTarget(sandboxImage);
      },
      show: !Boolean(container),
    },
    {
      text: sandboxImage.containerId ? "Stop workspace" : "Start workspace",
      onClick: async () => {
        if (!sandboxImage.containerId)
          await createContainer({
            event: "SANDBOX_START_WORKSPACE",
            memLimit: memory,
            numCPU: CPU,
            sandboxImageId: sandboxImage.id,
            title: sandboxImage.title,
            sub: sub,
          });
        else await removeContainer(sandboxImage.containerId);
      },
    },
    {
      text: "Delete",
      onClick: async () => {
        await removeSandboxImage(sandboxImage.id);
      },
      show: !Boolean(container),
    },
    {
      text: "Update Internal",
      show: !Boolean(container),
      onClick: async () => {
        await createContainer({
          memLimit: 0,
          numCPU: 0,
          imageId: sandboxImage.imageId,
          sub: sub,
          accessRight: "root",
          title: sandboxImage.title,
          event: "SANDBOX_UPDATE",
          sourceId: sandboxImage.id,
          formData: {
            sandboxImageId: sandboxImage.id,
            title: sandboxImage.title,
            description: sandboxImage.description,
            tempContainerId: "",
            userId: userId,
          },
        });
      },
    },
  ];

  return { container, onClick, color, menuItems, duration, comment };
};

export default useSandboxImageCard;
