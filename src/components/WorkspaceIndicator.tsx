type Props = {
  color: "yellow" | "green" | "gray";
};

const WorkspaceIndicator = ({ color }: Props) => {
  return (
    <span className="relative flex h-3 w-3">
      {(color == "green" || color == "yellow") && (
        <span
          className={`absolute animate-ping inline-flex h-full w-full rounded-full  opacity-75 ${
            (color == "green" && "bg-green-400") ||
            (color == "yellow" && "bg-yellow-400")
          }`}
        ></span>
      )}
      <span
        className={`relative inline-flex rounded-full h-3 w-3 ${
          (color == "green" && "bg-green-400") ||
          (color == "yellow" && "bg-yellow-400") ||
          (color == "gray" && "bg-gray-400")
        }`}
      ></span>
    </span>
  );
};

export default WorkspaceIndicator;
