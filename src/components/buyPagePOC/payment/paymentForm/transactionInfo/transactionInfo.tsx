import { useContext, useEffect, useState } from "react";
import { allFormContext } from "../../../formBuilder";
import { PRODUCT_INFO, PRODUCT_SITE_ID } from "../../../productConstants";
import { useTranslation } from "react-i18next";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { useServer } from "../../../../../util/useServer";
import { getErrorMessage } from "../../../../../helper/getErrorMessage";
import { roundToTwoDecimals } from "../../../../../helper/roundToTwoDecimals";

import exchange from "./exchange.svg";

export const TransactionInfo = () => {
  const { allFormData } = useContext(allFormContext);
  const { t } = useTranslation();

  const [rates, setRates] = useState<{
    id: string;
    createdAt: string;
    ALL: number;
    EUR: number;
    USD: number;
  } | null>(null);

  const [isRatesLoading, setIsRatesLoading] = useState(true);
  const [isRatesError, setIsRatesError] = useState(false);

  const customFetch = useServer();
  const alerter = useAlerter();

  const activeProducts = allFormData.activeProduct
    //Removed payment from the list
    .filter((productSiteId) => productSiteId !== PRODUCT_INFO.PAYMENT.productSiteId)
    .map((productSiteId: PRODUCT_SITE_ID) => {
      return {
        formData: allFormData[productSiteId as Exclude<PRODUCT_SITE_ID, "PAYMENT">]!,
        productData: PRODUCT_INFO[productSiteId as PRODUCT_SITE_ID],
      };
    });

  const currencies = activeProducts.map((product: any) => {
    return product.formData.premiumCurrency.value;
  });

  const mainCurrency = currencies.every((currency: string) => currency === currencies[0]) ? currencies[0] : "ALL";

  const getConvertedPremium = (currency: "ALL" | "EUR", value: number) => {
    if (rates && rates[currency] && currency !== mainCurrency) return roundToTwoDecimals(value * rates[currency]);
  };

  const getDiscountedPremium = (value: string) => {
    //Check if we have an active bundle and apply dicount if so

    if (!allFormData.currentBundle) {
      return null;
    } else {
      return String(roundToTwoDecimals((Number(value) * (100 - allFormData.currentBundle.discount)) / 100));
    }
  };

  //Sum of all premiums
  const getSubtotalAmount = () => {
    var subTotal = 0;
    activeProducts.forEach((product) => {
      subTotal +=
        Number(
          getConvertedPremium(product.formData.premiumCurrency.value as "EUR", Number(product.formData.premium.value)),
        ) || Number(product.formData?.premium.value);
    });

    return subTotal;
  };

  //Sum of all ducounted premiums
  const getTotalAmount = () => {
    var total = 0;
    activeProducts.forEach((product: any) => {
      total +=
        Number(
          getConvertedPremium(
            product.formData.premiumCurrency.value,
            getDiscountedPremium(product.formData.premium.value) || product.formData.premium.value,
          ),
        ) ||
        Number(getDiscountedPremium(product.formData.premium.value)) ||
        Number(product.formData.premium.value);
    });

    return total;
  };

  useEffect(() => {
    getRates();
  }, []);

  ///////////CUSTOM FUNCTIONS/////////////////////////////////////////////

  const getRates = async () => {
    setIsRatesLoading(true);
    const jsonData = await customFetch(`/form/rates`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      setIsRatesError(true);
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setIsRatesError(false);
      setRates(jsonData.data);
      setIsRatesLoading(false);
    }
  };

  const ProductInfo = ({ name, value }: { name: string; value: string }) => {
    return (
      <div className="flex px-1 gap-1">
        <span className="text-nowrap">{t(name)}:</span>
        <span className="font-semibold">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 rounded-md border border-b-2 w-full h-fit py-4 px-2 flex gap-4 flex-col">
      {alerter.render}
      <div className="w-full flex items-center justify-center">
        <span className="text-lg font-bold text-presetblack">{t("form.payment.transactionInfo.title")}</span>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {activeProducts.map((product: any) => {
          return (
            <div className="flex gap-2 bg-white border px-2 py-2 rounded-md min-h-[100px]">
              {/*IMAGE*/}
              <div className="w-[70px] sm:w-[100px] border border-primary rounded-md">{product.productData.image}</div>
              <div className="flex flex-col justify-between">
                {/*NAME AND INFO*/}
                <div>
                  <div className="font-bold text-primary text-lg">{t(product.productData.name)}</div>
                  <div className="text-xs sm:text-sm text-presetgray flex flex-wrap max-w-[250px]">
                    {product.productData.category === "car" && (
                      <>
                        <ProductInfo name={"form.placeholder.licence"} value={product.formData.licence.value} />
                      </>
                    )}
                    {product.productData.category === "health" && (
                      <>
                        <ProductInfo
                          name={"form.person.title"}
                          value={`${product.formData.name.value} ${product.formData.surname.value}${product.formData.additionalPeople.value.length ? ` + ${product.formData.additionalPeople.value.length}` : ""}`}
                        />
                      </>
                    )}
                    {product.productData.category === "marina" && (
                      <>
                        <ProductInfo name={"form.placeholder.objectName"} value={product.formData.objectName.value} />
                      </>
                    )}
                    {product.productData.category === "wealth" && (
                      <>
                        <ProductInfo name={"form.placeholder.area"} value={product.formData.area.value} />
                      </>
                    )}
                  </div>
                </div>
                {/*PREMIUM*/}
                <div className="font-bold text-primary text-sm sm:text-base">
                  <div className="w-fit">
                    {/*DISCOUNT LINE*/}
                    {getDiscountedPremium(product.formData.premium.value) ? (
                      <hr className="h-[2px] bg-red-500 rounded-full translate-y-[10px] sm:translate-y-[15px] -rotate-6" />
                    ) : (
                      ""
                    )}
                    {/*DEFAULT PREMIUM*/}
                    <span>{product.formData.premiumCurrency.value} </span>
                    <span>{Number(product.formData.premium.value).toLocaleString()}</span>
                    <> </>
                  </div>
                  {/*DISCOUNTED PREMIUM*/}
                  <div className="flex gap-1 sm:gap-3">
                    {getDiscountedPremium(product.formData.premium.value) ? (
                      <div className="text-green-500 flex gap-1">
                        <span>{product.formData.premiumCurrency.value} </span>
                        <span className="">
                          {Number(getDiscountedPremium(product.formData.premium.value))?.toLocaleString()}
                        </span>
                      </div>
                    ) : null}
                    {/*CONVERTED PREMIUM*/}
                    {product.formData.premiumCurrency.value !== mainCurrency ? (
                      <>
                        <img
                          src={exchange}
                          className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]"
                          alt="Currency exchange icon"
                        />
                        <div className="text-green-500 flex gap-1">
                          <span>{mainCurrency} </span>
                          <span className="">
                            {getConvertedPremium(
                              product.formData.premiumCurrency.value,
                              getDiscountedPremium(product.formData.premium.value) || product.formData.premium.value,
                            )?.toLocaleString()}
                          </span>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/*SUBTOTAL*/}
      <div className="px-6">
        <div className="flex items-center justify-between">
          <span className="text-presetgray">{t("form.payment.transactionInfo.subTotal")}</span>
          <div className="font-semibold text-presetblack">
            {mainCurrency} {getSubtotalAmount().toLocaleString()}
          </div>
        </div>
        {/*DISCOUNT*/}
        <div className="flex items-center justify-between">
          <span className="text-presetgray">{t("form.payment.transactionInfo.discount")}</span>
          <div className="font-semibold text-presetblack">
            - {mainCurrency} {(getSubtotalAmount() - getTotalAmount()).toLocaleString()}
          </div>
        </div>
        {/*TOTAL*/}
        <div className="flex items-center justify-between">
          <span className="text-presetgray font-bold font-boldFamily">{t("form.payment.transactionInfo.total")}</span>
          <div className="font-bold text-presetblack">
            {mainCurrency} {getTotalAmount().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
