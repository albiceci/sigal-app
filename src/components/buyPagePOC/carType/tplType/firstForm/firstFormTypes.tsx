//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../../ui/form/types";

export const formFields: FormInputs<{
  vehicleSelected: InputField<"checkbox">;
  durationCompleted: InputField<"checkbox">;
}> = {
  vehicleSelected: {
    name: "vehicleSelected",
    type: "checkbox",
    value: false,
  },
  durationCompleted: {
    name: "vehicleSelected",
    type: "checkbox",
    value: false,
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
  vehicleSelected: [
    {
      type: "IS_TRUE",
      error: "Ju duhet te kerkoni mjetin.",
    },
  ],
  durationCompleted: [
    {
      type: "IS_TRUE",
      error: "Ju duhet te kerkoni mjetin.",
    },
  ],
};
