import { tplContext } from "../../carType/tplType/tplContext";
import { formFields } from "./carSearchFormTypes";
import { fieldsValidationObject } from "./carSearchFormTypes";

import { FormRow } from "../../../ui/form/formContainers/formRow";
import { useContext, useState } from "react";
import { useCarInfoForm } from "./carInfoForm/carInfoForm";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";
import { Button } from "../../../ui/button/button";
import { Overlay } from "../../../../util/overlay";
import { PRODUCT_DATA_TYPE } from "../../formConstants";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useForm } from "../../../ui/form/useForm";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../../../helper/getErrorMessage";

export const CarSearchForm = ({
  product,
  onSubmit,
}: {
  product: PRODUCT_DATA_TYPE;
  onSubmit: (value: boolean) => void;
}) => {
  const { formData, setFormData } = useContext(product.context as typeof tplContext);
  const { t } = useTranslation();

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

  ///////////////FORM HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formHook.handleInputChange(e);

    onSubmit(false);
  };

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
      productSiteId: product.productSiteId,
    };

    loadingOverlay.open(t("form.carSearchForm.loading.title"), t("form.carSearchForm.loading.subTitle"));

    const jsonData = await customFetch("/form/vehicleDetails", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
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
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex gap-3 z-[2] translate-y-[1px]"></div>
          <div className="w-full bg-gray-50 p-4 border rounded-md z-[1] flex flex-col items-center justify-center gap-3">
            <FormRow>
              <TextInput
                name={formFields.licence.name}
                value={formData.licence.value}
                placeholder={formData.licence.placeholder as string}
                isValid={formData.licence.state.isValid}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  handleChange(e);
                }}
                errors={formData.licence.state.errors}
              />

              <TextInput
                name={formFields.vin.name}
                value={formData.vin.value}
                placeholder={formData.vin.placeholder as string}
                isValid={formData.vin.state.isValid}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
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
                disabled={!formData.licence.state.isValid && !formData.vin.state.isValid}
                onClick={() => {
                  if (formData.licence.state.isValid) {
                    onVehicleSearch();
                  }
                }}
              >
                {t("form.carSearchForm.search")}
              </Button>
            </div>
          </div>
        </div>
      </FormRow>
      {carFormStatus && carInfoForm.render}
    </>
  );
};
