import { useContext } from "react";
import { statusMap, transactionContext } from "./checkout";
import { useTranslation } from "react-i18next";

import receipt from "./assets/receipt.svg";
import card from "./assets/card.svg";

export const TransactionDetails = () => {
  const { t } = useTranslation();
  const { transactionData } = useContext(transactionContext);

  const status = () => {
    const commonClasses = "font-bold rounded-full px-3 text-sm h-fit";
    if (transactionData?.status === "in_progress" || transactionData?.status === "waiting_payment") {
      return <div className={`text-primary bg-blue-100 ${commonClasses}`}>{t(statusMap[transactionData?.status])}</div>;
    } else if (transactionData?.status === "successful") {
      return (
        <div className={` bg-green-100 text-green-400 ${commonClasses}`}>{t(statusMap[transactionData?.status])}</div>
      );
    } else if (transactionData?.status === "pending") {
      return (
        <div className={`bg-yellow-100 text-yellow-500 ${commonClasses}`}>{t(statusMap[transactionData?.status])}</div>
      );
    } else if (
      transactionData?.status === "failed" ||
      transactionData?.status === "cancelled" ||
      transactionData?.status === "data_processing_failed" ||
      transactionData?.status === "partial_failure"
    ) {
      return <div className={`bg-red-100 text-red-500 ${commonClasses}`}>{t(statusMap[transactionData?.status])}</div>;
    }
  };

  return (
    <div className="bg-white border px-4 rounded-md flex-grow">
      <div className="py-6 flex gap-2 items-center">
        <img src={receipt} alt={"Summary Section Icon"} className="w-5 h-5" />
        <span className="text-lg font-semibold text-presetgray">{t("transaction.section.summary")}</span>
      </div>
      <div className="text-sm flex flex-col gap-4">
        <div className="flex justify-between gap-5 border-b pb-2">
          <span className="text-gray-400 font-semibold">ID: </span>
          <span className="text-presetgray font-semibold">{transactionData?.id}</span>
        </div>
        <div className="flex justify-between gap-5 border-b pb-2">
          <span className="text-gray-400 font-semibold">{t("transaction.summary.status")}: </span>
          <span className="text-presetgray font-semibold">{status()}</span>
        </div>
        <div className="flex justify-between gap-5 border-b pb-2">
          <span className="text-gray-400 font-semibold">{t("transaction.summary.date")}: </span>
          <span className="text-presetgray font-semibold">{transactionData?.createdAt}</span>
        </div>
        <div className="flex justify-between gap-5 border-b pb-2">
          <span className="text-gray-400 font-semibold">{t("transaction.summary.products")}: </span>
          <span className="text-presetgray font-semibold">
            {transactionData?.steps.filter((step) => step.type === "product").length}
          </span>
        </div>
        <div className="flex justify-between gap-5 border-b pb-2">
          <span className="text-gray-400 font-semibold">{t("transaction.summary.rate")}: </span>
          <span className="text-presetgray font-semibold">1 EUR = {transactionData?.rate.EUR} ALL</span>
        </div>
        {transactionData?.bundle && (
          <div className="flex justify-between gap-5 border-b pb-2">
            <span className="text-gray-400 font-semibold">{t("transaction.summary.bundle")}: </span>
            <span className="text-presetgray font-semibold">{transactionData?.bundle.promoMessage}</span>
          </div>
        )}
      </div>
      <hr className="h-[2px] bg-gray-200" />
      <div className="py-6 flex flex-col gap-2">
        <div className="flex justify-between gap-5">
          <div className="flex gap-1 items-center">
            <img src={card} alt={"Card Icon"} className="w-5 h-5" />
            <span className="text-lg font-bold text-presetgray">{t("transaction.summary.total")}</span>
          </div>
          <span className="text-lg font-bold text-presetgray">
            {transactionData?.steps.find((step) => step.type === "payment")?.premiumValue}{" "}
            {transactionData?.steps.find((step) => step.type === "payment")?.premiumCurrency}
          </span>
        </div>
      </div>
    </div>
  );
};
