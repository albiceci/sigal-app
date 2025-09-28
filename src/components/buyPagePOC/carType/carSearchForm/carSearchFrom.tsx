import { tplContext } from "../../carType/tplType/tplContext";
import { formFields } from "./carSearchFormTypes";
import { fieldsValidationObject } from "./carSearchFormTypes";

import { FormRow } from "../../../ui/form/formContainers/formRow";
import { useContext, useEffect, useState } from "react";
import { useValidator } from "../../../ui/form/validator/useValidator";
import { createPortal } from "react-dom";
import { useCarInfoForm } from "./carInfoForm/carInfoForm";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";
import { Button } from "../../../ui/button/button";
import { Overlay } from "../../../../util/overlay";
import { PRODUCT_DATA_TYPE } from "../../formConstants";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";

export const CarSearchForm = ({
  product,
  onSubmit,
}: {
  product: PRODUCT_DATA_TYPE;
  onSubmit: (value: boolean) => void;
}) => {
  const { formData, setFormData } = useContext(product.context as typeof tplContext);

  const [carFormStatus, setCarFormStatus] = useState(false);

  const carInfoForm = useCarInfoForm({
    onSubmit: onSubmit,
    onClose: () => {
      setCarFormStatus(false);
    },
  });
  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

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
    validateField(e.target.name as keyof typeof formFields, e.target.value, true);

    onSubmit(false);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  ///////////////CUSTOM FUNCTION////////////////////////////////////

  const updatePassThroughInfo = (jsonData: Record<keyof typeof formData, any>) => {
    (Object.keys(jsonData) as Array<keyof typeof formData>).forEach((field: keyof typeof formData) => {
      setFormData((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          value: jsonData[field],
        },
      }));
    });
  };

  const onVehicleSearch = async () => {
    const body = {
      licence: formData.licence.value,
      vin: formData.vin.value,
      productId: product.productId,
    };

    loadingOverlay.open(
      "Duke pergatitur te dhenat tuaja",
      "Ju lutem prisni teksa te dhenat tuaja procesohen nga sistemi. Faleminderit!"
    );

    const jsonData = await customFetch("/form/vehicleDetails", {
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
      carInfoForm.updateFormData(jsonData.data.carInfo);
      updatePassThroughInfo(jsonData.data.passThroughInfo);
      setCarFormStatus(true);
    }
  };

  return (
    <>
      {loadingOverlay.render}
      {alerter.render}
      <FormRow>
        {/* <SwitchInput
          fields={[formData.licence, formData.vin]}
          states={[formFieldsState["licence"], formFieldsState["vin"]]}
          onChange={(e) => {
            handleChange(e);
          }}
          onSubmit={onVehicleSearch}
        /> */}
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex gap-3 z-[2] translate-y-[1px]"></div>
          <div className="w-full bg-gray-50 p-4 border rounded-md z-[1] flex flex-col items-center justify-center gap-3">
            <FormRow>
              <TextInput
                name={formFields.licence.name}
                value={formData.licence.value}
                placeholder={formData.licence.placeholder as string}
                isValid={formFieldsState["licence"].isValid}
                onChange={(e) => {
                  handleChange(e);
                }}
                errors={formFieldsState["licence"].errors}
              />

              <TextInput
                name={formFields.vin.name}
                value={formData.vin.value}
                placeholder={formData.vin.placeholder as string}
                isValid={formFieldsState["vin"].isValid}
                onChange={(e) => {
                  handleChange(e);
                }}
                //errors={formFieldsState["vin"].errors}
              />
            </FormRow>

            <div>
              <Button
                buttonType="secondary"
                style={{
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
                icon={{
                  type: "lottie",
                  animationData: require("../../../../assets/lottie/icons/searchIconWhite.json"),
                  style: { height: 20, width: 20 },
                  placement: "before",
                }}
                disabled={!formFieldsState.licence.isValid && !formFieldsState.vin.isValid}
                onClick={() => {
                  if (formFieldsState.licence.isValid) {
                    onVehicleSearch();
                  }
                }}
              >
                Kerko
              </Button>
            </div>
          </div>
        </div>
      </FormRow>
      {carFormStatus ? <Overlay>{carInfoForm.render}</Overlay> : <></>}
    </>
  );
};
