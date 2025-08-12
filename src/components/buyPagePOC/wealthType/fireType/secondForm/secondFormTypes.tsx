//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../../ui/form/types";

export const formFields: FormInputs<{
  nrid: InputField<"text">;
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  phone: InputField<"text">;
  email: InputField<"text">;
  wealthnr: InputField<"text">;
  postalcode: InputField<"text">;
  address: InputField<"text">;
  begDate: InputField<"text">;
  endDate: InputField<"text">;
}> = {
  nrid: {
    name: "nrid",
    placeholder: "Nr. i kartës ID",
    type: "text",
    value: "",
  },
  name: {
    name: "name",
    placeholder: "Emër",
    type: "text",
    value: "",
  },
  surname: {
    name: "surname",
    placeholder: "Mbiemër",
    type: "text",
    value: "",
  },
  birthday: {
    name: "birthday",
    placeholder: "Datelindja",
    type: "text",
    value: "",
  },
  phone: {
    name: "phone",
    placeholder: "Telefon",
    type: "text",
    value: "",
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
  },
  wealthnr: {
    name: "wealthnr",
    placeholder: "Nr Pasurise",
    type: "text",
    value: "",
  },
  postalcode: {
    name: "postalcode",
    placeholder: "Zona Kadestrale",
    type: "text",
    value: "",
  },
  address: {
    name: "address",
    placeholder: "Adresa e prones",
    type: "text",
    value: "",
  },
  begDate: {
    name: "begDate",
    placeholder: "Data e fillimit",
    type: "text",
    value: "",
  },
  endDate: {
    name: "endDate",
    placeholder: "Data e mbarimit",
    type: "text",
    value: "",
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
  nrid: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Emri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
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
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  email: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  wealthnr: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  postalcode: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  address: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
  endDate: [
    {
      type: "NOT_EMPTY",
      error: "Ju lutem zgjidhni njësinë administrative ku ndodhet prona",
    },
  ],
};
