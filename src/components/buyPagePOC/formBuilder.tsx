import { useContext, useEffect, useState } from "react";
import MultiStepForm from "./multiStepForm/multiStepForm";
import { useSearchParams } from "react-router-dom";
import { BUNDLE_TYPE, FORM_TYPE, PRODUCT_DATA_TYPE } from "./formConstants";
import { PRODUCT_DATA } from "./formConstants";
import { paymentContext, PaymentContextProvider } from "./payment/paymentContext";
import { NavBarBuy } from "./navBarBuy/navBarBuy";
import { useBundles } from "./bundles";
import { PRODUCT_SITE_ID } from "./productConstants";
import { bundleContext } from "./bundleContext";
import { useServer } from "../../util/useServer";
import { useLoadingOverlay } from "../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../ui/alerter/useAlerter";
import Checkout from "./checkout";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

export function FormBuilder() {
  const { bundleData } = useContext(bundleContext);

  const [searchParams] = useSearchParams();
  const [currentProducts, setcurrentProducts] = useState<PRODUCT_DATA_TYPE[] | null>(null);

  function getCurrentProducts() {
    const currentProductsParam = searchParams.get("subtype")?.split(",");

    if (currentProductsParam) {
      const currentProductNames = (Object.keys(PRODUCT_DATA) as PRODUCT_SITE_ID[]).filter((productName) =>
        currentProductsParam.includes(PRODUCT_DATA[productName].paramKey)
      );
      setcurrentProducts(currentProductNames.map((productName) => PRODUCT_DATA[productName]));
    }
  }

  useEffect(() => {
    getCurrentProducts();
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col">
      <NavBarBuy />

      {bundleData !== null && currentProducts && currentProducts.length ? (
        <ContextProviderContainer currentProducts={currentProducts} allBundles={bundleData} />
      ) : (
        ""
      )}
    </div>
  );
}

const PAYMENT_PRODUCT: PRODUCT_DATA_TYPE = {
  productId: "80114527-5b68-4192-b4e4-d45e43fab686",
  productSiteId: "TPL",
  categoryId: "DUMMYCATEGORYID",
  paramKey: "PAYMENTDUMMYPARAM",
  name: "Payment",
  image: <></>,
  context: paymentContext,
  contextProvider: PaymentContextProvider,
  forms: [
    {
      id: "50438b46-96f7-433d-aa26-0a3251b58b87",
      path: "./payment/paymentForm/paymentForm",
      name: "Pagesa",
      subTitle: "METODAT E PAGESES",
    },
  ],
};

const ContextProviderContainer = ({
  currentProducts,
  allBundles,
}: {
  currentProducts: PRODUCT_DATA_TYPE[];
  allBundles: BUNDLE_TYPE[];
}) => {
  const getPossibleProducts = () => {
    return (Object.keys(PRODUCT_DATA) as PRODUCT_SITE_ID[]).map((productName) => PRODUCT_DATA[productName]);
  };

  const [possibleProducts] = useState<PRODUCT_DATA_TYPE[]>(getPossibleProducts());
  const [activeProducts, setActiveProducts] = useState<PRODUCT_DATA_TYPE[]>(currentProducts);

  const bundleHook = useBundles({
    activeProducts: activeProducts,
    setActiveProducts: setActiveProducts,
    allBundles: allBundles,
  });

  return (
    <>
      {bundleHook.render}
      <div className="flex-grow flex justify-center items-center py-10 px-5 sm:px-10 md:px-20 lg:px-28 xl:px-40">
        {[...possibleProducts, PAYMENT_PRODUCT].reduceRight(
          (previousValue, CurrentValue, index) =>
            [...possibleProducts, PAYMENT_PRODUCT][index].contextProvider({
              children: previousValue,
            }),
          <FormBuilderForm currentProducts={[...activeProducts, PAYMENT_PRODUCT]} />
        )}
      </div>
    </>
  );
};

///////////////////////////////

const ContextContainer = ({
  context,
  productId,
  setData,
}: {
  context: React.Context<any>;
  productId: string;
  setData: React.Dispatch<React.SetStateAction<Object>>;
}) => {
  const { formData } = useContext(context);
  useEffect(() => {
    setData((prev) => {
      if (prev) return { ...prev, [productId]: formData };
      else return { [productId]: formData };
    });
  }, [formData]);

  return <></>;
};

// Handle form render with dynamic loading of form steps
const FormBuilderForm = ({ currentProducts }: { currentProducts: PRODUCT_DATA_TYPE[] }) => {
  const [formSteps, setFormSteps] = useState<
    (FORM_TYPE & {
      element: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
      product: PRODUCT_DATA_TYPE;
      position: number;
    })[]
  >([]);

  const [formData, setFormData] = useState<Object>({
    activeProduct: currentProducts.map((product) => product.productId),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const loadFormStep = async (path: string) => {
    // Dynamically import the hook
    const { default: FormHook } = await import(`${path}`);
    return FormHook;
  };

  const triggerStepLoad = async () => {
    const steps: (FORM_TYPE & {
      element: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>;
      product: PRODUCT_DATA_TYPE;
    })[] = [];

    for (let productIndex = 0; productIndex < currentProducts.length; productIndex++) {
      for (let formIndex = 0; formIndex < currentProducts[productIndex].forms.length; formIndex++) {
        const formPath = currentProducts[productIndex].forms[formIndex].path;

        // Dynamically load the hook function (no hook call yet)
        const FormHook = await loadFormStep(formPath);

        // Now call the hook inside a component context to get the data
        // Store the result of the hook in state
        steps.push({
          ...currentProducts[productIndex].forms[formIndex],
          element: FormHook,
          product: currentProducts[productIndex],
        });
      }
    }

    setFormSteps(
      steps.map((step, index) => {
        return { ...step, position: index + 1 };
      })
    ); // Update state with the form data
  };

  const onSubmit = async () => {
    console.log(formData);
    const body = formData;

    loadingOverlay.open("Please wait", "Starting transaction...");

    const jsonData = await customFetch("/buy", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(jsonData.message);
    } else {
      //window.location.href = "/";
      //alerter.alertMessage("Success");
      searchParams.set("transactionId", jsonData.data.id);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        activeProduct: currentProducts.map((product) => product.productId),
      };
    });
    triggerStepLoad();
  }, [currentProducts]); // Trigger load when formGroups change

  //console.log(formData);
  return (
    <>
      {loadingOverlay.render}
      {alerter.render}
      {currentProducts.map((x) => {
        return <ContextContainer context={x.context} productId={x.productId} setData={setFormData} />;
      })}
      {formSteps.length ? (
        !searchParams.get("transactionId") ? (
          <MultiStepForm
            title={`${currentProducts
              .filter((product) => product.productId !== "80114527-5b68-4192-b4e4-d45e43fab686")
              .map((product) => product.name)
              .join(" and ")}`}
            stepsData={formSteps}
            onSubmit={onSubmit}
          />
        ) : (
          <Checkout />
        )
      ) : (
        <div>Loading forms...</div>
      )}
    </>
  );
};
