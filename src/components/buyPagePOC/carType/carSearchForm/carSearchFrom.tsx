import { tplContext } from "../../carType/tplType/tplContext";
import { formFields } from "./carSearchFormTypes";
import { fieldsValidationObject } from "./carSearchFormTypes";

import { FormRow } from "../../../ui/form/formContainers/formRow";
import { useContext, useEffect } from "react";
import { useValidator } from "../../../ui/form/validator/useValidator";
import { createPortal } from "react-dom";
import { useCarInfoForm } from "./carInfoForm/carInfoForm";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";
import { Button } from "../../../ui/button/button";

type contextDicKeys = "tpl";

export const CarSearchForm = ({
  contextKey,
  setIsVehicleSelected,
}: {
  contextKey: contextDicKeys;
  setIsVehicleSelected: (value: boolean) => void;
}) => {
  const contextDict = {
    tpl: tplContext,
  };
  const { formData, setFormData } = useContext(contextDict[contextKey]);

  const carInfoForm = useCarInfoForm({ onSubmit: setIsVehicleSelected });
  const alerter = useAlerter();

  const pageContainer = document.getElementById("buyPageContainer");

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

    setIsVehicleSelected(false);
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

  const doFetch = async (url: string, body: any) => {
    var r = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    return await r.json();
  };

  const onVehicleSearch = async (name: string, value: string) => {
    const body = {
      name: name,
      value: value,
    };

    carInfoForm.setFromStatus("loading");

    const jsonData = await doFetch("https://fefefdba33d8.ngrok.app/getVehicle", body);

    if (jsonData.status !== 200) {
      carInfoForm.setFromStatus("closed");
      alerter.alertMessage({ description: null, message: jsonData.description, type: "error" });
    } else {
      carInfoForm.updateFormData(jsonData.data.carInfo);
      carInfoForm.setFromStatus("opened");

      updatePassThroughInfo(jsonData.data.passThroughInfo);
    }
  };

  return (
    <>
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
          <div className="w-full bg-gray-50 p-4 border rounded-md z-[1] flex flex-col items-center justify-center gap-1">
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
                errors={formFieldsState["vin"].errors}
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
                    onVehicleSearch(formFields.licence.name, formData.licence.value);
                  } else if (formFieldsState.vin.isValid) {
                    onVehicleSearch(formFields.vin.name, formData.vin.value);
                  }
                }}
              >
                Kerko
              </Button>
            </div>
          </div>
        </div>
      </FormRow>
      {pageContainer ? createPortal(carInfoForm.render, pageContainer) : null}
    </>
  );
};
