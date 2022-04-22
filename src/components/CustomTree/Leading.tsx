import React from "react";

const Leading = ({
  depth,
  droppable,
}: {
  depth: number;
  droppable: boolean;
}) => {
  if (depth == 0 && !droppable)
    return <div className="w-[24px] h-[24px] min-w-[24px]"></div>;
  return (
    <>
      {Array(depth)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="w-[24px] h-[24px] relative min-w-[24px]"
            >
              <div className="absolute h-full w-[1px] bg-gray-400 left-[50%]"></div>
            </div>
          );
        })}
    </>
  );
};

export default React.memo(Leading, (p, n) => {
  return p.depth == n.depth && p.droppable == n.droppable;
});
