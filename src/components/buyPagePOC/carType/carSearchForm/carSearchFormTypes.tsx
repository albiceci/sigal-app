//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";

export const formFields: FormInputs<{
  licence: InputField<"text">;
  vin: InputField<"text">;
}> = {
  licence: {
    name: "licence",
    placeholder: "Targa",
    type: "text",
    value: "",
  },
  vin: {
    name: "vin",
    placeholder: "Shasia",
    type: "text",
    value: "",
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  licence: [
    {
      type: "REGEX",
      value: /^[A-z]{2}\d{3}[A-z]{2}$/g,
      error: "Targa duhet te kete formatin XX000XX",
    },
    {
      type: "NOT_EMPTY",
      error: "Targa nuk mund te jete bosh",
    },
  ],
  vin: [
    {
      type: "NOT_EMPTY",
      error: "Targa nuk mund te jete bosh",
    },
  ],
};
