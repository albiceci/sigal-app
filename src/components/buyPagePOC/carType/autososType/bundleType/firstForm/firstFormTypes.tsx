//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../../ui/form/types";

export const formFields: FormInputs<{
  templateId: InputField<
    "select",
    "84249ec5-997c-ee11-b98f-00505692fbbd" | "a1ef554e-cb16-f011-b9ae-00505692fbbd" | null
  >;
  durationCompleted: InputField<"checkbox">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
  templateId: {
    name: "templateId",
    type: "select",
    value: null,
    state: {
      isValid: false,
      errors: [],
    },
  },
  durationCompleted: {
    name: "vehicleSelected",
    type: "checkbox",
    value: false,
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
  templateId: [
    {
      type: "NOT_NULL",
      error: "form.error.templateId.notNull",
    },
  ],
  durationCompleted: [
    {
      type: "IS_TRUE",
      error: "form.error.durationCompleted.isTrue",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
