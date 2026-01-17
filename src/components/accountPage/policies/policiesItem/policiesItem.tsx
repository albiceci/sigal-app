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

const FaDownload = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaDownload,
  }))
);

export type subscriptionItemType = {
  productDisplayName: string;
  productTemplateDisplayName: string;
  relatedAgencyDisplayName: string;
  serial: string;
  startDateUtc: string;
  endDateUtc: string;
  status: string;
  premiumGross: number;
  currencyType: string;
  id: string;
  plate: string;
  personDisplayName: string;
  alertEnabled: boolean;
  icon: JSX.Element;
};

const InfoItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-primary whitespace-nowrap">{name}</span>
      <hr className="bg-primary h-[2px] opacity-50" />
      <div className="font-medium text-sm whitespace-nowrap">{value}</div>
    </div>
  );
};

export const SubscriptionItem = ({
  subscription,
  onDownload,
}: {
  subscription: subscriptionItemType;
  onDownload: (id: string) => Promise<void>;
}) => {
  const [isAlertEnabled, setIsAlertEnabled] = useState<boolean>(subscription.alertEnabled);

  return (
    <div
      className={`w-full p-2 flex gap-6 rounded-md border items-center justify-center flex-wrap ${
        subscription.status === "Issued" ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="text-primary border p-3 h-fit border-primary rounded-md bg-white">{subscription.icon}</div>
      </div>
      <div className="flex-grow flex gap-6">
        <div className="text-presetgray flex-grow">
          <InfoItem name={"Produkti"} value={subscription.productDisplayName} />
          <InfoItem name={"Paketa"} value={subscription.productTemplateDisplayName} />
          <InfoItem name={"Agjensia"} value={subscription.relatedAgencyDisplayName} />
        </div>
      </div>
      <div className="flex-grow flex gap-6">
        <div className="text-presetgray flex-grow">
          {subscription.plate ? <InfoItem name={"Targa"} value={subscription.plate} /> : <></>}
          {subscription.personDisplayName ? (
            <InfoItem name={"I siguruari"} value={subscription.personDisplayName} />
          ) : (
            <></>
          )}
          <InfoItem name={"Cmimi"} value={`${subscription.currencyType} ${String(subscription.premiumGross)}`} />
          <InfoItem name={"Nr. Serial"} value={subscription.serial} />
        </div>
      </div>
      <div className="flex-grow flex gap-6">
        <div className="text-presetgray flex-grow">
          <InfoItem
            name={"Data e fillimit"}
            value={
              subscription.startDateUtc.match(/\d+-\d+-\d+/g) !== null
                ? subscription.startDateUtc.match(/\d+-\d+-\d+/g)![0]
                : ""
            }
          />
          <InfoItem
            name={"Data e mbarimit"}
            value={
              subscription.endDateUtc.match(/\d+-\d+-\d+/g) !== null
                ? subscription.endDateUtc.match(/\d+-\d+-\d+/g)![0]
                : ""
            }
          />
          <InfoItem name={"Statusi"} value={subscription.status} />
        </div>
      </div>
      <div className="flex items-center justify-center p-6 gap-5">
        {subscription.status === "Issued" ? (
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
                <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
                  <BsBellFill size={25} />
                </Suspense>
              </div>
            ) : (
              <div className="text-red-500">
                <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
                  <BsBellSlash size={25} />
                </Suspense>
              </div>
            )}
          </div>
        ) : undefined}
        <div
          title="Download Policy"
          className="cursor-pointer bg-primary px-3 py-2 rounded-md"
          onClick={() => {
            onDownload(subscription.id);
          }}
        >
          <div className="text-white">
            <Suspense fallback={<div style={{ height: "15px", width: "15px" }}></div>}>
              <FaDownload size={15} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};
