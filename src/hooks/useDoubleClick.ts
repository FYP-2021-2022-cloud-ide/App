import React, { useCallback, useEffect, useRef } from "react";

const delay = 300;

type Params = {
  onSingleClick: React.MouseEventHandler<HTMLElement>;
  onDoubleClick: React.MouseEventHandler<HTMLElement>;
};

/**
 * this hook handle the difference between single click and double click.
 * If double click, the single click callback will not fire.
 */
function useDoubleClick({ onSingleClick, onDoubleClick }: Params) {
  const clickCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      clickCountRef.current += 1;

      if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          if (clickCountRef.current === 1) onSingleClick(e);
          else onDoubleClick(e);
          clickCountRef.current = 0;
          timerRef.current = null;
        }, delay);
      }
    },
    [clickCountRef, timerRef, onSingleClick, onDoubleClick]
  );

  return onClick;
}

export default useDoubleClick;
