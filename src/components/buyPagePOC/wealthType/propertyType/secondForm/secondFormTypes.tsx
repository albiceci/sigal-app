//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  taxNumber: InputField<"text">;
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
  fileUploads: InputField<"file">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
  taxNumber: {
    name: "taxNumber",
    placeholder: "Nr. i kartës ID",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  name: {
    name: "name",
    placeholder: "Emër",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  surname: {
    name: "surname",
    placeholder: "Mbiemër",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  birthday: {
    name: "birthday",
    placeholder: "Datelindja",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  phone: {
    name: "phone",
    placeholder: "Telefon",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  wealthnr: {
    name: "wealthnr",
    placeholder: "Nr Pasurise",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  postalcode: {
    name: "postalcode",
    placeholder: "Zona Kadestrale",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  address: {
    name: "address",
    placeholder: "Adresa e prones",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  begDate: {
    name: "begDate",
    placeholder: "Data e fillimit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  endDate: {
    name: "endDate",
    placeholder: "Data e mbarimit",
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
  taxNumber: [
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
  fileUploads: [
    {
      type: "LENGTH_BIGGER_EQUAL_THAN",
      value: 4,
      error: "Ju duhet te shtoni te pakten 4 dokumente",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
