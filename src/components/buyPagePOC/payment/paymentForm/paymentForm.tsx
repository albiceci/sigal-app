import { forwardRef, Suspense, useContext, useImperativeHandle } from "react";
import React from "react";
import { PaymentOption } from "../paymentOption/paymentOption";
import { fieldsValidationObject, formFields } from "./paymentFormTypes";
import { paymentContext } from "../paymentContext";
import { useForm } from "../../../ui/form/useForm";
import { TransactionInfo } from "./transactionInfo/transactionInfo";

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

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });
  //////////////////////ON CHANGE///////////////////////////////

  const changePaymentOption = (value: typeof formData.paymentOption.value) => {
    formHook.changeFieldValue({
      name: "paymentOption",
      value: value,
      showErrors: true,
    });
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useImperativeHandle(ref, () => ({
    runValidation: formHook.validateForm,
    isValid: formHook.isValid,
  }));

  return (
    <>
      <div className="flex-col flex gap-3 xl:flex-row">
        <div className="flex-grow xl:min-w-[400px] py-4">
          <TransactionInfo />
        </div>
        <div className="flex items-center justify-center">
          <div className="h-[1px] w-[80%] xl:h-[80%] xl:w-[1px] bg-gray-200"></div>
        </div>
        <div className="h-full flex flex-wrap gap-6 justify-center items-center py-10">
          <PaymentOption
            name="CARD"
            isSelected={formData.paymentOption.value === "1"}
            icon={
              <Suspense fallback={<div style={{ width: "100%", height: "100%" }}></div>}>
                <BsCreditCard2FrontFill size={"80"} />
              </Suspense>
            }
            onClick={() => {
              changePaymentOption("1");
            }}
          />
          <PaymentOption
            name="CASH"
            icon={
              <Suspense fallback={<div style={{ width: "100%", height: "100%" }}></div>}>
                <FaMoneyBillWave size={"80"} />
              </Suspense>
            }
            isSelected={formData.paymentOption.value === "2"}
            onClick={() => {
              changePaymentOption("2");
            }}
          />
        </div>
      </div>
    </>
  );
});

export default PaymentForm;
