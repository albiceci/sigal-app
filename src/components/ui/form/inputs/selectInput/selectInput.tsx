import React, { Suspense } from "react";
import { CSSProperties, useState } from "react";

const FaRegQuestionCircle = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegQuestionCircle,
  }))
);
const MdOutlineKeyboardArrowDown = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowDown,
  }))
);

const MdOutlineKeyboardArrowUp = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowUp,
  }))
);

export type dateInputType = React.HTMLAttributes<HTMLDivElement> & {
  errors?: string[];
  isValid?: boolean;
  helper?: string | null;
  placeholder: string;
  value: string | undefined;
  name: string;
  options: {
    id: string;
    text: string;
  }[];
  onOptionChange: (name: string, value: string) => void;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
};

export const SelectInput: React.FC<dateInputType> = ({
  errors = [],
  isValid = false,
  helper = null,
  placeholder,
  value,
  name,
  options,
  onOptionChange,
  containerStyle = {},
  style = {},
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);

  return (
    <div className="flex-[1] flex flex-col gap-1 relative" style={{ ...containerStyle }}>
      <div className="flex w-full">
        <div className="w-full">
          <div
            className={`py-2 px-3 pr-10 lg:pr-7 border-[1px] rounded-md min-w-[100%] cursor-pointer ${
              errors.length
                ? "border-red-400 focus:border-red-500 bg-red-50"
                : isValid
                ? "border-primary focus:border-primarysub bg-blue-50"
                : "border-gray-200 focus:border-gray-400 bg-gray-100"
            }`}
            {...props}
            style={{ ...style }}
            onClick={() => {
              setIsFocus(!isFocus);
            }}
          >
            <div
              className={`${value !== "" ? "" : "text-transparent"} font-semibold ${
                errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
              }`}
            >
              {options.filter((x) => x.id === value).length ? options.filter((x) => x.id === value)[0].text : "/"}
            </div>
          </div>

          {isFocus ? (
            <div className="z-20 absolute bg-gray-50 w-full border-[1px] rounded-md max-h-36 overflow-auto">
              {options.map((option) => {
                return (
                  <div
                    className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      if (option.id !== value) onOptionChange(name, option.id);
                      setIsFocus(false);
                    }}
                  >
                    {option.text}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div
          className={`absolute cursor-pointer ${helper ? "right-10 lg:right-7" : "right-2"} ${
            errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
          }`}
          style={{
            paddingTop: style.paddingTop ? Number(style.paddingTop) + 2 : 10,
          }}
          onClick={() => {
            setIsFocus(!isFocus);
          }}
        >
          <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
            <MdOutlineKeyboardArrowUp size={25} style={{ display: isFocus ? "block" : "none" }} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
            <MdOutlineKeyboardArrowDown size={25} style={{ display: isFocus ? "none" : "block" }} />
          </Suspense>
        </div>
        {helper ? (
          <div
            className={`absolute right-2 flex items-center text-sm font-semibold ${
              errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
            }`}
            style={{
              paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 12,
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
              <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
                <FaRegQuestionCircle size={20} />
              </Suspense>
            </div>
            <div
              className={`absolute w-36 z-20 left-0 translate-x-[-140px] lg:ml-5 lg:translate-x-[0] text-center bg-white p-2 border ${
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
          errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
        }`}
        style={
          value !== ""
            ? {
                top: -10,
                fontSize: "14px",
                background: "linear-gradient(to top, transparent, white, transparent)",
              }
            : {
                paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 10,
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
              return <span className="text-red-400 font-semibold text-sm">&#x25cf; {error}</span>;
            })
          : ""}
      </div>
    </div>
  );
};
