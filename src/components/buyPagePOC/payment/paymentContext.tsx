import { createContext, useState } from "react";

import { formFields as paymentFormFields } from "../payment/paymentForm/paymentFormTypes";

import { FormInputs } from "../../ui/form/types";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

type CombinedFormFields<F1> = F1;

function mergeForms<F1 extends FormInputs<any>>(
  form1: F1
): CombinedFormFields<F1> {
  return { ...form1 };
}

const combinedFormFields = mergeForms(paymentFormFields);

const paymentContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const PaymentContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <paymentContext.Provider
      value={{ formData: formData, setFormData: setFormData }}
    >
      {children}
    </paymentContext.Provider>
  );
};

export { paymentContext, PaymentContextProvider };
