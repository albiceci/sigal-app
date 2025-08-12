import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../../ui/form/types";

export const formFields: FormInputs<{
  paymentOption: InputField<"select", "1" | "2" | null>;
  paymentData: InputField<
    "object",
    {
      cardId: string | null;
      cardNumber: string | null;
      cardHolderName: string | null;
      cardMonth: string | null;
      cardYear: string | null;
      cardCVV: string | null;
    }
  >;
}> = {
  paymentOption: {
    name: "paymentOption",
    type: "select",
    value: null,
  },
  paymentData: {
    name: "paymentData",
    type: "object",
    value: {
      cardId: null,
      cardNumber: null,
      cardHolderName: null,
      cardMonth: null,
      cardYear: null,
      cardCVV: null,
    },
  },
};

///////////VALIDATION RULES/////////////////////////
export const fieldsValidationObject: fieldValidationRules<
  keyof typeof formFields
> = {
  paymentOption: [
    {
      type: "NOT_NULL",
      error: "Ju duhet te zgjidhni nje nga opsionet",
    },
  ],
  paymentData: [],
};
