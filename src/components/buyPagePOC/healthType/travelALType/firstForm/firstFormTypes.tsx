//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../../ui/form/types";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  passportnr: InputField<"text">;
  email: InputField<"text">;
  phone: InputField<"text">;
}> = {
  name: {
    name: "name",
    placeholder: "Emri",
    type: "text",
    value: "",
  },
  surname: {
    name: "surname",
    placeholder: "Mbiemri",
    type: "text",
    value: "",
  },
  birthday: {
    name: "birthday",
    placeholder: "Datelindja",
    type: "text",
    value: "",
  },
  passportnr: {
    name: "passportnr",
    placeholder: "Nr.Pasaporte",
    type: "text",
    value: "",
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
  },
  phone: {
    name: "phone",
    placeholder: "Nr.Telefon",
    type: "text",
    value: "",
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Emri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Emri nuk mund te jete bosh",
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
      error: "Emri nuk mund te jete bosh",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  passportnr: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  email: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
};
