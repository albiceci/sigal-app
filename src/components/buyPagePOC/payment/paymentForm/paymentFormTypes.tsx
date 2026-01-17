import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";

export const formFields: FormInputs<{
  paymentOption: InputField<"select", "1" | "2" | null>;
}> = {
  paymentOption: {
    name: "paymentOption",
    type: "select",
    value: null,
    state: {
      isValid: false,
      errors: [],
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  paymentOption: [
    {
      type: "NOT_NULL",
      error: "Ju duhet te zgjidhni nje nga opsionet",
    },
  ],
};
