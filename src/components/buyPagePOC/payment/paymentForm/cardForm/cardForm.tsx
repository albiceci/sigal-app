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

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

export const cardFormFields: FormInputs<{
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
  },
  cardNumber: {
    name: "cardNumber",
    placeholder: "Card Number",
    type: "text",
    value: "",
  },
  cardHolderName: {
    name: "cardHolderName",
    placeholder: "Holder Name",
    type: "text",
    value: "",
  },
  cardMonth: {
    name: "cardMonth",
    placeholder: "Month",
    type: "text",
    value: "",
  },
  cardYear: {
    name: "cardYear",
    placeholder: "Year",
    type: "text",
    value: "",
  },
  cardCVV: {
    name: "cardCVV",
    placeholder: "CVV",
    type: "text",
    value: "",
  },
};

const cardFromFieldValidationRules: fieldValidationRules<keyof typeof cardFormFields> = {
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
  initialState?: {
    [K in keyof typeof cardFormFields]: string | null;
  };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cardInfo: typeof cardFormFields) => void;
}) => {
  const getInitialState = () => {
    if (initialState) {
      (Object.keys(initialState) as Array<keyof typeof initialState>).forEach((field) => {
        cardFormFields[field].value = initialState[field] !== null ? (initialState[field] as string) : "";
      });
      return cardFormFields;
    } else {
      return cardFormFields;
    }
  };

  const [formData, setFormData] = useState(getInitialState());
  const [isValid, setIsValid] = useState(false);

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(cardFormFields) as Array<keyof typeof cardFormFields>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...cardFormFields[v], value: formData[v].value },
      }),
      {}
    ) as typeof cardFormFields,
    validationRules: cardFromFieldValidationRules,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof typeof cardFormFields],
          value: e.target.value,
        },
      };
    });
    validateField(e.target.name as keyof typeof cardFormFields, e.target.value, true);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useEffect(() => {
    validateForm(false);
  }, []);

  useEffect(() => {
    setIsValid((prev) => {
      return (Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>).filter(
        (field) => !formFieldsState[field].isValid
      ).length
        ? false
        : true;
    });
  }, [formFieldsState]);

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
                  name={cardFormFields.cardNumber.name}
                  placeholder={cardFormFields.cardNumber.placeholder as string}
                  value={formData.cardNumber.value}
                  isValid={formFieldsState["cardNumber"].isValid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  errors={formFieldsState["cardNumber"].errors}
                />
              </FormRow>
              <FormRow>
                <TextInput
                  name={cardFormFields.cardMonth.name}
                  placeholder={cardFormFields.cardMonth.placeholder as string}
                  value={formData.cardMonth.value}
                  isValid={formFieldsState["cardMonth"].isValid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  errors={formFieldsState["cardMonth"].errors}
                />
                <TextInput
                  name={cardFormFields.cardYear.name}
                  placeholder={cardFormFields.cardYear.placeholder as string}
                  value={formData.cardYear.value}
                  isValid={formFieldsState["cardYear"].isValid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  errors={formFieldsState["cardYear"].errors}
                />
                <TextInput
                  name={cardFormFields.cardCVV.name}
                  placeholder={cardFormFields.cardCVV.placeholder as string}
                  value={formData.cardCVV.value}
                  isValid={formFieldsState["cardCVV"].isValid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  errors={formFieldsState["cardCVV"].errors}
                />
              </FormRow>
              <FormRow>
                <TextInput
                  name={cardFormFields.cardHolderName.name}
                  placeholder={cardFormFields.cardHolderName.placeholder as string}
                  value={formData.cardHolderName.value}
                  isValid={formFieldsState["cardHolderName"].isValid}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  errors={formFieldsState["cardHolderName"].errors}
                />
              </FormRow>
            </FormBody>
          </div>
          <div className="flex-grow flex items-center justify-center pb-6">
            <div className="w-fit">
              <Button
                buttonType="secondary"
                disabled={isValid ? false : true}
                onClick={() => {
                  if (isValid) {
                    onSubmit(formData);
                    onClose();
                  } else {
                    validateForm(true);
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
                    Kompania SIGAL UNIQA Group AUSTRIA nuk do të përdorë të dhënat tuaja personale për qëllime të tjera
                    përveç atyre te sigurimit të ofruar. Më shumë informacion rreth përpunimit të të dhënave personale
                    në UNIQA, a.s. mund të gjenden në përpunimin www.sigal.com.al/privacy të dhënave personale.
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
