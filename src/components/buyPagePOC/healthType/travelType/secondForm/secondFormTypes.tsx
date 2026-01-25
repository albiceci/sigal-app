//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const destinationsData = [
  {
    id: "11d26d4b-7e13-432d-bb3a-8de94b6dc94e",
    text: "form.option.destination.world",
  },
  {
    id: "9379e959-49ff-48db-a722-fdcfcc4274ec",
    text: "form.option.destination.worldExUSACANADA",
  },
  {
    id: "328df1a4-a428-4a5c-8c61-a835ed16819c",
    text: "form.option.destination.europeExSwiss",
  },
  {
    id: "f216f2a8-f0eb-46f3-a53b-656ddc8f4060",
    text: "form.option.destination.swiss",
  },
  {
    id: "33c97506-38b9-4585-a666-68ac4573339a",
    text: "form.option.destination.turkey",
  },
];

type templateIds =
  | "00000000-9c28-4588-8dc4-856cd1947a15"
  | "62d94f1f-dfa3-ed11-b989-00505692fbbd"
  | "d1bc2f41-dfa3-ed11-b989-00505692fbbd"
  | "f939c9aa-dfa3-ed11-b989-00505692fbbd"
  | "057cc2c5-dfa3-ed11-b989-00505692fbbd";

export const templateIdData: {
  id: templateIds;
  text: string;
}[] = [
  {
    id: "00000000-9c28-4588-8dc4-856cd1947a15",
    text: "150 EUR",
  },
  {
    id: "62d94f1f-dfa3-ed11-b989-00505692fbbd",
    text: "500 EUR",
  },
  {
    id: "d1bc2f41-dfa3-ed11-b989-00505692fbbd",
    text: "800 EUR",
  },
  {
    id: "f939c9aa-dfa3-ed11-b989-00505692fbbd",
    text: "1000 EUR",
  },
  {
    id: "057cc2c5-dfa3-ed11-b989-00505692fbbd",
    text: "1500 EUR",
  },
];

export const formFields: FormInputs<{
  begDate: InputField<"text">;
  endDate: InputField<"text">;
  destination: InputField<"text">;
  templateId: InputField<"text">;
  flightCancel: InputField<"checkbox">;
  flightConfirmationDate: InputField<"text">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
  begDate: {
    name: "begDate",
    placeholder: "form.placeholder.begDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  endDate: {
    name: "endDate",
    placeholder: "form.placeholder.endDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  destination: {
    name: "destination",
    placeholder: "form.placeholder.destination",
    type: "text",
    value: "11d26d4b-7e13-432d-bb3a-8de94b6dc94e",
    state: {
      isValid: false,
      errors: [],
    },
  },
  flightCancel: {
    name: "flightCancel",
    placeholder: "form.placeholder.flightCancel",
    type: "checkbox",
    value: false,
    state: {
      isValid: false,
      errors: [],
    },
  },
  flightConfirmationDate: {
    name: "flightConfirmationDate",
    placeholder: "form.placeholder.flightConfirmationDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  templateId: {
    name: "templateId",
    placeholder: "form.placeholder.coverageAmountShort",
    type: "text",
    value: "00000000-9c28-4588-8dc4-856cd1947a15",
    state: {
      isValid: false,
      errors: [],
    },
  },
  premium: {
    name: "premium",
    placeholder: "Premium",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  premiumCurrency: {
    name: "premiumCurrency",
    placeholder: "premiumCurrency",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.begDate.notEmpty",
    },
  ],
  endDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.endDate.notEmpty",
    },
  ],
  destination: [
    {
      type: "NOT_EMPTY",
      error: "form.error.destination.notEmpty",
    },
  ],
  templateId: [
    {
      type: "NOT_NULL",
      error: "form.error.templateId.notNull",
    },
  ],
  flightConfirmationDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.flightConfirmationDate.notEmpty",
    },
  ],
  flightCancel: [],
  premium: [],
  premiumCurrency: [],
};
