//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  taxNumber: InputField<"text">;
  name: InputField<"text">;
  surname: InputField<"text">;
  gender: InputField<"text">;
  birthday: InputField<"text">;
  phone: InputField<"text">;
  email: InputField<"text">;
  wealthnr: InputField<"text">;
  address: InputField<"text">;
  begDate: InputField<"text">;
  endDate: InputField<"text">;
  fileUploads: InputField<"file">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
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
  wealthnr: {
    name: "wealthnr",
    placeholder: "form.placeholder.wealthnr",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  address: {
    name: "address",
    placeholder: "form.placeholder.address",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  begDate: {
    name: "begDate",
    placeholder: "form.placeholder.begDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  endDate: {
    name: "endDate",
    placeholder: "form.placeholder.endDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  fileUploads: {
    name: "fileUploads",
    placeholder: "fileUploads",
    type: "file",
    value: [],
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
    {
      type: "REGEX",
      value: /[A-Z]\d{8}[A-Z]/g,
      error: "form.error.taxNumber.wrongFormat",
    },
  ],
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
  wealthnr: [
    {
      type: "NOT_EMPTY",
      error: "form.error.wealthnr.notEmpty",
    },
  ],
  address: [
    {
      type: "NOT_EMPTY",
      error: "form.error.address.notEmpty",
    },
  ],
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.begDate.notEmpty",
    },
  ],
  endDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.endDate.notEmpty",
    },
  ],
  fileUploads: [
    {
      type: "LENGTH_BIGGER_EQUAL_THAN",
      value: 1,
      error: "form.error.propertyFileUploads.moreThan4",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
