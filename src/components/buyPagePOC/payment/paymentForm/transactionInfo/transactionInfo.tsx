import { useContext } from "react";
import { allFormContext } from "../../../formBuilder";
import { PRODUCT_INFO, PRODUCT_SITE_ID } from "../../../productConstants";
import { useTranslation } from "react-i18next";

export const TransactionInfo = () => {
  const { allFormData } = useContext(allFormContext);
  const { t } = useTranslation();

  const getActiveProducts = () => {
    return (
      //@ts-ignore
      allFormData.activeProduct
        //Removed payment from the list
        .filter((productSiteId: string) => productSiteId !== PRODUCT_INFO.PAYMENT.productSiteId)
        .map((productSiteId: string) => {
          return {
            //@ts-ignore
            formData: allFormData[productSiteId],
            productData: PRODUCT_INFO[productSiteId as PRODUCT_SITE_ID],
          };
        })
    );
  };

  const getDiscountedPremium = (value: string) => {
    //Check if we have an active bundle and apply dicount if so
    //@ts-ignore
    if (!allFormData.currentBundle) {
      return null;
    } else {
      //@ts-ignore
      return String(Math.ceil((Number(value) * (100 - allFormData.currentBundle.discount)) / 100));
    }
  };

  //Sum of all premiums
  const getSubtotalAmount = () => {
    var subTotal = 0;
    getActiveProducts().forEach((product: any) => {
      subTotal += product.formData.premium.value;
    });

    return subTotal;
  };

  //Sum of all ducounted premiums
  const getTotalAmount = () => {
    var total = 0;
    getActiveProducts().forEach((product: any) => {
      total += Number(getDiscountedPremium(product.formData.premium.value)) || product.formData.premium.value;
    });

    return total;
  };

  return (
    <div className="bg-blue-50 rounded-md border border-b-2 w-full h-fit py-4 px-2 flex gap-4 flex-col">
      <div className="w-full flex items-center justify-center">
        <span className="text-lg font-bold text-presetblack">{t("form.payment.transactionInfo.title")}</span>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {getActiveProducts().map((product: any) => {
          return (
            <div className="flex gap-2 bg-white border px-2 py-2 rounded-md">
              <div className="w-[100px] border border-primary rounded-md">{product.productData.image}</div>
              <div className="flex flex-col justify-between">
                <div className="font-bold text-primary text-lg">{t(product.productData.name)}</div>
                <div className="font-bold text-primary text-lg">
                  <div className="w-fit">
                    {getDiscountedPremium(product.formData.premium.value) ? (
                      <hr className="h-[3px] bg-red-500 rounded-full translate-y-[15px] -rotate-12" />
                    ) : (
                      ""
                    )}
                    <span>{product.formData.premiumCurrency.value} </span>
                    <span>{product.formData.premium.value}</span>
                  </div>
                  {getDiscountedPremium(product.formData.premium.value) ? (
                    <div className="text-green-500">
                      <span>{product.formData.premiumCurrency.value} </span>
                      <span className="">{getDiscountedPremium(product.formData.premium.value)}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-6">
        <div className="flex items-center justify-between">
          <span className="text-presetgray">{t("form.payment.transactionInfo.subTotal")}</span>
          <div className="font-semibold text-presetblack">ALL {getSubtotalAmount()}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-presetgray">{t("form.payment.transactionInfo.discount")}</span>
          <div className="font-semibold text-presetblack">- ALL {getSubtotalAmount() - getTotalAmount()}</div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-presetgray font-bold font-boldFamily">{t("form.payment.transactionInfo.total")}</span>
          <div className="font-bold text-presetblack">ALL {getTotalAmount()}</div>
        </div>
      </div>
    </div>
  );
};
