import { createContext, useState } from "react";

import { formFields as firstFormFields } from "../privateHealthType/firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { formFields as durationFormFields } from "../../durationForm/durationFormTypes";
import { formFields as additionalPeopleFields } from "../../additionalPeopleForm/additionalPeopleFormTypes";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

function mergeForms(
  form1: typeof firstFormFields,
  form2: typeof secondFormFields,
  form3: typeof durationFormFields,
  form4: typeof additionalPeopleFields
) {
  return { ...form1, ...form2, ...form3, ...form4 };
}

const combinedFormFields = mergeForms(
  firstFormFields,
  secondFormFields,
  durationFormFields,
  JSON.parse(JSON.stringify(additionalPeopleFields))
);

const teleHealthContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const TeleHealthContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <teleHealthContext.Provider value={{ formData: formData, setFormData: setFormData }}>
      {children}
    </teleHealthContext.Provider>
  );
};

export { teleHealthContext, TeleHealthContextProvider };
