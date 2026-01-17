//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../../ui/form/types";

export const formFields: FormInputs<{
  durationCompleted: InputField<"checkbox">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
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
  durationCompleted: [
    {
      type: "IS_TRUE",
      error: "form.error.durationCompleted.isTrue",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
