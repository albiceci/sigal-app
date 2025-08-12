import {
  forwardRef,
  Suspense,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useValidator } from "../../../ui/form/validator/useValidator";
import { FormBody } from "../../../ui/form/formContainers/formBody";
import React from "react";
import { createPortal } from "react-dom";
import { PaymentOption } from "../paymentOption/paymentOption";
import { CardForm, cardFormFields } from "./cardForm/cardForm";
import { fieldsValidationObject, formFields } from "./paymentFormTypes";
import { paymentContext } from "../paymentContext";

const BsCreditCard2FrontFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsCreditCard2FrontFill,
  }))
);
const FaMoneyBillWave = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaMoneyBillWave,
  }))
);

const PaymentForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(paymentContext);
  const [isCardPageOpen, setIsCardPageOpen] = useState<boolean>(false);
  const pageContainer = document.getElementById("buyPageContainer");

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(formFields) as Array<keyof typeof formFields>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formFields[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields,
    validationRules: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const changePaymentOption = (value: typeof formData.paymentOption.value) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentOption: {
        ...prevState.paymentOption,
        value: value,
      },
    }));

    validateField("paymentOption", value, true);
  };

  const saveCard = (cardInfo: typeof cardFormFields) => {
    (Object.keys(cardInfo) as Array<keyof typeof cardInfo>).forEach((field) => {
      setFormData((prevState) => ({
        ...prevState,
        paymentData: {
          ...prevState.paymentData,
          value: {
            ...prevState.paymentData.value,
            [field]: cardInfo[field].value,
          },
        },
      }));
    });

    validateField("paymentData", formData.paymentData, true);

    changePaymentOption("1");
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid: (
      Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
    ).filter((field) => !formFieldsState[field].isValid).length
      ? false
      : true,
  }));

  return (
    <>
      <FormBody style={{ height: "100%", width: "100%" }}>
        <div className="w-full h-full flex gap-6 justify-center py-10">
          <PaymentOption
            name="CARD"
            isSelected={formData.paymentOption.value === "1"}
            icon={
              <Suspense
                fallback={<div style={{ width: "100%", height: "100%" }}></div>}
              >
                <BsCreditCard2FrontFill size={"80"} />
              </Suspense>
            }
            onClick={() => {
              setIsCardPageOpen(true);
            }}
          />
          <PaymentOption
            name="CASH"
            icon={
              <Suspense
                fallback={<div style={{ width: "100%", height: "100%" }}></div>}
              >
                <FaMoneyBillWave size={"80"} />
              </Suspense>
            }
            isSelected={formData.paymentOption.value === "2"}
            onClick={() => {
              changePaymentOption("2");
            }}
          />
        </div>
      </FormBody>
      {pageContainer
        ? createPortal(
            <CardForm
              initialState={formData.paymentData.value}
              isOpen={isCardPageOpen}
              onClose={() => {
                setIsCardPageOpen(false);
              }}
              onSubmit={saveCard}
            />,
            pageContainer
          )
        : null}
    </>
  );
});

export default PaymentForm;
