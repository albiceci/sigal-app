import React, { Suspense, useEffect } from "react";
import { CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
const FaRegQuestionCircle = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegQuestionCircle,
  })),
);

export type textInputType = React.InputHTMLAttributes<HTMLInputElement> & {
  errors?: string[];
  helper?: string | null;
  placeholder: string;
  isValid?: boolean;
  valueType?: "number";
  containerStyle?: CSSProperties;
  style?: CSSProperties;
  selfState?: boolean;
  prefixElement?: JSX.Element;
  onValueChange?: (name: string, value: string) => void;
};

export const TextInput: React.FC<textInputType> = React.memo(
  ({
    helper = null,
    errors = [],
    placeholder,
    valueType,
    isValid = false,
    containerStyle = {},
    style = {},
    selfState = false,
    prefixElement,
    onValueChange,
    ...props
  }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isHelperHover, setIsHelperHover] = useState(false);
    const [value, setValue] = useState(props.value);

    const showValue = (value: any) => {
      let rawValue = value;

      let numberValue = parseFloat(rawValue);

      if (!isNaN(numberValue) && valueType === "number") {
        return numberValue.toLocaleString("en-US");
      } else {
        return rawValue;
      }
    };

    const valuePostProccess = (value: any) => {
      if (valueType === "number") {
        return value.replace(/\D/g, "");
      } else {
        return value;
      }
    };

    useEffect(() => {
      setValue(props.value);
    }, [props.value]);

    const { t } = useTranslation();
    return (
      <div className="flex flex-col flex-[1]">
        <div className="flex h-fit">
          {prefixElement && (
            <div className="w-fit px-2 flex items-center justify-center bg-white border m-[1px] mr-0 rounded-md rounded-r-none cursor-default">
              {prefixElement}
            </div>
          )}
          <div className="flex flex-col gap-1 relative flex-grow h-fit" style={{ ...containerStyle }}>
            <div className="flex">
              <input
                type="text"
                id={props.name}
                className={`py-[9px] px-3 pr-10 lg:pr-7 m-[1px] border-[1px] focus:border-[2px] focus:m-0 rounded-md focus:outline-none w-full transition-[border-color] min-w-[150px] ${
                  errors.length
                    ? "border-red-400 focus:border-red-500 bg-red-50"
                    : isValid
                      ? "border-primary focus:border-primarysub bg-[#f6f9fd]"
                      : "border-gray-200 hover:border-gray-400 focus:border-gray-400 bg-gray-50"
                } ${prefixElement && "ml-0 rounded-l-none"}`}
                {...props}
                style={{ ...style }}
                onFocus={() => {
                  setIsFocus(true);
                }}
                onBlur={(e) => {
                  setIsFocus(false);

                  if (selfState && props.onChange) {
                    //@ts-ignore
                    props.onChange(e);
                  } else if (selfState && onValueChange && props.name) {
                    onValueChange(props.name, valuePostProccess(e.target.value));
                  }
                }}
                onChange={(e) => {
                  if (selfState) {
                    setValue(valuePostProccess(e.target.value));
                  } else if (props.onChange) {
                    //@ts-ignore
                    props.onChange(e);
                  } else if (onValueChange && props.name) {
                    onValueChange(props.name, valuePostProccess(e.target.value));
                  }
                }}
                value={selfState ? showValue(value) : showValue(props.value)}
              />
              {helper ? (
                <div
                  className={`absolute right-2 flex items-center text-sm font-semibold ${
                    errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
                  }`}
                  style={{
                    paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 14,
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
                    className={`absolute z-20 w-36 left-0 -translate-y-[80%] sm:-translate-y-[70%] -translate-x-[50%] text-center bg-white p-2 border ${
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
              className={`absolute mx-2 px-1 font-semibold transition-all pointer-events-none text-nowrap ${
                errors.length ? "text-red-500" : isValid ? "text-primary" : "text-gray-400"
              }`}
              style={
                isFocus || props.value !== ""
                  ? {
                      top: -10,
                      fontSize: "14px",
                      background: "linear-gradient(to top, transparent, white, white, transparent)",
                    }
                  : {
                      paddingTop: style.paddingTop ? Number(style.paddingTop) + 4 : 12,
                      cursor: "text",
                      willChange: "auto",
                      fontSize: style.fontSize ? style.fontSize : 16,
                    }
              }
              htmlFor={props.name}
            >
              {t(placeholder)}
            </label>
          </div>
        </div>
        {errors.length
          ? errors.map((error, index) => {
              return (
                <div className="flex flex-col px-1">
                  <span key={index} className="text-red-400 font-semibold text-sm">
                    &#x25cf; {t(error)}
                  </span>
                </div>
              );
            })
          : ""}
      </div>
    );
  },
);
