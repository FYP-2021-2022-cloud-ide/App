import { useLayoutEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";

/**
 * put the `ref` and `cleanStyle` to the `<Tilt>` component
 * @param preserve preserve class names after removing the styles
 * @returns
 */
const useCleanTilt = (preserve: string = "") => {
  const ref = useRef<Tilt>();
  const cleanStyle = () => {
    const id = setTimeout(() => {
      if (ref.current) {
        //@ts-ignore
        let node = ref.current.wrapperEl.node as HTMLDivElement;
        if (node.getAttribute("style") != preserve) {
          node.setAttribute("style", preserve);
          cleanStyle();
        }
      }
    }, 10);
    return id;
  };
  useLayoutEffect(() => {
    const id = cleanStyle();
    return () => clearTimeout(id);
  });
  return { ref, cleanStyle };
};

export default useCleanTilt;
