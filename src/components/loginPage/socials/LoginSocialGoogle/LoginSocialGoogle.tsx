import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { IResolveParams } from "reactjs-social-login";

export const LoginSocialGoogle = ({
  client_id,
  onResolve,
  children,
}: {
  client_id: string;
  children: JSX.Element;
  onResolve: ({ provider, data }: IResolveParams) => void;
}) => {
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <LoginButton onSocialsSuccess={onResolve}>{children}</LoginButton>
    </GoogleOAuthProvider>
  );
};

const LoginButton = ({
  onSocialsSuccess,
  children,
}: {
  onSocialsSuccess: ({ provider, data }: IResolveParams) => void;
  children: JSX.Element;
}) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSocialsSuccess({ provider: "google", data: tokenResponse }),
    flow: "auth-code",
  });
  return (
    <div
      onClick={() => {
        login();
      }}
    >
      {children}
    </div>
  );
};
