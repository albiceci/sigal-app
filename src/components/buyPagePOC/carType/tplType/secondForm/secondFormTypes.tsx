//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  gender: InputField<"text">;
  taxNumber: InputField<"text">;
  metadata: InputField<"object", Record<string, any>>;
  isOwnerDriver: InputField<"checkbox">;
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
  metadata: {
    name: "metadata",
    type: "object",
    value: {
      isOwner: true,
    },
    state: {
      isValid: false,
      errors: [],
    },
  },
  isOwnerDriver: {
    name: "vehicleSelected",
    placeholder: "form.placeholder.isOwnerDriver",
    type: "checkbox",
    value: false,
    state: {
      isValid: false,
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
      error: "form.error.name.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.name.notEmpty",
    },
  ],
  surname: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.surname.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.surname.notEmpty",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "form.error.birthday.notEmpty",
    },
  ],
  gender: [
    {
      type: "NOT_EMPTY",
      error: "form.error.gender.notEmpty",
    },
  ],
  taxNumber: [
    {
      type: "NOT_EMPTY",
      error: "form.error.taxNumber.notEmpty",
    },
  ],
  isOwnerDriver: [],
  metadata: [],
};
