import { createContext, useEffect, useRef, useState } from "react";

import { formFields as firstFormFields } from "../tplType/firstForm/firstFormTypes";
import { formFields as secondFormFields } from "../tplType/secondForm/secondFormTypes";
import { formFields as carSearchFormFields } from "../carSearchForm/carSearchFormTypes";
import { formFields as durationFormFields } from "../../durationForm/durationFormTypes";
import { formFields as additionalPeopleFields } from "../../additionalPeopleForm/additionalPeopleFormTypes";
import { PRODUCT_INFO } from "../../productConstants";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../../helper/getErrorMessage";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(
  form1: typeof firstFormFields,
  form2: typeof secondFormFields,
  form3: typeof carSearchFormFields,
  form4: typeof durationFormFields,
  form5: typeof additionalPeopleFields
) {
  return { ...form1, ...form2, ...form3, ...form4, ...form5 };
}

const combinedFormFields = mergeForms(
  firstFormFields,
  secondFormFields,
  carSearchFormFields,
  durationFormFields,
  additionalPeopleFields
);

const cascoContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const CascoContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);

  const hasMounted = useRef(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPremium = async () => {
    const body = {
      data: formData,
      productSiteId: PRODUCT_INFO.CASCO.productSiteId,
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
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          premium: {
            ...prev.premium,
            value: jsonData.data.premiumGross,
          },
          premiumCurrency: {
            ...prev.premiumCurrency,
            value: jsonData.data.premiumCurrency,
          },
        };
      });
    }
  };

  useEffect(() => {
    if (hasMounted.current) {
      if (formData.vehicleSelected.value === true && formData.durationId.value) {
        getPremium();
      }
    } else {
      hasMounted.current = true; // Skip the first run
    }
  }, [formData.durationId.value, formData.vehicleSelected.value]);

  // provider logic here
  return (
    <cascoContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {loadingOverlay.render}
      {alerter.render}
      {children}
    </cascoContext.Provider>
  );
};

export { cascoContext, CascoContextProvider };
