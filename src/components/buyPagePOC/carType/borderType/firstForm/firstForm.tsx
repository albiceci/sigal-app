import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { useForm } from "../../../../ui/form/useForm";
import { useDurationForm } from "../../../durationForm/durationForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useVehicleForm } from "../vehicleForm/vehicleForm";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { Premium } from "../../../premium/premium";
import { borderContext } from "../borderContext";

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref,
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof borderContext);

    const durationForm = useDurationForm({
      product: props.product,
    });

    const vehicleForm = useVehicleForm({
      product: props.product,
    });

    ///////////////VALIDATION HOOK/////////////////////////////////////
    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    const runValidation = (showErrors: boolean) => {
      formHook.validateForm(showErrors);
      durationForm.runValidation(showErrors);
      vehicleForm.runValidation(showErrors);
    };

    useEffect(() => {
      runValidation(false);
    }, []);

    useEffect(() => {
      formHook.changeFieldValue({
        name: "vehicleSelected",
        value: vehicleForm.isValid,
        showErrors: false,
      });
    }, [vehicleForm.isValid]);

    useImperativeHandle(ref, () => ({
      runValidation: runValidation,
      isValid: formHook.isValid && durationForm.isValid,
    }));

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            {vehicleForm.render}
            {durationForm.render}
            <FormRow>
              <Premium value={formData.premium.value} currency={formData.premiumCurrency.value} />
            </FormRow>
          </FormBody>
        </Reveal>
      </div>
    );
  },
);

export default FirstForm;
