import React, { Suspense } from "react";

// import { BsCarFront, BsCarFrontFill } from "react-icons/bs";
//import { FaHospital, FaRegHospital } from "react-icons/fa";
// import {
//   IoAirplane,
//   IoAirplaneOutline,
//   IoHome,
//   IoHomeOutline,
// } from "react-icons/io5";
// import {
//   PiPersonArmsSpreadFill,
//   PiPersonArmsSpreadLight,
// } from "react-icons/pi";

///NAV BAR ICONS////////////////////////

const BsCarFront = React.lazy(() =>
  import("react-icons/bs").then((module) => ({ default: module.BsCarFront }))
);

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

const IoAirplane = React.lazy(() =>
  import("react-icons/io5").then((module) => ({ default: module.IoAirplane }))
);

const IoAirplaneOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoAirplaneOutline,
  }))
);
const IoHome = React.lazy(() =>
  import("react-icons/io5").then((module) => ({ default: module.IoHome }))
);
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

export const navBarBuyValues = [
  {
    name: "MAKINA",
    link: "/buy?type=car",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <BsCarFrontFill size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <BsCarFront size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "PRONA",
    link: "/buy?type=property",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoHome size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoHomeOutline size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "JETA",
    link: "/buy?type=life",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <PiPersonArmsSpreadFill size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <PiPersonArmsSpreadLight size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "UDHËTIMI",
    link: "/buy?type=travel",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoAirplane size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoAirplaneOutline size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "SHËNDETI",
    link: "/buy?type=health",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <FaHospital size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <FaRegHospital size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
];

export const navBarValues = [
  {
    name: "MAKINA",
    link: "/car",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <BsCarFrontFill size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <BsCarFront size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "PRONA",
    link: "/property",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoHome size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoHomeOutline size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "JETA",
    link: "/life",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <PiPersonArmsSpreadFill size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <PiPersonArmsSpreadLight size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "UDHËTIMI",
    link: "/travel",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoAirplane size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <IoAirplaneOutline size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
  {
    name: "SHËNDETI",
    link: "/health",
    icons: {
      primary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <FaHospital size={20} />
        </Suspense>
      ),
      secondary: (
        <Suspense
          fallback={<div style={{ height: "20px", width: "20px" }}></div>}
        >
          <FaRegHospital size={20} />
        </Suspense>
      ),
    },
    isActive: false,
  },
];

export const mainProductTypes = [
  {
    name: "MAKINA",
    buyParam: "car",
    image: (
      <img
        className="imgBlur"
        src={require("./../assets/freepik/buyPage/carCategory.jpg")}
        alt=""
      />
    ),
  },
  {
    name: "PRONA",
    buyParam: "form",
    buySubParam: "home",
    image: (
      <img
        className="imgBlur"
        src={require("./../assets/freepik/buyPage/propertyCategory.jpg")}
        alt=""
      />
    ),
    bundles: [
      {
        name: "TPL",
        buyParam: "form",
        buySubParam: "home,tpl",
        image: (
          <img
            className="imgBlur"
            src={require("./../assets/freepik/buyPage/carCategory.jpg")}
            alt=""
          />
        ),
      },
      {
        name: "KARTON JESHIL",
        buyParam: "form",
        buySubParam: "home,tpl",
        image: (
          <img
            className="imgBlur"
            src={require("./../assets/freepik/buyPage/carCategory.jpg")}
            alt=""
          />
        ),
      },
      {
        name: "AUTOSOS",
        buyParam: "form",
        buySubParam: "home,tpl",
        image: (
          <img
            className="imgBlur"
            src={require("./../assets/freepik/buyPage/carCategory.jpg")}
            alt=""
          />
        ),
      },
    ],
  },
  {
    name: "JETA",
    buyParam: "life",
    image: (
      <img
        className="imgBlur scale-125 mt-[14px]"
        src={require("./../assets/freepik/buyPage/lifeCategory.jpg")}
        alt=""
      />
    ),
  },
  {
    name: "SHENDETI",
    buyParam: "health",
    image: (
      <img
        className="imgBlur scale-[.8]"
        src={require("./../assets/freepik/buyPage/healthCategory.jpg")}
        alt=""
      />
    ),
  },
  {
    name: "UDHETIMI",
    buyParam: "travel",
    image: (
      <img
        className="imgBlur scale-[.9]"
        src={require("./../assets/freepik/buyPage/travelCategory.jpg")}
        alt=""
      />
    ),
  },
];
