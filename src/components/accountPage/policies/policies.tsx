import { Suspense, useEffect, useState } from "react";
import { SectionContainer } from "../sectionContainer";
import { SubscriptionItem, subscriptionItemType } from "./policiesItem/policiesItem";
import React from "react";
import { Reveal } from "../../../util/reveal";
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { Button } from "../../ui/button/button";
import { useNavigate } from "react-router-dom";
import warning from "./warning.svg";
import { getErrorMessage } from "../../../helper/getErrorMessage";

const BsCarFrontFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsCarFrontFill,
  }))
);

const FaRegHospital = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegHospital,
  }))
);

const policyIcons = {
  motor: (
    <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
      <BsCarFrontFill size={30} />
    </Suspense>
  ),
  health: (
    <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
      <FaRegHospital size={30} />
    </Suspense>
  ),
};

export function Policies() {
  const [policyType, setPolicyType] = useState("motor");
  const [isCustomerIdPresent, setIsCustomerIdPresent] = useState(true);

  const [policies, setPolicies] = useState<subscriptionItemType[]>([]);

  const navigate = useNavigate();

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPolicies = async () => {
    loadingOverlay.open("Please wait", "Getting your policies.");

    const jsonData = await customFetch("/user/policies/" + policyType, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
      if (jsonData.message === "esig.customerIdNotFound") {
        setIsCustomerIdPresent((prev) => {
          return false;
        });
      }
    } else {
      setPolicies((prev) => {
        return jsonData.data.map((policy: any) => {
          return {
            ...policy,
            icon: policyIcons[policyType as keyof typeof policyIcons],
          };
        });
      });
    }
  };

  useEffect(() => {
    getPolicies();
  }, [policyType]);

  const DownloadPolicy = async (id: string) => {
    loadingOverlay.open("Please wait", "Downloading your policy.");
    const jsonData = await customFetch(`/user/policies/get?id=${id}`, {
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
            headers: {
              "Content-Type": "application/json",
            },
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
        <div className="relative py-5 px-5 bg-white border rounded-md z-30">
          <SelectInput
            placeholder={"Lloji i sigurimit"}
            name={"test"}
            value={policyType}
            isValid={true}
            options={[
              { id: "motor", text: "Motorrike" },
              { id: "health", text: "Shendeti" },
              { id: "property", text: "Prona" },
            ]}
            onOptionChange={(name: string, value: string) => {
              setPolicyType((prev) => {
                return value;
              });
            }}
          />
        </div>
        <div className="z-1">
          {isCustomerIdPresent ? (
            <div className="min-h-11">
              <div className="flex flex-col gap-1">
                <SectionContainer sectionName="Policat Aktive" defaultState={true}>
                  <div className="flex flex-col gap-2 py-2">
                    {policies
                      .filter((policy) => policy.status === "Issued")
                      .map((subscription) => {
                        return <SubscriptionItem subscription={subscription} onDownload={DownloadPolicy} />;
                      })}
                  </div>
                </SectionContainer>
                <SectionContainer sectionName="Policat Jo Aktive">
                  <div className="flex flex-col gap-2 py-2">
                    {policies
                      .filter((policy) => policy.status !== "Issued")
                      .map((subscription) => {
                        return <SubscriptionItem subscription={subscription} onDownload={DownloadPolicy} />;
                      })}
                  </div>
                </SectionContainer>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4 bg-white border rounded-md py-6 px-8">
                <div className="w-[40px]">
                  <img src={warning} alt="" />
                </div>
                <div className="text-center font-semibold text-presetgray">
                  Llogaria nuk ka nje numer personal te specifikuar. Ju lutem plotesoni infomacionin tuaj personal.
                </div>
                <div>
                  <Button
                    buttonType="secondary"
                    padding="px-4 py-2"
                    onClick={() => {
                      navigate("/account?tab=general");
                    }}
                  >
                    Ploteso Infomacionin
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
