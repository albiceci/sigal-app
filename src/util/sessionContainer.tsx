import Cookies from "universal-cookie";
import { createContext, JSX, useEffect, useState } from "react";

const cookies = new Cookies();

const sessionContext = createContext<{
  sessionData: {
    createdAt?: string;
    expiresAt?: string;
    id: string;
    userId?: string;
    user?: {
      id: string;
      email: string;
    };
  };
}>({ sessionData: { id: "" } });

const SessionContextProvider = ({ children }: { children: JSX.Element }) => {
  const [sessionData, setSessionData] = useState({
    id: cookies.get("sessionId"),
  });
  const [isValid, setIsValid] = useState(false);

  const checkSession = async () => {
    var response = await fetch(`/api/session/check`, {
      headers: { sessionId: sessionData.id },
    });

    const json_response = (await response.json()) as any;

    if (json_response.status === 200) {
      setSessionData(json_response.data);
      setIsValid(true);
    } else {
      await getNewSession();
    }
  };

  const getNewSession = async () => {
    var response = await fetch(`/api/session/create`);

    const json_response = (await response.json()) as any;

    setSessionData(json_response.data);
    cookies.set("sessionId", json_response.data.id);
    setIsValid(true);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      {isValid ? (
        <sessionContext.Provider value={{ sessionData: sessionData }}>{children}</sessionContext.Provider>
      ) : (
        "Loading"
      )}
    </>
  );
};

export { sessionContext, SessionContextProvider };
