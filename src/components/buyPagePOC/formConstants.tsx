import { ReactNode } from "react";
import { tplContext, TplContextProvider } from "./carType/tplType/tplContext";
import { FireContextProvider } from "./wealthType/fireType/fireContext";
import { fireContext } from "./wealthType/fireType/fireContext";
import { travelALContext } from "./healthType/travelALType/travelALContext";
import { TravelALContextProvider } from "./healthType/travelALType/travelALContext";
import {
  privateGoldContext,
  PrivateGoldContextProvider,
} from "./healthType/privateGoldType/privateGoldContext";
import {
  privateSilverContext,
  PrivateSilverContextProvider,
} from "./healthType/privateSilverType/privateSilverContext";
import {
  privateStandardContext,
  PrivateStandardContextProvider,
} from "./healthType/privateStandardType/privateStandardContext";
import {
  PRODUCT_INFO,
  PRODUCT_INFO_TYPE,
  PRODUCT_SITE_ID,
} from "./productConstants";

export type FORM_TYPE = {
  path: string;
  id: string;
  name: string;
  subTitle: string;
};

export type PRODUCT_DATA_TYPE = PRODUCT_INFO_TYPE & {
  contextProvider: ({ children }: { children: JSX.Element }) => JSX.Element;
  context: React.Context<any>;
  forms: FORM_TYPE[];
};

export const PRODUCT_DATA: Record<PRODUCT_SITE_ID, PRODUCT_DATA_TYPE> = {
  FIRE: {
    ...PRODUCT_INFO["FIRE"],
    context: fireContext,
    contextProvider: FireContextProvider,
    forms: [
      {
        id: "a40acd54-be64-45c3-a73e-0faa2fd1864f",
        path: "./wealthType/fireType/firstForm/firstForm",
        name: "Banesa",
        subTitle: "Vendosni te dhenat e baneses",
      },
      {
        id: "cf6eb8fa-0f6f-485c-8dc5-ce7ed70445c2",
        path: "./wealthType/fireType/secondForm/secondForm",
        name: "Pronesia",
        subTitle: "Vendosni te dhenat e pronesise",
      },
    ],
  },
  TRAVELAL: {
    ...PRODUCT_INFO["TRAVELAL"],
    context: travelALContext,
    contextProvider: TravelALContextProvider,
    forms: [
      {
        id: "ce36efed-4654-4421-a758-84c7352c7716",
        path: "./healthType/travelALType/firstForm/firstForm",
        name: "Personi",
        subTitle: "Vendosni te dhenat e te siguruarit",
      },
      {
        id: "638e6a59-efef-4c91-b1f2-b48ac26f9fec",
        path: "./healthType/travelALType/secondForm/secondForm",
        name: "Paketa",
        subTitle: "Zgjidhni paketen e deshiruar",
      },
    ],
  },
  PRIVATEGOLD: {
    ...PRODUCT_INFO["PRIVATEGOLD"],
    context: privateGoldContext,
    contextProvider: PrivateGoldContextProvider,
    forms: [
      {
        id: "130a634b-cb90-40e6-bffe-258acca08dfb",
        path: "./healthType/privateGoldType/firstForm/firstForm",
        name: "Personi",
        subTitle: "Vendosni te dhenat e te siguruarit",
      },
      {
        id: "3e82081e-9bfb-4e5d-9591-bb0d32f0ff03",
        path: "./healthType/privateGoldType/secondForm/secondForm",
        name: "Paketa",
        subTitle: "Zgjidhni paketen e deshiruar",
      },
    ],
  },
  PRIVATESILVER: {
    ...PRODUCT_INFO["PRIVATESILVER"],
    context: privateSilverContext,
    contextProvider: PrivateSilverContextProvider,
    forms: [
      {
        id: "16490227-9323-40e9-8441-1ffe2b8f01e4",
        path: "./healthType/privateGoldType/firstForm/firstForm",
        name: "Personi",
        subTitle: "Vendosni te dhenat e te siguruarit",
      },
      {
        id: "6f1a9df0-f068-45c0-b9e7-cafcb9096955",
        path: "./healthType/privateGoldType/secondForm/secondForm",
        name: "Paketa",
        subTitle: "Zgjidhni paketen e deshiruar",
      },
    ],
  },
  PRIVATESTANDARD: {
    ...PRODUCT_INFO["PRIVATESTANDARD"],
    context: privateStandardContext,
    contextProvider: PrivateStandardContextProvider,
    forms: [
      {
        id: "1a2d5e2c-16fc-4f88-bd68-68ae6e452ae9",
        path: "./healthType/privateGoldType/firstForm/firstForm",
        name: "Personi",
        subTitle: "Vendosni te dhenat e te siguruarit",
      },
      {
        id: "e89b00d1-9f9c-4647-8b11-00ed2d03c93b",
        path: "./healthType/privateGoldType/secondForm/secondForm",
        name: "Paketa",
        subTitle: "Zgjidhni paketen e deshiruar",
      },
    ],
  },
  TPL: {
    ...PRODUCT_INFO["TPL"],
    context: tplContext,
    contextProvider: TplContextProvider,
    forms: [
      {
        id: "351d4f0e-b776-4105-9da7-62dbb8099bd6",
        path: "./carType/tplType/firstForm/firstForm",
        name: "Makina",
        subTitle: "Vendosni te dhenat e makines",
      },
      {
        id: "06750031-36e6-47cb-aa2f-48a3aa217cdb",
        path: "./carType/tplType/secondForm/secondForm",
        name: "Perdoruesi",
        subTitle: "Vendosni te dhenat e perdoruesit",
      },
    ],
  },
};

export type BUNDLE_TYPE = {
  products: PRODUCT_DATA_TYPE[] | PRODUCT_SITE_ID[] | PRODUCT_INFO_TYPE[];
  percentageOff: number;
  promoMessage: string;
};
