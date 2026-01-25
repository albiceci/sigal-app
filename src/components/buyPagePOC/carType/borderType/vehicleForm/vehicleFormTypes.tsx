import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  licence: InputField<"text">;
  vin: InputField<"text">;
  year: InputField<"text">;
  peoplecapacity: InputField<"text">;
  make: InputField<"text">;
  model: InputField<"text">;
  power: InputField<"text">;
  weightcapacity: InputField<"text">;
  color: InputField<"text">;
  region: InputField<"text">;
  category: InputField<"text">;
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
  make: {
    name: "make",
    placeholder: "form.placeholder.make",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  model: {
    name: "model",
    placeholder: "form.placeholder.model",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  power: {
    name: "power",
    placeholder: "form.placeholder.power",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  year: {
    name: "year",
    placeholder: "form.placeholder.year",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  weightcapacity: {
    name: "weightcapacity",
    placeholder: "form.placeholder.weightcapacity",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  peoplecapacity: {
    name: "peoplecapacity",
    placeholder: "form.placeholder.peoplecapacity",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  region: {
    name: "region",
    placeholder: "form.placeholder.region",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  color: {
    name: "color",
    placeholder: "form.placeholder.color",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  category: {
    name: "category",
    placeholder: "form.placeholder.category",
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
      value: /^.{2}/g,
      error: "form.error.licence.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.licence.notEmpty",
    },
  ],
  vin: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.vin.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.vin.notEmpty",
    },
  ],
  category: [
    {
      type: "NOT_EMPTY",
      error: "form.error.category.notEmpty",
    },
  ],
  make: [
    {
      type: "NOT_EMPTY",
      error: "form.error.make.notEmpty",
    },
  ],
  model: [
    {
      type: "NOT_EMPTY",
      error: "form.error.model.notEmpty",
    },
  ],
  peoplecapacity: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.peoplecapacity.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.peoplecapacity.notEmpty",
    },
  ],
  year: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.year.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.year.notEmpty",
    },
  ],
  power: [
    {
      type: "REGEX",
      value: /^(\d+|)$/g,
      error: "form.error.power.wrongFormat",
    },
  ],
  weightcapacity: [
    {
      type: "REGEX",
      value: /^(\d+|)$/g,
      error: "form.error.weightcapacity.wrongFormat",
    },
  ],
  color: [],
  region: [],
};
