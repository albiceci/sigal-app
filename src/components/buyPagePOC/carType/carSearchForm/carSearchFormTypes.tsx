//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";

export const formFields: FormInputs<{
  licence: InputField<"text">;
  vin: InputField<"text">;
}> = {
  licence: {
    name: "licence",
    placeholder: "form.placeholder.licence",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  vin: {
    name: "vin",
    placeholder: "form.placeholder.vin",
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
  licence: [
    {
      type: "REGEX",
      value: /^[A-z]{2}\d{3}([A-z]{2})?$/g,
      error: "form.error.licence.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.licence.notEmpty",
    },
  ],
  vin: [
    {
      type: "NOT_EMPTY",
      error: "form.error.vin.notEmpty",
    },
  ],
};
