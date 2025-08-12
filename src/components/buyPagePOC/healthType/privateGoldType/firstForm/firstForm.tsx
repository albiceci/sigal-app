import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { privateGoldContext } from "../privateGoldContext";

const FirstForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(privateGoldContext);

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(formFields) as Array<keyof typeof formFields>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formFields[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields,
    validationRules: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof typeof formFields],
          value: e.target.value,
        },
      };
    });
    validateField(
      e.target.name as keyof typeof formFields,
      e.target.value,
      true
    );
  };

  const onSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name as keyof typeof formFields],
          value: value,
        },
      };
    });
    validateField(name as keyof typeof formFields, value, true);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid: (
      Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
    ).filter((field) => !formFieldsState[field].isValid).length
      ? false
      : true,
  }));

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.name.name}
              value={formData.name.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.name.placeholder as string}
              isValid={formFieldsState["name"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["name"].errors}
            />
            <TextInput
              name={formFields.surname.name}
              value={formData.surname.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.surname.placeholder as string}
              isValid={formFieldsState["surname"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["surname"].errors}
            />
            <TextInput
              name={formFields.birthday.name}
              value={formData.birthday.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.birthday.placeholder as string}
              isValid={formFieldsState["birthday"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["birthday"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.passportnr.name}
              value={formData.passportnr.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.passportnr.placeholder as string}
              isValid={formFieldsState["passportnr"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["passportnr"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.email.placeholder as string}
              isValid={formFieldsState["email"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["email"].errors}
            />
            <TextInput
              name={formFields.phone.name}
              value={formData.phone.value}
              //helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.phone.placeholder as string}
              isValid={formFieldsState["phone"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["phone"].errors}
            />
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});

export default FirstForm;
