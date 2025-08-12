import {
  forwardRef,
  Suspense,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { travelALContext } from "../../travelALType/travelALContext";
import { PackageOption } from "../packageOption/packageOption";
import React from "react";

const FaMoneyBillWave = React.lazy(() =>
  import("react-icons/fa").then((module) => ({
    default: module.FaMoneyBillWave,
  }))
);

const SecondForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(travelALContext);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof typeof formFields],
          value: e.target.value,
        },
      };
    });
    validateField(
      e.target.name as keyof typeof formFields,
      e.target.value,
      true
    );
  };

  const changePackageOption = (value: typeof formData.packageOption.value) => {
    setFormData((prevState) => ({
      ...prevState,
      packageOption: {
        ...prevState.packageOption,
        value: value,
      },
    }));

    validateField("packageOption", value, true);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    console.log(`validating Form with type ${showErrors}`);
    validateForm(showErrors);
  };

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid: (
      Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
    ).filter((field) => !formFieldsState[field].isValid).length
      ? false
      : true,
  }));

  useEffect(() => {
    runValidation(false);
  }, []);

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.begDate.name}
              value={formData.begDate.value}
              helper="Ketu duhet te vendosni daten e fillimit te udhetimit"
              placeholder={formData.begDate.placeholder as string}
              isValid={formFieldsState["begDate"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["begDate"].errors}
            />
            <TextInput
              name={formFields.endDate.name}
              value={formData.endDate.value}
              helper="Ketu duhet te vendosni daten e mbarimit te udhetimit"
              placeholder={formData.endDate.placeholder as string}
              isValid={formFieldsState["endDate"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["endDate"].errors}
            />
          </FormRow>
          <FormRow>
            <div className="w-full flex flex-col items-center justify-center gap-5 py-5">
              <div>
                <span className="text-primary text-lg font-bold">
                  Zgjidhni mbulimin e deshiruar
                </span>
              </div>
              <div className="flex gap-6 items-center justify-center w-full min-h-36 sm:min-h-36 md:min-h-36 lg:min-h-36">
                <PackageOption
                  name="Mbulim €10000"
                  isSelected={formData.packageOption.value === "1"}
                  icon={
                    <Suspense
                      fallback={
                        <div style={{ width: "100%", height: "100%" }}></div>
                      }
                    >
                      <FaMoneyBillWave size={"80"} />
                    </Suspense>
                  }
                  onClick={() => {
                    changePackageOption("1");
                  }}
                />
                <PackageOption
                  name="Mbulim €5000"
                  icon={
                    <Suspense
                      fallback={
                        <div style={{ width: "100%", height: "100%" }}></div>
                      }
                    >
                      <FaMoneyBillWave size={"80"} />
                    </Suspense>
                  }
                  isSelected={formData.packageOption.value === "2"}
                  onClick={() => {
                    changePackageOption("2");
                  }}
                />
              </div>
              <div>
                {formFieldsState.packageOption.errors.length
                  ? formFieldsState.packageOption.errors.map((error) => {
                      return (
                        <span className="text-red-400 font-semibold text-sm">
                          &#x25cf; {error}
                        </span>
                      );
                    })
                  : ""}
              </div>
            </div>
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});

export default SecondForm;
