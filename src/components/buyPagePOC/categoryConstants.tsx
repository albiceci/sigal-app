import { ReactNode } from "react";

export type CATEGORY_SITE_ID = "car" | "wealth" | "health" | "marina";

export type CATEGORY_INFO_TYPE = {
  categorySiteId: CATEGORY_SITE_ID;
  paramKey: CATEGORY_SITE_ID;
  subParamKey?: string;
  name: string;
  image: ReactNode;
};

export const CATEGORY_INFO: Record<CATEGORY_SITE_ID, CATEGORY_INFO_TYPE> = {
  car: {
    categorySiteId: "car",
    name: "Makina",
    paramKey: "car",
    image: (
      <img
        className="imgBlur"
        src={require("./../../assets/freepik/buyPage/carCategory.jpg")}
        alt=""
      />
    ),
  },
  wealth: {
    categorySiteId: "wealth",
    name: "Pasura",
    paramKey: "wealth",
    image: (
      <img
        className="imgBlur"
        src={require("./../../assets/freepik/buyPage/propertyCategory.jpg")}
        alt=""
      />
    ),
  },
  health: {
    categorySiteId: "health",
    name: "Shendeti",
    paramKey: "health",
    image: (
      <img
        className="imgBlur scale-[.8]"
        src={require("./../../assets/freepik/buyPage/healthCategory.jpg")}
        alt=""
      />
    ),
  },
  marina: {
    categorySiteId: "marina",
    name: "Marina",
    paramKey: "marina",
    image: (
      <img
        className="imgBlur scale-[.9]"
        src={require("./../../assets/freepik/buyPage/travelCategory.jpg")}
        alt=""
      />
    ),
  },
};
