import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { tplContext } from "../tplContext";

const SecondForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(tplContext);

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
              helper="Ketu duhet te vendosni targen e makines"
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
              placeholder={formData.surname.placeholder as string}
              isValid={formFieldsState["surname"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["surname"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.birthday.name}
              value={formData.birthday.value}
              placeholder={formData.birthday.placeholder as string}
              helper="Ketu duhet te vendosni daten e fillimit"
              isValid={formFieldsState["birthday"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["birthday"].errors}
              //style={{ paddingTop: 5, paddingBottom: 5 }}
            />
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});
export default SecondForm;
