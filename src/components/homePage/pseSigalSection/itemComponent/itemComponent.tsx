import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const ItemComponent = ({
  icon,
  mainTitle,
  subTitle,
}: {
  icon: ReactNode;
  mainTitle: ReactNode;
  subTitle: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex h-full w-full flex-col items-start my-3 md:mx-3">
      <div className="flex w-full flex-col items-center">
        <div className={`w-fit rounded-full p-4 h-[150px] `}>{icon}</div>
        <h3 className="h2">{mainTitle}</h3>
        <p className="h4 text-center">{t(subTitle)}</p>
      </div>
    </div>
  );
};
