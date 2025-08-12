import React, { Suspense } from "react";
import { CSSProperties, useState } from "react";
const FaRegQuestionCircle = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegQuestionCircle,
  }))
);

export type dateInputType = React.InputHTMLAttributes<HTMLInputElement> & {
  errors?: string[];
  helper?: string | null;
  placeholder: string;
  isValid?: boolean;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
};

export const DateInput: React.FC<dateInputType> = ({
  helper = null,
  errors = [],
  placeholder,
  isValid = false,
  containerStyle = {},
  style = {},
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);
  return (
    <div
      className="flex-[1] flex flex-col gap-1 relative"
      style={{ ...containerStyle }}
    >
      <div className="flex w-full">
        <input
          type="date"
          className={`py-3 px-1 pr-10 lg:pr-7 border-[1px] rounded-md focus:outline-none min-w-[100%] transition-[border-color] ${
            isFocus || props.value !== "" ? "" : "text-transparent"
          } ${
            errors.length
              ? "border-red-400 focus:border-red-500 bg-red-50"
              : isValid
              ? "border-primary focus:border-primarysub bg-blue-50"
              : "border-gray-200 focus:border-gray-400 bg-gray-100"
          }`}
          {...props}
          style={{ ...style }}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
        />
        {helper ? (
          <div
            className={`absolute right-2 flex items-center text-sm font-semibold ${
              errors.length
                ? "text-red-500"
                : isValid
                ? "text-primary"
                : "text-gray-400"
            }`}
            style={{
              paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 16,
            }}
          >
            <div
              className="h-[40px] w-[40px] flex justify-center lg:h-fit lg:w-fit"
              onMouseOver={() => {
                setIsHelperHover(true);
              }}
              onMouseOut={() => {
                setIsHelperHover(false);
              }}
            >
              <Suspense
                fallback={<div style={{ height: "20px", width: "20px" }}></div>}
              >
                <FaRegQuestionCircle size={20} />
              </Suspense>
            </div>
            <div
              className={`z-20 absolute w-36 left-0 translate-x-[-140px] lg:ml-5 lg:translate-x-[0] text-center bg-white p-2 border ${
                isHelperHover ? "visible" : "hidden"
              }`}
            >
              {helper}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <label
        className={`absolute mx-2 px-1 font-semibold transition-all pointer-events-none ${
          errors.length
            ? "text-red-500"
            : isValid
            ? "text-primary"
            : "text-gray-400"
        }`}
        style={
          isFocus || props.value !== ""
            ? {
                top: -10,
                fontSize: "14px",
                background:
                  "linear-gradient(to top, transparent, white, transparent)",
              }
            : {
                paddingTop: style.paddingTop
                  ? Number(style.paddingTop) + 4
                  : 14,
                cursor: "text",
                fontSize: style.fontSize ? style.fontSize : 16,
              }
        }
      >
        {placeholder}
      </label>
      <div className="flex flex-col px-1">
        {errors.length
          ? errors.map((error) => {
              return (
                <span className="text-red-400 font-semibold text-sm">
                  &#x25cf; {error}
                </span>
              );
            })
          : ""}
      </div>
    </div>
  );
};
