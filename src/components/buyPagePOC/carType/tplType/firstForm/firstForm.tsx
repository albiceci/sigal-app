import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { tplContext } from "../tplContext";
import { CarSearchForm } from "../../carSearchForm/carSearchFrom";
import { useDurationForm } from "../../../durationForm/durationForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { Premium } from "../../../premium/premium";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { useForm } from "../../../../ui/form/useForm";
import { useTranslation } from "react-i18next";

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { t } = useTranslation();

    const { formData, setFormData } = useContext(props.product.context as typeof tplContext);

    const durationForm = useDurationForm({
      product: props.product,
    });

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
    };

    useEffect(() => {
      runValidation(false);
    }, []);

    useEffect(() => {
      formHook.changeFieldValue({
        name: "durationCompleted",
        value: durationForm.isValid,
        showErrors: false,
      });
    }, [durationForm.isValid]);

    useImperativeHandle(ref, () => ({
      runValidation: runValidation,
      isValid: formHook.isValid,
    }));

    //////////////////////CUSTOM FUNCTIONS/////////////////////////////////////

    const updateSelectedVehicle = (value: boolean) => {
      formHook.changeFieldValue({
        name: "vehicleSelected",
        value: value,
        showErrors: true,
      });

      //Removed additional drivers if the vehicle changes
      setFormData((prev) => {
        return {
          ...prev,
          additionalPeople: {
            ...prev["additionalPeople"],
            value: [],
          },
          isOwnerDriver: {
            ...prev["isOwnerDriver"],
            value: false,
          },
        };
      });
    };

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            {formData.vehicleSelected.state.errors.length ? (
              <div className="flex flex-col px-1">
                {formData.vehicleSelected.state.errors.map((error) => {
                  return <span className="text-red-400 font-semibold text-sm">&#x25cf; {t(error)}</span>;
                })}
              </div>
            ) : (
              ""
            )}
            <CarSearchForm product={props.product} onSubmit={updateSelectedVehicle} />
            {durationForm.render}
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

export default FirstForm;
