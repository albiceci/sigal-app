import { ScrollRestoration } from "react-router-dom";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[100%] overflow-hidden">
      <ScrollRestoration />
      <div id="overlayContainer" className="fixed z-[100] left-0 top-[0]"></div>
      <div
        id="alerterContainer"
        className="fixed z-[200] right-0 top-[15vh]"
      ></div>
      {children}
    </div>
  );
};
