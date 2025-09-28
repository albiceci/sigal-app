import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { tplContext } from "../tplContext";
import { CarSearchForm } from "../../carSearchForm/carSearchFrom";
import { useDurationForm } from "../../../durationForm/durationForm";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useServer } from "../../../../../util/useServer";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { Premium } from "../../../premium/premium";
import { FormRow } from "../../../../ui/form/formContainers/formRow";

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const hasMounted = useRef(false);

    const { formData, setFormData } = useContext(props.product.context as typeof tplContext);

    const customFetch = useServer();
    const loadingOverlay = useLoadingOverlay();
    const alerter = useAlerter();

    const durationForm = useDurationForm({
      product: props.product,
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

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   setFormData((prev) => {
    //     return {
    //       ...prev,
    //       [e.target.name]: {
    //         ...prev[e.target.name as keyof typeof formFields],
    //         value: e.target.value,
    //       },
    //     };
    //   });
    //   validateField(e.target.name as keyof typeof formFields, e.target.value, true);
    // };

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
        (Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>).filter(
          (field) => !formFieldsState[field].isValid
        ).length || !durationForm.isValid
          ? false
          : true,
    }));

    //////////////////////CUSTOM FUNCTIONS/////////////////////////////////////

    const updateCheckbox = (name: keyof typeof formFields, value: boolean, showErrors: boolean) => {
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

    const getPremium = async () => {
      console.log(formData);
      const body = {
        data: formData,
        productId: props.product.productId,
      };

      loadingOverlay.open("Please wait", "Calculation premium...");

      const jsonData = await customFetch("/form/premium", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      loadingOverlay.close();

      if (jsonData.status !== 200) {
        alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
      } else {
        setFormData((prev) => {
          return {
            ...prev,
            premium: {
              ...prev.premium,
              value: jsonData.data.premiumGross,
            },
          };
        });
        //window.location.href = "/";
        //alerter.alertMessage("Success");
      }
    };

    useEffect(() => {
      if (hasMounted.current) {
        if (formData.vehicleSelected.value === true && formData.durationId.value && formData.durationId.value !== "") {
          getPremium();
        }
      } else {
        hasMounted.current = true; // Skip the first run
        console.log("Has Mounted");
      }
    }, [formData.durationId.value, formData.vehicleSelected.value]);

    return (
      <div>
        {loadingOverlay.render}
        {alerter.render}
        <Reveal width="100%" delay={0}>
          <FormBody>
            {formFieldsState.vehicleSelected.errors.length ? (
              <div className="flex flex-col px-1">
                {formFieldsState.vehicleSelected.errors.map((error) => {
                  return <span className="text-red-400 font-semibold text-sm">&#x25cf; {error}</span>;
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
              <Premium value={formData.premium.value} />
            </FormRow>
          </FormBody>
        </Reveal>
      </div>
    );
  }
);

export default FirstForm;
