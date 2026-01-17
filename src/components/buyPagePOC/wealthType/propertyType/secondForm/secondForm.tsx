import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { useForm } from "../../../../ui/form/useForm";
import FileInput from "../../../../ui/form/inputs/fileInput/fileInput";
import { propertyContext } from "../propertyContext";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";

const SecondForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(propertyContext);

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useImperativeHandle(ref, () => ({
    runValidation: formHook.validateForm,
    isValid: formHook.isValid,
  }));

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.taxNumber.name}
              value={formData.taxNumber.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.taxNumber.placeholder as string}
              isValid={formData.taxNumber.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formData.taxNumber.state.errors}
            />

            <TextInput
              name={formFields.name.name}
              value={formData.name.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.name.placeholder as string}
              isValid={formData.name.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.name.state.errors}
            />
            <TextInput
              name={formFields.surname.name}
              value={formData.surname.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.surname.placeholder as string}
              isValid={formData.surname.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.surname.state.errors}
            />
          </FormRow>
          <FormRow>
            <DateInput
              name={formFields.birthday.name}
              value={formData.birthday.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.birthday.placeholder as string}
              isValid={formData.birthday.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.birthday.state.errors}
            />
          </FormRow>

          <FormRow>
            <TextInput
              name={formFields.phone.name}
              value={formData.phone.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.phone.placeholder as string}
              isValid={formData.phone.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.phone.state.errors}
            />
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.email.placeholder as string}
              isValid={formData.email.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.email.state.errors}
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
              isValid={formData.wealthnr.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.wealthnr.state.errors}
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
              isValid={formData.address.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formData.address.state.errors}
            />
            <TextInput
              name={formFields.postalcode.name}
              value={formData.postalcode.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.postalcode.placeholder as string}
              isValid={formData.postalcode.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              style={{
                minWidth: 180,
              }}
              errors={formData.postalcode.state.errors}
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
              isValid={formData.begDate.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.begDate.state.errors}
            />
            <TextInput
              name={formFields.endDate.name}
              value={formData.endDate.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.endDate.placeholder as string}
              isValid={formData.endDate.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.endDate.state.errors}
            />
          </FormRow>
          <FormRow>
            <FileInput
              name={formFields.fileUploads.name}
              value={formData.fileUploads.value}
              onChange={(name: string, value: File[]) => {
                formHook.changeFieldValue({
                  name: "fileUploads",
                  value: value,
                });
              }}
              label="Bashkengjit kopje te karteles se parsuriese dhe minimumi 3 foto te objektit"
              metadata={{
                MAX_FILES: 7,
              }}
              errors={formData.fileUploads.state.errors}
            />
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});

export default SecondForm;
