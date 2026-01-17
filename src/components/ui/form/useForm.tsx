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
  const reduceFormData = () => {
    return (Object.keys(formFields) as Array<keyof typeof formData>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formData[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields;
  };
  const { validateField } = useValidator({
    formData: formData,
    formFields: reduceFormData(),
    fieldsValidationObject: fieldsValidationObject,
    setFormData: setFormData,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name],
          value: e.target.value,
          state: validateField(e.target.name as keyof typeof formFields, e.target.value, true),
        },
      };
    });
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
        state: validateField(name, value, showErrors),
      },
    }));
  };

  const validateForm = (showErrors: boolean) => {
    (Object.keys(formFields) as Array<keyof typeof formFields>).forEach((field) => {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof formData],
          state: validateField(field, formData[field].value, showErrors),
        },
      }));
    });
  };

  useEffect(() => {
    validateForm(false);
  }, []);

  return {
    validateField,
    validateForm,
    handleInputChange,
    changeFieldValue,
    isValid: Object.keys(reduceFormData()).every((field) => formData[field].state.isValid),
  };
}
