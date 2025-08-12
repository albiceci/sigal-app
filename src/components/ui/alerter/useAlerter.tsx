import { create } from "domain";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "../../../util/reveal";

type alertMessageType = {
  message: string;
  description: string | null;
  type: "error";
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
  };
  return (
    <Reveal width="100%">
      <div
        onClick={onClick}
        className={`flex justify-end rounded-md absolute left-0 right-0 w-fit m-auto transition-all ${
          typeStyle[messageData.type].containerStyle
        }`}
        style={{
          transform: `translate(0, ${index * 15}px)`,
          scale: `${100 + index * 5}%`,
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
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timer | null>(null);
  const pageContainer = document.getElementById("alerterContainer");

  const removeCurrentAlert = () => {
    setMessages((prev) => {
      return prev.slice(0, -1);
    });
  };

  const alertMessage = (messageData: alertMessageType) => {
    const messageId = uuidv4();

    setMessages((prev) => {
      return [...prev, { ...messageData, id: messageId }];
    });
  };

  const resetInterval = () => {
    if (currentInterval) clearTimeout(currentInterval);

    const intervalId = setTimeout(function () {
      removeCurrentAlert();
    }, 10000);

    setCurrentInterval((prev) => {
      return intervalId;
    });
  };

  useEffect(() => {
    console.log("test");
    resetInterval();
  }, [messages]);

  return {
    render: (
      <>
        {messages.map((message, index) => {
          return (
            <>
              {pageContainer
                ? createPortal(
                    <AlertMessage
                      messageData={message}
                      key={message.id}
                      index={index - messages.length + 1}
                      onClick={() => {
                        removeCurrentAlert();
                      }}
                    />,
                    pageContainer
                  )
                : null}
            </>
          );
        })}
      </>
    ),
    alertMessage: alertMessage,
  };
};
