import { createContext, useState } from "react";

import { formFields as firstFormFields } from "./firstForm/firstFormTypes";
import { formFields as secondFormFields } from "./secondForm/secondFormTypes";
import { formFields as carSearchFormFields } from "../carSearchForm/carSearchFormTypes";
import { formFields as durationFormFields } from "../../durationForm/durationFormTypes";

import { FormInputs } from "../../../ui/form/types";

//////////JOIN ALL FIELDS ON THE FORMS//////////////////////

type CombinedFormFields<F1, F2, F3, F4> = F1 & F2 & F3 & F4;

function mergeForms<
  F1 extends FormInputs<any>,
  F2 extends FormInputs<any>,
  F3 extends FormInputs<any>,
  F4 extends FormInputs<any>
>(
  form1: F1,
  form2: F2,
  form3: F3,
  form4: F4
): CombinedFormFields<F1, F2, F3, F4> {
  return { ...form1, ...form2, ...form3, ...form4 };
}

const combinedFormFields = mergeForms(
  firstFormFields,
  secondFormFields,
  carSearchFormFields,
  durationFormFields
);

const tplContext = createContext<{
  formData: typeof combinedFormFields;
  setFormData: React.Dispatch<React.SetStateAction<typeof combinedFormFields>>;
}>({ formData: combinedFormFields, setFormData: () => {} });

const TplContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formData, setFormData] = useState(combinedFormFields);
  // provider logic here
  return (
    <tplContext.Provider
      value={{ formData: formData, setFormData: setFormData }}
    >
      {children}
    </tplContext.Provider>
  );
};

export { tplContext, TplContextProvider };
