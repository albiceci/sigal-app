import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuSubItem } from "./menuSubItem/menuSubItem";
import React from "react";

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
  itemData: {
    name: string;
    link: string | null;
    icons: {
      primary: JSX.Element;
      secondary: JSX.Element;
    };
    key: string;
    subCategories:
      | {
          name: string;
          link: string;

          key: string;
        }[]
      | null;
  };
  activeKey?: string | null;
};

export const MenuItem = ({ itemData, activeKey }: menuItemProps) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [subCatOpen, setSubCatOpen] = useState<boolean>(false);

  const handleOpenSubCat = () => {
    if (subCatOpen) setSubCatOpen(false);
    else setSubCatOpen(true);
  };

  useEffect(() => {
    if (
      itemData.subCategories &&
      itemData.subCategories.filter((item) => item.key === activeKey).length
    )
      setSubCatOpen(true);
    else setSubCatOpen(false);
  }, [activeKey, itemData.subCategories]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[220px] flex">
        {itemData.key === activeKey ? (
          <div
            className={`flex items-center p-[10px] flex-grow no-underline text-white text-sm font-normal transition-colors text-[rgb(211, 212, 212)] bg-primarysub rounded-[10px]`}
          >
            {itemData.icons.primary}
            <span className="ml-[3px]">{itemData.name}</span>
          </div>
        ) : itemData.link ? (
          <Link
            className={`flex items-center p-[10px] flex-grow no-underline text-white text-sm font-normal transition-colors rounded-[10px] hover:text-[rgb(211, 212, 212)] hover:bg-primarysub`}
            to={itemData.link}
            onMouseOver={() => {
              setIsMouseOver(true);
            }}
            onMouseOut={() => {
              setIsMouseOver(false);
            }}
          >
            {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
            <span className="ml-[3px]">{itemData.name}</span>
          </Link>
        ) : (
          <div
            className={`flex items-center p-[10px] flex-grow no-underline text-white text-sm font-normal transition-colors rounded-[10px] hover:text-[rgb(211, 212, 212)] hover:bg-primarysub`}
            onMouseOver={() => {
              setIsMouseOver(true);
            }}
            onMouseOut={() => {
              setIsMouseOver(false);
            }}
          >
            {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
            <span className="ml-[3px]">{itemData.name}</span>
          </div>
        )}
        {itemData.subCategories ? (
          <div
            className="text-white cursor-pointer p-[10px] flex justify-center items-center"
            onClick={handleOpenSubCat}
          >
            <Suspense
              fallback={<div style={{ height: "20px", width: "20px" }}></div>}
            >
              <MdOutlineKeyboardArrowUp
                size={20}
                style={{ display: subCatOpen ? "block" : "none" }}
              />

              <MdOutlineKeyboardArrowDown
                size={20}
                style={{ display: !subCatOpen ? "block" : "none" }}
              />
            </Suspense>
          </div>
        ) : null}
      </div>
      {itemData.subCategories ? (
        <div
          className={`bg-primarysubalt w-[220px] rounded-[10px] ${
            subCatOpen ? "flex flex-col" : "hidden"
          }`}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          {itemData.subCategories.map((item, index) => {
            return (
              <MenuSubItem key={index} itemData={item} activeKey={activeKey} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
