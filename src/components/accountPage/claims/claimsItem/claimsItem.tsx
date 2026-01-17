import React, { Suspense, useState } from "react";
import { ReactNode } from "react";
import { Overlay } from "../../../../util/overlay";
import { Reveal } from "../../../../util/reveal";

const FaDownload = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaDownload,
  }))
);

const FaEye = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaEye,
  }))
);

const IoDocumentTextOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoDocumentTextOutline,
  }))
);

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

export type claimItemType = {
  id: string;
  serial: string;
  type: string;
  reportDate: string;
  status: string;
  data: {
    city: string;
    date: string;
    name: string;
    time: string;
    email: string;
    phone: string;
    surname: string;
    location: string;
    description: string;
    guiltyLicense: string;
    beneficiaryLicense: string;
  };
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

const ClaimInformation = ({ claimData, onClose }: { claimData: claimItemType["data"]; onClose: () => void }) => {
  return (
    <Reveal width="fit-content" height="fit-content">
      <div className="w-[95vw] sm:w-[85vw] md:w-[71vw] lg:w-[51vw] rounded-md bg-white shadow-lg">
        <div className="text-primary py-3 flex justify-between items-center border-b px-6">
          <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
            <div className="h4 font-semibold">INFORMACIONI I DEMIT</div>
          </div>
          <div onClick={onClose} className="cursor-pointer text-white bg-primary rounded-full hover:bg-primarysub">
            <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
              <IoClose size={"25"} />
            </Suspense>
          </div>
        </div>
        <div className="px-6 py-6 flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="w-1/2">
              <InfoItem name={"Emri"} value={claimData.name} />
            </div>
            <div className="w-1/2">
              <InfoItem name={"Mbiemri"} value={claimData.surname} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <InfoItem name={"Telefoni"} value={claimData.phone} />
            </div>
            <div className="w-1/2">
              <InfoItem name={"Email"} value={claimData.email} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <InfoItem name={"Targa e Shkaktarit"} value={claimData.guiltyLicense} />
            </div>
            <div className="w-1/2">
              <InfoItem name={"Targa e Perfituesit"} value={claimData.beneficiaryLicense} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <InfoItem name={"Qyteti i Aksidentit"} value={claimData.city} />
            </div>
            <div className="w-1/2">
              <InfoItem name={"Vendodhja e Aksidentit"} value={claimData.location} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <InfoItem name={"Data e Aksidentit"} value={claimData.date} />
            </div>
            <div className="w-1/2">
              <InfoItem name={"Ora e Aksidentit"} value={claimData.time} />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-grow">
              <InfoItem name={"Pershkrimi i Aksidentit"} value={claimData.description} />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export const ClaimItem = ({
  claimData,
  onDownload,
}: {
  claimData: claimItemType;
  onDownload: (id: string) => Promise<void>;
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <>
      <div className={`w-full p-2 flex gap-6 rounded-md border items-center justify-center flex-wrap bg-white`}>
        <div className="flex items-center justify-center">
          <div className="text-primary border p-3 h-fit border-primary rounded-md bg-white">
            <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
              <IoDocumentTextOutline size={25} />
            </Suspense>
          </div>
        </div>
        <div className="flex-grow flex gap-6">
          <div className="text-presetgray flex-grow">
            <InfoItem name={"Nr. Serial"} value={claimData.serial} />
            <InfoItem name={"Lloji"} value={claimData.type} />
          </div>
        </div>
        <div className="flex-grow flex gap-6">
          <div className="text-presetgray flex-grow">
            <InfoItem
              name={"Data e raportimit"}
              value={
                claimData.reportDate.match(/\d+-\d+-\d+/g) !== null
                  ? claimData.reportDate.match(/\d+-\d+-\d+/g)![0]
                  : ""
              }
            />
            <InfoItem name={"Statusi"} value={claimData.status} />
          </div>
        </div>
        <div className="flex items-center justify-center p-6 gap-5">
          <div
            title="View Report"
            className="cursor-pointer bg-green-500 px-3 py-2 rounded-md"
            onClick={() => {
              setIsInfoOpen(true);
            }}
          >
            <div className="text-white">
              <Suspense fallback={<div style={{ height: "15px", width: "15px" }}></div>}>
                <FaEye size={15} />
              </Suspense>
            </div>
          </div>
          <div
            title="Download Policy"
            className="cursor-pointer bg-primary px-3 py-2 rounded-md"
            onClick={() => {
              onDownload(claimData.id);
            }}
          >
            <div className="text-white">
              <Suspense fallback={<div style={{ height: "15px", width: "15px" }}></div>}>
                <FaDownload size={15} />
              </Suspense>
            </div>
          </div>
        </div>
        {isInfoOpen ? (
          <Overlay>
            <ClaimInformation
              claimData={claimData.data}
              onClose={() => {
                setIsInfoOpen(false);
              }}
            />
          </Overlay>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
