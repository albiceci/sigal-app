import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { tplContext } from "../tplContext";
import { useForm } from "../../../../ui/form/useForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useAdditionalPeopleForm } from "../../../additionalPeopleForm/additionalPeopleForm";
import { CheckboxInput } from "../../../../ui/form/inputs/checkboxInput/checkboxInput";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof tplContext);

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
          "add"
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
            <FormRow>
              <TextInput
                name={formFields.taxNumber.name}
                value={formData.taxNumber.value}
                placeholder={formData.taxNumber.placeholder as string}
                isValid={formData.taxNumber.state.isValid}
                errors={formData.taxNumber.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.name.name}
                value={formData.name.value}
                helper="Ketu duhet te vendosni targen e makines"
                placeholder={formData.name.placeholder as string}
                isValid={formData.name.state.isValid}
                errors={formData.name.state.errors}
              />
              <TextInput
                name={formFields.surname.name}
                value={formData.surname.value}
                placeholder={formData.surname.placeholder as string}
                isValid={formData.surname.state.isValid}
                errors={formData.surname.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.gender.name}
                value={formData.gender.value}
                placeholder={formData.gender.placeholder as string}
                isValid={formData.gender.state.isValid}
                errors={formData.gender.state.errors}
              />
              <TextInput
                name={formFields.birthday.name}
                value={formData.birthday.value}
                placeholder={formData.birthday.placeholder as string}
                helper="Ketu duhet te vendosni daten e fillimit"
                isValid={formData.birthday.state.isValid}
                errors={formData.birthday.state.errors}
                //style={{ paddingTop: 5, paddingBottom: 5 }}
              />
            </FormRow>
            <FormRow>
              <CheckboxInput
                text={formData.isOwnerDriver.placeholder as string}
                name={formFields.isOwnerDriver.name}
                value={formData.isOwnerDriver.value}
                onClick={(name: string, value: boolean) => {
                  onIsOwnerDriverChange(value);
                }}
                errors={formData.isOwnerDriver.state.errors}
              />
            </FormRow>
            {additionalPeopleForm.render}
          </FormBody>
        </Reveal>
      </div>
    );
  }
);
export default SecondForm;
