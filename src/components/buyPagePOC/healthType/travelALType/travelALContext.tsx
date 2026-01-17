import { createContext, useState } from "react";

import { formFields as firstFormFields } from "../privateHealthType/firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { formFields as additionalPeopleFields } from "../../additionalPeopleForm/additionalPeopleFormTypes";

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

const travelALContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const TravelALContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <travelALContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {children}
    </travelALContext.Provider>
  );
};

export { travelALContext, TravelALContextProvider };
