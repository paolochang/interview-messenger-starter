import { useEffect } from "react";

export const useClickOutside = (ref, visibility, actionHandler) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        actionHandler();
      }
    };

    // Bind the event listener
    if (visibility) {
      document.addEventListener("mousedown", handleClick, true);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick, true);
    };
  }, [ref, actionHandler, visibility]);

  return { ref };
};
