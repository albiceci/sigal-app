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
    placeholder: "Emri i mjetit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectFlag: {
    name: "objectFlag",
    placeholder: "Flamuri i mjetit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectType: {
    name: "objectType",
    placeholder: "Kategoria",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  regNumber: {
    name: "regNumber",
    placeholder: "Numri i Regjistrimit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectMaterialType: {
    name: "objectMaterialType",
    placeholder: "Materiali",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectProdYear: {
    name: "objectProdYear",
    placeholder: "Viti i prodhimit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectPower: {
    name: "objectPower",
    placeholder: "Fuqia Motorrike(KW)",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectDimensions: {
    name: "objectDimensions",
    placeholder: "Dimensionet",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  objectNavigationArea: {
    name: "objectNavigationArea",
    placeholder: "Zona e Navigimit",
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
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  objectFlag: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  objectType: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  regNumber: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  objectMaterialType: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  objectProdYear: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "Viti duhet te permbaje vetem numra",
    },
    {
      type: "NOT_EMPTY",
      error: "Viti nuk mund te jete bosh",
    },
  ],
  objectPower: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "Sipërfaqe duhet te permbaje vetem numra",
    },
    {
      type: "NOT_EMPTY",
      error: "Sipërfaqe nuk mund te jete bosh",
    },
  ],
  objectDimensions: [
    {
      type: "NOT_EMPTY",
      error: "Sipërfaqe nuk mund te jete bosh",
    },
  ],
  objectNavigationArea: [
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "Zona e navigimit duhet te permbaje vetem numra",
    },
    {
      type: "NOT_EMPTY",
      error: "Zona e navigimit nuk mund te jete bosh",
    },
  ],
};
