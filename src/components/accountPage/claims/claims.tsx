import { Suspense, useEffect, useState } from "react";
import { ClaimItem, claimItemType } from "./claimsItem/claimsItem";
import React from "react";
import { Reveal } from "../../../util/reveal";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../helper/getErrorMessage";

export function Claims() {
  const [claims, setClaims] = useState<claimItemType[]>([]);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getClaims = async () => {
    loadingOverlay.open("Please wait", "Getting your policies.");

    const jsonData = await customFetch("/user/claims", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setClaims((prev) => {
        return jsonData.data.map((claim: any) => {
          return {
            ...claim,
          };
        });
      });
    }
  };

  useEffect(() => {
    getClaims();
  }, []);

  const DownloadClaimUploads = async (id: string) => {
    loadingOverlay.open("Please wait", "Downloading your uploads.");
    const jsonData = await customFetch(`/user/claims/uploads?id=${id}`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      try {
        const response = await customFetch(
          jsonData.data.fileUrl,
          {
            method: "GET",
          },
          false
        );

        if (!response.ok) throw new Error("Failed to download file");

        // Convert the response to a Blob (binary object)
        const blob = await response.blob();

        // Create a temporary object URL
        const url = window.URL.createObjectURL(blob);

        // Create an <a> tag and trigger a click
        const a = document.createElement("a");
        a.href = url;
        a.download = jsonData.data.fileName;
        document.body.appendChild(a);
        a.click();

        // Clean up
        a.remove();
        window.URL.revokeObjectURL(url);

        loadingOverlay.close();

        alerter.alertMessage({ description: null, message: "File downloaded successfully", type: "success" });
      } catch (err: any) {
        alerter.alertMessage({ description: null, message: "Failed to start download", type: "error" });
      }
    }
  };

  return (
    <Reveal width="100%" height="100%" delay={0} duration={0.5}>
      {loadingOverlay.render}
      {alerter.render}
      <div className="h-fit flex flex-col gap-5">
        <div className="">
          <div className="min-h-32">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-2 py-2">
                {claims.map((claim) => {
                  return <ClaimItem claimData={claim} onDownload={DownloadClaimUploads} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
