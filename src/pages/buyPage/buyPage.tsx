import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyPageContainer } from "../../components/containers/buyPageContainer";
import { PrimaryPage } from "../../components/buyPagePOC/primaryPage/primaryPage";
//import { CarType } from "../../components/buyPage/carType/carType";
//import { BundleType } from "../../components/buyPage/bundleType/bundleType";
import React from "react";
import { BundleContextProvider } from "../../components/buyPagePOC/bundleContext";

const FormBuilder = React.lazy(() =>
  import("../../components/buyPagePOC/formBuilder").then((module) => ({
    default: module.FormBuilder,
  }))
);

const CarType = React.lazy(() =>
  import("../../components/buyPagePOC/carType/carType").then((module) => ({
    default: module.CarType,
  }))
);
const WealthType = React.lazy(() =>
  import("../../components/buyPagePOC/wealthType/wealthType").then((module) => ({
    default: module.WealthType,
  }))
);
const HealthType = React.lazy(() =>
  import("../../components/buyPagePOC/healthType/healthType").then((module) => ({
    default: module.HealthType,
  }))
);
const MarinaType = React.lazy(() =>
  import("../../components/buyPagePOC/marinaType/marinaType").then((module) => ({
    default: module.MarinaType,
  }))
);
// function renderSwitch(param: string | null) {
//   switch (param) {
//     case null:
//       return <PrimaryPage />;
//     case "car":
//       return <CarType />;
//     case "property":
//       return <HomeType />;

//     case "bundle":
//       return <BundleType />;
//   }
// }

function renderSwitch(param: string | null): JSX.Element {
  switch (param) {
    case null:
      return (
        <Suspense fallback={<div></div>}>
          <PrimaryPage />
        </Suspense>
      );
    case "form":
      return (
        <Suspense fallback={<div></div>}>
          <FormBuilder />
        </Suspense>
      );

    case "car":
      return (
        <Suspense fallback={<div></div>}>
          <CarType />
        </Suspense>
      );
    case "wealth":
      return (
        <Suspense fallback={<div></div>}>
          <WealthType />
        </Suspense>
      );
    case "health":
      return (
        <Suspense fallback={<div></div>}>
          <HealthType />
        </Suspense>
      );
    case "marina":
      return (
        <Suspense fallback={<div></div>}>
          <MarinaType />
        </Suspense>
      );
  }

  return <></>;
}

export default function Buy() {
  const [buyType, setBuyType] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setBuyType(searchParams.get("type"));
  }, [searchParams]);

  return (
    <BuyPageContainer>
      <BundleContextProvider>{renderSwitch(buyType)}</BundleContextProvider>
    </BuyPageContainer>
  );
}
