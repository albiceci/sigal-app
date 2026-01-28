import { useContext } from "react";
import { statusMap, stepType, transactionContext } from "./checkout";
import { PRODUCT_INFO } from "../productConstants";
import { useTranslation } from "react-i18next";
import { Loader } from "./assets/loader/loader";

import error from "./assets/errorWhite.svg";

export const ProgressBar = () => {
  const { transactionData } = useContext(transactionContext);

  return (
    <div className="w-full bg-white py-3 px-4 md:px-1 rounded-md border flex flex-col md:flex-row justify-between gap-4 relative">
      <hr className="md:w-[90%] md:h-[3px] w-[3px] h-[90%] bg-gray-300 absolute md:left-0 md:right-0 md:m-auto z-[1] md:translate-y-5 translate-x-5 md:translate-x-0" />
      <div></div>
      {transactionData?.steps
        .sort((a, b) => a.index - b.index)
        .map((step) => {
          return (
            <ProgressItem
              stepData={{
                ...step,
                status: step.type === "payment" && transactionData.status === "expired" ? "expired" : step.status,
              }}
            />
          );
        })}
      <div></div>
    </div>
  );
};

const ProgressItem = ({ stepData }: { stepData: stepType }) => {
  const { t } = useTranslation();

  const indexBubble = () => {
    const commonClasses = "h-10 w-10 rounded-full flex items-center justify-center font-bold";

    if (stepData.status === "in_progress" || stepData.status === "waiting_payment") {
      return (
        <div className={`bg-white relative ${commonClasses}`}>
          <Loader />
          <div className="font-bold absolute top-0 left-0 h-full w-full flex items-center justify-center">
            <div className="text-primary">{stepData.index + 1}</div>
          </div>
        </div>
      );
    } else if (stepData.status === "successful") {
      return (
        <div className={` bg-green-400 text-white ${commonClasses}`}>
          <span>&#10003;</span>
        </div>
      );
    } else if (stepData.status === "pending") {
      return (
        <div className={`border-2 bg-white border-gray-400 text-gray-400 ${commonClasses}`}>
          <span>{stepData.index + 1}</span>
        </div>
      );
    } else if (
      stepData.status === "failed" ||
      stepData.status === "expired" ||
      stepData.status === "data_processing_failed" ||
      stepData.status === "not_approved"
    ) {
      return (
        <div className={`bg-red-500 ${commonClasses}`}>
          <span>
            <img className="w-5 h-5" src={error} alt={"Error Icon"} />
          </span>
        </div>
      );
    }
  };

  const name = () => {
    const commonClasses = "font-bold";
    if (stepData.status === "in_progress" || stepData.status === "waiting_payment") {
      return <div className={`text-primary ${commonClasses}`}>{t(PRODUCT_INFO[stepData.contentId].name)}</div>;
    } else if (stepData.status === "successful") {
      return <div className={`text-green-400 ${commonClasses}`}>{t(PRODUCT_INFO[stepData.contentId].name)}</div>;
    } else if (stepData.status === "pending") {
      return <div className={`text-gray-400 ${commonClasses}`}>{t(PRODUCT_INFO[stepData.contentId].name)}</div>;
    } else if (
      stepData.status === "failed" ||
      stepData.status === "expired" ||
      stepData.status === "data_processing_failed" ||
      stepData.status === "not_approved"
    ) {
      return <div className={`text-red-500 ${commonClasses}`}>{t(PRODUCT_INFO[stepData.contentId].name)}</div>;
    }
  };

  const status = () => {
    const commonClasses = "font-bold rounded-full px-3 text-sm text-nowrap";
    if (stepData.status === "in_progress" || stepData.status === "waiting_payment") {
      return <div className={`text-primary bg-blue-100 ${commonClasses}`}>{t(statusMap[stepData.status])}</div>;
    } else if (stepData.status === "successful") {
      return <div className={` bg-green-100 text-green-400 ${commonClasses}`}>{t(statusMap[stepData.status])}</div>;
    } else if (stepData.status === "pending") {
      return <div className={`bg-gray-100 text-gray-400 ${commonClasses}`}>{t(statusMap[stepData.status])}</div>;
    } else if (
      stepData.status === "failed" ||
      stepData.status === "expired" ||
      stepData.status === "data_processing_failed" ||
      stepData.status === "not_approved"
    ) {
      return <div className={`bg-red-100 text-red-500 ${commonClasses}`}>{t(statusMap[stepData.status])}</div>;
    }
  };

  return (
    <div className="flex md:flex-col items-center justify-start md:justify-center gap-2 z-[2]">
      {indexBubble()}
      <div className="flex md:flex-col items-center justify-center gap-1">
        {name()}
        {status()}
      </div>
    </div>
  );
};
