import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";
import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { privateGoldContext } from "../privateGoldContext";
import React from "react";

const SecondForm = forwardRef((_, ref) => {
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

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    console.log(`validating Form with type ${showErrors}`);
    validateForm(showErrors);
  };

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid: (
      Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
    ).filter((field) => !formFieldsState[field].isValid).length
      ? false
      : true,
  }));

  useEffect(() => {
    runValidation(false);
  }, []);

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.begDate.name}
              value={formData.begDate.value}
              helper="Ketu duhet te vendosni daten e fillimit te udhetimit"
              placeholder={formData.begDate.placeholder as string}
              isValid={formFieldsState["begDate"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["begDate"].errors}
            />
            <TextInput
              name={formFields.endDate.name}
              value={formData.endDate.value}
              helper="Ketu duhet te vendosni daten e mbarimit te udhetimit"
              placeholder={formData.endDate.placeholder as string}
              isValid={formFieldsState["endDate"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["endDate"].errors}
            />
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});

export default SecondForm;
