import { Suspense } from "react";
import { SectionContainer } from "../sectionContainer";
import {
  SubscriptionItem,
  subscriptionItemType,
} from "./subscriptionItem/subscriptionItem";
import React from "react";
import { Reveal } from "../../../util/reveal";
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";

const BsCarFrontFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsCarFrontFill,
  }))
);

const FaRegHospital = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegHospital,
  }))
);

const activeSubscriptions: subscriptionItemType[] = [
  {
    product: "Shendeti",
    alertChecked: true,
    expireDate: "15/6/2025",
    issueDate: "16/6/2024",
    price: "$83.12",
    status: "Active",
    icon: (
      <Suspense
        fallback={<div style={{ height: "40px", width: "40px" }}></div>}
      >
        <FaRegHospital size={40} />
      </Suspense>
    ),
  },
  {
    product: "TPL",
    alertChecked: false,
    expireDate: "27/12/2025",
    issueDate: "28/12/2024",
    price: "$123.23",
    status: "Active",
    icon: (
      <Suspense
        fallback={<div style={{ height: "40px", width: "40px" }}></div>}
      >
        <BsCarFrontFill size={40} />
      </Suspense>
    ),
  },
  {
    product: "Shendeti",
    alertChecked: true,
    expireDate: "15/6/2025",
    issueDate: "16/6/2024",
    price: "$83.12",
    status: "Active",
    icon: (
      <Suspense
        fallback={<div style={{ height: "40px", width: "40px" }}></div>}
      >
        <FaRegHospital size={40} />
      </Suspense>
    ),
  },
];

const expiredSubscriptions: subscriptionItemType[] = [
  {
    product: "TPL",
    alertChecked: false,
    expireDate: "27/12/2024",
    issueDate: "28/12/2023",
    price: "$123.23",
    status: "Expired",
    icon: (
      <Suspense
        fallback={<div style={{ height: "40px", width: "40px" }}></div>}
      >
        <BsCarFrontFill size={40} />
      </Suspense>
    ),
  },
  {
    product: "Shendeti",
    alertChecked: true,
    expireDate: "15/6/2024",
    issueDate: "16/6/2023",
    price: "$83.12",
    status: "Expired",
    icon: (
      <Suspense
        fallback={<div style={{ height: "40px", width: "40px" }}></div>}
      >
        <FaRegHospital size={40} />
      </Suspense>
    ),
  },
];

export function Subscriptions() {
  return (
    <Reveal width="100%" height="100%" delay={0} duration={0.5}>
      {/* <div className="flex flex-col gap-1">
        <SectionContainer
          sectionName="Active Subscriptions"
          defaultState={true}
        >
          <div className="flex flex-col gap-2 py-2">
            {activeSubscriptions.map((subscription) => {
              return <SubscriptionItem subscription={subscription} />;
            })}
          </div>
        </SectionContainer>
        <SectionContainer sectionName="Expired Subscriptions">
          <div className="flex flex-col gap-2 py-2">
            {expiredSubscriptions.map((subscription) => {
              return <SubscriptionItem subscription={subscription} />;
            })}
          </div>
        </SectionContainer>
      </div> */}
      <div className="h-[500px]">
        <SelectInput
          placeholder={"Lloji i sigurimit"}
          name={"test"}
          value={"motorrike"}
          isValid={true}
          options={[
            { id: "motorrike", text: "Motorrike" },
            { id: "shendeti", text: "Shendeti" },
            { id: "prona", text: "Prona" },
          ]}
          onOptionChange={() => {}}
        />
      </div>
    </Reveal>
  );
}
