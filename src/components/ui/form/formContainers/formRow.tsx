import { CSSProperties } from "react";

export const FormRow = ({ children, style = {} }: { children: React.ReactNode; style?: CSSProperties }) => {
  return (
    <div className="w-full flex gap-5 flex-wrap" style={{ ...style }}>
      {children}
    </div>
  );
};
