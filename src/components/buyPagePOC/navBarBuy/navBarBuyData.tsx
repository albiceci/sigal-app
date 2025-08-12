import React, { Suspense } from "react";

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

export const navBarBuyValues = {
  products: [
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
      key: "car",
      subCategories: null,
    },
    {
      name: "PASURIA",
      link: "/buy?type=wealth",
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
      key: "wealth",
      subCategories: null,
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
      key: "health",
      subCategories: null,
    },
    {
      name: "MARINA",
      link: "/buy?type=marina",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <IoBoat size={20} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <IoBoatOutline size={20} />
          </Suspense>
        ),
      },
      key: "marina",
      subCategories: null,
    },
  ],
  secondary: [
    {
      name: `SHERBIME & KONTAKTE`,
      link: null,
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <FaUser size={20} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <FaRegUser size={20} />
          </Suspense>
        ),
      },
      key: "sherbime",
      subCategories: [
        {
          name: "POLICAT E MIA",
          link: "/buy/policies",
          key: "policies",
        },
        {
          name: "RAPORTO DEM SHENDETSOR",
          link: "/buy/policies",
          key: "healthreport",
        },
        {
          name: "RAPORTO DEM TPL",
          link: "/buy/policies",
          key: "tplreport",
        },
        {
          name: "VERIFIKO POLICEN",
          link: "/buy/policies",
          key: "policiesverify",
        },
      ],
    },
    {
      name: "LLOGARIA IME",
      link: "/login",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <FaUser size={20} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <FaRegUser size={20} />
          </Suspense>
        ),
      },
      key: "login",
      subCategories: null,
    },
  ],
};
