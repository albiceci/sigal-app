import { useNavigate } from "react-router-dom";

import "./selectOption.css";
import { Suspense, useContext, useState } from "react";
import React from "react";
import { SelectType } from "../selectType";
import { Overlay } from "../../../../util/overlay";
import { PRODUCT_INFO, PRODUCT_INFO_TYPE, PRODUCT_SITE_ID } from "../../productConstants";
import { bundleContext } from "../../bundleContext";
import { BUNDLE_TYPE } from "../../formConstants";
import { CATEGORY_INFO_TYPE } from "../../categoryConstants";
import { Button } from "../../../ui/button/button";
import { useTranslation } from "react-i18next";
import { PopUp } from "../../../ui/popUp/popUp";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

type selectTypeProps = {
  optionData: PRODUCT_INFO_TYPE | CATEGORY_INFO_TYPE;
  type?: "bundle" | "product" | "category";
  bundleProduct?: string;
};

export const SelectOption = ({ optionData, type, bundleProduct }: selectTypeProps) => {
  const { bundleData } = useContext(bundleContext);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [isBundleOpen, setIsBundleOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  function getBundleProducts(bundles: BUNDLE_TYPE[]) {
    return bundles.map((bundle) => {
      bundle.products = bundle.products.map((productName) => {
        if (typeof productName === "string" || productName instanceof String)
          return PRODUCT_INFO[productName as PRODUCT_SITE_ID];
        else return productName;
      });
      return bundle;
    });
  }

  const getPossibleBundles = (bundles: BUNDLE_TYPE[]) => {
    const possibleBundles = getBundleProducts(bundles).filter((bundle) => {
      return (bundle.products as PRODUCT_INFO_TYPE[]).filter(
        (bundleProduct) => bundleProduct.productSiteId === (optionData as PRODUCT_INFO_TYPE).productSiteId
      ).length;
    });
    return possibleBundles
      .filter((bundle) => bundle.products.length === 2)
      .map((bundle) => {
        return {
          ...(bundle.products as PRODUCT_INFO_TYPE[]).filter(
            (product) => product.productSiteId !== (optionData as PRODUCT_INFO_TYPE).productSiteId
          )[0],
          percentOff: bundle.percentageOff,
          promoMessage: bundle.promoMessage,
        };
      });
  };

  const onMoreInfoClick = () => {
    //@ts-ignore
    if (optionData.moreInfo) navigate(optionData.moreInfo);
  };

  const onBuyClick = (isForcesNav: boolean = false) => {
    if (type === "bundle" || !getPossibleBundles(bundleData as BUNDLE_TYPE[]).length || isForcesNav) {
      var url = "/buy";

      if (type === "product") {
        url += `?type=form&subtype=${optionData.paramKey}`;
      } else if (type === "bundle") {
        url += `?type=form&subtype=${bundleProduct},${optionData.paramKey}`;
      } else {
        url += `?type=${optionData.paramKey}`;
        if (optionData.subParamKey) url += `&subtype=${optionData.subParamKey}`;
      }
      navigate(url);
    } else {
      setIsBundleOpen(true);
    }
  };

  return (
    <div className="max-w-full flex items-center justify-center">
      <div
        onClick={() => {
          if (type === "product") {
            setIsAdditionalInfoOpen(true);
          } else {
            onBuyClick();
          }
        }}
        className={`z-[2] completed-borders relative cursor-pointer flex flex-col items-center justify-center m-[10px] rounded-[5px] shadow-[gray_0px_10px_25px_-10px] hover:shadow-[rgba(0,102,179,255)_0px_10px_25px_-10px] hover:border hover:border-primary hover:scale-105 transition-transform ${
          type === "bundle"
            ? "h-[150px] w-[100px] sm:h-[175px] sm:w-[120px] lg:h-[220px] lg:w-[140px] min-w-[100px] lg:min-w-[140px]"
            : "h-[175px] w-[120px] sm:h-[250px] sm:w-[166px] lg:h-[300px] lg:w-[200px] min-w-[100px] sm:min-w-[166px] lg:min-w-[200px]"
        }`}
      >
        {(optionData as PRODUCT_INFO_TYPE).promoMessage ? (
          <div className="z-[4] absolute bg-green-400 text-white px-1 text-sm font-medium -top-2 rounded-sm">
            {(optionData as PRODUCT_INFO_TYPE).promoMessage}
          </div>
        ) : (
          ""
        )}
        <div className="z-[-1] w-full h-[70%] flex items-center justify-center overflow-hidden px-2 sm:px-4">
          {optionData.image}
        </div>
        <div className="z-[3] text-primary w-full h-[30%] flex flex-col items-center justify-center">
          <span className="text-sm md:text-base font-semibold text-center uppercase px-1">{t(optionData.name)}</span>
        </div>
      </div>
      {type !== "bundle" && isAdditionalInfoOpen ? (
        <PopUp
          onClose={() => {
            setIsAdditionalInfoOpen(false);
          }}
          bottomSection={
            <div className="flex gap-3 items-center justify-center px-8">
              <div className="flex-grow sm:flex-grow-0">
                <Button
                  buttonType="secondaryAlt"
                  padding="py-2 px-4 sm:px-8"
                  onClick={() => {
                    onMoreInfoClick();
                  }}
                >
                  {t("buy.button.moreInfo")}
                </Button>
              </div>
              <div className="flex-grow sm:flex-grow-0">
                <Button
                  buttonType="secondary"
                  padding="py-2 px-4 sm:px-8"
                  onClick={() => {
                    setIsAdditionalInfoOpen(false);
                    onBuyClick();
                  }}
                >
                  {t("buy.button.buyNow")}
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col sm:flex-row gap-2 py-6">
            <div className="flex flex-row sm:flex-col gap-4 bg-gray-100 p-4 rounded-md">
              <div className="w-[150px]">{optionData.image}</div>
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="text-primary font-extrabold font-boldFamily text-3xl text-center">
                  {t(optionData.name)}
                </span>
                <span className="text-green-500 font-bold text-lg">Price Range</span>
              </div>
            </div>
            <div className="text-presetgray bg-gray-100 rounded-md p-3 sm:flex-grow">
              {/* @ts-ignore */}
              {optionData.moreInfoText ? t(optionData.moreInfoText) : ""}
            </div>
          </div>
        </PopUp>
      ) : null}
      {type !== "bundle" && getPossibleBundles(bundleData as BUNDLE_TYPE[]).length && isBundleOpen ? (
        <PopUp
          onClose={() => {
            setIsBundleOpen(false);
          }}
          bottomSection={
            <div className="w-full flex items-center justify-center">
              <div className="w-fit">
                <Button
                  buttonType="secondary"
                  padding="py-2 px-10"
                  onClick={() => {
                    onBuyClick(true);
                  }}
                >
                  {t("buy.button.skip")}
                </Button>
              </div>
            </div>
          }
        >
          <SelectType
            products={getPossibleBundles(bundleData as BUNDLE_TYPE[])}
            message="buy.bundle.title"
            showMessage={true}
            type="bundle"
            bundleProduct={optionData.paramKey}
          />
        </PopUp>
      ) : null}
    </div>
  );
};
