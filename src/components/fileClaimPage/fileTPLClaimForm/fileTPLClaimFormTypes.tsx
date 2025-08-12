import {
  fieldValidationRules,
  FormInputs,
  InputField,
} from "../../ui/form/types";

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
}> = {
  name: {
    name: "name",
    placeholder: "Emri",
    type: "text",
    value: "",
  },
  surname: {
    name: "surname",
    placeholder: "Surname",
    type: "text",
    value: "",
  },
  phone: {
    name: "phone",
    placeholder: "Telefoni",
    type: "text",
    value: "",
  },
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
  },
  guiltyLicense: {
    name: "guiltyLicense",
    placeholder: "Targa e Shkaktarit",
    type: "text",
    value: "",
  },
  beneficiaryLicense: {
    name: "beneficiaryLicense",
    placeholder: "Targa e Perfituesit",
    type: "text",
    value: "",
  },
  city: {
    name: "city",
    placeholder: "Qyteti i Aksidentit",
    type: "text",
    value: "",
  },
  location: {
    name: "location",
    placeholder: "Vendodhja e Aksidentit",
    type: "text",
    value: "",
  },
  date: {
    name: "date",
    placeholder: "Data e Aksidentit",
    type: "text",
    value: "",
  },
  time: {
    name: "time",
    placeholder: "Ora e Aksidentit",
    type: "text",
    value: "",
  },
  description: {
    name: "description",
    placeholder: "Pershkrimi i Aksidentit",
    type: "text",
    value: "",
  },
};

export const cardFromFieldValidationRules: fieldValidationRules<
  keyof typeof formFields
> = {
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
};
