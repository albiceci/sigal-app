import { CSSProperties, useEffect, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import React from "react";
//import "./buttonShimmer.css";

type buttonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: "primary" | "secondary" | "secondaryAlt";
  padding?: string;
  fontStyle?: string;
  children: React.ReactNode;
  icon?: {
    type: "lottie";
    animationData: any;
    style?: CSSProperties;
    placement: "before" | "after";
  };
  disabled?: boolean;
};

export const Button = ({ buttonType, padding, fontStyle, children, icon, disabled = false, ...props }: buttonType) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  const classNames = {
    primary: `text-white border border-transparent ${
      disabled
        ? "bg-gray-600"
        : "bg-primary hover:bg-primarysub shimmer shadow-[rgba(0,102,179,255)_0px_10px_25px_-10px]"
    }`,
    secondary: `text-white border border-white ${
      disabled ? "bg-primarysubalt opacity-50" : "bg-primary hover:bg-primarysubalt"
    }`,
    secondaryAlt: `bg-white text-primary border border-primary ${disabled ? "opacity-50" : "hover:bg-cyan-50"}`,
  };

  const showLottieIcon = () => {
    return (
      <div>
        <Lottie
          lottieRef={lottieRef}
          style={{
            pointerEvents: "none",
            height: 24,
            width: 24,
            ...icon!.style,
          }}
          animationData={icon!.animationData}
          autoplay={false}
          loop={false}
          onComplete={(e) => {
            if (isHover) {
              lottieRef.current?.goToAndPlay(0);
            } else {
              lottieRef.current?.goToAndStop(0);
            }
          }}
        />
      </div>
    );
  };

  const renderText = () => {
    return (
      <>
        {icon && icon.type === "lottie" && icon.placement === "before" && showLottieIcon()}
        <span className="text-center h-fit">{children}</span>
        {icon && icon.type === "lottie" && icon.placement === "after" && showLottieIcon()}
      </>
    );
  };

  useEffect(() => {
    if (!disabled) lottieRef.current?.play();
    else setIsHover(false);
  }, [disabled]);
  return (
    <button
      className={`${padding || "px-10 py-3"} ${classNames[buttonType]} ${
        fontStyle || "font-black text-base"
      } flex gap-2 items-center justify-center w-full h-full transition-all rounded-md ${
        disabled ? "cursor-default" : "cursor-pointer hover:scale-105 active:scale-90"
      }`}
      onMouseOver={() => {
        if (!disabled) {
          setIsHover(true);
          lottieRef.current?.play();
        }
      }}
      onMouseOut={() => {
        if (!disabled) {
          setIsHover(false);
        }
      }}
      {...props}
    >
      {renderText()}
    </button>
  );
};
