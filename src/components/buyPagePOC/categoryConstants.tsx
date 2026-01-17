import { ReactNode } from "react";
import carCategory from "../../assets/sigal/category/car.svg";
import wealthCategory from "../../assets/sigal/category/wealth.svg";
import healthCategory from "../../assets/sigal/category/health.svg";
import marinaCategory from "../../assets/sigal/category/marina.svg";

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
    name: "category.car.name",
    paramKey: "car",
    image: <img className="h-full" src={carCategory} alt="" />,
  },
  wealth: {
    categorySiteId: "wealth",
    name: "category.wealth.name",
    paramKey: "wealth",
    image: <img className="" src={wealthCategory} alt="" />,
  },
  health: {
    categorySiteId: "health",
    name: "category.health.name",
    paramKey: "health",
    image: <img className="" src={healthCategory} alt="" />,
  },
  marina: {
    categorySiteId: "marina",
    name: "category.marina.name",
    paramKey: "marina",
    image: <img className="" src={marinaCategory} alt="" />,
  },
};
