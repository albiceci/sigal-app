import { ReactNode, Suspense, useEffect, useState } from "react";
import { BUNDLE_TYPE, PRODUCT_DATA, PRODUCT_DATA_TYPE } from "./formConstants";
import { createPortal } from "react-dom";
import { Reveal } from "../../util/reveal";
import React from "react";
import { useAlerter } from "../ui/alerter/useAlerter";
import { Overlay } from "../../util/overlay";
import { PRODUCT_SITE_ID } from "./productConstants";
import { useSearchParams } from "react-router-dom";

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
}: {
  activeProducts: PRODUCT_DATA_TYPE[];
  allBundles: BUNDLE_TYPE[];
  setActiveProducts: React.Dispatch<React.SetStateAction<PRODUCT_DATA_TYPE[]>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const alerter = useAlerter();

  const getPossibleBundles = () => {
    const possibleBundles = allBundles.filter((bundle) => {
      return activeProducts.every((currentProduct) => {
        return (bundle.products as PRODUCT_DATA_TYPE[]).filter(
          (bundleProduct) => bundleProduct.productId === currentProduct.productId
        ).length;
      });
    });
    return possibleBundles.filter((bundle) => bundle.products.length === activeProducts.length + 1);
  };

  const getCurrentBundle = () => {
    const possibleBundles = allBundles.filter((bundle) => {
      return activeProducts.every((currentProduct) => {
        return (bundle.products as PRODUCT_DATA_TYPE[]).filter(
          (bundleProduct) => bundleProduct.productId === currentProduct.productId
        ).length;
      });
    });
    return possibleBundles.filter((bundle) => bundle.products.length === activeProducts.length);
  };

  const [possibleBundles, setPossibleBundles] = useState<BUNDLE_TYPE[]>(getPossibleBundles());
  const [currentBundle, setCurrentBundle] = useState<BUNDLE_TYPE[]>(getCurrentBundle());

  const setBundle = (bundle: BUNDLE_TYPE) => {
    const additionalProducts = (bundle.products as PRODUCT_DATA_TYPE[]).filter((bundleProduct) => {
      return !activeProducts.filter((activeProduct) => activeProduct.productId === bundleProduct.productId).length;
    });

    setActiveProducts((prev) => {
      return [...prev, ...additionalProducts];
    });
  };

  const removeProduct = (product: PRODUCT_DATA_TYPE) => {
    setActiveProducts((prev) => {
      return prev.filter((activeProducts) => activeProducts.productId !== product.productId);
    });
  };

  useEffect(() => {
    setPossibleBundles(getPossibleBundles());
    setCurrentBundle(getCurrentBundle());
  }, [activeProducts]);
  return (
    <>
      {alerter.render}

      <div className="w-[100vw] sm:w-[85vw] md:w-[67vw] lg:w-[51vw] xl:w-[41vw] rounded-md bg-white shadow-lg">
        <div className="text-primary py-4 flex justify-between items-center px-4">
          <div className="h4 font-semibold"></div>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="cursor-pointer text-white bg-green-500 rounded-full hover:bg-green-600"
          >
            <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
              <IoClose size={"25"} />
            </Suspense>
          </div>
        </div>
        <div className="px-6 pb-6">
          <div className="flex gap-1 justify-center text-gray-400">
            <span className="text-base font-bold text-center">Click on one of the products to remove them</span>
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
            <span className="text-sm font-semibold">
              The data you have completed is saved so you can readd them at any time.
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center pb-3">
            {activeProducts.map((product) => {
              return (
                <SelectOption
                  name={product.name}
                  image={product.image}
                  type={activeProducts.length === 1 ? "LIST" : "REMOVE"}
                  banner={currentBundle[0]?.promoMessage}
                  onClick={() => {
                    if (activeProducts.length > 1) removeProduct(product);
                    else alerter.alertMessage("You can't remove the last product.");
                  }}
                />
              );
            })}
            {possibleBundles.length ? (
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
              <span className="text-sm font-bold">
                Click to add a product and get a discount on all of the selected products.
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center pb-4">
              {possibleBundles.map((bundle) => {
                const additionalProduct = (bundle.products as PRODUCT_DATA_TYPE[]).filter((bundleProduct) => {
                  return !activeProducts.filter((activeProduct) => activeProduct.productId === bundleProduct.productId)
                    .length;
                })[0];
                return (
                  <>
                    {additionalProduct ? (
                      <SelectOption
                        name={additionalProduct.name}
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
              {possibleBundles.length === 0 ? (
                <>
                  <div className="pb-20 pt-16 font-medium text-gray-600">
                    There are no available bundles for the current selection
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const useBundles = ({
  activeProducts,
  setActiveProducts,
  allBundles,
}: {
  activeProducts: PRODUCT_DATA_TYPE[];
  allBundles: BUNDLE_TYPE[];
  setActiveProducts: React.Dispatch<React.SetStateAction<PRODUCT_DATA_TYPE[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pageContainer = document.getElementById("buyPageContainer");
  const [searchParams] = useSearchParams();

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
    render: (
      <>
        {pageContainer && !searchParams.get("transactionId")
          ? createPortal(
              <div className="z-[5] absolute bottom-5">
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className={`animate-[bounce2_4s_ease_infinite] shimmer w-full h-full px-10 py-3 rounded-full border border-transparent bg-green-500 text-white font-bold cursor-pointer shadow-[rgba(0,102,179,255)_0px_10px_25px_-10px] hover:bg-green-600 disabled:bg-gray-600`}
                >
                  Add/Remove Products
                </button>
              </div>,
              pageContainer
            )
          : null}
        {isOpen ? (
          <Overlay>
            <BundleForm
              activeProducts={activeProducts}
              allBundles={getBundleProducts(allBundles)}
              setActiveProducts={setActiveProducts}
              setIsOpen={setIsOpen}
            />
          </Overlay>
        ) : null}
        {}
      </>
    ),
  };
};
