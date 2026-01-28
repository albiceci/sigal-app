//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";
import { commonFieldRules } from "../../../../ui/form/validator/commonRules";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  gender: InputField<"text">;
  taxNumber: InputField<"text">;
  email: InputField<"text">;
  phone: InputField<"text">;
}> = {
  name: {
    name: "name",
    placeholder: "form.placeholder.name",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  surname: {
    name: "surname",
    placeholder: "form.placeholder.surname",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  birthday: {
    name: "birthday",
    placeholder: "form.placeholder.birthday",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  gender: {
    name: "gender",
    placeholder: "form.placeholder.gender",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  taxNumber: {
    name: "taxNumber",
    placeholder: "form.placeholder.taxNumber",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  email: {
    name: "email",
    placeholder: "form.placeholder.email",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  phone: {
    name: "phone",
    placeholder: "form.placeholder.phone",
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
  name: commonFieldRules.name,
  surname: commonFieldRules.surname,
  birthday: commonFieldRules.birthday,
  gender: commonFieldRules.gender,
  taxNumber: commonFieldRules.taxNumber,
  email: commonFieldRules.email,
  phone: commonFieldRules.phone,
};
