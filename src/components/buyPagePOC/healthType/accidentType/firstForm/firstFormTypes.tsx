//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  gender: InputField<"text">;
  taxNumber: InputField<"text">;
  email: InputField<"text">;
  phone: InputField<"text">;
  coverage: InputField<"text">;
  profession: InputField<"text">;
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
  coverage: {
    name: "coverage",
    placeholder: "form.placeholder.coverageAmount",
    type: "text",
    value: "",
    state: {
      isValid: true,
      errors: [],
    },
  },
  profession: {
    name: "profession",
    placeholder: "form.placeholder.profession",
    type: "text",
    value: "",
    state: {
      isValid: true,
      errors: [],
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Emri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Emri nuk mund te jete bosh",
    },
  ],
  surname: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Emri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Emri nuk mund te jete bosh",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  gender: [
    {
      type: "NOT_EMPTY",
      error: "Gjinia nuk mund te jete bosh",
    },
  ],
  taxNumber: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  email: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  coverage: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  profession: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
};
