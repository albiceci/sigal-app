import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "../../../util/reveal";

type alertMessageType = {
  message: string;
  description: string | null;
  type: "error" | "success";
};

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
}

const AlertMessage = ({
  messageData,
  onClick,
  index,
}: {
  messageData: alertMessageType;
  onClick: () => void;
  index: number;
}) => {
  const typeStyle = {
    error: {
      containerStyle: "bg-red-500",
      innerContainerStyle: "bg-red-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"
            fill="#ef4444"
          />
        </svg>
      ),
    },
    success: {
      containerStyle: "bg-green-500",
      innerContainerStyle: "bg-green-100",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
            fill="#10b981"
          />
        </svg>
      ),
    },
  };
  return (
    <Reveal duration={0.25} width="100%">
      <div
        onClick={onClick}
        className={`flex justify-end rounded-md absolute left-0 right-0 w-fit m-auto shadow-md transition-all ${
          typeStyle[messageData.type].containerStyle
        }`}
        style={{
          transform: `translate(0, ${index * 15 > 100 ? 100 : index * 15}px)`,
          scale: `${100 + index * 5 < 50 ? 50 : 100 + index * 5}%`,
        }}
      >
        <div
          className={`w-full h-full bg-black rounded-md opacity-20 absolute ${index === 0 ? "hidden" : "absolute"}`}
        ></div>
        <div
          className={`p-3 pr-4 ml-1 rounded-md flex justify-between items-center min-w-[30vw] max-w-[80vw] ${
            typeStyle[messageData.type].innerContainerStyle
          }`}
        >
          <div className="flex gap-2 items-center justify-center">
            <div className="min-w-6 min-h-6">{typeStyle[messageData.type].icon}</div>
            <div className="flex flex-col">
              <div className="font-bold text-presetgray">{messageData.message}</div>
              <div className="text-presetgray text-sm">{messageData.description}</div>
            </div>
          </div>
          <div className="h-full items-center justify-center cursor-pointer hidden sm:flex pl-3">
            <div className="min-w-4 min-h-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                  fill="#000000"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const useAlerter = () => {
  const [messages, setMessages] = useState<(alertMessageType & { id: string })[]>([]);

  /* -------------------------
   * Stable refs
   * ------------------------- */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pageContainer = document.getElementById("alerterContainer");

  /* -------------------------
   * Stable handlers
   * ------------------------- */
  const removeCurrentAlert = useCallback(() => {
    setMessages((prev) => prev.slice(0, -1));
  }, []);

  const alertMessage = useCallback((messageData: alertMessageType) => {
    console.log(messageData);
    setMessages((prev) => [...prev, { ...messageData, id: uuidv4() }]);
  }, []);

  /* -------------------------
   * Timer logic (stable)
   * ------------------------- */
  const resetInterval = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      removeCurrentAlert();
    }, 10000);
  }, [removeCurrentAlert]);

  useEffect(() => {
    if (messages.length) {
      resetInterval();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [messages.length, resetInterval]);

  /* -------------------------
   * Render (memoized)
   * ------------------------- */
  const render = useMemo(() => {
    if (!pageContainer) return null;

    return (
      <>
        {messages.map((message, index) =>
          createPortal(
            <AlertMessage
              key={message.id}
              messageData={message}
              index={index - messages.length + 1}
              onClick={removeCurrentAlert}
            />,
            pageContainer
          )
        )}
      </>
    );
  }, [messages, pageContainer, removeCurrentAlert]);

  /* -------------------------
   * Stable API
   * ------------------------- */
  return useMemo(
    () => ({
      alertMessage,
      render,
    }),
    [alertMessage, render]
  );
};
