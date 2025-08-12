//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../ui/form/types";

export const formFields: FormInputs<{
  durationId: InputField<"text">;
  begDate: InputField<"text">;
  endDate: InputField<"text">;
}> = {
  durationId: {
    name: "durationId",
    type: "text",
    value: "",
  },
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
  durationId: [
    {
      type: "NOT_EMPTY",
      error: "Periudha e sigurimit nuk mund te jete bosh",
    },
  ],
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "Data e fillimit nuk mund te jete bosh",
    },
  ],
  endDate: [],
};
