import { ScrollRestoration } from "react-router-dom";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[100%] overflow-hidden pb-[50px] lg:pb-0">
      <ScrollRestoration />
      <div id="overlayContainer" className="fixed z-[100] left-0 top-[0]"></div>
      <div id="alerterContainer" className="fixed z-[200] w-full top-[10vh]"></div>
      {children}
    </div>
  );
};
