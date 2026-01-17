import { CSSProperties } from "react";

export const FormBody = ({ children, style = {} }: { children: React.ReactNode; style?: CSSProperties }) => {
  return (
    <div className="flex flex-col py-10 sm:py-5 gap-5 w-full h-fit" style={{ ...style }}>
      {children}
    </div>
  );
};
