import { createContext, useState } from "react";

import { formFields as paymentFormFields } from "../payment/paymentForm/paymentFormTypes";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(form1: typeof paymentFormFields) {
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
    <paymentContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {children}
    </paymentContext.Provider>
  );
};

export { paymentContext, PaymentContextProvider };
