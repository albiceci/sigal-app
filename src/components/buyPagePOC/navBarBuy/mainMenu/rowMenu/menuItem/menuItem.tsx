import { Suspense, useState } from "react";
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

export const MenuItem = ({ itemData, activeKey = null }: menuItemProps) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  return (
    <div className="relative h-full inline-block items-center justify-center">
      {itemData.key === activeKey ? (
        <div
          className={`p-[2px] h-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center text-primary border-b-2 border-b-primary `}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          {itemData.icons.primary}
          <span>{itemData.name}</span>
          {itemData.subCategories ? (
            <div className="absolute bottom-0">
              {isMouseOver ? (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowUp size={20} />
                </Suspense>
              ) : (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowDown size={20} />
                </Suspense>
              )}
            </div>
          ) : null}
        </div>
      ) : itemData.link ? (
        <Link
          className={`p-[2px] h-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center hover:text-primary hover:border-b-2 hover:border-b-primary `}
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
          <span>{itemData.name}</span>
          {itemData.subCategories ? (
            <div className="absolute bottom-0">
              {isMouseOver ? (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowUp size={20} />
                </Suspense>
              ) : (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowDown size={20} />
                </Suspense>
              )}
            </div>
          ) : null}
        </Link>
      ) : (
        <div
          className={`p-[2px] h-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center hover:text-primary hover:border-b-2 hover:border-b-primary `}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
        >
          {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
          <span>{itemData.name}</span>
          {itemData.subCategories ? (
            <div className="absolute bottom-0">
              {isMouseOver ? (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowUp size={20} />
                </Suspense>
              ) : (
                <Suspense
                  fallback={
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  }
                >
                  <MdOutlineKeyboardArrowDown size={20} />
                </Suspense>
              )}
            </div>
          ) : null}
        </div>
      )}
      {itemData.subCategories && isMouseOver ? (
        <div
          className={`absolute bg-white rounded-sm p-2 border`}
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
