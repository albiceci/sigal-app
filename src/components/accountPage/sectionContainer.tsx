import React, { Suspense, useState } from "react";
import { Reveal } from "../../util/reveal";

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

export const SectionContainer = ({
  sectionName,
  defaultState = false,
  children,
}: {
  sectionName: string;
  defaultState?: boolean;
  children: JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultState);
  return (
    <div className="w-full">
      <div
        className={`z-[20] relative py-3 px-2 flex justify-between border rounded-md transition-all duration-300 cursor-pointer ${
          isOpen ? "bg-primary text-white rounded-b-none" : "bg-white text-primary"
        }`}
        onClick={() => {
          setIsOpen((prev) => {
            return !prev;
          });
        }}
      >
        <div className=" font-medium">{sectionName}</div>
        <div>
          {isOpen ? (
            <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
              <MdOutlineKeyboardArrowUp size={25} />
            </Suspense>
          ) : (
            <Suspense fallback={<div style={{ height: "25px", width: "25px" }}></div>}>
              <MdOutlineKeyboardArrowDown size={25} />
            </Suspense>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="px-3 bg-white border border-t-0 rounded-t-none rounded-md">
          <Reveal width="100%" height="100%" type={"y"} delay={0} distance={-70} duration={0.3}>
            {children}
          </Reveal>
        </div>
      )}
    </div>
  );
};
