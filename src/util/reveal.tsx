import { useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

export const Reveal = ({
  children,
  width = "fit-content",
  height = "fit-content",
  delay = 0,
  duration = 0.5,
  type = "y",
  distance = 70,
  distanceType = "px",
  opacityTransition = true,
  marginBottom = "0",
}: {
  children: ReactNode;
  width?: "fit-content" | "100%" | undefined;
  height?: "fit-content" | "100%" | undefined;
  delay?: number;
  duration?: number;
  distance?: number;
  distanceType?: "px" | "%";
  opacityTransition?: boolean;
  type?: "x" | "y" | null;
  marginBottom?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //@ts-ignore
    margin: `0px 0px ${marginBottom}% 0px`,
    once: true,
  });

  return (
    <div
      className={`transition-[opacity, translate] ${isInView ? `` : `will-change-transform`} ${
        isInView || !opacityTransition ? `opacity-100` : `opacity-0`
      }`}
      ref={ref}
      style={{
        height: height,
        width: width,
        transform: `translate(${isInView || type === "y" ? "0" : distance}${distanceType}, ${
          isInView || type === "x" ? "0" : distance
        }${distanceType})`,
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};
