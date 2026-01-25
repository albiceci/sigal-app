//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  begDate: InputField<"text">;
  endDate: InputField<"text">;
  templateId: InputField<
    "select",
    | "4eae98a8-db9d-ef11-b9ab-00505692fbbd"
    | "dfc12b35-b0a5-ef11-b9ad-00505692fbbd"
    | "ff1cfff4-b0a5-ef11-b9ad-00505692fbbd"
    | null
  >;
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
  templateId: {
    name: "templateId",
    type: "select",
    value: null,
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
  templateId: [
    {
      type: "NOT_NULL",
      error: "form.error.templateId.notNull",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
