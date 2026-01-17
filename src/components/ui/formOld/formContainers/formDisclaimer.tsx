import { CSSProperties } from "react";

export const FormDisclaimer = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div className="text-sm text-gray-500 font-medium" style={{ ...style }}>
      {children}
    </div>
  );
};
