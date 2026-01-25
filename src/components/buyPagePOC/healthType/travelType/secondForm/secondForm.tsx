import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject, destinationsData, templateIdData } from "./secondFormTypes";
import { travelContext } from "../travelContext";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import { Premium } from "../../../premium/premium";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { Button } from "../../../../ui/button/button";
import { useTranslation } from "react-i18next";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const { formData, setFormData } = useContext(props.product.context as typeof travelContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    ///////////////VALIDATION HOOK/////////////////////////////////////

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid,
    }));

    useEffect(() => {
      if (!formData.flightCancel.value) {
        setFormData((prev) => {
          return {
            ...prev,
            flightConfirmationDate: {
              ...prev["flightConfirmationDate"],
              state: {
                isValid: true,
                errors: [],
              },
            },
          };
        });
      } else {
        formHook.changeFieldValue({
          name: "flightConfirmationDate",
          value: formData.flightConfirmationDate.value,
          showErrors: true,
        });
      }
    }, [formData.flightCancel.value]);

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormRow>
              <SelectInput
                placeholder={formData.destination.placeholder as string}
                name={formData.destination.name}
                value={formData.destination.value}
                isValid={formData["destination"].state.isValid}
                options={destinationsData}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "destination",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData["destination"].state.errors}
              />
            </FormRow>
            <FormRow>
              <DateInput
                name={formFields.begDate.name}
                value={formData.begDate.value}
                placeholder={formData.begDate.placeholder as string}
                isValid={formData["begDate"].state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                selfState={true}
                errors={formData["begDate"].state.errors}
                min={(() => {
                  if (
                    props.product.config &&
                    props.product.config.beginDate &&
                    props.product.config.beginDate.minValue !== undefined
                  ) {
                    const currentDate = new Date();

                    currentDate.setDate(currentDate.getDate() + props.product.config.beginDate.minValue);

                    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
                      2,
                      "0",
                    )}-${String(currentDate.getDate()).padStart(2, "0")}`;
                  }
                  return undefined;
                })()}
              />
              <DateInput
                name={formFields.endDate.name}
                value={formData.endDate.value}
                placeholder={formData.endDate.placeholder as string}
                isValid={formData["endDate"].state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                selfState={true}
                errors={formData["endDate"].state.errors}
                min={(() => {
                  if (formData.begDate.value) {
                    const currentDate = new Date(formData.begDate.value);

                    currentDate.setDate(currentDate.getDate() + 1);

                    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
                      2,
                      "0",
                    )}-${String(currentDate.getDate()).padStart(2, "0")}`;
                  }
                  return undefined;
                })()}
              />
            </FormRow>
            <FormRow>
              <div className="w-full flex items-center justify-center">
                <div>
                  {formData.flightCancel.value ? (
                    <Button
                      buttonType="secondaryAlt"
                      style={{
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                      onClick={() => {
                        formHook.changeFieldValue({
                          name: "flightCancel",
                          value: false,
                        });
                      }}
                    >
                      {t("form.flightCancel.remove")}
                    </Button>
                  ) : (
                    <Button
                      buttonType="secondary"
                      style={{
                        paddingTop: 4,
                        paddingBottom: 4,
                      }}
                      onClick={() => {
                        formHook.changeFieldValue({
                          name: "flightCancel",
                          value: true,
                        });
                      }}
                    >
                      {t("form.flightCancel.add")}
                    </Button>
                  )}
                </div>
              </div>
            </FormRow>
            {formData.flightCancel.value ? (
              <div className="flex gap-3">
                <SelectInput
                  placeholder={formData.templateId.placeholder as string}
                  name={formData.templateId.name}
                  value={formData.templateId.value}
                  isValid={formData["templateId"].state.isValid}
                  options={templateIdData}
                  onOptionChange={(name: string, value: string) => {
                    formHook.changeFieldValue({
                      name: "templateId",
                      value: value,
                      showErrors: true,
                    });
                  }}
                  errors={formData["templateId"].state.errors}
                />
                <DateInput
                  name={formFields.flightConfirmationDate.name}
                  value={formData.flightConfirmationDate.value}
                  helper="Ketu duhet te vendosni daten e mbarimit te udhetimit"
                  placeholder={formData.flightConfirmationDate.placeholder as string}
                  isValid={formData["flightConfirmationDate"].state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData["flightConfirmationDate"].state.errors}
                />
              </div>
            ) : (
              <></>
            )}

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
  },
);

export default SecondForm;
