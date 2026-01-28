import { useTranslation } from "react-i18next";
import sigalLogo from "../../../assets/sigal/logo/logoSigalPartialWhiteV2.svg";
import { Products } from "./products";
import { ProgressBar } from "./progressBar";
import { TransactionDetails } from "./transactionDetails";
import { useContext } from "react";
import { transactionContext } from "./checkout";
import { ErrorMessage } from "./errorMessage";
import { getErrorMessage } from "../../../helper/getErrorMessage";

export const CheckoutBuilder = () => {
  const { t } = useTranslation();
  const { transactionData } = useContext(transactionContext);

  const paymentStep = transactionData?.steps.find((step) => step.type === "payment");
  return (
    <div className="w-full bg-gray-50 py-10 px-10 rounded-lg flex gap-6 flex-col">
      <CheckoutHeader />
      {transactionData?.errorMessage && <ErrorMessage {...getErrorMessage(transactionData.errorMessage)} />}
      {paymentStep?.errorMessage && <ErrorMessage {...getErrorMessage(paymentStep.errorMessage)} />}
      <div className="flex gap-6 flex-col lg:flex-row h-fit">
        <TransactionDetails />
        <Products />
      </div>
    </div>
  );
};

const CheckoutHeader = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex gap-1 items-center justify-center">
        <div className="py-1 px-3 sm:px-4 w-fit h-fit bg-primary rounded-md">
          <img src={sigalLogo} className="w-auto h-[40px] sm:h-[50px]" alt="Sigal logo" />
        </div>
        <h1 className="h1 text-primary">Checkout</h1>
      </div>
      <ProgressBar />
    </div>
  );
};
