import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { Loader } from "../loader/loader";
import { Button } from "../../ui/button/button";
import { CheckoutPayment } from "./checkoutPayment";
import { getErrorMessage } from "../../../helper/getErrorMessage";

type stepType = {
  contentId: string;
  id: string;
  index: number;
  name: string;
  status: keyof typeof statusMap;
  transactionId: string;
  policyId?: string;
  type: "payment" | "product";
  processedData: Object;
};

type transactionType = {
  id: string;
  sessionId: string;
  status: keyof typeof statusMap;
  steps: stepType[];
};

const statusMap = {
  successful: "Successful",
  in_progress: "In progress",
  pending: "Pending",
  failed: "Failed",
  cancelled: "Cancelled",
};

export default function Checkout() {
  const [transactionData, setTransactionData] = useState<transactionType | null>(null);
  const [searchParams] = useSearchParams();
  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getTransactionDetails = async (transactionId: string, showOverlay: boolean = true) => {
    const body = {
      transactionId: transactionId,
    };

    if (showOverlay) loadingOverlay.open("Please wait", "Getting transaction...");

    const jsonData = await customFetch("/buy/getTransaction", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (showOverlay) loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      //window.location.href = "/";
      //alerter.alertMessage("Success");
      setTransactionData(jsonData.data);
    }
  };

  useEffect(() => {
    if (!searchParams.get("transactionId")) return;

    getTransactionDetails(searchParams.get("transactionId") as string);
    const intervalId = setInterval(() => {
      getTransactionDetails(searchParams.get("transactionId") as string, false);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [searchParams]);

  return (
    <>
      {loadingOverlay.render}
      {alerter.render}
      <div className="w-full h-full flex flex-col gap-10">
        <div className="flex flex-col items-center">
          <div className="h2 text-primary pb-6 text-center w-full">Checkout</div>
          <div>
            <span className="flex gap-2">
              <span className="text-primary font-semibold whitespace-nowrap">Transaction ID: </span>
              <span className="text-presetgray font-semibold">{transactionData?.id}</span>
            </span>
            <span className="flex gap-2">
              <span className="text-primary font-semibold whitespace-nowrap">Status: </span>
              <span className="text-presetgray font-semibold">
                {transactionData !== null ? statusMap[transactionData.status] : ""}
              </span>
            </span>
          </div>
        </div>
        {transactionData !== null ? (
          <div>
            <div className="flex flex-col gap-6">
              {transactionData.steps
                .sort((a, b) => a.index - b.index)
                .map((step) => {
                  return <StepItem stepData={step} />;
                })}
            </div>
          </div>
        ) : (
          <div>Loading checkout...</div>
        )}
      </div>
    </>
  );
}

const StepItem = ({ stepData }: { stepData: stepType }) => {
  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPolicy = async () => {
    const jsonData = await customFetch(`/policy/get?id=${stepData.policyId}`, {
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

        alerter.alertMessage({ description: null, message: "File downloaded successfully", type: "success" });
      } catch (err: any) {
        alerter.alertMessage({ description: null, message: "Failed to start download", type: "error" });
      }
    }
  };

  const typeClassName = {
    successful: "bg-green-400 text-white border-2 border-green-500",
    failed: "bg-red-400 text-white border-2 border-red-500",
    in_progress: "border-2 border-primary text-primary",
    pending: "border-2 border-gray-300 text-gray-300",
    cancelled: "border-2 border-gray-300 text-gray-300",
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-between gap-2 w-full">
        {loadingOverlay.render}
        {alerter.render}
        <div className="flex items-center gap-4">
          {stepData.status !== "in_progress" ? (
            <div
              className={`h-10 w-10 min-w-10 sm:h-14 sm:w-14 rounded-full flex items-center justify-center ${
                typeClassName[stepData.status]
              }`}
            >
              <div className="font-semibold text-lg">
                {stepData.status === "successful" ? <span>&#10003;</span> : stepData.index + 1}
              </div>
            </div>
          ) : (
            <div className="h-10 w-10 sm:h-14 sm:w-14 relative">
              <Loader />
              <div className="font-semibold text-lg absolute top-0 left-0 h-full w-full flex items-center justify-center">
                <div className="text-primary">{stepData.index + 1}</div>
              </div>
            </div>
          )}
          <div
            className={`${stepData.status === "successful" && "text-green-400"} ${
              stepData.status === "failed" && "text-red-400"
            } ${stepData.status === "in_progress" && "text-primary"} ${
              stepData.status === "pending" && "text-gray-300"
            } font-bold text-base sm:text-lg`}
          >
            {stepData.name}
          </div>
        </div>
        <div className="h-2 flex-grow flex items-center justify-center">
          <hr className="w-full" />
        </div>
        <div
          className={`${stepData.status === "successful" && "text-green-400"} ${
            stepData.status === "failed" && "text-red-400"
          } ${stepData.status === "in_progress" && "text-primary"} ${
            stepData.status === "pending" && "text-gray-300"
          } font-bold text-base sm:text-lg`}
        >
          {statusMap[stepData.status]}
        </div>
      </div>
      <div className="">
        {stepData.policyId ? (
          <Button
            buttonType="secondary"
            style={{
              paddingTop: 4,
              paddingBottom: 4,
            }}
            onClick={getPolicy}
          >
            Shkarko
          </Button>
        ) : (
          <div></div>
        )}
        {stepData.type === "payment" && stepData.status === "in_progress" ? (
          <CheckoutPayment paymentObject={stepData.processedData} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
