import { FormFieldTypes, InputField, FormInputs, fieldValidationRules } from "../types";

type useValidatorProps<T extends Record<string, InputField<keyof FormFieldTypes>>, S extends keyof T> = {
  formData: FormInputs<T>;
  formFields: FormInputs<Pick<T, S>>;
  fieldsValidationObject: fieldValidationRules<S>;
  setFormData: React.Dispatch<React.SetStateAction<FormInputs<T>>>;
};

export function useValidator<T extends Record<string, InputField<keyof FormFieldTypes>>, S extends keyof T>({
  formData,
  formFields,
  setFormData,
  fieldsValidationObject,
}: useValidatorProps<T, S>) {
  const _validateField = (name: keyof typeof fieldsValidationObject, value: any, showErrors: boolean) => {
    const validationObject = fieldsValidationObject[name];
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
        if (rule.type === "LENGTH_BIGGER_EQUAL_THAN" && value.length < rule.value) {
          errors.push(rule.error);
        }
        if (rule.type === "NUMBER_BIGGER_EQUAL_THAN" && !(!isNaN(value) && Number(value) >= rule.value)) {
          errors.push(rule.error);
        }
      });

      if (errors.length) {
        return { isValid: false, errors: showErrors ? errors : [] };
      } else {
        return { isValid: true, errors: [] };
      }
    } else {
      return { isValid: true, errors: [] };
    }
  };

  const validateField = (name: keyof typeof fieldsValidationObject, value: any, showErrors: boolean) => {
    return _validateField(name, value, showErrors);
  };

  return { validateField };
}
