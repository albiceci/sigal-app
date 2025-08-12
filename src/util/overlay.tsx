import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "./reveal";

export const Overlay = ({ children }: { children: ReactNode }) => {
  const overlayContainer = document.getElementById("overlayContainer");

  return (
    <>
      {overlayContainer
        ? createPortal(
            <div
              className={`w-full h-[100dvh] top-0 fixed flex items-center justify-center z-[10]`}
            >
              <div className="absolute h-full w-full bg-presetgray opacity-50 z-[-1] blur-lg"></div>
              <Reveal delay={0} duration={0.5}>
                {children}
              </Reveal>
            </div>,
            overlayContainer
          )
        : null}
    </>
  );
};
