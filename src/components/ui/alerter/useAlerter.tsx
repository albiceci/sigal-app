import { useState } from "react";
import { createPortal } from "react-dom";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

const AlertMessage = ({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-red-50 border border-red-400 rounded-sm py-2 px-4 text-red-400 font-semibold cursor-pointer"
    >
      {message}
    </div>
  );
};

export const useAlerter = () => {
  const [messages, setMessages] = useState<{ message: string; id: string }[]>(
    []
  );
  const pageContainer = document.getElementById("alerterContainer");

  const removeAlert = (messageId: string) => {
    setMessages((prev) => {
      return prev.filter((message) => message.id !== messageId);
    });
  };

  const alertMessage = (message: string) => {
    const messageId = uuidv4();

    setMessages((prev) => {
      return [...prev, { message: message, id: messageId }];
    });

    setTimeout(removeAlert, 10000, messageId);
  };

  return {
    render: (
      <>
        {pageContainer
          ? createPortal(
              <div className="flex flex-col gap-2">
                {messages.map((message) => {
                  return (
                    <AlertMessage
                      message={message.message}
                      key={message.id}
                      onClick={() => {
                        removeAlert(message.id);
                      }}
                    />
                  );
                })}
              </div>,
              pageContainer
            )
          : null}
      </>
    ),
    alertMessage: alertMessage,
  };
};
