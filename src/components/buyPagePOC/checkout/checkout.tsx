import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../helper/getErrorMessage";
import { useTranslation } from "react-i18next";
import { PRODUCT_SITE_ID } from "../productConstants";
import { Loader } from "../loader/loader";
import { CheckoutBuilder } from "./checkoutBuilder";

export const statusMap = {
  successful: "transaction.status.successful",
  in_progress: "transaction.status.in_progress",
  pending: "transaction.status.pending",
  failed: "transaction.status.failed",
  cancelled: "transaction.status.cancelled",
  waiting_payment: "transaction.status.waiting_payment",
  data_processing_failed: "transaction.status.data_processing_failed",
  partial_failure: "transaction.status.partial_failure",
  expired: "transaction.status.expired",
  not_approved: "transaction.status.not_approved",
};

export type stepType = {
  contentId: PRODUCT_SITE_ID;
  id: string;
  index: number;
  name: PRODUCT_SITE_ID;
  status: keyof typeof statusMap;
  transactionId: string;
  policyId?: string;
  type: "payment" | "product";
  premiumValue: number;
  premiumCurrency: "EUR" | "ALL";
  adjustedPremiumValue: number;
  exchangedPremiumValue: number;
  exchangedPremiumCurrency: "EUR" | "ALL";
  processedData: any;
  errorMessage: string;
};

export type rateType = {
  id: string;
  createdAt: string;
  ALL: number;
  EUR: number;
  USD: number;
};

export type bundleType = {
  id: string;
  products: string;
  discount: number;
  discountyType: "percentage" | "flat";
  promoMessage: string;
};

export type transactionType = {
  id: string;
  sessionId: string;
  status: keyof typeof statusMap;
  bundle: bundleType;
  rate: rateType;
  steps: stepType[];
  createdAt: string;
  errorMessage: string;
};

export const transactionContext = createContext<{
  transactionData: transactionType | null;
  setTransactionData: React.Dispatch<React.SetStateAction<transactionType | null>>;
}>({
  transactionData: null,
  setTransactionData: () => {},
});

export default function Checkout() {
  const { t } = useTranslation();
  const [transactionData, setTransactionData] = useState<transactionType | null>(null);
  const [searchParams] = useSearchParams();
  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getTransactionDetails = async (transactionId: string, showOverlay: boolean = true) => {
    const body = {
      transactionId: transactionId,
    };

    if (showOverlay) loadingOverlay.open(t("form.transaction.loading.title"), t("form.transaction.loading.subTitle"));

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
      <transactionContext.Provider value={{ transactionData: transactionData, setTransactionData: setTransactionData }}>
        {transactionData !== null ? (
          <CheckoutBuilder />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </transactionContext.Provider>
    </>
  );
}
