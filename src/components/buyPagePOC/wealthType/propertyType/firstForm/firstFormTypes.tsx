//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  area: InputField<"text">;
  type: InputField<"text">;
  region: InputField<"text">;
  subregion: InputField<"text">;
  templateId: InputField<
    "select",
    | "d44434c6-bc22-4fda-8d6b-5fdd1e8e948c"
    | "eb4aceca-d9fc-4245-8206-5c1a7ac55ca7"
    | "eb4aceca-d9fc-4245-8206-5c1a2c55ca7"
    | "eb4aceca-d9fc-4245-8206-5c1a355ca7"
    | null
  >;
}> = {
  area: {
    name: "area",
    placeholder: "Sipërfaqe(m2)",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  type: {
    name: "type",
    placeholder: "Lloji Pronës",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  region: {
    name: "region",
    placeholder: "Rrethi",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  subregion: {
    name: "subregion",
    placeholder: "Njësia Administrative",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  templateId: {
    name: "templateId",
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
  area: [
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
  type: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni llojin e prones",
    },
  ],
  region: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni rrethin ku ndodhet prona",
    },
  ],
  subregion: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  templateId: [
    {
      type: "NOT_NULL",
      error: "Ju duhet te zgjidhni nje nga opsionet",
    },
  ],
};
