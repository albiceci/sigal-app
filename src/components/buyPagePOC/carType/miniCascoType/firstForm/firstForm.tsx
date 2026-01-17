import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { CarSearchForm } from "../../carSearchForm/carSearchFrom";
import { useDurationForm } from "../../../durationForm/durationForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { Premium } from "../../../premium/premium";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { useForm } from "../../../../ui/form/useForm";
import { miniCascoContext } from "../miniCascoContext";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { PRODUCT_INFO } from "../../../productConstants";
import { InfoNotes } from "../../../../common/infoNotes/infoNotes";
import { useTranslation } from "react-i18next";

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof miniCascoContext);

    const { t } = useTranslation();

    const durationForm = useDurationForm({
      product: props.product,
      showEndDate: false,
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
              <InfoNotes text={t("form.minicasco.endDateDisclaimer")} />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.parentPolicyProductId.placeholder as string}
                name={formData.parentPolicyProductId.name}
                value={formData.parentPolicyProductId.value}
                isValid={formData.parentPolicyProductId.state.isValid}
                options={[{ id: PRODUCT_INFO["TPL"].productId, text: PRODUCT_INFO["TPL"].name }]}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "parentPolicyProductId",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData.parentPolicyProductId.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.parentPolicySerial.name}
                value={formData.parentPolicySerial.value}
                //helper="Ketu duhet te vendosni siperfaqen e prones"
                placeholder={formData.parentPolicySerial.placeholder as string}
                isValid={formData.parentPolicySerial.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.parentPolicySerial.state.errors}
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

export default FirstForm;
