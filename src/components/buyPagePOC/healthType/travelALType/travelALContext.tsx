import { createContext, useState } from "react";

import { formFields as firstFormFields } from "./firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";

import { FormInputs } from "../../../ui/form/types";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

type CombinedFormFields<F1, F2> = F1 & F2;

function mergeForms<F1 extends FormInputs<any>, F2 extends FormInputs<any>>(
  form1: F1,
  form2: F2
): CombinedFormFields<F1, F2> {
  return { ...form1, ...form2 };
}

const combinedFormFields = mergeForms(firstFormFields, secondFormFields);

const travelALContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const TravelALContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <travelALContext.Provider
      value={{ formData: formData, setFormData: setFormData }}
    >
      {children}
    </travelALContext.Provider>
  );
};

export { travelALContext, TravelALContextProvider };
