import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { useForm } from "../../../../ui/form/useForm";
import FileInput from "../../../../ui/form/inputs/fileInput/fileInput";
import { propertyContext } from "../propertyContext";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { FormDivider } from "../../../../ui/form/formContainers/formDivider";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref,
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof propertyContext);

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

    const setDates = (dateDifference: number) => {
      const now = new Date();
      now.setDate(now.getDate() + dateDifference);

      const begDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      formHook.changeFieldValue({
        name: "begDate",
        value: begDate,
        showErrors: true,
      });

      now.setFullYear(now.getFullYear() + 1);
      const endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

      formHook.changeFieldValue({
        name: "endDate",
        value: endDate,
        showErrors: true,
      });
    };

    useEffect(() => {
      if (props.product.config?.beginDate?.defaultValue) {
        setDates(props.product.config.beginDate.defaultValue);
      }
    }, [props.product.config?.beginDate?.defaultValue]);

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormDivider text="form.divider.owner" />
            <FormRow>
              <TextInput
                name={formFields.name.name}
                value={formData.name.value}
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
                placeholder={formData.surname.placeholder as string}
                isValid={formData.surname.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.surname.state.errors}
              />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.gender.placeholder as string}
                name={formData.gender.name}
                value={formData.gender.value}
                isValid={formData.gender.state.isValid}
                options={[
                  { id: "Male", text: "form.option.gender.male" },
                  { id: "Female", text: "form.option.gender.female" },
                ]}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "gender",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData.gender.state.errors}
              />
              <DateInput
                name={formFields.birthday.name}
                value={formData.birthday.value}
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
                name={formFields.taxNumber.name}
                value={formData.taxNumber.value}
                placeholder={formData.taxNumber.placeholder as string}
                isValid={formData.taxNumber.state.isValid}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  formHook.handleInputChange(e);
                }}
                errors={(() => {
                  return formData.taxNumber.state.errors;
                })()}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.email.name}
                value={formData.email.value}
                placeholder={formData.email.placeholder as string}
                isValid={formData.email.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.email.state.errors}
              />
              <TextInput
                name={formFields.phone.name}
                value={formData.phone.value}
                placeholder={formData.phone.placeholder as string}
                isValid={formData.phone.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.phone.state.errors}
              />
            </FormRow>
            <FormDivider text="form.divider.property" />
            <FormRow>
              <TextInput
                name={formFields.wealthnr.name}
                value={formData.wealthnr.value}
                placeholder={formData.wealthnr.placeholder as string}
                isValid={formData.wealthnr.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.wealthnr.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.address.name}
                value={formData.address.value}
                placeholder={formData.address.placeholder as string}
                isValid={formData.address.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.address.state.errors}
              />
            </FormRow>

            <FormRow>
              <DateInput
                name={formFields.begDate.name}
                value={formData.begDate.value}
                placeholder={formData.begDate.placeholder as string}
                isValid={formData.begDate.state.isValid}
                // onChange={(e) => {
                //   formHook.handleInputChange(e);
                // }}
                errors={formData.begDate.state.errors}
              />
              <DateInput
                name={formFields.endDate.name}
                value={formData.endDate.value}
                placeholder={formData.endDate.placeholder as string}
                isValid={formData.endDate.state.isValid}
                // onChange={(e) => {
                //   formHook.handleInputChange(e);
                // }}
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
                label="form.placeholder.propertyFileUploads"
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
  },
);

export default SecondForm;
