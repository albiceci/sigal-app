import "./contentContainer.css";

export const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[95vw] sm:w-[90vw] md:w-[85vw] contentContainer">{children}</div>;
};
