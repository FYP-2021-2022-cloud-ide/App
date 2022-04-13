import { useState, useRef, useEffect } from "react";

/**
 * this hook handles the click outside event of a component. The component will be set to invisible if click outside.
 * @param initialIsVisible whether the component should be visible initially
 * @returns
 */
export default function useComponentVisible(initialIsVisible: boolean = false) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    // document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener("contextmenu", handleClickOutside, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      // document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener("contextmenu", handleClickOutside, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
