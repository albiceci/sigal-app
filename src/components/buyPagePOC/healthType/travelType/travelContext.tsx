import { createContext, useEffect, useRef, useState } from "react";

import { formFields as firstFormFields } from "../privateHealthType/firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { formFields as additionalPeopleFields } from "../../additionalPeopleForm/additionalPeopleFormTypes";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { PRODUCT_INFO } from "../../productConstants";
import { getErrorMessage } from "../../../../helper/getErrorMessage";
import { useTranslation } from "react-i18next";
import { roundToTwoDecimals } from "../../../../helper/roundToTwoDecimals";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(
  form1: typeof firstFormFields,
  form2: typeof secondFormFields,
  form3: typeof additionalPeopleFields,
) {
  return { ...form1, ...form2, ...form3 };
}

const combinedFormFields = mergeForms(
  firstFormFields,
  secondFormFields,
  JSON.parse(JSON.stringify(additionalPeopleFields)),
);

const travelContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const TravelContextProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(combinedFormFields);

  const hasMounted = useRef(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPremium = async () => {
    const body = {
      data: formData,
      productSiteId: PRODUCT_INFO.TRAVEL.productSiteId,
    };

    loadingOverlay.open(t("form.premiumOverlay.loading.title"), t("form.premiumOverlay.loading.subTitle"));

    const jsonData = await customFetch("/form/premium", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
      setFormData((prev) => {
        return {
          ...prev,
          destination: {
            ...prev.destination,
            value: "",
            state: {
              errors: [],
              isValid: false,
            },
          },
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          premium: {
            ...prev.premium,
            value: String(roundToTwoDecimals(jsonData.data.premiumGross)),
          },
          premiumCurrency: {
            ...prev.premiumCurrency,
            value: jsonData.data.premiumCurrency,
          },
        };
      });
    }
  };

  const removePremium = () => {
    if (formData.premium.value) {
      setFormData((prev) => {
        return {
          ...prev,
          premium: {
            ...prev.premium,
            value: "",
          },
          premiumCurrency: {
            ...prev.premiumCurrency,
            value: "",
          },
        };
      });
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      if (
        formData.templateId.value &&
        formData.begDate.state.isValid &&
        formData.endDate.state.isValid &&
        formData.destination.state.isValid &&
        formData.birthday.state.isValid &&
        formData.gender.state.isValid &&
        formData.flightCancel.state.isValid
      ) {
        getPremium();
      } else {
        removePremium();
      }
    } else {
      hasMounted.current = true; // Skip the first run
    }
  }, [
    formData.templateId.value,
    formData.begDate.value,
    formData.endDate.value,
    formData.gender.value,
    formData.birthday.value,
    formData.flightCancel.value,
    formData.destination.value,
  ]);
  // provider logic here
  return (
    <travelContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {loadingOverlay.render}
      {alerter.render}
      {children}
    </travelContext.Provider>
  );
};

export { travelContext, TravelContextProvider };
