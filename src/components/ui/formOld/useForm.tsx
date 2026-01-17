import { useEffect } from "react";
import { fieldValidationRules, formFieldStateType, FormFieldTypes, FormInputs, InputField } from "./types";
import { useValidator } from "./validator/useValidator";

type useFormProps<T extends Record<string, InputField<keyof FormFieldTypes>>, S extends keyof T> = {
  formData: FormInputs<T>;
  formFields: FormInputs<Pick<T, S>>;
  fieldsValidationObject: fieldValidationRules<S>;
  setFormData: React.Dispatch<React.SetStateAction<FormInputs<T>>>;
};

export function useForm<T extends Record<string, InputField<keyof FormFieldTypes>>, S extends keyof T>({
  formData,
  formFields,
  setFormData,
  fieldsValidationObject,
}: useFormProps<T, S>) {
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(formFields) as Array<keyof typeof formData>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formData[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields,
    validationRules: fieldsValidationObject,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          value: e.target.value,
        },
      };
    });
    validateField(e.target.name as keyof typeof formFields, e.target.value, true);
  };

  const changeFieldValue = <T extends keyof typeof formFields>({
    name,
    value,
    showErrors = true,
  }: {
    name: T;
    value: (typeof formFields)[T]["value"];
    showErrors?: boolean;
  }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof formData],
        value,
      },
    }));

    validateField(name, value, showErrors);
  };

  useEffect(() => {
    validateForm(false);
  }, []);

  return {
    formFieldsState,
    validateField,
    validateForm,
    handleInputChange,
    changeFieldValue,
    isValid: Object.values(formFieldsState).every((field) => (field as formFieldStateType).isValid),
  };
}
