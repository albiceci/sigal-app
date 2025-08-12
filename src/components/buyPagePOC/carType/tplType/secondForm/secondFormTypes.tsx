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
    placeholder: "Ditelindja",
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
      error: "Mbiemri duhet te kete me shume se 2 karaktere",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "Ditelindja nuk mund te jete bosh",
    },
  ],
};
