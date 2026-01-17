import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import { useServer } from "../../../../../util/useServer";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { Premium } from "../../../premium/premium";
import { useDurationForm } from "../../../durationForm/durationForm";
import { antiTumorContext } from "../antiTumorContext";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof antiTumorContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const durationForm = useDurationForm({
      product: props.product,
    });

    const loadingOverlay = useLoadingOverlay();
    const alerter = useAlerter();

    ///////////////VALIDATION HOOK/////////////////////////////////////

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid && durationForm.isValid,
    }));

    return (
      <div>
        {loadingOverlay.render}
        {alerter.render}
        <Reveal width="100%" delay={0}>
          <FormBody>
            {durationForm.render}
            <FormRow>
              <SelectInput
                placeholder={formData.coverage.placeholder as string}
                name={formData.coverage.name}
                value={formData.coverage.value}
                isValid={formData.coverage.state.isValid}
                options={[
                  { id: "5000", text: "EUR 5000" },
                  { id: "10000", text: "EUR 10000" },
                  { id: "15000", text: "EUR 15000" },
                  { id: "20000", text: "EUR 20000" },
                ]}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "coverage",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData.coverage.state.errors}
              />
            </FormRow>
            <FormRow>
              <></>
            </FormRow>
            <FormRow>
              <Premium value={formData.premium.value} currency={formData.premiumCurrency.value} />
            </FormRow>
          </FormBody>
        </Reveal>
      </div>
    );
  }
);

export default SecondForm;
