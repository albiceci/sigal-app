import { createContext, useEffect, useState } from "react";
import { BUNDLE_TYPE } from "./formConstants";
import { PRODUCT_SITE_ID } from "./productConstants";
import { useServer } from "../../util/useServer";
import { useAlerter } from "../ui/alerter/useAlerter";

const bundleContext = createContext<{
  bundleData: BUNDLE_TYPE[] | null;
  setBundleData: React.Dispatch<React.SetStateAction<BUNDLE_TYPE[] | null>>;
}>({ bundleData: null, setBundleData: () => {} });

const BundleContextProvider = ({ children }: { children: JSX.Element }) => {
  const [bundleData, setBundleData] = useState<BUNDLE_TYPE[] | null>(null);

  console.log("Context");
  console.log(bundleData);

  const customFetch = useServer();
  const alerter = useAlerter();

  async function getBundles() {
    const jsonData = await customFetch("/bundles/getBundles", {
      method: "GET",
      body: undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(jsonData.message);
    } else {
      setBundleData(
        (jsonData.data as BUNDLE_TYPE[]).map((bundle) => {
          bundle.products = bundle.products.map((productName) => {
            return productName as PRODUCT_SITE_ID;
          });
          return bundle;
        })
      );
    }
  }

  useEffect(() => {
    getBundles();
  }, []);
  // provider logic here
  return (
    <bundleContext.Provider value={{ bundleData: bundleData, setBundleData: setBundleData }}>
      {bundleData !== null ? children : "Loading..."}
    </bundleContext.Provider>
  );
};

export { bundleContext, BundleContextProvider };
