import { Link } from "react-router-dom";

import React, { Suspense } from "react";

const MdOutlineSubdirectoryArrowRight = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineSubdirectoryArrowRight,
  }))
);

type menuItemProps = {
  itemData: {
    name: string;
    link: string;
    key: string;
  };
  activeKey?: string | null;
};

export const MenuSubItem = ({ itemData, activeKey = null }: menuItemProps) => {
  return (
    <div className="relative h-full flex">
      {itemData.key === activeKey ? (
        <div
          className={`p-[2px] py-[10px] h-full w-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex items-center text-primary border-b-2 border-b-primary `}
        >
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
            <MdOutlineSubdirectoryArrowRight size={20} />
          </Suspense>
          <span>{itemData.name}</span>
        </div>
      ) : (
        <Link
          className={`p-[2px] py-[10px] h-full w-full no-underline text-presetgray text-sm font-semibold transition-colors whitespace-nowrap flex items-center hover:text-primary hover:border-b-2 hover:border-b-primary `}
          to={itemData.link}
          preventScrollReset={false}
        >
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
            <MdOutlineSubdirectoryArrowRight size={20} />
          </Suspense>
          <span>{itemData.name}</span>
        </Link>
      )}
    </div>
  );
};
