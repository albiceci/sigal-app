import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type menuItemProps = {
  itemData: {
    name: string;
    link: string | null;
    icons: {
      primary: JSX.Element;
      secondary: JSX.Element;
    };
    key: string;
  };
  activeKey?: string | null;
};

export const MenuItem = ({ itemData, activeKey = null }: menuItemProps) => {
  const { t } = useTranslation();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  return (
    <div className="relative h-full inline-block items-center justify-center">
      {itemData.key === activeKey ? (
        <div
          className={`p-[2px] px-5 h-full no-underline text-presetgray text-xs font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center text-primary border-b-2 border-b-primary `}
        >
          {itemData.icons.primary}
          <span>{t(itemData.name)}</span>
        </div>
      ) : itemData.link ? (
        <Link
          className={`p-[2px] px-5 h-full no-underline  text-xs font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center  hover:border-b-2  hover:text-primary text-presetgray hover:border-b-primary`}
          to={itemData.link}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
          preventScrollReset={false}
        >
          {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
          <span>{t(itemData.name)}</span>
        </Link>
      ) : (
        <div
          className={`p-[2px] px-5 h-full no-underline text-xs font-semibold transition-colors hover:text-primary text-presetgray hover:border-b-primary whitespace-nowrap flex flex-col items-center justify-center hover:border-b-2`}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
          <span>{t(itemData.name)}</span>
        </div>
      )}
    </div>
  );
};
