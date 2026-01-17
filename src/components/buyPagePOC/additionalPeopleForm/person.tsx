import { personalInfoFormFields } from "./personalInfoForm/personalInfoForm";

import person from "./person.svg";
import React, { Suspense } from "react";
import { Reveal } from "../../../util/reveal";
import { useTranslation } from "react-i18next";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

const IoStar = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoStar,
  }))
);

export const Person = ({
  personalInfo,
  onRemove,
  onEdit,
}: {
  personalInfo: typeof personalInfoFormFields;
  onRemove?: (personalInfo: typeof personalInfoFormFields) => void;
  onEdit?: (personalInfo: typeof personalInfoFormFields) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Reveal width="100%">
      <div
        className="w-full bg-white rounded-md shadow-md flex flex-col items-center gap-6 py-2 px-5 cursor-pointer"
        onClick={() => {
          if (onEdit) onEdit(personalInfo);
        }}
      >
        <div
          onClick={(event) => {
            if (onRemove) {
              event.stopPropagation();
              onRemove(personalInfo);
            }
          }}
          className={`fixed cursor-pointer text-gray-500 hover:bg-gray-300 rounded-full p-1 right-6 ${
            onRemove ? "block" : "hidden"
          }`}
        >
          <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
            <IoClose size={"25"} />
          </Suspense>
        </div>
        <div
          className={`flex gap-2 justify-center fixed rounded-md px-3 py-1 left-6 bg-yellow-50 border border-yellow-300 ${
            personalInfo.metadata.value.isOwner ? "block" : "hidden"
          }`}
        >
          <div className="text-yellow-300">
            <Suspense fallback={<div style={{ width: "20", height: "20" }}></div>}>
              <IoStar size={"20"} />
            </Suspense>
          </div>
          <div className="font-bold text-yellow-500">{t("form.additionalPeople.person.owner")}</div>
        </div>
        <div>
          <img className="h-[75px]" src={person} alt="" />
        </div>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          <div>
            <span className="text-primary font-semibold">{t("form.placeholder.taxNumber")} </span>
            <span>{personalInfo.taxNumber.value}</span>
          </div>
          <div>
            <span className="text-primary font-semibold">{t("form.placeholder.name")}: </span>
            <span>{personalInfo.name.value}</span>
          </div>
          <div>
            <span className="text-primary font-semibold">{t("form.placeholder.surname")}: </span>
            <span>{personalInfo.surname.value}</span>
          </div>
          <div>
            <span className="text-primary font-semibold">{t("form.placeholder.gender")}: </span>
            <span>{personalInfo.gender.value}</span>
          </div>
          <div>
            <span className="text-primary font-semibold">{t("form.placeholder.birthday")}: </span>
            <span>{personalInfo.birthday.value}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};
