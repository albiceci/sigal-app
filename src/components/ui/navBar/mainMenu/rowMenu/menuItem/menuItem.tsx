import React, { Suspense } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuSubItem } from "./menuSubItem/menuSubItem";
import { NavBarItem } from "../../../navBarData";

const MdOutlineKeyboardArrowDown = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowDown,
  }))
);

const MdOutlineKeyboardArrowUp = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowUp,
  }))
);

type menuItemProps = {
  itemData: NavBarItem;
  activeKey?: string | null;
  theme: "primary" | "white";
};

export const MenuItemWapper = ({
  itemData,

  children,
}: {
  itemData: menuItemProps["itemData"];
  children: JSX.Element;
}) => {
  return (
    <>
      {itemData.link ? (
        <Link to={itemData.link} preventScrollReset={false} className="h-full">
          {children}
        </Link>
      ) : (
        <div className="h-full">{children}</div>
      )}
    </>
  );
};

export const MenuItem = ({ itemData, activeKey = null, theme }: menuItemProps) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const colors = {
    isActive: {
      primary: "text-primary border-b-2 border-b-primary",
      white: "text-primary border-b-2 border-b-primary",
    },
    isLink: {
      primary: "text-white",
      white: "hover:text-primary text-presetgray hover:border-b-2 hover:border-b-primary",
    },
    isNotLink: {
      primary: "text-white",
      white: "hover:text-primary text-presetgray hover:border-b-2 hover:border-b-primary",
    },
  };
  return (
    <div className="relative h-full inline-block items-center justify-center">
      <MenuItemWapper itemData={itemData}>
        <div
          className={`p-[2px] h-full no-underline xl:text-sm text-xs font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center ${
            itemData.key === activeKey
              ? `${colors.isActive[theme]}`
              : itemData.link
              ? `${colors.isLink[theme]}`
              : `${colors.isNotLink[theme]}`
          }`}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          <div className="h-full flex gap-1 xl:gap-2 items-center justify-center">
            <div className="text-base">
              {itemData.icons ? (
                isMouseOver || itemData.key === activeKey ? (
                  itemData.icons.primary
                ) : (
                  itemData.icons.secondary
                )
              ) : (
                <></>
              )}
            </div>
            <span>{itemData.name}</span>
          </div>
          {itemData.subCategories ? (
            <div className="absolute bottom-0">
              {isMouseOver ? (
                <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
                  <MdOutlineKeyboardArrowUp size={20} />
                </Suspense>
              ) : (
                <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
                  <MdOutlineKeyboardArrowDown size={20} />
                </Suspense>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </MenuItemWapper>

      {itemData.subCategories && isMouseOver ? (
        <div
          className={`absolute bg-white w-full rounded-sm p-2 border flex flex-col items-center justify-center`}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          {itemData.subCategories.map((item) => {
            return <MenuSubItem itemData={item} activeKey={activeKey} />;
          })}
        </div>
      ) : null}
    </div>
  );
};
