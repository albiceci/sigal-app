import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { fireContext } from "../../fireType/fireContext";

const SecondForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(fireContext);

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
              name={formFields.nrid.name}
              value={formData.nrid.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.nrid.placeholder as string}
              isValid={formFieldsState["nrid"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formFieldsState["nrid"].errors}
            />

            <TextInput
              name={formFields.name.name}
              value={formData.name.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
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
              helper="Ketu duhet te vendosni siperfaqen e prones"
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
              helper="Ketu duhet te vendosni siperfaqen e prones"
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
              name={formFields.phone.name}
              value={formData.phone.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.phone.placeholder as string}
              isValid={formFieldsState["phone"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["phone"].errors}
            />
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.email.placeholder as string}
              isValid={formFieldsState["email"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["email"].errors}
            />
          </FormRow>
          <FormRow>
            <></>
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.wealthnr.name}
              value={formData.wealthnr.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.wealthnr.placeholder as string}
              isValid={formFieldsState["wealthnr"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["wealthnr"].errors}
            />
          </FormRow>
          <FormRow>
            <></>
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.address.name}
              value={formData.address.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.address.placeholder as string}
              isValid={formFieldsState["address"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formFieldsState["address"].errors}
            />
            <TextInput
              name={formFields.postalcode.name}
              value={formData.postalcode.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.postalcode.placeholder as string}
              isValid={formFieldsState["postalcode"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formFieldsState["postalcode"].errors}
            />
          </FormRow>
          <FormRow>
            <></>
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.begDate.name}
              value={formData.begDate.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
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
              helper="Ketu duhet te vendosni siperfaqen e prones"
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
