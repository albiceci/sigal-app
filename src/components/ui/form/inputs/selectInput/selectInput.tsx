import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "./loader";
import { getErrorMessage } from "../../../../../helper/getErrorMessage";
import { useServer } from "../../../../../util/useServer";
import { useAlerter } from "../../../alerter/useAlerter";

const FaRegQuestionCircle = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegQuestionCircle,
  })),
);
const MdOutlineKeyboardArrowDown = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowDown,
  })),
);

const MdOutlineKeyboardArrowUp = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowUp,
  })),
);

const ErrorSVG = (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 "
        stroke="none"
        fill-rule="evenodd"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

export type selectInputType = React.HTMLAttributes<HTMLDivElement> & {
  errors?: string[];
  isValid?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  enumKey?: string;
  helper?: string | null;
  placeholder: string;
  value: string | undefined;
  name: string;
  options?: {
    id: string;
    text: string;
  }[];
  onOptionChange: (name: string, value: string) => void;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
};

export const SelectInput: React.FC<selectInputType> = ({
  errors = [],
  isValid = false,
  isLoading = false,
  isError = false,
  enumKey,
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
  const { t } = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(enumKey ? true : isLoading);
  const [isErrorState, setIsErrorState] = useState(isError);
  const [optionState, setOptionState] = useState<selectInputType["options"]>(options);

  const customFetch = useServer();
  const { alertMessage, render } = useAlerter();

  const getEnumOptions = useCallback(
    async (enumKey: string) => {
      setIsLoadingState(true);

      const jsonData = await customFetch("/form/enum/" + enumKey, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (jsonData.status !== 200) {
        alertMessage(getErrorMessage(jsonData.message));
        setIsErrorState(true);
      } else {
        setIsLoadingState(false);
        setIsErrorState(false);

        setOptionState((prev) => {
          return jsonData.data.map((option: { key: string; value: string }) => {
            return { id: option.key, text: option.value };
          });
        });
        //
      }
    },
    [customFetch, alertMessage],
  );

  useEffect(() => {
    setOptionState(options);
  }, [options]);

  useEffect(() => {
    setIsErrorState(isError);
  }, [isError]);

  useEffect(() => {
    setIsLoadingState(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (enumKey) {
      getEnumOptions(enumKey);
    }
  }, [enumKey, getEnumOptions]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-[1] flex flex-col gap-1 relative" style={{ ...containerStyle }}>
      {render}
      <div className="flex w-full">
        <div className="w-full">
          <div
            className={`py-[10px] px-3 pr-10 lg:pr-7 border-[1px] rounded-md w-full min-w-[150px] cursor-pointer ${
              errors.length
                ? "border-red-400 focus:border-red-500 bg-red-50"
                : isValid
                  ? "border-primary focus:border-primarysub bg-[#f6f9fd]"
                  : "border-gray-200 focus:border-gray-400 bg-gray-50"
            } ${isFocus && "rounded-b-none border-[2px] m-0"}`}
            {...props}
            style={{ ...style }}
            onClick={() => {
              if (isLoadingState === false) setIsFocus(!isFocus);
            }}
          >
            <div
              className={`${value !== "" && isLoadingState === false ? "" : "text-transparent"} font-semibold ${
                errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
              }`}
            >
              {optionState && optionState.filter((x) => x.id === value).length
                ? t(optionState.filter((x) => x.id === value)[0].text)
                : "/"}
            </div>
          </div>

          {isFocus ? (
            <div className="z-20 absolute bg-gray-50 w-full border-[1px] rounded-md rounded-t-none max-h-36 overflow-auto">
              {optionState &&
                optionState.map((option) => {
                  return (
                    <div
                      className="py-2 px-3 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        if (option.id !== value) onOptionChange(name, option.id);
                        setIsFocus(false);
                      }}
                    >
                      {t(option.text)}
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
            paddingTop: style.paddingTop ? Number(style.paddingTop) + 2 : 12,
          }}
          onClick={() => {
            if (isLoadingState === false) setIsFocus(!isFocus);
          }}
        >
          <div className={`${isLoadingState && !isErrorState ? "block" : "hidden"} pt-[2px]`}>
            <Loader />
          </div>
          <div className={`${isErrorState ? "block" : "hidden"} pt-[2px] h-[20px] w-[20px] text-red-400`}>
            {ErrorSVG}
          </div>
          <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
            <MdOutlineKeyboardArrowUp size={25} style={{ display: isFocus && !isLoadingState ? "block" : "none" }} />
          </Suspense>
          <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
            <MdOutlineKeyboardArrowDown size={25} style={{ display: isFocus || isLoadingState ? "none" : "block" }} />
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
          value !== "" && !isLoadingState
            ? {
                top: -10,
                fontSize: "14px",
                background: "linear-gradient(to top, transparent, white, transparent)",
              }
            : {
                paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 12,
                cursor: "text",
                fontSize: style.fontSize ? style.fontSize : 16,
              }
        }
      >
        {t(placeholder)}
      </label>
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
