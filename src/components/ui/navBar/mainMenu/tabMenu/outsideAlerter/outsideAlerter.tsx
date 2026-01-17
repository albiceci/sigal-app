import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, clickHandle: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        clickHandle(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickHandle, ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({
  children,
  clickHandle,
}: {
  children: React.ReactNode;
  clickHandle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, clickHandle);

  return (
    <div style={{ display: "flex", height: "70px" }} ref={wrapperRef}>
      {children}
    </div>
  );
}
