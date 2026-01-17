//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  email: InputField<"text">;
  phone: InputField<"text">;
}> = {
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  phone: {
    name: "phone",
    placeholder: "Telefon",
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
  email: [
    {
      type: "NOT_EMPTY",
      error: "Email nuk mund te jete bosh",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "Telefoni nuk mund te jete bosh",
    },
  ],
};
