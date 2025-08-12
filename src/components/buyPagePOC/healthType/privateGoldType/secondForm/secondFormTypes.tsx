//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../../ui/form/types";

export const formFields: FormInputs<{
  begDate: InputField<"text">;
  endDate: InputField<"text">;
}> = {
  begDate: {
    name: "begDate",
    placeholder: "Data e Fillimit",
    type: "text",
    value: "",
  },
  endDate: {
    name: "endDate",
    placeholder: "Data e Mbarimit",
    type: "text",
    value: "",
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "Zgjidhni daten e fillimit te urdhetimit",
    },
  ],
  endDate: [
    {
      type: "NOT_EMPTY",
      error: "Zgjidhni daten e mbarimit te urdhetimit",
    },
  ],
};
