import "./contentContainer.css";

export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-[95vw] contentContainer">{children}</div>;
};
