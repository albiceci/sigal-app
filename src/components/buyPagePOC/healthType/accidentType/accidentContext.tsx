import { createContext, useEffect, useRef, useState } from "react";

import { formFields as firstFormFields } from "./firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { formFields as additionalPeopleFields } from "../../additionalPeopleForm/additionalPeopleFormTypes";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { PRODUCT_INFO } from "../../productConstants";
import { getErrorMessage } from "../../../../helper/getErrorMessage";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(
  form1: typeof firstFormFields,
  form2: typeof secondFormFields,
  form3: typeof additionalPeopleFields
) {
  return { ...form1, ...form2, ...form3 };
}

const combinedFormFields = mergeForms(
  firstFormFields,
  secondFormFields,
  JSON.parse(JSON.stringify(additionalPeopleFields))
);

const accidentContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: JSON.parse(JSON.stringify(combinedFormFields)), setFormData: () => {} });

const AccidentContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here

  const hasMounted = useRef(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPremium = async () => {
    const body = {
      data: formData,
      productSiteId: PRODUCT_INFO.ACCIDENT.productSiteId,
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
      if (
        formData.templateId.value &&
        formData.begDate.state.isValid &&
        formData.endDate.state.isValid &&
        formData.name.state.isValid &&
        formData.surname.state.isValid &&
        formData.birthday.state.isValid &&
        formData.gender.state.isValid &&
        formData.taxNumber.state.isValid &&
        formData.profession.state.isValid &&
        formData.coverage.state.isValid
      ) {
        getPremium();
      }
    } else {
      hasMounted.current = true; // Skip the first run
    }
  }, [
    formData.templateId.value,
    formData.begDate.value,
    formData.endDate.value,
    formData.additionalPeople.value,
    formData.gender.value,
    formData.birthday.value,
    formData.profession.value,
    formData.coverage.value,
    formData.name.state.isValid,
    formData.surname.state.isValid,
    formData.taxNumber.state.isValid,
  ]);
  return (
    <accidentContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {loadingOverlay.render}
      {alerter.render}
      {children}
    </accidentContext.Provider>
  );
};

export { accidentContext, AccidentContextProvider };
