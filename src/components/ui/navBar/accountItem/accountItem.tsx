import React, { Suspense } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const FaRegUser = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegUser,
  }))
);
const FaUser = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaUser,
  }))
);

type menuItemProps = {
  activeKey?: string | null;
  theme: "primary" | "white";
};

const itemData = {
  name: "LLOGARIA IME",
  link: "/login",
  icons: {
    primary: (
      <Suspense
        fallback={<div style={{ height: "20px", width: "20px" }}></div>}
      >
        <FaUser size="inherit" />
      </Suspense>
    ),
    secondary: (
      <Suspense
        fallback={<div style={{ height: "20px", width: "20px" }}></div>}
      >
        <FaRegUser size="inherit" />
      </Suspense>
    ),
  },
  key: "login",
  subCategories: null,
};

export const AccountItem = ({ activeKey = null, theme }: menuItemProps) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  return (
    <div className="relative h-[70px] inline-block items-center justify-center">
      {itemData.key === activeKey ? (
        <div
          className={`p-[2px] h-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center text-primary border-b-2 border-b-primary ${
            theme === "primary" ? "" : ""
          }`}
        >
          <div className="w-[25px] h-[25px] lg:w-[20px] lg:h-[20px]">
            {itemData.icons.primary}
          </div>
          <span className="hidden lg:block">{itemData.name}</span>
        </div>
      ) : (
        <Link
          className={`p-[2px] h-full no-underline  text-sm font-semibold transition-colors whitespace-nowrap flex flex-col items-center justify-center  hover:border-b-2  ${
            theme === "primary"
              ? "text-white"
              : "hover:text-primary text-presetgray hover:border-b-primary"
          }`}
          to={itemData.link}
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseOut={() => {
            setIsMouseOver(false);
          }}
          preventScrollReset={false}
        >
          <div className="w-[25px] h-[25px] lg:w-[20px] lg:h-[20px]">
            {isMouseOver ? itemData.icons.primary : itemData.icons.secondary}
          </div>
          <span className="hidden lg:block">{itemData.name}</span>
        </Link>
      )}
    </div>
  );
};
