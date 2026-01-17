import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { useForm } from "../../../../ui/form/useForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useAdditionalPeopleForm } from "../../../additionalPeopleForm/additionalPeopleForm";
import { mvlContext } from "../mvlContext";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof mvlContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const additionalPeopleForm = useAdditionalPeopleForm({
      product: props.product,
      keyword: "Drejtues",
      metadata: { limit: 2 },
    });

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
            {additionalPeopleForm.render}
          </FormBody>
        </Reveal>
      </div>
    );
  }
);
export default SecondForm;
