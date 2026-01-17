import React, { Suspense } from "react";

const BsCarFront = React.lazy(() => import("react-icons/bs").then((module) => ({ default: module.BsCarFront })));

const BsCarFrontFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsCarFrontFill,
  }))
);

const FaHospital = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaHospital,
  }))
);
const FaRegHospital = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaRegHospital,
  }))
);

const FaInfo = React.lazy(() => import("react-icons/fa").then((module) => ({ default: module.FaInfo })));

const IoHome = React.lazy(() => import("react-icons/io5").then((module) => ({ default: module.IoHome })));
const IoHomeOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoHomeOutline,
  }))
);

const PiPersonArmsSpreadFill = React.lazy(() =>
  import("react-icons/pi").then((module) => ({
    default: module.PiPersonArmsSpreadFill,
  }))
);
const PiPersonArmsSpreadLight = React.lazy(() =>
  import("react-icons/pi").then((module) => ({
    default: module.PiPersonArmsSpreadLight,
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

const IoDocumentText = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoDocumentText,
  }))
);
const IoDocumentTextOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoDocumentTextOutline,
  }))
);

const IoBoat = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoBoat,
  }))
);
const IoBoatOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoBoatOutline,
  }))
);

export type BaseNavBarItem = {
  name: string;
  link: string | null;
  icons?: {
    primary: JSX.Element;
    secondary: JSX.Element;
  };
  key: string;
};

export type NavBarItem = BaseNavBarItem & {
  subCategories: BaseNavBarItem[] | null;
};

export const navBarValues: {
  primary: NavBarItem[];
  secondary: NavBarItem[];
} = {
  primary: [
    {
      name: "MAKINA",
      link: "/car",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <BsCarFrontFill />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <BsCarFront />
          </Suspense>
        ),
      },
      key: "car",
      subCategories: null,
    },
    {
      name: "PASURIA",
      link: "/wealth",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoHome />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoHomeOutline />
          </Suspense>
        ),
      },
      key: "wealth",
      subCategories: null,
    },
    {
      name: "SHËNDETI",
      link: "/health",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaHospital />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaRegHospital />
          </Suspense>
        ),
      },
      key: "health",
      subCategories: null,
    },
    {
      name: "MARINA",
      link: "/marina",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoBoat />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoBoatOutline />
          </Suspense>
        ),
      },
      key: "marina",
      subCategories: null,
    },
    {
      name: "JETA & PENSIONE",
      link: "/life",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <PiPersonArmsSpreadFill />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <PiPersonArmsSpreadLight />
          </Suspense>
        ),
      },
      key: "life",
      subCategories: null,
    },
  ],
  secondary: [
    {
      name: "RRETH NESH",
      link: "https://sigal.com.al/rreth-nesh/grupi-rajonal-sigurimesh/",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaInfo />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaInfo />
          </Suspense>
        ),
      },
      key: "file-claim",
      subCategories: null,
    },
    {
      name: "RAPORTO DEM",
      link: "/file-claim",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoDocumentText />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <IoDocumentTextOutline />
          </Suspense>
        ),
      },
      key: "file-claim",
      subCategories: null,
    },
    {
      name: "LLOGARIA IME",
      link: "/login",
      icons: {
        primary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaUser />
          </Suspense>
        ),
        secondary: (
          <Suspense fallback={<div style={{ height: "20px", width: "20px" }}></div>}>
            <FaRegUser />
          </Suspense>
        ),
      },
      key: "login",
      subCategories: null,
    },
  ],
};
