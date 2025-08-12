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
  margin = "0px 0px 0px 0px",
}: {
  children: ReactNode;
  width?: "fit-content" | "100%";
  height?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  distance?: number;
  type?: "x" | "y" | null;
  margin?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //margin: "0px 0px -10% 0px",
    once: true,
  });

  return (
    <div
      className={`transition-[opacity, translate] ${isInView ? `opacity-100` : `will-change-transform opacity-0`}`}
      ref={ref}
      style={{
        height: height,
        width: width,
        transform: `translate(${isInView || type === "y" ? "0" : distance}px, ${
          isInView || type === "x" ? "0" : distance
        }px)`,
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
};
