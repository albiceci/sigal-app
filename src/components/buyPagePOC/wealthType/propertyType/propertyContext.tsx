import { createContext, useState } from "react";

import { formFields as firstFormFields } from "./firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";

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
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <propertyContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {children}
    </propertyContext.Provider>
  );
};

export { propertyContext, PropertyContextProvider };
