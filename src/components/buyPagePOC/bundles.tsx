import { ReactNode, Suspense, useEffect, useState } from "react";
import { BUNDLE_TYPE, PRODUCT_DATA, PRODUCT_DATA_TYPE } from "./formConstants";
import { createPortal } from "react-dom";
import { Reveal } from "../../util/reveal";
import React from "react";
import { useAlerter } from "../ui/alerter/useAlerter";
import { Overlay } from "../../util/overlay";
import { PRODUCT_SITE_ID } from "./productConstants";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PopUp } from "../ui/popUp/popUp";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

const BsPlusSquareDotted = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsPlusSquareDotted,
  }))
);

const SelectOption = ({
  name,
  image,
  type,
  banner,
  onClick,
}: {
  name: string;
  image: ReactNode;
  type: "REMOVE" | "ADD" | "PLACEHOLDER" | "LIST";
  banner?: string;
  onClick: () => void;
}) => {
  return (
    <Reveal width="fit-content" height="fit-content" delay={0} duration={0.5}>
      <div
        onClick={() => {
          onClick();
        }}
        className={`z-[2] relative flex flex-col items-center justify-center m-[10px] rounded-[5px] h-[120px] w-[80px] sm:h-[140px] sm:w-[96px] lg:h-[176px] lg:w-[112px] min-w-[80px] lg:min-w-[112px] ${
          type === "REMOVE" ? "hover:shadow-[rgb(248,113,113)_0px_10px_25px_-10px]" : ""
        }
        ${type === "ADD" ? "hover:shadow-[rgb(16,185,129)_0px_10px_25px_-10px]" : ""}
        ${
          type === "PLACEHOLDER"
            ? "bg-gray-100"
            : "shadow-[gray_0px_10px_25px_-10px] bg-white cursor-pointer hover:scale-110 transition-transform"
        }`}
      >
        <div className="z-[4] absolute bg-green-400 text-white px-1 text-sm font-medium top-0 right-[-13px] rotate-[20deg] rounded-sm">
          {banner}
        </div>
        <div className="z-[3] w-full h-[70%] flex items-center justify-center overflow-hidden">{image}</div>
        <div className="z-[3] text-primary w-full h-[30%] flex items-center justify-center">
          <span className="text-sm font-semibold text-center uppercase">{name}</span>
        </div>
      </div>
    </Reveal>
  );
};

const BundleForm = ({
  activeProducts,
  setActiveProducts,
  allBundles,
  setIsOpen,
  exportCurrentBundle,
}: {
  activeProducts: PRODUCT_DATA_TYPE[];
  allBundles: BUNDLE_TYPE[];
  setActiveProducts: React.Dispatch<React.SetStateAction<PRODUCT_DATA_TYPE[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exportCurrentBundle: React.Dispatch<React.SetStateAction<BUNDLE_TYPE[]>>;
}) => {
  const alerter = useAlerter();

  const { t } = useTranslation();

  //Get the possible bundle by checking all the bundles that include the current products,
  //and then return the bundles that have 1 more product than the current selection
  const getPossibleBundles = () => {
    const possibleBundles = allBundles.filter((bundle) => {
      return activeProducts.every((currentProduct) => {
        return (bundle.products as PRODUCT_DATA_TYPE[]).filter(
          (bundleProduct) => bundleProduct.productSiteId === currentProduct.productSiteId
        ).length;
      });
    });
    return possibleBundles.filter((bundle) => bundle.products.length === activeProducts.length + 1);
  };

  //Same thing as getPossibleBundles but without the length+1 part
  const getCurrentBundle = () => {
    const possibleBundles = allBundles.filter((bundle) => {
      return activeProducts.every((currentProduct) => {
        return (bundle.products as PRODUCT_DATA_TYPE[]).filter(
          (bundleProduct) => bundleProduct.productSiteId === currentProduct.productSiteId
        ).length;
      });
    });

    return possibleBundles.filter((bundle) => bundle.products.length === activeProducts.length);
  };

  const [currentBundle, setCurrentBundle] = useState<BUNDLE_TYPE[]>(getCurrentBundle());

  const setBundle = (bundle: BUNDLE_TYPE) => {
    //Get the product of the bundle that is not part of the current selection
    const additionalProducts = (bundle.products as PRODUCT_DATA_TYPE[]).filter((bundleProduct) => {
      return !activeProducts.filter((activeProduct) => activeProduct.productSiteId === bundleProduct.productSiteId)
        .length;
    });

    setActiveProducts((prev) => {
      return [...prev, ...additionalProducts];
    });
  };

  const removeProduct = (product: PRODUCT_DATA_TYPE) => {
    setActiveProducts((prev) => {
      return prev.filter((activeProducts) => {
        //If we are removing a product, remove all the bundle products of the same category
        if (product.type === "product" && activeProducts.category === product.category) {
          return false;
        } else if (product.type === "bundle" && product.productSiteId === activeProducts.productSiteId) {
          return false;
        } else {
          return true;
        }
      });
    });
  };

  useEffect(() => {
    exportCurrentBundle(currentBundle);
  }, [currentBundle]);

  useEffect(() => {
    setCurrentBundle(getCurrentBundle());
  }, [activeProducts]);
  return (
    <div className="py-6">
      {alerter.render}

      <div className="flex gap-1 justify-center text-gray-400">
        <span className="text-base font-bold text-center">{t("form.bundle.clickToRemove")}</span>
      </div>
      <div className="flex gap-1 justify-center text-gray-400 pb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-[17px] h-[17px] min-w-[17px] min-h-[17px]"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
        <span className="text-sm font-semibold">{t("form.bundle.clickToRemoveDisclaimer")}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center pb-3">
        {activeProducts.map((product, index) => {
          return (
            <SelectOption
              key={index}
              name={t(product.name)}
              image={product.image}
              type={activeProducts.length === 1 ? "LIST" : "REMOVE"}
              banner={currentBundle[0]?.promoMessage}
              onClick={() => {
                //If we are trying to remove a product, remove bundle products from the count check
                if (
                  product.type === "product" &&
                  activeProducts.filter((activeProduct) => activeProduct.type === "product").length > 1
                )
                  removeProduct(product);
                else if (product.type === "bundle" && activeProducts.length > 1) removeProduct(product);
                else
                  alerter.alertMessage({
                    description: "You cannot remove the last product from the list.",
                    message: "Product could not be removed!",
                    type: "error",
                  });
              }}
            />
          );
        })}
        {getPossibleBundles().length ? (
          <SelectOption
            name={""}
            image={
              <div className="translate-y-4 text-gray-400">
                <Suspense fallback={<div style={{ width: "30", height: "30" }}></div>}>
                  <BsPlusSquareDotted size={"30"} />
                </Suspense>
              </div>
            }
            type="PLACEHOLDER"
            onClick={() => {
              //pass
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="bg-gray-100 rounded-md">
        <div className="flex gap-1 text-gray-400 pt-4 pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="w-[17px] h-[17px] min-w-[17px] min-h-[17px]"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span className="text-sm font-bold">{t("form.bundle.clickToAdd")}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center pb-4">
          {getPossibleBundles().map((bundle) => {
            const additionalProduct = (bundle.products as PRODUCT_DATA_TYPE[]).filter((bundleProduct) => {
              return !activeProducts.filter((activeProduct) => activeProduct.productId === bundleProduct.productId)
                .length;
            })[0];
            return (
              <>
                {additionalProduct ? (
                  <SelectOption
                    name={t(additionalProduct.name)}
                    image={additionalProduct.image}
                    type="ADD"
                    banner={bundle.promoMessage}
                    onClick={() => {
                      setBundle(bundle);
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            );
          })}
          {getPossibleBundles().length === 0 ? (
            <>
              <div className="pb-20 pt-16 font-medium text-gray-600 text-center">
                {t("form.bundle.noBundlesAvailable")}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export const useBundles = ({
  activeProducts,
  setActiveProducts,
  allBundles,
  startingBundle,
}: {
  activeProducts: PRODUCT_DATA_TYPE[];
  allBundles: BUNDLE_TYPE[];
  setActiveProducts: React.Dispatch<React.SetStateAction<PRODUCT_DATA_TYPE[]>>;
  startingBundle: BUNDLE_TYPE[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pageContainer = document.getElementById("overlayContainer");
  const [searchParams] = useSearchParams();
  const [currentBundle, setCurrentBundle] = useState<BUNDLE_TYPE[]>(startingBundle);

  const { t } = useTranslation();

  //Map the bundle product ids we get from the backend to PRODUCT_DATA
  function getBundleProducts(bundles: BUNDLE_TYPE[]) {
    return bundles.map((bundle) => {
      bundle.products = bundle.products.map((productName) => {
        if (typeof productName === "string" || productName instanceof String)
          return PRODUCT_DATA[productName as PRODUCT_SITE_ID];
        else return PRODUCT_DATA[productName.productSiteId];
      });
      return bundle;
    });
  }
  return {
    currentBundle: currentBundle.length ? currentBundle[0] : null,
    render: (
      <>
        {pageContainer && !searchParams.get("transactionId")
          ? createPortal(
              <div className="z-[5] w-full flex justify-center fixed bottom-5 pointer-events-none">
                <div className="w-fit pointer-events-auto">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                    }}
                    className={`animate-[bounce2_4s_ease_infinite] shimmer w-full h-full px-10 py-3 rounded-full border border-transparent bg-green-500 text-white font-bold cursor-pointer shadow-[rgba(0,102,179,255)_0px_10px_25px_-10px] hover:bg-green-600 disabled:bg-gray-600`}
                  >
                    {t("form.bundle.addRemoveButton")}
                  </button>
                </div>
              </div>,
              pageContainer
            )
          : null}
        {isOpen ? (
          <PopUp
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <BundleForm
              activeProducts={activeProducts}
              allBundles={getBundleProducts(allBundles)}
              setActiveProducts={setActiveProducts}
              setIsOpen={setIsOpen}
              exportCurrentBundle={setCurrentBundle}
            />
          </PopUp>
        ) : null}
        {}
      </>
    ),
  };
};
