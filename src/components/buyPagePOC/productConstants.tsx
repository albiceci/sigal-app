import { ReactNode } from "react";
import { ReactComponent as TPLProduct } from "../../assets/freepik/buyPage/carCategory/tplProduct.svg";
import { ReactComponent as FireProduct } from "../../assets/freepik/buyPage/wealthCategory/fireProduct.svg";
import { ReactComponent as TravelALProduct } from "../../assets/freepik/buyPage/healthCategory/travelALProduct.svg";
import { ReactComponent as PrivateGoldProduct } from "../../assets/freepik/buyPage/healthCategory/privateGold.svg";
import { ReactComponent as PrivateSilverProduct } from "../../assets/freepik/buyPage/healthCategory/privateSilver.svg";
import { ReactComponent as PrivateStandardProduct } from "../../assets/freepik/buyPage/healthCategory/privateStandand.svg";

export type PRODUCT_SITE_ID = "FIRE" | "TPL" | "TRAVELAL" | "PRIVATEGOLD" | "PRIVATESILVER" | "PRIVATESTANDARD";

export type PRODUCT_INFO_TYPE = {
  productId: string;
  productSiteId: PRODUCT_SITE_ID;
  categoryId: string;
  paramKey: string;
  subParamKey?: string;
  percentOff?: number;
  promoMessage?: string;
  name: string;
  moreInfo?: string;
  image: ReactNode;
};

export const PRODUCT_INFO: Record<PRODUCT_SITE_ID, PRODUCT_INFO_TYPE> = {
  FIRE: {
    productId: "FIREDUMMYID",
    productSiteId: "FIRE",
    categoryId: "wealth",
    paramKey: "fire",
    name: "Zjarri",
    image: (
      <div className="w-full h-fit">
        <FireProduct width={"inherit"} />
      </div>
    ),
  },
  TRAVELAL: {
    productId: "TRAVELALDUMMYID",
    productSiteId: "TRAVELAL",
    categoryId: "health",
    paramKey: "travelAl",
    name: "TRAVELAL",
    image: (
      <div className="w-full h-fit">
        <TravelALProduct width={"inherit"} />
      </div>
    ),
  },
  PRIVATEGOLD: {
    productId: "PRIVATEGOLDDUMMYID",
    productSiteId: "PRIVATEGOLD",
    categoryId: "health",
    paramKey: "privateGold",
    name: "PRIVATE GOLD",
    image: (
      <div className="w-full h-fit">
        <PrivateGoldProduct width={"inherit"} />
      </div>
    ),
  },
  PRIVATESILVER: {
    productId: "PRIVATESILVERDUMMYID",
    productSiteId: "PRIVATESILVER",
    categoryId: "health",
    paramKey: "privateSilver",
    name: "PRIVATE SILVER",
    image: (
      <div className="w-full h-fit">
        <PrivateSilverProduct width={"inherit"} />
      </div>
    ),
  },
  PRIVATESTANDARD: {
    productId: "PRIVATESTANDARDDUMMYID",
    productSiteId: "PRIVATESTANDARD",
    categoryId: "health",
    paramKey: "privateStandard",
    name: "PRIVATE STANDARD",
    image: (
      <div className="w-full h-fit">
        <PrivateStandardProduct width={"inherit"} />
      </div>
    ),
  },
  TPL: {
    productId: "00000000-e1fe-43e2-85cd-439ac4c6a857",
    productSiteId: "TPL",
    categoryId: "car",
    paramKey: "tpl",
    name: "TPL",
    image: (
      <div className="w-full h-fit">
        <TPLProduct width={"inherit"} />
      </div>
    ),
  },
};
