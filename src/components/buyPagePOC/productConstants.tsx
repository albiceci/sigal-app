import { ReactNode } from "react";

import tpl from "../../assets/sigal/product/tpl.svg";
import border from "../../assets/sigal/product/border.svg";
import greencard from "../../assets/sigal/product/greencard.svg";
import autosos from "../../assets/sigal/product/autosos.svg";
import minicasco from "../../assets/sigal/product/minicasco.svg";
import casco from "../../assets/sigal/product/casco.svg";
import fire from "../../assets/sigal/product/fire.svg";
import health from "../../assets/sigal/product/health.svg";
import travel from "../../assets/sigal/product/travel.svg";
import accident from "../../assets/sigal/product/accident.svg";
import antitumor from "../../assets/sigal/product/antitumor.svg";
import teleheath from "../../assets/sigal/product/telehealth.svg";
import mvl from "../../assets/sigal/product/mvl.svg";

export type PRODUCT_SITE_ID =
  | "PROPERTY"
  | "BORDER"
  | "TPL"
  | "TPL_BUNDLE"
  | "AUTOSOS"
  | "AUTOSOS_BUNDLE"
  | "TRAVELAL"
  | "TRAVEL"
  | "PRIVATEHEALTH"
  | "TELEHEALTH"
  | "GREENCARD"
  | "ANTITUMOR"
  | "ACCIDENT"
  | "MVL"
  //| "CASCO"
  | "MINICASCO"
  | "MINICASCO_BUNDLE"
  | "PAYMENT";

export type PRODUCT_INFO_TYPE = {
  productId: string;
  productSiteId: PRODUCT_SITE_ID;
  type: "product" | "bundle";
  category: string;
  categoryId: string;
  paramKey: string;
  subParamKey?: string;
  percentOff?: number;
  promoMessage?: string;
  name: string;
  moreInfo?: string;
  moreInfoText?: string;
  image: ReactNode;
};

export const PRODUCT_INFO: Record<PRODUCT_SITE_ID, PRODUCT_INFO_TYPE> = {
  PAYMENT: {
    productId: "80114527-5b68-4192-b4e4-d45e43fab686",
    productSiteId: "PAYMENT",
    type: "product",
    category: "DUMMYCATEGORY",
    categoryId: "DUMMYCATEGORYID",
    paramKey: "PAYMENTDUMMYPARAM",
    name: "product.payment.name",
    image: <></>,
  },
  PROPERTY: {
    productId: "PROPERTYDUMMYID",
    productSiteId: "PROPERTY",
    type: "product",
    category: "wealth",
    categoryId: "wealth",
    paramKey: "property",
    name: "product.property.name",
    image: <img className="h-full" src={fire} alt="" />,
    moreInfoText: "product.property.moreInfo",
    moreInfo: "/wealth/property#packages",
  },
  TRAVELAL: {
    productId: "00000000-0f3a-ef11-b9a7-00505692fbbd",
    productSiteId: "TRAVELAL",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "travelAl",
    name: "product.travelAl.name",
    moreInfoText: "product.travelAl.moreInfo",
    image: <img className="h-full" src={travel} alt="" />,
  },
  TRAVEL: {
    productId: "00000000-a495-ed11-bd0a-00505600b36d",
    productSiteId: "TRAVEL",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "travel",
    name: "product.travel.name",
    moreInfoText: "product.travel.moreInfo",
    image: <img className="h-full" src={travel} alt="" />,
  },
  PRIVATEHEALTH: {
    productId: "00000000-11ef-ed11-b989-00505692fbbd",
    productSiteId: "PRIVATEHEALTH",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "private_health",
    name: "product.privateHealth.name",
    moreInfoText: "product.privateHealth.moreInfo",
    image: <img className="h-full" src={health} alt="" />,
  },
  TELEHEALTH: {
    productId: "f2fd5aa5-b46d-ee11-b98f-00505692fbbd",
    productSiteId: "TELEHEALTH",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "tele_health",
    name: "product.teleHealth.name",
    moreInfoText: "product.teleHealth.moreInfo",
    image: <img className="h-full" src={teleheath} alt="" />,
  },
  ANTITUMOR: {
    productId: "00000000-d9e4-ed11-b989-00505692fbbd",
    productSiteId: "ANTITUMOR",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "antitumor",
    name: "product.antiTumor.name",
    moreInfoText: "product.antiTumor.moreInfo",
    image: <img className="h-full" src={antitumor} alt="" />,
  },
  ACCIDENT: {
    productId: "1fa7e398-c0a1-ef11-b9ac-00505692fbbd",
    productSiteId: "ACCIDENT",
    type: "product",
    category: "health",
    categoryId: "health",
    paramKey: "accident",
    name: "product.accident.name",
    moreInfoText: "product.accident.moreInfo",
    image: <img className="h-full" src={accident} alt="" />,
  },
  TPL: {
    productId: "00000000-e1fe-43e2-85cd-439ac4c6a857",
    productSiteId: "TPL",
    type: "product",
    category: "car",
    categoryId: "car",
    paramKey: "tpl",
    name: "product.tpl.name",
    image: <img className="h-full" src={tpl} alt="" />,
    moreInfoText: "product.tpl.moreInfo",
    moreInfo: "/car/tpl",
  },
  TPL_BUNDLE: {
    productId: "00000000-e1fe-43e2-85cd-439ac4c6a857",
    productSiteId: "TPL_BUNDLE",
    type: "bundle",
    category: "car",
    categoryId: "null",
    paramKey: "tpl_bundle",
    name: "product.tpl.name",
    image: <img className="h-full" src={tpl} alt="" />,
  },
  // CASCO: {
  //   productId: "00000000-8af4-4ae2-8620-c20298432460",
  //   productSiteId: "CASCO",
  //   type: "product",
  //   category: "car",
  //   categoryId: "car",
  //   paramKey: "casco",
  //   name: "product.casco.name",
  //   image: <img className="h-full" src={casco} alt="" />,
  // },
  MINICASCO: {
    productId: "00000000-a495-ed11-bd0a-00505600b36e",
    productSiteId: "MINICASCO",
    type: "product",
    category: "car",
    categoryId: "car",
    paramKey: "minicasco",
    name: "product.minicasco.name",
    moreInfoText: "product.minicasco.moreInfo",
    image: <img className="h-full" src={minicasco} alt="" />,
  },
  MINICASCO_BUNDLE: {
    productId: "00000000-a495-ed11-bd0a-00505600b36e",
    productSiteId: "MINICASCO_BUNDLE",
    type: "bundle",
    category: "car",
    categoryId: "null",
    paramKey: "minicasco_bundle",
    name: "product.minicasco.name",
    image: <img className="h-full" src={minicasco} alt="" />,
  },
  GREENCARD: {
    productId: "00000000-3b9c-4ca1-a794-585e3345d6be",
    productSiteId: "GREENCARD",
    type: "product",
    category: "car",
    categoryId: "car",
    paramKey: "greencard",
    name: "product.greencard.name",
    moreInfoText: "product.greencard.moreInfo",
    image: <img className="h-full" src={greencard} alt="" />,
  },
  AUTOSOS: {
    productId: "ae2063fa-b46d-ee11-b98f-00505692fbbd",
    productSiteId: "AUTOSOS",
    type: "product",
    category: "car",
    categoryId: "car",
    paramKey: "autosos",
    name: "product.autosos.name",
    moreInfoText: "product.autosos.moreInfo",
    image: <img className="h-full" src={autosos} alt="" />,
    moreInfo: "/car/autosos",
  },
  AUTOSOS_BUNDLE: {
    productId: "ae2063fa-b46d-ee11-b98f-00505692fbbd",
    productSiteId: "AUTOSOS_BUNDLE",
    type: "bundle",
    category: "car",
    categoryId: "null",
    paramKey: "autosos_bundle",
    name: "product.autosos.name",
    image: <img className="h-full" src={autosos} alt="" />,
  },
  BORDER: {
    productId: "00000000-e1fe-43e2-85cd-439ac4c6a857",
    productSiteId: "BORDER",
    type: "product",
    category: "car",
    categoryId: "car",
    paramKey: "border",
    name: "product.border.name",
    image: <img className="h-full" src={border} alt="" />,
    moreInfoText: "product.border.moreInfo",
    moreInfo: "/car/border",
  },
  MVL: {
    productId: "f386d807-e46d-f011-b9b4-00505692fbbd",
    productSiteId: "MVL",
    type: "product",
    category: "marina",
    categoryId: "marina",
    paramKey: "mvl",
    name: "product.mvl.name",
    moreInfoText: "product.mvl.moreInfo",
    image: <img className="h-full" src={mvl} alt="" />,
  },
};
