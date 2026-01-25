//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  area: InputField<"text">;
  insuredSum: InputField<"text">;
  type: InputField<"text">;
  region: InputField<"text">;
  subregion: InputField<"text">;
  customTemplateId: InputField<
    "select",
    | "8a13b62d-659e-4dc7-9f06-9cfb76bad379"
    | "618ed7d0-4f32-490c-9dc3-4befc1f5af4f"
    | "427a81de-7f4c-4146-a6f1-2c17bb6d4831"
    | null
  >;
}> = {
  area: {
    name: "area",
    placeholder: "form.placeholder.area",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  insuredSum: {
    name: "insuredSum",
    placeholder: "form.placeholder.insuredSum",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  type: {
    name: "type",
    placeholder: "form.placeholder.propertyType",
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
  subregion: {
    name: "subregion",
    placeholder: "form.placeholder.subregion",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  customTemplateId: {
    name: "customTemplateId",
    type: "select",
    value: null,
    state: {
      isValid: false,
      errors: [],
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  insuredSum: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.insuredSum.wrongFormat",
    },
    {
      type: "NUMBER_BIGGER_EQUAL_THAN",
      value: 400000,
      error: "form.error.insuredSum.biggerThan",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.insuredSum.notEmpty",
    },
  ],
  area: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.area.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.area.notEmpty",
    },
  ],
  type: [
    {
      type: "NOT_EMPTY",
      error: "form.error.propertyType.notEmpty",
    },
  ],
  region: [
    {
      type: "NOT_EMPTY",
      error: "form.error.region.notEmpty",
    },
  ],
  subregion: [
    {
      type: "NOT_EMPTY",
      error: "form.error.subregion.notEmpty",
    },
  ],
  customTemplateId: [
    {
      type: "NOT_NULL",
      error: "form.error.customTemplateId.notEmpty",
    },
  ],
};
