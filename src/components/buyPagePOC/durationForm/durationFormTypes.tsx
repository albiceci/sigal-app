//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";

export const formFields: FormInputs<{
  durationId: InputField<"text">;
  begDate: InputField<"text">;
  endDate: InputField<"text">;
}> = {
  durationId: {
    name: "durationId",
    placeholder: "form.placeholder.durationId",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  begDate: {
    name: "begDate",
    placeholder: "form.placeholder.begDate",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  endDate: {
    name: "endDate",
    placeholder: "form.placeholder.endDate",
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
  durationId: [
    {
      type: "NOT_EMPTY",
      error: "form.error.durationId.notEmpty",
    },
  ],
  begDate: [
    {
      type: "NOT_EMPTY",
      error: "form.error.begDate.notEmpty",
    },
  ],
  endDate: [],
};
