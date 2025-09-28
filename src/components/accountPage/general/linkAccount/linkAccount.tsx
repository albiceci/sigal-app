import { useEffect, useState } from "react";
import { useServer } from "../../../../util/useServer";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { IResolveParams, LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

type accountLinksType = {
  google?: boolean;
  facebook?: boolean;
};

export function LinkAccount() {
  const [accountLinks, setAccountLinks] = useState<accountLinksType>({});

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const onSocialsSuccess = async ({ provider, data }: IResolveParams) => {
    const body = data;

    const jsonData = await customFetch(`/user/socials/${provider}/connect`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
    } else {
      //alerter.alertMessage({ description: null, message: "Success", type: "error" });
      //window.location.href = "/";
      await getAccountLinks();
    }
  };

  const getAccountLinks = async () => {
    const jsonData = await customFetch("/user/general/accountLinks", {
      method: "GET",
      headers: {},
      body: undefined,
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
    } else {
      setAccountLinks(jsonData.data);
    }
  };

  useEffect(() => {
    getAccountLinks();
  }, []);
  return (
    <div>
      {loadingOverlay.render}
      {alerter.render}
      <div className="font-semibold text-lg text-presetgray">Llogarite e lidhura</div>
      <div className="px-3 py-2 pt-4">
        <div className="max-w-[300px] flex flex-col gap-2">
          <LoginSocialGoogle
            isOnlyGetToken
            client_id={"48105322585-48ecutfd9ogrci8c4tibq3iehuf0p8sl.apps.googleusercontent.com"}
            //onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              console.log(provider);
              console.log(data);
              onSocialsSuccess({ provider, data });
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <div
              className={`flex gap-2 items-center justify-center rounded-md border py-2 font-semibold ${
                accountLinks.google
                  ? "bg-green-200 border-green-400 cursor-default"
                  : "bg-gray-300 border-gray-500 cursor-pointer"
              }`}
            >
              <div className="w-[20px] min-w-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid">
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
              </div>
              {accountLinks.google ? "Account linked to Google" : "Link Google account"}
            </div>
          </LoginSocialGoogle>
          <LoginSocialFacebook
            isOnlyGetToken
            appId={"1688203141846349"}
            //onLoginStart={onLoginStart}
            onResolve={({ provider, data }: IResolveParams) => {
              console.log(provider);
              console.log(data);
              onSocialsSuccess({ provider, data });
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <div
              className={`flex gap-2 items-center justify-center rounded-md border py-2 font-semibold ${
                accountLinks.facebook
                  ? "bg-green-200 border-green-400 cursor-default"
                  : "bg-gray-300 border-gray-500 cursor-pointer"
              }`}
            >
              <div className="w-[20px] min-w-[20px]">
                <svg
                  viewBox="0 0 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path
                        d="M241.871,256.001 C249.673,256.001 256,249.675 256,241.872 L256,14.129 C256,6.325 249.673,0 241.871,0 L14.129,0 C6.324,0 0,6.325 0,14.129 L0,241.872 C0,249.675 6.324,256.001 14.129,256.001 L241.871,256.001"
                        fill="#395185"
                      ></path>
                      <path
                        d="M176.635,256.001 L176.635,156.864 L209.912,156.864 L214.894,118.229 L176.635,118.229 L176.635,93.561 C176.635,82.375 179.742,74.752 195.783,74.752 L216.242,74.743 L216.242,40.188 C212.702,39.717 200.558,38.665 186.43,38.665 C156.932,38.665 136.738,56.67 136.738,89.736 L136.738,118.229 L103.376,118.229 L103.376,156.864 L136.738,156.864 L136.738,256.001 L176.635,256.001"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
              {accountLinks.facebook ? "Account linked to Facebook" : "Link Facebook account"}
            </div>
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
}
