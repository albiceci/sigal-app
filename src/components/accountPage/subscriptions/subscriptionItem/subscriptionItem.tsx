import React, { Suspense, useState } from "react";
import { ReactNode } from "react";

const BsBellSlash = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsBellSlash,
  }))
);

const BsBellFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsBellFill,
  }))
);

export type subscriptionItemType = {
  product: string;
  issueDate: string;
  expireDate: string;
  alertChecked: boolean;
  status: string;
  price: string;
  icon: ReactNode;
};

const InfoItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-primary whitespace-nowrap">
        {name}
      </span>
      <hr className="bg-primary h-[2px] opacity-50" />
      <div className="font-medium text-sm whitespace-nowrap">{value}</div>
    </div>
  );
};

export const SubscriptionItem = ({
  subscription,
}: {
  subscription: subscriptionItemType;
}) => {
  const [isAlertEnabled, setIsAlertEnabled] = useState<boolean>(
    subscription.alertChecked
  );
  return (
    <div
      className={`w-full p-2 flex gap-6 rounded-md border items-center justify-center flex-wrap ${
        subscription.status === "Active"
          ? "bg-green-50 border-green-100"
          : "bg-red-50 border-red-100"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="text-primary border p-3 h-fit border-primary rounded-md bg-white">
          {subscription.icon}
        </div>
      </div>
      <div className="flex-grow flex gap-6">
        <div className="text-presetgray flex-grow">
          <InfoItem name={"Product"} value={subscription.product} />
          <InfoItem name={"Status"} value={subscription.status} />
        </div>
        <div className="text-presetgray flex-grow">
          <InfoItem name={"Issue Date"} value={subscription.issueDate} />
          <InfoItem name={"Expire Date"} value={subscription.expireDate} />
        </div>
        <div className="text-presetgray flex-grow">
          <InfoItem name={"Price"} value={subscription.price} />
        </div>
      </div>
      {subscription.status === "Active" ? (
        <div className="flex items-center justify-center p-6">
          <div
            title="Enable to get notified by email 1 week before expiration"
            className="cursor-pointer"
            onClick={() => {
              setIsAlertEnabled((prev) => {
                return !prev;
              });
            }}
          >
            {isAlertEnabled ? (
              <div className="text-green-500">
                <Suspense
                  fallback={
                    <div style={{ height: "25px", width: "25px" }}></div>
                  }
                >
                  <BsBellFill size={25} />
                </Suspense>
              </div>
            ) : (
              <div className="text-red-500">
                <Suspense
                  fallback={
                    <div style={{ height: "25px", width: "25px" }}></div>
                  }
                >
                  <BsBellSlash size={25} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
