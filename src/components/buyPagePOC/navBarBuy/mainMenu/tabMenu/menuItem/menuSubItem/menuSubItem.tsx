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
    <div className="w-full flex items-center justify-center">
      {itemData.key === activeKey ? (
        <div
          className={`pl-3 flex items-center p-[10px] w-[220px] no-underline text-white text-sm font-normal transition-colors text-[rgb(211, 212, 212)] bg-primarysub rounded-[10px]`}
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
          <span className="ml-[3px]">{itemData.name}</span>
        </div>
      ) : (
        <Link
          className={`pl-3 flex items-center p-[10px] w-[220px] no-underline text-white text-sm font-normal transition-colors rounded-[10px] hover:text-[rgb(211, 212, 212)] hover:bg-primarysub`}
          to={itemData.link}
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
          <span className="ml-[3px]">{itemData.name}</span>
        </Link>
      )}
    </div>
  );
};
