import { fieldValidationRules } from "../types";

type commonField = "name" | "surname" | "birthday" | "email" | "gender" | "taxNumber" | "phone" | "password";

export const commonFieldRules: fieldValidationRules<commonField> = {
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.name.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.name.notEmpty",
    },
  ],
  surname: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.surname.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.surname.notEmpty",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "form.error.birthday.notEmpty",
    },
  ],
  gender: [
    {
      type: "NOT_EMPTY",
      error: "form.error.gender.notEmpty",
    },
  ],
  taxNumber: [
    {
      type: "NOT_EMPTY",
      error: "form.error.taxNumber.notEmpty",
    },
    {
      type: "REGEX",
      value: /^[A-Z]\d{8}[A-Z]$/g,
      error: "form.error.taxNumber.wrongFormat",
    },
  ],
  email: [
    {
      type: "REGEX",
      value: /\w+@\w+/g,
      error: "form.error.email.wrongFormat",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.email.notEmpty",
    },
  ],
  phone: [
    {
      type: "NOT_EMPTY",
      error: "form.error.phone.notEmpty",
    },
  ],
  password: [
    {
      type: "NOT_EMPTY",
      error: "form.error.password.notEmpty",
    },
    {
      type: "REGEX",
      value: /^.{6}/g,
      error: "form.error.password.length",
    },
    {
      type: "REGEX",
      value: /[A-Z]/g,
      error: "form.error.password.upperCase",
    },
    {
      type: "REGEX",
      value: /[0-9]/g,
      error: "form.error.password.number",
    },
  ],
};
