//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../../ui/form/types";

export const formFields: FormInputs<{
  area: InputField<"text">;
  type: InputField<"text">;
  region: InputField<"text">;
  subregion: InputField<"text">;
}> = {
  area: {
    name: "area",
    placeholder: "Sipërfaqe(m2)",
    type: "text",
    value: "",
  },
  type: {
    name: "type",
    placeholder: "Lloji Pronës",
    type: "text",
    value: "",
  },
  region: {
    name: "region",
    placeholder: "Rrethi",
    type: "text",
    value: "",
  },
  subregion: {
    name: "subregion",
    placeholder: "Njësia Administrative",
    type: "text",
    value: "",
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
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
};
