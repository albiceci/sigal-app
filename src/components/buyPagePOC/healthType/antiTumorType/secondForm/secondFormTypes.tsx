//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  coverage: InputField<"text">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
  coverage: {
    name: "coverage",
    placeholder: "form.placeholder.coverageAmount",
    type: "text",
    value: "",
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
  coverage: [
    {
      type: "NOT_EMPTY",
      error: "form.error.coverage.notEmpty",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
