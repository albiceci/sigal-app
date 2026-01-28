import { useCallback, useContext } from "react";
import { sessionContext } from "./sessionContainer";

export const useServer = () => {
  const server_url = "/api";
  const { sessionData } = useContext(sessionContext);

  const customFetch = useCallback(
    async (
      url: string,
      options: {
        headers?: HeadersInit;
        body?: object;
        method: "GET" | "POST" | "PUT" | "DELETE";
      },
      isJsonResponse: boolean = true,
    ) => {
      const res = await fetch(server_url + url, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          sessionId: sessionData?.id ?? "",
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (res.status !== 200) {
        return {
          status: res.status,
          message: "Something went wrong. Try again.",
        };
      }

      if (isJsonResponse) {
        const jsonResponse = await res.json();

        if (jsonResponse.status === 401) window.location.reload();
        else if (jsonResponse.status === 403) window.location.href = "/login";
        return jsonResponse;
      } else {
        return res;
      }
    },
    [sessionData?.id],
  );

  return customFetch;
};
