import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  phone: InputField<"text">;
  email: InputField<"text">;
  guiltyLicense: InputField<"text">;
  beneficiaryLicense: InputField<"text">;
  city: InputField<"text">;
  location: InputField<"text">;
  date: InputField<"text">;
  time: InputField<"text">;
  description: InputField<"text">;
  fileUploads: InputField<"file">;
}> = {
  name: {
    name: "name",
    placeholder: "Emri",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  surname: {
    name: "surname",
    placeholder: "Surname",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  phone: {
    name: "phone",
    placeholder: "Telefoni",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  guiltyLicense: {
    name: "guiltyLicense",
    placeholder: "Targa e Shkaktarit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  beneficiaryLicense: {
    name: "beneficiaryLicense",
    placeholder: "Targa e Perfituesit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  city: {
    name: "city",
    placeholder: "Qyteti i Aksidentit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  location: {
    name: "location",
    placeholder: "Vendodhja e Aksidentit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  date: {
    name: "date",
    placeholder: "Data e Aksidentit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  time: {
    name: "time",
    placeholder: "Ora e Aksidentit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  description: {
    name: "description",
    placeholder: "Pershkrimi i Aksidentit",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  fileUploads: {
    name: "fileUploads",
    placeholder: "fileUploads",
    type: "file",
    value: [],
    state: {
      isValid: false,
      errors: [],
    },
  },
};

export const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  name: [
    {
      type: "NOT_EMPTY",
      error: "Username nuk mund te jete bosh",
    },
  ],
  surname: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  phone: [],
  email: [],
  guiltyLicense: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  beneficiaryLicense: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  city: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  location: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  date: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  time: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  description: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
  fileUploads: [
    {
      type: "LENGTH_BIGGER_EQUAL_THAN",
      value: 4,
      error: "Ju duhet te shtoni te pakten 4 dokumente",
    },
  ],
};
