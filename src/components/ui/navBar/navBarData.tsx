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

export const navBarValues = {
  products: [
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
      key: "car",
      subCategories: null,
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
      key: "property",
      subCategories: null,
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
      key: "life",
      subCategories: null,
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
      key: "travel",
      subCategories: null,
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
      key: "health",
      subCategories: null,
    },
  ],
  secondary: [
    {
      name: `MULTI TEMPLATE`,
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
          name: "subCategory 1",
          link: "/buy/policies",
          key: "policies",
        },
        {
          name: "subCategory 2",
          link: "/buy/policies",
          key: "healthreport",
        },
        {
          name: "subCategory 3",
          link: "/buy/policies",
          key: "tplreport",
        },
        {
          name: "subCategory 4",
          link: "/buy/policies",
          key: "policiesverify",
        },
      ],
    },
    {
      name: "RAPORTO DEM",
      link: "/file-claim",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <IoDocumentText size={20} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "20px", width: "20px" }}></div>}
          >
            <IoDocumentTextOutline size={20} />
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
