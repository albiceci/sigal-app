//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";
import { optionalFormFields, personalInfoFormFields } from "./personalInfoForm/personalInfoForm";

type additionalPeopleType = typeof personalInfoFormFields & Partial<typeof optionalFormFields>;

export const formFields: FormInputs<{
  additionalPeople: InputField<"object", additionalPeopleType[]>;
}> = {
  additionalPeople: {
    name: "additionalPeople",
    type: "object",
    value: [],
    state: {
      isValid: false,
      errors: [],
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  additionalPeople: [],
};
