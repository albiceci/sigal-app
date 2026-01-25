import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { useForm } from "../../../../ui/form/useForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useAdditionalPeopleForm } from "../../../additionalPeopleForm/additionalPeopleForm";
import { CheckboxInput } from "../../../../ui/form/inputs/checkboxInput/checkboxInput";
import { borderContext } from "../borderContext";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { FormDivider } from "../../../../ui/form/formContainers/formDivider";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref,
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof borderContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const additionalPeopleForm = useAdditionalPeopleForm({
      product: props.product,
      keyword: "form.additionalPeople.driver",
      metadata: { limit: 2 },
    });

    const onIsOwnerDriverChange = (value: boolean) => {
      let operationCheck = false;

      if (value) {
        operationCheck = additionalPeopleForm.onPersonalInfoFormSubmit(
          {
            birthday: formData.birthday,
            name: formData.name,
            surname: formData.surname,
            gender: formData.gender,
            taxNumber: formData.taxNumber,
            metadata: formData.metadata,
          },
          "add",
        );
      } else {
        operationCheck = additionalPeopleForm.onPersonRemove({
          birthday: formData.birthday,
          name: formData.name,
          surname: formData.surname,
          gender: formData.gender,
          taxNumber: formData.taxNumber,
          metadata: formData.metadata,
        });
      }

      if (operationCheck) {
        formHook.changeFieldValue({
          name: "isOwnerDriver",
          value: value,
        });
      }
    };

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid && formData.additionalPeople.value.length,
    }));

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormDivider text="form.divider.owner" />
            <FormRow>
              <TextInput
                name={formFields.taxNumber.name}
                value={formData.taxNumber.value}
                placeholder={formData.taxNumber.placeholder as string}
                isValid={formData.taxNumber.state.isValid}
                errors={formData.taxNumber.state.errors}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.name.name}
                value={formData.name.value}
                placeholder={formData.name.placeholder as string}
                isValid={formData.name.state.isValid}
                errors={formData.name.state.errors}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
              />
              <TextInput
                name={formFields.surname.name}
                value={formData.surname.value}
                placeholder={formData.surname.placeholder as string}
                isValid={formData.surname.state.isValid}
                errors={formData.surname.state.errors}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
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
                name={formFields.email.name}
                value={formData.email.value}
                placeholder={formData.email.placeholder as string}
                isValid={formData.email.state.isValid}
                errors={formData.email.state.errors}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
              />
              <TextInput
                name={formFields.phone.name}
                value={formData.phone.value}
                placeholder={formData.phone.placeholder as string}
                isValid={formData.phone.state.isValid}
                errors={formData.phone.state.errors}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
              />
            </FormRow>
            <FormDivider text="form.divider.drivers" />
            <FormRow>
              <CheckboxInput
                text={formData.isOwnerDriver.placeholder as string}
                name={formFields.isOwnerDriver.name}
                value={formData.isOwnerDriver.value}
                onClick={(name: string, value: boolean) => {
                  if (
                    !formData.taxNumber.state.isValid ||
                    !formData.name.state.isValid ||
                    !formData.surname.state.isValid ||
                    !formData.gender.state.isValid ||
                    !formData.birthday.state.isValid
                  ) {
                    formHook.validateForm(true);
                  } else {
                    onIsOwnerDriverChange(value);
                  }
                }}
                errors={formData.isOwnerDriver.state.errors}
              />
            </FormRow>
            {additionalPeopleForm.render}
          </FormBody>
        </Reveal>
      </div>
    );
  },
);
export default SecondForm;
