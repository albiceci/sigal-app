import { useState } from "react";
import { Overlay } from "../../../util/overlay";
import { Loader } from "./loader";

export const useLoadingOverlay = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mainMessage, setMainMessage] = useState<string>("");
  const [subMessage, setSubMessage] = useState<string>("");

  const open = (mainMessage: string, subMessage?: string) => {
    setMainMessage(mainMessage);
    if (subMessage) setSubMessage(subMessage);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  return {
    render: (
      <>
        {isOpen ? (
          <Overlay>
            <div className="text-white border border-white max-w-[95vw] rounded-md font-semibold flex flex-col items-center justify-center backdrop-blur-sm p-5">
              <div className="mb-3">
                <Loader />
              </div>
              <div className="font-bold text-lg">{mainMessage}</div>
              <div className="text-gray-200 font-semibold text-sm text-center">{subMessage}</div>
            </div>
          </Overlay>
        ) : null}
      </>
    ),
    open,
    close,
  };
};
