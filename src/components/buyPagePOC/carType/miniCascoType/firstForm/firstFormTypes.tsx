//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  vehicleSelected: InputField<"checkbox">;
  durationCompleted: InputField<"checkbox">;
  parentPolicySerial: InputField<"text">;
  parentPolicyProductId: InputField<"text">;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
  vehicleSelected: {
    name: "vehicleSelected",
    type: "checkbox",
    value: false,
    state: {
      isValid: false,
      errors: [],
    },
  },
  durationCompleted: {
    name: "vehicleSelected",
    type: "checkbox",
    value: false,
    state: {
      isValid: false,
      errors: [],
    },
  },
  parentPolicyProductId: {
    name: "parentPolicyProductId",
    placeholder: "form.placeholder.parentPolicyProductId",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  parentPolicySerial: {
    name: "parentPolicySerial",
    placeholder: "form.placeholder.parentPolicySerial",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  premium: {
    name: "premium",
    placeholder: "form.placeholder.premium",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  premiumCurrency: {
    name: "premiumCurrency",
    placeholder: "form.placeholder.premiumCurrency",
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
  vehicleSelected: [
    {
      type: "IS_TRUE",
      error: "form.error.vehicleSelected.isTrue",
    },
  ],
  durationCompleted: [
    {
      type: "IS_TRUE",
      error: "form.error.durationCompleted.isTrue",
    },
  ],
  parentPolicyProductId: [
    {
      type: "NOT_EMPTY",
      error: "form.error.parentPolicyProductId.notEmpty",
    },
  ],
  parentPolicySerial: [
    {
      type: "NOT_EMPTY",
      error: "form.error.parentPolicySerial.notEmpty",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
