import NumberFlow from "@number-flow/react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const AnimatedNumber = ({
  value,
  startFromZero = true,
  marginBottom = "0",
  className = "",
  duration = 400,
}: {
  value: number;
  startFromZero?: boolean;
  marginBottom?: string;
  className?: string;
  duration?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    //@ts-ignore
    margin: `0px 0px ${marginBottom}% 0px`,
    once: true,
  });
  return (
    <>
      <NumberFlow
        className={className}
        ref={ref}
        value={isInView ? value : startFromZero ? "0" : value}
        transformTiming={{ duration: duration }}
        trend={0}
        willChange
      />
    </>
  );
};
