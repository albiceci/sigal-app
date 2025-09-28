import { useState } from "react";

import { FormFieldTypes, InputField, FormInputs, fieldValidationRules, formFieldsStateType } from "../types";

type useValidatorProps<T extends Record<string, InputField<keyof FormFieldTypes>>> = {
  fields: FormInputs<T>;
  validationRules: fieldValidationRules<keyof T>;
};

export function useValidator<T extends Record<string, InputField<keyof FormFieldTypes>>>({
  fields,
  validationRules,
}: useValidatorProps<T>) {
  const _validateField = (name: keyof typeof validationRules, value: any, showErrors: boolean) => {
    const validationObject = validationRules[name];

    if (validationObject.length) {
      var errors: string[] = [];
      validationObject.forEach((rule) => {
        if (rule.type === "REGEX" && !value.match(rule.value)) {
          errors.push(rule.error);
        }
        if (rule.type === "NOT_EMPTY" && value === "") {
          errors.push(rule.error);
        }
        if (rule.type === "NOT_NULL" && value === null) {
          errors.push(rule.error);
        }
        if (rule.type === "IS_TRUE" && value === false) {
          errors.push(rule.error);
        }
        if (rule.type === "SAME_AS" && value !== fields[rule.value].value) {
          errors.push(rule.error);
        }
      });

      if (
        validationObject.filter((rule) => rule.type === "DEPENDS").length &&
        formFieldsState[
          //@ts-ignore
          validationObject.filter((rule) => rule.type === "DEPENDS")[0].value
        ].isValid
      ) {
        errors = [];
      }

      if (errors.length) {
        return { isValid: false, errors: showErrors ? errors : [] };
      } else {
        return { isValid: true, errors: [] };
      }
    } else {
      return { isValid: true, errors: [] };
    }
  };

  const setInitialFormFieldsState = () => {
    return Object.keys(fields).reduce(
      (a, v) => ({ ...a, [v]: _validateField(v, fields[v].value, false) }),
      {}
    ) as formFieldsStateType<keyof typeof fields>;
  };

  const [formFieldsState, setFormFieldsState] = useState(setInitialFormFieldsState());

  const validateForm = (showErrors: boolean) => {
    (Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>).forEach((field) => {
      validateField(field, fields[field].value, showErrors);
    });
  };

  const validateField = (name: keyof typeof validationRules, value: any, showErrors: boolean) => {
    setFormFieldsState((prev) => {
      return {
        ...prev,
        [name]: _validateField(name, value, showErrors),
      } as formFieldsStateType<keyof typeof fields>;
    });
  };

  return { formFieldsState, validateField, validateForm };
}
