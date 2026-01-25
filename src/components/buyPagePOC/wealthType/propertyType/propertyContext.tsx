import { createContext, useEffect, useRef, useState } from "react";

import { formFields as firstFormFields } from "./firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { getErrorMessage } from "../../../../helper/getErrorMessage";
import { PRODUCT_INFO } from "../../productConstants";
import { useTranslation } from "react-i18next";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { roundToTwoDecimals } from "../../../../helper/roundToTwoDecimals";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(form1: typeof firstFormFields, form2: typeof secondFormFields) {
  return { ...form1, ...form2 };
}

const combinedFormFields = mergeForms(firstFormFields, secondFormFields);

const propertyContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const PropertyContextProvider = ({ children }: { children: JSX.Element }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(combinedFormFields);

  const hasMounted = useRef(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPremium = async () => {
    const body = {
      data: {
        ...formData,
        fileUploads: {
          ...formData.fileUploads,
          value: [],
        },
      },
      productSiteId: PRODUCT_INFO.PROPERTY.productSiteId,
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

  const removePremium = async () => {
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
  };

  useEffect(() => {
    if (hasMounted.current) {
      if (formData.insuredSum.state.isValid && formData.customTemplateId.value) {
        getPremium();
      } else {
        removePremium();
      }
    } else {
      hasMounted.current = true; // Skip the first run
    }
  }, [formData.insuredSum.value, formData.customTemplateId.value]);
  return (
    <propertyContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {loadingOverlay.render}
      {alerter.render}
      {children}
    </propertyContext.Provider>
  );
};

export { propertyContext, PropertyContextProvider };
