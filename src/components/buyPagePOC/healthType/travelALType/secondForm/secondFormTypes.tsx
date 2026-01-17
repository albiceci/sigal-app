//////////////PRECREATED FORM FIELD//////////////
/////////////////ADD HERE WHEN ADDING NEW FORM FIELD///////////////

import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";

export const formFields: FormInputs<{
  begDate: InputField<"text">;
  endDate: InputField<"text">;
  templateId: InputField<
    "select",
    "b27b1c33-4c40-ef11-b9a8-00505692fbbd" | "9c499509-4c40-ef11-b9a8-00505692fbbd" | null
  >;
  premium: InputField<"text">;
  premiumCurrency: InputField<"text">;
}> = {
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
  templateId: {
    name: "templateId",
    type: "select",
    value: null,
    state: {
      isValid: false,
      errors: [],
    },
  },
  premium: {
    name: "premium",
    placeholder: "Premium",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  premiumCurrency: {
    name: "premiumCurrency",
    placeholder: "premiumCurrency",
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
  templateId: [
    {
      type: "NOT_NULL",
      error: "Ju duhet te zgjidhni nje nga opsionet",
    },
  ],
  premium: [],
  premiumCurrency: [],
};
