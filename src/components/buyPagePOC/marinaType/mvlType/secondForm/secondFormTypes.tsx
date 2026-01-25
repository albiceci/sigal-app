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
      type: "REGEX",
      value: /\w+@\w+/g,
      error: "form.error.email.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.email.notEmpty",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "form.error.phone.notEmpty",
    },
  ],
};
