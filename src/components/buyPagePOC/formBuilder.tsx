import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MultiStepForm } from "./multiStepForm/multiStepForm";
import { useSearchParams } from "react-router-dom";
import { NavBarBuy } from "./navBarBuy/navBarBuy";
import { useBundles } from "./bundles";
import { PRODUCT_SITE_ID } from "./productConstants";
import { bundleContext } from "./bundleContext";
import { useServer } from "../../util/useServer";
import { useLoadingOverlay } from "../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../ui/alerter/useAlerter";
import Checkout from "./checkout/checkout";
import { BUNDLE_TYPE, FORM_TYPE, PRODUCT_DATA, PRODUCT_DATA_TYPE } from "./formConstants";
import React from "react";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../helper/getErrorMessage";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

export function FormBuilder() {
  const { bundleData } = useContext(bundleContext);

  const [searchParams] = useSearchParams();

  //Here is where we store current products, based only on the url params
  const [currentProducts, setcurrentProducts] = useState<PRODUCT_DATA_TYPE[] | null>(null);
  const [currentBundle, setCurrentBundle] = useState<BUNDLE_TYPE[]>([]);

  const arraysEqualIgnoreOrder = useCallback((a: any[], b: any[]) => {
    if (a.length !== b.length) return false;

    const aSorted = [...a].sort();
    const bSorted = [...b].sort();

    return aSorted.every((val, i) => val === bSorted[i]);
  }, []);

  const getCurrentProducts = useCallback(() => {
    const currentProductsParam = searchParams.get("subtype")?.split(",");
    if (!currentProductsParam) return;

    const currentProductNames = currentProductsParam
      .filter((productParamKey) => Object.values(PRODUCT_DATA).some((v) => v.paramKey === productParamKey))
      .map(
        (productParamKey) =>
          Object.entries(PRODUCT_DATA).find(([, value]) => value.paramKey === productParamKey)![0] as PRODUCT_SITE_ID
      );

    if (
      (bundleData &&
        bundleData.some((bundle) =>
          arraysEqualIgnoreOrder(
            bundle.products.map((p) => (typeof p === "string" ? p : p.productSiteId)),
            currentProductNames
          )
        )) ||
      currentProductNames.length === 1
    ) {
      const rawCurrentProduct = currentProductNames.map((p) => PRODUCT_DATA[p]);

      setcurrentProducts(
        rawCurrentProduct.filter(
          (product) =>
            product.type !== "bundle" ||
            rawCurrentProduct.some((sub) => sub.type === "product" && sub.category === product.category)
        )
      );

      if (bundleData) {
        setCurrentBundle(
          bundleData.filter((bundle) =>
            arraysEqualIgnoreOrder(
              bundle.products.map((p) => (typeof p === "string" ? p : p.productSiteId)),
              currentProductNames
            )
          )
        );
      }
    }
  }, [searchParams, bundleData, arraysEqualIgnoreOrder]);

  useEffect(() => {
    getCurrentProducts();
  }, [getCurrentProducts]);

  return (
    <div className="w-full flex flex-col">
      <NavBarBuy />

      {bundleData !== null && currentProducts && currentProducts.length ? (
        <ContextProviderContainer
          currentProducts={currentProducts}
          allBundles={bundleData}
          currentBundle={currentBundle}
        />
      ) : (
        ""
      )}
    </div>
  );
}

//All products have their own context where they store data, so we are rendering the context providers of all products
const ContextProviderContainer = React.memo(
  ({
    currentProducts,
    allBundles,
    currentBundle,
  }: {
    currentProducts: PRODUCT_DATA_TYPE[];
    allBundles: BUNDLE_TYPE[];
    currentBundle: BUNDLE_TYPE[];
  }) => {
    //No idea why this is here. Should work even if we return just PRODUCT_DATA
    const possibleProducts = useMemo(() => Object.values(PRODUCT_DATA), []);

    //This says possible products, but it's more like all products
    const [activeProducts, setActiveProducts] = useState<PRODUCT_DATA_TYPE[]>(currentProducts);

    const activeProductsIncludingPayment = useMemo(() => {
      return [...activeProducts, PRODUCT_DATA.PAYMENT];
    }, [activeProducts]);

    //This hook handles all the insite bundling
    const bundleHook = useBundles({
      activeProducts: activeProducts,
      setActiveProducts: setActiveProducts,
      startingBundle: currentBundle,
      allBundles: allBundles,
    });

    //Rendering the context provider of all products

    const providers = useMemo(
      () => [...possibleProducts, PRODUCT_DATA.PAYMENT].map((p) => p.contextProvider),
      [possibleProducts]
    );

    return (
      <>
        {bundleHook.render}
        <div className="flex-grow flex justify-center items-center py-10 px-5 sm:px-10 md:px-15 lg:px-20 xl:px-40">
          {providers.reduceRight(
            (children, Provider) => (
              <Provider>{children}</Provider>
            ),
            <FormBuilderForm
              currentProducts={activeProductsIncludingPayment}
              currentBundle={bundleHook.currentBundle}
            />
          )}
        </div>
      </>
    );
  }
);

///////////////////////////////

//This one is used in order to update the context of the order anytime the context of the products change
const ContextContainer = ({
  context,
  productSiteId,
  setData,
}: {
  context: React.Context<any>;
  productSiteId: string;
  setData: React.Dispatch<React.SetStateAction<Object>>;
}) => {
  //formData in this case is the data for a specific product
  const { formData } = useContext(context);
  useEffect(() => {
    //When we save the data for the product, we use the productId as a key
    setData((prev) => {
      if (prev) return { ...prev, [productSiteId]: formData };
      else return { [productSiteId]: formData };
    });
  }, [formData]);

  return <></>;
};

export const allFormContext = createContext<{
  allFormData: Object;
  setAllFormData: React.Dispatch<React.SetStateAction<Object>>;
}>({ allFormData: {}, setAllFormData: () => {} });

// Handle form render with dynamic loading of form steps
const FormBuilderForm = React.memo(
  ({ currentProducts, currentBundle }: { currentProducts: PRODUCT_DATA_TYPE[]; currentBundle: BUNDLE_TYPE | null }) => {
    const { t } = useTranslation();
    //This one stores all the step data for current product selection
    const [formSteps, setFormSteps] = useState<
      (FORM_TYPE & {
        element: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
        product: PRODUCT_DATA_TYPE;
        position: number;
      })[]
    >([]);

    //Here is where we store everything that will get sent to backend on submit
    const [allFormData, setAllFormData] = useState<Object>({
      activeProduct: currentProducts.map((product) => product.productSiteId),
      currentBundle: currentBundle,
    });

    console.log(allFormData);

    const allFormDataRef = useRef(allFormData);

    useEffect(() => {
      allFormDataRef.current = allFormData;
    }, [allFormData]);

    //This one is used to add transactionId to redirect the user to the checkout page
    const [searchParams, setSearchParams] = useSearchParams();
    const customFetch = useServer();
    const loadingOverlay = useLoadingOverlay();
    const alerter = useAlerter();

    const loadFormStep = useCallback(async (path: string) => {
      const { default: FormHook } = await import(`${path}`);
      return FormHook;
    }, []);

    const triggerStepLoad = useCallback(async () => {
      const steps = [];

      for (const product of currentProducts) {
        for (const form of product.forms) {
          const FormHook = await loadFormStep(form.path);

          steps.push({
            ...form,
            element: FormHook,
            product,
          });
        }
      }

      setFormSteps(steps.map((step, index) => ({ ...step, position: index + 1 })));
    }, [currentProducts, loadFormStep]);

    //Function that plays when everything is completed
    const onSubmit = async () => {
      const data = allFormDataRef.current;

      const body = {
        ...data,
        //@ts-ignore
        currentBundle: data.currentBundle?.id,
      };

      loadingOverlay.open("Please wait", "Starting transaction...");

      const jsonData = await customFetch("/buy", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      });

      loadingOverlay.close();

      if (jsonData.status !== 200) {
        alerter.alertMessage(getErrorMessage(jsonData.message));
      } else {
        searchParams.set("transactionId", jsonData.data.id);
        setSearchParams(searchParams);
      }
    };

    //Update the activeProducts and currentBundle anytime the user adds or removed products from the order
    useEffect(() => {
      setAllFormData((prev) => {
        return {
          ...prev,
          activeProduct: currentProducts.map((product) => product.productSiteId),
          currentBundle: currentBundle,
        };
      });
      triggerStepLoad();
    }, [currentProducts, currentBundle, triggerStepLoad]); //Jointing all the ID together as a string. Used to check if the products have changed
    //console.log(formSteps);
    return (
      <>
        <allFormContext.Provider value={{ allFormData: allFormData, setAllFormData: setAllFormData }}>
          {loadingOverlay.render}
          {alerter.render}
          {currentProducts.map((x, index) => {
            return (
              <ContextContainer
                context={x.context}
                key={index}
                productSiteId={x.productSiteId}
                setData={setAllFormData}
              />
            );
          })}
          {formSteps.length ? (
            !searchParams.get("transactionId") ? (
              <MultiStepForm
                title={`${currentProducts
                  .filter((product) => product.productSiteId !== PRODUCT_DATA.PAYMENT.productSiteId)
                  .map((product) => t(product.name))
                  .join(" + ")}`}
                stepsData={formSteps}
                onSubmit={onSubmit}
              />
            ) : (
              <Checkout />
            )
          ) : (
            <div>Loading forms...</div>
          )}
        </allFormContext.Provider>
      </>
    );
  }
);
