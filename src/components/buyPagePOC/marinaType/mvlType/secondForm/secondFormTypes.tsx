//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";
import { commonFieldRules } from "../../../../ui/form/validator/commonRules";

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
  email: commonFieldRules.email,
  phone: commonFieldRules.phone,
};
