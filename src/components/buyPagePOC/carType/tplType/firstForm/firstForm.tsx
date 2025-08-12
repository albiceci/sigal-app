import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { tplContext } from "../tplContext";
import { CarSearchForm } from "../../carSearchForm/carSearchFrom";
import { useDurationForm } from "../../../durationForm/durationForm";

const FirstForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(tplContext);

  const durationForm = useDurationForm({
    productID: "00000000-e1fe-43e2-85cd-439ac4c6a857",
  });

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(formFields) as Array<keyof typeof formFields>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formFields[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields,
    validationRules: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof typeof formFields],
          value: e.target.value,
        },
      };
    });
    validateField(
      e.target.name as keyof typeof formFields,
      e.target.value,
      true
    );
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
    durationForm.runValidation(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  useEffect(() => {
    updateCheckbox("durationCompleted", durationForm.isValid, false);
  }, [durationForm.isValid]);

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid:
      (
        Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
      ).filter((field) => !formFieldsState[field].isValid).length ||
      !durationForm.isValid
        ? false
        : true,
  }));

  //////////////////////CUSTOM FUNCTIONS/////////////////////////////////////

  const updateCheckbox = (
    name: keyof typeof formFields,
    value: boolean,
    showErrors: boolean
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value: value,
        },
      };
    });
    validateField(name, value, showErrors);
  };

  const updateSelectedVehicle = (value: boolean) => {
    updateCheckbox("vehicleSelected", value, true);
  };

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          {formFieldsState.vehicleSelected.errors.length ? (
            <div className="flex flex-col px-1">
              {formFieldsState.vehicleSelected.errors.map((error) => {
                return (
                  <span className="text-red-400 font-semibold text-sm">
                    &#x25cf; {error}
                  </span>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <CarSearchForm
            contextKey="tpl"
            setIsVehicleSelected={updateSelectedVehicle}
          />
          {durationForm.render}
        </FormBody>
      </Reveal>
    </div>
  );
});

export default FirstForm;
