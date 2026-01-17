import { useCallback, useMemo, useState } from "react";
import { Overlay } from "../../../util/overlay";
import { Loader } from "./loader";

const DEFAULT_STATE = {
  isOpen: false,
  mainMessage: "",
  subMessage: "",
};

export const useLoadingOverlay = () => {
  const [config, setConfig] = useState(DEFAULT_STATE);

  const open = useCallback((main: string, sub?: string) => {
    setConfig({
      isOpen: true,
      mainMessage: main,
      subMessage: sub || "",
    });
  }, []);

  const close = useCallback(() => {
    setConfig(DEFAULT_STATE);
  }, []);

  const render = useMemo(() => {
    if (!config.isOpen) return null;

    return (
      <Overlay>
        <div className="text-white border border-white max-w-[95vw] rounded-md font-semibold flex flex-col items-center justify-center backdrop-blur-sm p-5">
          <div className="mb-3">
            <Loader />
          </div>
          <div className="font-bold text-lg">{config.mainMessage}</div>
          <div className="text-gray-200 font-semibold text-sm text-center">{config.subMessage}</div>
        </div>
      </Overlay>
    );
  }, [config]);

  return useMemo(
    () => ({
      render,
      open,
      close,
    }),
    [render, open, close]
  );
};
