import { ReactNode } from "react";

export const ItemComponent = ({
  icon,
  bgColor,
  mainTitle,
  subTitle,
  description,
}: {
  icon: ReactNode;
  bgColor: string;
  mainTitle: string;
  subTitle: string;
  description: string;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-start my-3 md:mx-3">
      <div className="flex w-full flex-col items-center">
        <div className={`w-fit rounded-full p-4 ${bgColor}`}>{icon}</div>
        <h3 className="h2 mt-6">{mainTitle}</h3>
        <p className="h4 text-center">{subTitle}</p>
        <hr className="my-4 w-full" />
      </div>
      <p className="text-justify text-sm text-muted">{description}</p>
    </div>
  );
};
