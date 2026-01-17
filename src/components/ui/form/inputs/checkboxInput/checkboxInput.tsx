import React, { Suspense } from "react";
import { CSSProperties, useState } from "react";
import check from "./check.svg";
import { useTranslation } from "react-i18next";

const FaRegQuestionCircle = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegQuestionCircle,
  }))
);

export type checkboxInputType = {
  errors?: string[];
  helper?: string | null;
  isValid?: boolean;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
  text: string;
  value: boolean;
  onClick: (name: string, value: boolean) => void;
  name: string;
};

export const CheckboxInput = ({
  helper = null,
  errors = [],
  isValid = false,
  containerStyle = {},
  style = {},
  text,
  value,
  name,
  onClick,
}: checkboxInputType) => {
  const { t } = useTranslation();
  return (
    <div className="flex-[1] flex flex-col gap-1 relative" style={{ ...containerStyle }}>
      <div className="flex items-center justify-center">
        <div
          className={` flex gap-3 py-4 px-2 pr-10 border-[1px] rounded-md focus:outline-none cursor-pointer w-fit transition-[border-color] min-w-[150px] ${
            errors.length
              ? "border-red-400 focus:border-red-500 bg-red-50"
              : value
              ? "border-primary focus:border-primarysub bg-blue-50 text-primary"
              : "border-gray-200 hover:border-gray-400 focus:border-gray-400 bg-gray-100 text-presetgray"
          }`}
          style={{ ...style }}
          onClick={() => {
            onClick(name, !value);
          }}
        >
          <div>
            <div className={`w-6 h-6 flex items-center justify-center`}>
              {value ? (
                <img src={check} className="w-6 h-6" alt="check" />
              ) : (
                <div className="w-5 h-5 border border-presetgray rounded-md">{""}</div>
              )}
            </div>
          </div>
          <div className="font-semibold">{t(text)}</div>
        </div>
      </div>
      <div className="flex flex-col px-1">
        {errors.length
          ? errors.map((error) => {
              return <span className="text-red-400 font-semibold text-sm">&#x25cf; {t(error)}</span>;
            })
          : ""}
      </div>
    </div>
  );
};
