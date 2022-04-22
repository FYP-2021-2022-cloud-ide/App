import { useRef, useEffect, useCallback } from "react";

/**
 * this hook handles the click outside event of a component. The component will be set to invisible if click outside.
 * @param initialIsVisible whether the component should be visible initially
 * @returns
 */
export default function useOnClick<T extends HTMLElement = HTMLElement>(
  handler: (e: MouseEvent, inside: boolean) => void
) {
  const ref = useRef<T>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current) {
        handler(event, ref.current.contains(event.target as Node));
      }
    },
    [handler, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, true);
    return () => {
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [handleClick]);

  return { ref };
}
