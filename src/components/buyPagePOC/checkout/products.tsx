import { useContext } from "react";
import { statusMap, stepType, transactionContext } from "./checkout";
import { useTranslation } from "react-i18next";

import products from "./assets/products.svg";
import { PRODUCT_INFO } from "../productConstants";
import { CheckoutPayment } from "./checkoutPayment";
import { ErrorMessage } from "./errorMessage";
import { getErrorMessage } from "../../../helper/getErrorMessage";
import { Button } from "../../ui/button/button";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";

export const Products = () => {
  const { t } = useTranslation();
  const { transactionData } = useContext(transactionContext);

  const productList = transactionData?.steps
    .filter((step) => step.type === "product")
    .sort((a, b) => a.index - b.index);

  const paymentStep = transactionData?.steps.find((step) => step.type === "payment");

  return (
    <div className="flex-grow relative">
      <div className="flex gap-2 flex-col h-full">
        <div className="flex gap-2 items-center justify-start">
          <img src={products} alt={"Product Section Icon"} className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-presetgray">
            {t("transaction.section.products")} ({productList?.length})
          </h2>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            {productList?.map((step) => {
              return <ProductItem productData={step} />;
            })}
          </div>
          {paymentStep?.status === "in_progress" || paymentStep?.status === "failed" ? (
            <CheckoutPayment paymentObject={paymentStep?.processedData} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductItem = ({ productData }: { productData: stepType }) => {
  const { t } = useTranslation();
  const { transactionData } = useContext(transactionContext);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPolicy = async () => {
    loadingOverlay.open(t("form.policy.loading.title"), t("form.policy.loading.subTitle"));

    const jsonData = await customFetch(`/policy/get?id=${productData.policyId}`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      loadingOverlay.close();
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
          false,
        );

        if (!response.ok) {
          loadingOverlay.close();
          throw new Error("Failed to download file");
        }

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
        loadingOverlay.close();
        alerter.alertMessage({ description: null, message: "Failed to start download", type: "error" });
      }
    }
  };

  const status = () => {
    const commonClasses = "font-bold rounded-full px-3 text-sm h-fit";
    if (productData.status === "in_progress" || productData.status === "waiting_payment") {
      return <div className={`text-primary bg-blue-100 ${commonClasses}`}>{t(statusMap[productData.status])}</div>;
    } else if (productData.status === "successful") {
      return <div className={` bg-green-100 text-green-400 ${commonClasses}`}>{t(statusMap[productData.status])}</div>;
    } else if (productData.status === "pending") {
      return <div className={`bg-yellow-100 text-yellow-500 ${commonClasses}`}>{t(statusMap[productData.status])}</div>;
    } else if (productData.status === "failed") {
      return <div className={`bg-red-100 text-red-500 ${commonClasses}`}>{t(statusMap[productData.status])}</div>;
    }
  };

  const getFinalPremium = () => {
    if (productData.exchangedPremiumValue) {
      return `${productData.exchangedPremiumValue.toLocaleString()} ${productData.exchangedPremiumCurrency}`;
    } else if (productData.adjustedPremiumValue) {
      return `${productData.adjustedPremiumValue.toLocaleString()} ${productData.premiumCurrency}`;
    } else {
      return `${productData.premiumValue.toLocaleString()} ${productData.premiumCurrency}`;
    }
  };
  return (
    <div className="bg-white rounded-md px-3 py-2 border flex flex-col">
      {loadingOverlay.render}
      {alerter.render}
      <div className="flex justify-center md:justify-between items-center flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center md:flex-row gap-2">
          <div className="w-20 h-20">{PRODUCT_INFO[productData.contentId].image}</div>
          <div className="flex flex-col justify-between items-center md:items-start py-2">
            <div className="flex gap-2 items-center">
              <span className="text-presetgray font-bold text-lg">{t(PRODUCT_INFO[productData.contentId].name)}</span>
              {status()}
            </div>
            <span className="text-gray-400 font-bold">
              {t(`category.${PRODUCT_INFO[productData.contentId].category}.name`)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end">
          {productData.adjustedPremiumValue && (
            <span className="text-red-400 line-through">{`${productData.premiumValue.toLocaleString()} ${productData.premiumCurrency}`}</span>
          )}
          <span className="font-bold text-presetgray text-lg">{getFinalPremium()}</span>
          {productData.exchangedPremiumValue ? (
            <>
              <div className="flex gap-1 text-gray-500 items-center justify-end">
                <div className="w-fit h-fit">{currencyExchangeSVG}</div>
                <span className="text-sm font-semibold">{`${(productData.adjustedPremiumValue || productData.premiumValue).toLocaleString()} ${productData.premiumCurrency}`}</span>
              </div>
              <span className="text-sm font-semibold text-gray-500 text-end">
                Rate: {transactionData?.rate[productData.premiumCurrency]}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {productData.errorMessage && (
        <div className="px-4 py-3">
          <ErrorMessage {...getErrorMessage(productData.errorMessage)} />
        </div>
      )}
      {productData.policyId && (
        <div className="w-full flex items-center justify-center px-4 py-3">
          <div className="w-fit">
            <Button
              buttonType="secondary"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
              }}
              onClick={getPolicy}
            >
              {t("transaction.button.download")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const currencyExchangeSVG = (
  <svg
    height="12px"
    width="12px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 297.862 297.862"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g>
        <path d="M67.613,9.394c2.148-2.149,2.148-5.633,0-7.782c-2.149-2.148-5.634-2.149-7.783,0L24.607,36.834 c0,0-0.001,0.002-0.002,0.002c-0.249,0.249-0.469,0.516-0.66,0.797c-1.243,1.824-1.265,4.23-0.069,6.077 c0.093,0.143,0.191,0.281,0.298,0.416c0.02,0.024,0.035,0.05,0.055,0.074c0.071,0.088,0.151,0.17,0.228,0.254 c0.051,0.054,0.096,0.111,0.148,0.164c0,0,0,0,0.001,0v0.001L60.26,80.266c1.074,1.074,2.482,1.611,3.891,1.611 c1.409,0,2.817-0.537,3.892-1.611c2.149-2.149,2.149-5.634-0.001-7.783L41.784,46.231h227.581c3.039,0,5.503-2.465,5.503-5.504 s-2.464-5.502-5.503-5.502H41.782L67.613,9.394z"></path>
        <path d="M230.25,288.467c-2.15,2.149-2.15,5.634,0,7.782c1.074,1.075,2.482,1.612,3.891,1.612s2.816-0.537,3.891-1.612 l35.224-35.223c0,0,0.001-0.001,0.003-0.002c2.148-2.15,2.147-5.634-0.002-7.782l-35.654-35.641 c-2.149-2.148-5.633-2.148-7.783,0.002c-2.148,2.148-2.147,5.633,0.002,7.782l26.256,26.245H28.497 c-3.039,0-5.503,2.464-5.503,5.503c0,3.039,2.464,5.503,5.503,5.503H256.08L230.25,288.467z"></path>
      </g>
    </g>
  </svg>
);
