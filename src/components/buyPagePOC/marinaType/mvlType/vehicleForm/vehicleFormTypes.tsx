import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  objectName: InputField<"text">;
  objectFlag: InputField<"text">;
  objectType: InputField<"text">;
  regNumber: InputField<"text">;
  objectMaterialType: InputField<"text">;
  objectProdYear: InputField<"text">;
  objectPower: InputField<"text">;
  objectDimensions: InputField<"text">;
  objectNavigationArea: InputField<"text">;
}> = {
  objectName: {
    name: "objectName",
    placeholder: "form.placeholder.objectName",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectFlag: {
    name: "objectFlag",
    placeholder: "form.placeholder.objectFlag",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectType: {
    name: "objectType",
    placeholder: "form.placeholder.objectType",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  regNumber: {
    name: "regNumber",
    placeholder: "form.placeholder.regNumber",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectMaterialType: {
    name: "objectMaterialType",
    placeholder: "form.placeholder.objectMaterialType",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectProdYear: {
    name: "objectProdYear",
    placeholder: "form.placeholder.objectProdYear",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectPower: {
    name: "objectPower",
    placeholder: "form.placeholder.objectPower",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectDimensions: {
    name: "objectDimensions",
    placeholder: "form.placeholder.objectDimensions",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectNavigationArea: {
    name: "objectNavigationArea",
    placeholder: "form.placeholder.objectNavigationArea",
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
  objectName: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.objectName.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.objectName.notEmpty",
    },
  ],
  objectFlag: [
    {
      type: "NOT_EMPTY",
      error: "form.error.objectFlag.notEmpty",
    },
  ],
  objectType: [
    {
      type: "NOT_EMPTY",
      error: "form.error.objectType.notEmpty",
    },
  ],
  regNumber: [
    {
      type: "NOT_EMPTY",
      error: "form.error.regNumber.notEmpty",
    },
  ],
  objectMaterialType: [
    {
      type: "NOT_EMPTY",
      error: "form.error.objectMaterialType.notEmpty",
    },
  ],
  objectProdYear: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.objectProdYear.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.objectProdYear.notEmpty",
    },
  ],
  objectPower: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.objectPower.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.objectPower.notEmpty",
    },
  ],
  objectDimensions: [
    {
      type: "NOT_EMPTY",
      error: "form.error.objectDimensions.notEmpty",
    },
  ],
  objectNavigationArea: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.objectNavigationArea.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.objectNavigationArea.notEmpty",
    },
  ],
};
