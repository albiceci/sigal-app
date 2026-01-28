import { tplContext, TplContextProvider } from "./carType/tplType/tplContext";

import { PRODUCT_INFO, PRODUCT_INFO_TYPE, PRODUCT_SITE_ID } from "./productConstants";
import {
  privateHealthContext,
  PrivateHealthContextProvider,
} from "./healthType/privateHealthType/privateHealthContext";
import { autososContext, AutososContextProvider } from "./carType/autososType/autososContext";
import { travelContext, TravelContextProvider } from "./healthType/travelType/travelContext";
import { teleHealthContext, TeleHealthContextProvider } from "./healthType/teleHealthType/teleHealthContext";
import { greencardContext, GreencardContextProvider } from "./carType/greencardType/greencardContext";
import { antiTumorContext, AntiTumorContextProvider } from "./healthType/antiTumorType/antiTumorContext";
import { accidentContext, AccidentContextProvider } from "./healthType/accidentType/accidentContext";
import { mvlContext, MVLContextProvider } from "./marinaType/mvlType/mvlContext";
import { cascoContext, CascoContextProvider } from "./carType/cascoType/cascoContext";
import { miniCascoContext, MiniCascoContextProvider } from "./carType/miniCascoType/miniCascoContext";
import { propertyContext, PropertyContextProvider } from "./wealthType/propertyType/propertyContext";
import { JSX } from "react";
import { travelALContext, TravelALContextProvider } from "./healthType/travelALType/travelALContext";
import { paymentContext, PaymentContextProvider } from "./payment/paymentContext";
import { borderContext, BorderContextProvider } from "./carType/borderType/borderContext";

export type FORM_TYPE = {
  path: string;
  id: string;
  name: string;
  subTitle: string;
};

export type DATA_SHARING_TYPE = {
  fields: string[];
};

export type PRODUCT_DATA_TYPE = PRODUCT_INFO_TYPE & {
  contextProvider: ({ children }: { children: JSX.Element }) => JSX.Element;
  context: React.Context<any>;
  forms: FORM_TYPE[];
  config?: {
    dataSharing?: Partial<Record<PRODUCT_SITE_ID, DATA_SHARING_TYPE>>;
    beginDate?: {
      defaultValue: number;
      minValue: number;
    };
  };
};

export const PRODUCT_DATA = {
  PAYMENT: {
    ...PRODUCT_INFO["PAYMENT"],
    context: paymentContext,
    contextProvider: PaymentContextProvider,
    forms: [
      {
        id: "50438b46-96f7-433d-aa26-0a3251b58b87",
        path: "./payment/paymentForm/paymentForm",
        name: "form.payment.title",
        subTitle: "form.payment.subTitle",
      },
    ],
  },
  PROPERTY: {
    ...PRODUCT_INFO["PROPERTY"],
    context: propertyContext,
    contextProvider: PropertyContextProvider,
    forms: [
      {
        id: "a40acd54-be64-45c3-a73e-0faa2fd1864f",
        path: "./wealthType/propertyType/firstForm/firstForm",
        name: "form.property.title",
        subTitle: "form.property.subTitle",
      },
      {
        id: "cf6eb8fa-0f6f-485c-8dc5-ce7ed70445c2",
        path: "./wealthType/propertyType/secondForm/secondForm",
        name: "form.ownership.title",
        subTitle: "form.ownership.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 15,
        defaultValue: 15,
      },
    },
  },
  TRAVELAL: {
    ...PRODUCT_INFO["TRAVELAL"],
    context: travelALContext,
    contextProvider: TravelALContextProvider,
    forms: [
      {
        id: "ce36efed-4654-4421-a758-84c7352c7716",
        path: "./healthType/privateHealthType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
      {
        id: "638e6a59-efef-4c91-b1f2-b48ac26f9fec",
        path: "./healthType/travelALType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  TRAVEL: {
    ...PRODUCT_INFO["TRAVEL"],
    context: travelContext,
    contextProvider: TravelContextProvider,
    forms: [
      {
        id: "410154db-122a-4ca8-a657-d1d9af484124",
        path: "./healthType/privateHealthType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
      {
        id: "3e82081e-9bfb-4e5d-9591-bb0d32f0ff03",
        path: "./healthType/travelType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  PRIVATEHEALTH: {
    ...PRODUCT_INFO["PRIVATEHEALTH"],
    context: privateHealthContext,
    contextProvider: PrivateHealthContextProvider,
    forms: [
      {
        id: "130a634b-cb90-40e6-bffe-258acca08dfb",
        path: "./healthType/privateHealthType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
      {
        id: "3e82081e-9bfb-4e5d-9591-bb0d32f0ff03",
        path: "./healthType/privateHealthType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
    ],
    config: {
      dataSharing: {
        PROPERTY: { fields: ["name", "surname", "taxNumber", "birthday", "email", "phone", "gender"] },
      },
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  TELEHEALTH: {
    ...PRODUCT_INFO["TELEHEALTH"],
    context: teleHealthContext,
    contextProvider: TeleHealthContextProvider,
    forms: [
      {
        id: "945a6843-bc46-48d9-9f91-ed3c5806238a",
        path: "./healthType/privateHealthType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
      {
        id: "02315bfa-d361-4ced-9fae-df678bfdec57",
        path: "./healthType/teleHealthType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  ANTITUMOR: {
    ...PRODUCT_INFO["ANTITUMOR"],
    context: antiTumorContext,
    contextProvider: AntiTumorContextProvider,
    forms: [
      {
        id: "5b908b95-0d69-4e92-83e7-50fe747f7f4b",
        path: "./healthType/privateHealthType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
      {
        id: "12aae42f-c998-46b3-b8d2-d63698048b1d",
        path: "./healthType/antiTumorType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  ACCIDENT: {
    ...PRODUCT_INFO["ACCIDENT"],
    context: accidentContext,
    contextProvider: AccidentContextProvider,
    forms: [
      {
        id: "ff28d7bc-5192-4928-9d5d-a185cf80769e",
        path: "./healthType/accidentType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
      {
        id: "041dd412-415c-4cbb-ae2c-236182ecfde9",
        path: "./healthType/accidentType/firstForm/firstForm",
        name: "form.person.title",
        subTitle: "form.person.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  TPL: {
    ...PRODUCT_INFO["TPL"],
    context: tplContext,
    contextProvider: TplContextProvider,
    forms: [
      {
        id: "351d4f0e-b776-4105-9da7-62dbb8099bd6",
        path: "./carType/tplType/firstForm/firstForm",
        name: "form.car.title",
        subTitle: "form.car.subTitle",
      },
      {
        id: "06750031-36e6-47cb-aa2f-48a3aa217cdb",
        path: "./carType/tplType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 0,
        defaultValue: 0,
      },
    },
  },
  TPL_BUNDLE: {
    ...PRODUCT_INFO["TPL_BUNDLE"],
    context: tplContext,
    contextProvider: TplContextProvider,
    forms: [
      {
        id: "bfc3084e-63ed-422b-8d75-6f824cb6ee82",
        path: "./carType/tplType/bundleType/firstForm/firstForm",
        name: "form.tpl.title",
        subTitle: "form.tpl.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 0,
        defaultValue: 0,
      },
    },
  },
  MINICASCO: {
    ...PRODUCT_INFO["MINICASCO"],
    context: miniCascoContext,
    contextProvider: MiniCascoContextProvider,
    forms: [
      {
        id: "9c38eeff-1faa-4690-9f2d-1c1bb229d7e0",
        path: "./carType/miniCascoType/firstForm/firstForm",
        name: "form.car.title",
        subTitle: "form.car.subTitle",
      },
      {
        id: "6831aa39-15c7-4d88-9443-2ee5f8fbbb86",
        path: "./carType/tplType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  MINICASCO_BUNDLE: {
    ...PRODUCT_INFO["MINICASCO_BUNDLE"],
    context: miniCascoContext,
    contextProvider: MiniCascoContextProvider,
    forms: [
      {
        id: "84d68666-6844-4baa-843e-e23c1c8265b9",
        path: "./carType/miniCascoType/bundleType/firstForm/firstForm",
        name: "form.minicasco.title",
        subTitle: "form.minicasco.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  // CASCO: {
  //   ...PRODUCT_INFO["CASCO"],
  //   context: cascoContext,
  //   contextProvider: CascoContextProvider,
  //   forms: [
  //     {
  //       id: "305fe687-55a2-4252-a9be-c03d14b8a206",
  //       path: "./carType/tplType/firstForm/firstForm",
  //       name: "form.car.title",
  //       subTitle: "form.car.subTitle",
  //     },
  //     {
  //       id: "fc437083-3388-485a-8b58-1c18913b0379",
  //       path: "./carType/tplType/secondForm/secondForm",
  //       name: "form.driver.title",
  //       subTitle: "form.driver.subTitle",
  //     },
  //   ],
  // },
  GREENCARD: {
    ...PRODUCT_INFO["GREENCARD"],
    context: greencardContext,
    contextProvider: GreencardContextProvider,
    forms: [
      {
        id: "b98e7529-64c1-461d-a430-d37c6b07ae95",
        path: "./carType/tplType/firstForm/firstForm",
        name: "form.car.title",
        subTitle: "form.car.subTitle",
      },
      {
        id: "b477fa71-ec46-4ecf-ad77-ac111de82dab",
        path: "./carType/tplType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 0,
        defaultValue: 0,
      },
    },
  },
  BORDER: {
    ...PRODUCT_INFO["BORDER"],
    context: borderContext,
    contextProvider: BorderContextProvider,
    forms: [
      {
        id: "668723b3-8563-47bc-8a6e-bc64d59d7540",
        path: "./carType/borderType/firstForm/firstForm",
        name: "form.car.title",
        subTitle: "form.car.subTitle",
      },
      {
        id: "14856ff3-d751-431e-92df-df4088942b51",
        path: "./carType/borderType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 1,
        defaultValue: 1,
      },
    },
  },
  AUTOSOS: {
    ...PRODUCT_INFO["AUTOSOS"],
    context: autososContext,
    contextProvider: AutososContextProvider,
    forms: [
      {
        id: "76ca1f16-4abf-4607-9bf9-c558eb58b797",
        path: "./carType/tplType/firstForm/firstForm",
        name: "form.car.title",
        subTitle: "form.car.subTitle",
      },
      {
        id: "c6ef9477-8669-4a42-b5ab-13aba0209b1a",
        path: "./carType/autososType/secondForm/secondForm",
        name: "form.package.title",
        subTitle: "form.package.subTitle",
      },
      {
        id: "ff1a3d14-9aaf-4898-bf9a-84f5d4872637",
        path: "./carType/tplType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 5,
        defaultValue: 5,
      },
    },
  },
  AUTOSOS_BUNDLE: {
    ...PRODUCT_INFO["AUTOSOS_BUNDLE"],
    context: autososContext,
    contextProvider: AutososContextProvider,
    forms: [
      {
        id: "379e2cea-e715-41a0-ba59-a2eb27fb0380",
        path: "./carType/autososType/bundleType/firstForm/firstForm",
        name: "form.autosos.title",
        subTitle: "form.autosos.subTitle",
      },
    ],
  },
  MVL: {
    ...PRODUCT_INFO["MVL"],
    context: mvlContext,
    contextProvider: MVLContextProvider,
    forms: [
      {
        id: "88d650b2-0837-4bcb-a745-eb4b3caa9807",
        path: "./marinaType/mvlType/firstForm/firstForm",
        name: "form.vehicle.title",
        subTitle: "form.vehicle.subTitle",
      },
      {
        id: "610bd9b1-68b8-4eb9-b759-6aa32f489934",
        path: "./marinaType/mvlType/secondForm/secondForm",
        name: "form.driver.title",
        subTitle: "form.driver.subTitle",
      },
    ],
    config: {
      beginDate: {
        minValue: 0,
        defaultValue: 0,
      },
    },
  },
} satisfies Record<PRODUCT_SITE_ID, PRODUCT_DATA_TYPE>;

export type BUNDLE_TYPE = {
  id: string;
  products: PRODUCT_DATA_TYPE[] | PRODUCT_SITE_ID[] | PRODUCT_INFO_TYPE[];
  discount: number;
  discountyType: "percentage" | "flat";
  promoMessage: string;
};
