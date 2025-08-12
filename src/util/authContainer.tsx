import { useContext, useEffect, useState } from "react";
import { sessionContext } from "./sessionContainer";
import { useNavigate } from "react-router-dom";

export const AuthContainer = ({
  isLoggedIn,
  redirect,
  children,
}: {
  isLoggedIn: boolean;
  redirect: string;
  children: JSX.Element;
}) => {
  const [showComponent, setShowComponent] = useState(false);

  const navigate = useNavigate();
  const { sessionData } = useContext(sessionContext);

  useEffect(() => {
    if (isLoggedIn && sessionData.userId) {
      setShowComponent((prev) => {
        return true;
      });
    } else if (!isLoggedIn && !sessionData.userId) {
      setShowComponent((prev) => {
        return true;
      });
    } else {
      console.log(redirect);
      navigate(redirect);
      setShowComponent((prev) => {
        return true;
      });
    }
  }, [navigate]);

  if (showComponent) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};
