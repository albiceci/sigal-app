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

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

type selectTypeProps = {
  optionData: PRODUCT_INFO_TYPE | CATEGORY_INFO_TYPE;
  type?: "bundle" | "product" | "category";
  bundleProduct?: string;
  isMoreInfoExpanded: boolean;
};

export const SelectOption = ({ optionData, type, bundleProduct, isMoreInfoExpanded }: selectTypeProps) => {
  const { bundleData } = useContext(bundleContext);

  console.log(optionData);

  const navigate = useNavigate();

  const [isBundleOpen, setIsBundleOpen] = useState(false);

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
        (bundleProduct) => bundleProduct.productId === (optionData as PRODUCT_INFO_TYPE).productId
      ).length;
    });
    return possibleBundles
      .filter((bundle) => bundle.products.length === 2)
      .map((bundle) => {
        return {
          ...(bundle.products as PRODUCT_INFO_TYPE[]).filter(
            (product) => product.productId !== (optionData as PRODUCT_INFO_TYPE).productId
          )[0],
          percentOff: bundle.percentageOff,
          promoMessage: bundle.promoMessage,
        };
      });
  };

  const onClickOption = (isForcesNav: boolean = false) => {
    if (!getPossibleBundles(bundleData as BUNDLE_TYPE[]).length || isForcesNav || type === "bundle") {
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
          onClickOption();
        }}
        className={`z-[2] completed-borders relative cursor-pointer flex flex-col items-center justify-center m-[10px] rounded-[5px] shadow-[gray_0px_10px_25px_-10px] hover:shadow-[rgba(0,102,179,255)_0px_10px_25px_-10px] hover:border hover:border-primary hover:scale-105 transition-transform ${
          type === "bundle"
            ? "h-[175px] w-[100px] sm:h-[175px] sm:w-[120px] lg:h-[220px] lg:w-[140px] min-w-[100px] lg:min-w-[140px]"
            : "h-[175px] w-[100px] sm:h-[250px] sm:w-[166px] lg:h-[300px] lg:w-[200px] min-w-[100px] sm:min-w-[166px] lg:min-w-[200px]"
        }`}
      >
        {(optionData as PRODUCT_INFO_TYPE).promoMessage ? (
          <div className="z-[4] absolute bg-green-400 text-white px-1 text-sm font-medium -top-2 rounded-sm">
            {(optionData as PRODUCT_INFO_TYPE).promoMessage}
          </div>
        ) : (
          ""
        )}
        <div className="z-[-1] w-full h-[70%] flex items-center justify-center overflow-hidden">{optionData.image}</div>
        <div className="z-[3] text-primary w-full h-[30%] flex flex-col items-center justify-center">
          <span className="text-sm md:text-base font-semibold text-center uppercase px-1">{optionData.name}</span>
        </div>
        {getPossibleBundles(bundleData as BUNDLE_TYPE[]).length && isBundleOpen ? (
          <Overlay>
            <div className="w-[100vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] flex flex-col rounded-md bg-white shadow-lg max-h-[80dvh]">
              <div className="text-primary py-4 flex justify-between items-center px-4">
                <div className="h4 font-semibold"></div>
                <div
                  onClick={() => {
                    onClickOption(true);
                  }}
                  className="cursor-pointer text-white bg-primary rounded-full hover:bg-primarysub"
                >
                  <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
                    <IoClose size={"25"} />
                  </Suspense>
                </div>
              </div>
              <div className="px-6 overflow-y-auto">
                <SelectType
                  products={getPossibleBundles(bundleData as BUNDLE_TYPE[])}
                  message="Want to bundle your policy?"
                  showMessage={true}
                  type="bundle"
                  bundleProduct={optionData.paramKey}
                />
              </div>
              <div className="flex items-center justify-center py-6">
                <div className="w-fit">
                  <Button
                    buttonType="secondary"
                    onClick={() => {
                      onClickOption(true);
                    }}
                  >
                    Skip
                  </Button>
                </div>
              </div>
            </div>
          </Overlay>
        ) : null}
      </div>
      {isMoreInfoExpanded ? (
        <div className="min-h-[175px] sm:min-h-[250px] lg:min-h-[300px] flex-grow m-[10px] flex">
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-gray-200"></div>
          </div>
          <div className="bg-gray-200 p-3 rounded-md flex-grow">
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-presetgray text-sm md:text-base font-semibold">
                {(optionData as PRODUCT_INFO_TYPE).moreInfo}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
