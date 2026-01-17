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
  const _validateField = (
    name: keyof typeof validationRules,
    value: any,
    showErrors: boolean,
    dependencyRuleCheck: boolean = true
  ) => {
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
        if (dependencyRuleCheck && rule.type === "SAME_AS" && value !== fields[rule.value].value) {
          errors.push(rule.error);
        }
      });

      if (
        dependencyRuleCheck &&
        validationObject.filter((rule) => rule.type === "DISABLE_RULES_IF_FALSE").length &&
        !fields[
          //@ts-ignore
          validationObject.filter((rule) => rule.type === "DISABLE_RULES_IF_FALSE")[0].value
        ].value
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

  const checkDependentFields = (name: keyof typeof validationRules, value: any, showErrors: boolean) => {
    Object.keys(validationRules)
      .filter((field) => {
        return validationRules[field].filter(
          (rule) => (rule.type === "SAME_AS" || rule.type === "DISABLE_RULES_IF_FALSE") && rule.value === name
        ).length;
      })
      .forEach((field) => {
        const validationObject = validationRules[field];

        var state = _validateField(field, fields[field].value, true, false);

        validationObject.forEach((rule) => {
          if (rule.type === "SAME_AS" && rule.value === name) {
            if (fields[field].value !== value) {
              !state.errors.includes(rule.error) && state.errors.push(rule.error);
            } else {
              state.errors = state.errors.filter((error) => error !== rule.error);
            }
          }

          if (rule.type === "DISABLE_RULES_IF_FALSE" && rule.value === name) {
            if (!value) {
              state.errors = [];
            }
          }
        });

        state.isValid = state.errors.length === 0;

        if (!showErrors) {
          state.errors = [];
        }

        setFormFieldsState((prev) => {
          return {
            ...prev,
            [field]: state,
          } as formFieldsStateType<keyof typeof fields>;
        });
      });
  };

  const validateField = (name: keyof typeof validationRules, value: any, showErrors: boolean) => {
    setFormFieldsState((prev) => {
      return {
        ...prev,
        [name]: _validateField(name, value, showErrors),
      } as formFieldsStateType<keyof typeof fields>;
    });

    checkDependentFields(name, value, showErrors);
  };

  return { formFieldsState, validateField, validateForm };
}
