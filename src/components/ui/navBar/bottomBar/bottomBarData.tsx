import React, { Suspense } from "react";

const IoHome = React.lazy(() =>
  import("react-icons/io5").then((module) => ({ default: module.IoHome }))
);
const IoHomeOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoHomeOutline,
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

const IoCartOutline = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoCartOutline,
  }))
);

export const bottomBarValues = {
  items: [
    {
      name: "Home",
      link: "/",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoHome size={18} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoHomeOutline size={18} />
          </Suspense>
        ),
      },
      key: "home",
      subCategories: null,
    },
    {
      name: "Bli",
      link: "/buy",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoCartOutline size={18} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoCartOutline size={18} />
          </Suspense>
        ),
      },
      key: "buy",
      subCategories: null,
    },
    {
      name: "Raporto",
      link: "/file-claim",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoDocumentText size={18} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <IoDocumentTextOutline size={18} />
          </Suspense>
        ),
      },
      key: "file-claim",
      subCategories: null,
    },
    {
      name: "Llogaria",
      link: "/login",
      icons: {
        primary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <FaUser size={18} />
          </Suspense>
        ),
        secondary: (
          <Suspense
            fallback={<div style={{ height: "18px", width: "18px" }}></div>}
          >
            <FaRegUser size={18} />
          </Suspense>
        ),
      },
      key: "login",
      subCategories: null,
    },
  ],
};
