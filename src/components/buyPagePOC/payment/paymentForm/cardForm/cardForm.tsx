import { Suspense, useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../../../ui/form/types";
import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import React from "react";
import { FormDisclaimer } from "../../../../ui/form/formContainers/formDisclaimer";
import { Reveal } from "../../../../../util/reveal";
import { Button } from "../../../../ui/button/button";
import { useForm } from "../../../../ui/form/useForm";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

export const formFields: FormInputs<{
  cardId: InputField<"text">;
  cardNumber: InputField<"text">;
  cardHolderName: InputField<"text">;
  cardMonth: InputField<"text">;
  cardYear: InputField<"text">;
  cardCVV: InputField<"text">;
}> = {
  cardId: {
    name: "cardId",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  cardNumber: {
    name: "cardNumber",
    placeholder: "Card Number",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  cardHolderName: {
    name: "cardHolderName",
    placeholder: "Holder Name",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  cardMonth: {
    name: "cardMonth",
    placeholder: "Month",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  cardYear: {
    name: "cardYear",
    placeholder: "Year",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  cardCVV: {
    name: "cardCVV",
    placeholder: "CVV",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  cardId: [],
  cardNumber: [
    {
      type: "REGEX",
      value: /^\d{16}$$/g,
      error: "Ju lutem fusni numrin e sakte te kartes",
    },
  ],
  cardHolderName: [],
  cardMonth: [
    {
      type: "REGEX",
      value: /^\d{2}$/g,
      error: "Muaji duhet te kete formating MM",
    },
  ],
  cardYear: [
    {
      type: "REGEX",
      value: /^\d{2}$/g,
      error: "Viti duhet te kete formatin YY",
    },
  ],
  cardCVV: [
    {
      type: "REGEX",
      value: /^\d{3}$/g,
      error: "CVV nuk eshte ne formatin e duhur",
    },
  ],
};

export const CardForm = ({
  initialState,
  isOpen,
  onClose,
  onSubmit,
}: {
  initialState: typeof formFields;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardInfo: typeof formFields) => void;
}) => {
  const getInitialState = () => {
    if (initialState) {
      return formFields;
    } else {
      return formFields;
    }
  };

  const [formData, setFormData] = useState(getInitialState());

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  return (
    <div className={`w-full h-full absolute flex items-center justify-center z-[5] ${isOpen ? "" : "hidden"}`}>
      <div className="absolute h-full w-full bg-presetgray opacity-50 z-[-1] blur-lg"></div>
      <Reveal width="fit-content" height="fit-content">
        <div className="w-[100vw] sm:w-[85vw] md:w-[71vw] lg:w-[51vw] rounded-md bg-white shadow-lg">
          <div className="text-primary py-3 flex justify-between items-center border-b px-6">
            <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
              <div className="h4 font-semibold">CARD INFORMATION</div>
              <div className="flex gap-2 text-white bg-primary p-1 px-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className=""
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="text-xs font-semibold p-0">Te Dhenat e Enkriptuara</span>
              </div>
            </div>
            <div onClick={onClose} className="cursor-pointer text-white bg-primary rounded-full hover:bg-primarysub">
              <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
                <IoClose size={"25"} />
              </Suspense>
            </div>
          </div>
          <div className="px-6">
            <FormBody>
              <FormRow>
                <FormDisclaimer style={{ display: "flex", alignItems: "center" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-[17px] h-[17px] min-w-[17px] min-h-[17px]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <span className="w-fit">Detajet e te dhenave tuaja jane te sigurta dhe te enkriptuara</span>
                </FormDisclaimer>
              </FormRow>
              <FormRow>
                <TextInput
                  name={formFields.cardNumber.name}
                  placeholder={formFields.cardNumber.placeholder as string}
                  value={formData.cardNumber.value}
                  isValid={formData.cardNumber.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.cardNumber.state.errors}
                />
              </FormRow>
              <FormRow>
                <TextInput
                  name={formFields.cardMonth.name}
                  placeholder={formFields.cardMonth.placeholder as string}
                  value={formData.cardMonth.value}
                  isValid={formData.cardMonth.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.cardMonth.state.errors}
                />
                <TextInput
                  name={formFields.cardYear.name}
                  placeholder={formFields.cardYear.placeholder as string}
                  value={formData.cardYear.value}
                  isValid={formData.cardYear.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.cardYear.state.errors}
                />
                <TextInput
                  name={formFields.cardCVV.name}
                  placeholder={formFields.cardCVV.placeholder as string}
                  value={formData.cardCVV.value}
                  isValid={formData.cardCVV.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.cardCVV.state.errors}
                />
              </FormRow>
              <FormRow>
                <TextInput
                  name={formFields.cardHolderName.name}
                  placeholder={formFields.cardHolderName.placeholder as string}
                  value={formData.cardHolderName.value}
                  isValid={formData.cardHolderName.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.cardHolderName.state.errors}
                />
              </FormRow>
            </FormBody>
          </div>
          <div className="flex-grow flex items-center justify-center pb-6">
            <div className="w-fit">
              <Button
                buttonType="secondary"
                disabled={formHook.isValid ? false : true}
                onClick={() => {
                  if (formHook.isValid) {
                    onSubmit(formData);
                    onClose();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <div className="px-6">
            <FormBody>
              <FormRow>
                <FormDisclaimer>
                  <div className="text-center">
                    Kompania SIGAL IG nuk do të përdorë të dhënat tuaja personale për qëllime të tjera përveç atyre te
                    sigurimit të ofruar. Më shumë informacion rreth përpunimit të të dhënave personale në SIGAL IG, a.s.
                    mund të gjenden në përpunimin www.sigal.com.al/privacy të dhënave personale.
                  </div>
                </FormDisclaimer>
              </FormRow>
            </FormBody>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
