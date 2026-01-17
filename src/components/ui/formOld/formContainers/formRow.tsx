import { CSSProperties } from "react";

export const FormRow = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <div className="w-full flex gap-3 flex-wrap" style={{ ...style }}>
      {children}
    </div>
  );
};
