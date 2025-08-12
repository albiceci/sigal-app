import { Suspense, useState } from "react";
import { FormInputs, InputField } from "../../../../ui/form/types";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import React from "react";
import { FormDisclaimer } from "../../../../ui/form/formContainers/formDisclaimer";
import { Loader } from "./loader";
import { Button } from "../../../../ui/button/button";

const IoClose = React.lazy(() =>
  import("react-icons/io5").then((module) => ({
    default: module.IoClose,
  }))
);

export const carInfoFormFields: FormInputs<{
  licence: InputField<"text">;
  vin: InputField<"text">;
  type: InputField<"text">;
  model: InputField<"text">;
  power: InputField<"text">;
  year: InputField<"text">;
  weightcapacity: InputField<"text">;
  peoplecapacity: InputField<"text">;
  color: InputField<"text">;
  category: InputField<"text">;
}> = {
  licence: {
    name: "licence",
    placeholder: "Targa",
    type: "text",
    value: "",
  },
  vin: {
    name: "vin",
    placeholder: "Vin",
    type: "text",
    value: "",
  },
  type: {
    name: "type",
    placeholder: "Tipi",
    type: "text",
    value: "",
  },
  model: {
    name: "model",
    placeholder: "Modeli",
    type: "text",
    value: "",
  },
  power: {
    name: "power",
    placeholder: "Power",
    type: "text",
    value: "",
  },
  year: {
    name: "year",
    placeholder: "Viti",
    type: "text",
    value: "",
  },
  weightcapacity: {
    name: "weightcapacity",
    placeholder: "Kpc Mbartes",
    type: "text",
    value: "",
  },
  peoplecapacity: {
    name: "peoplecapacity",
    placeholder: "Nr vendeve",
    type: "text",
    value: "",
  },
  color: {
    name: "color",
    placeholder: "Ngjyra",
    type: "text",
    value: "",
  },
  category: {
    name: "category",
    placeholder: "Kategoria",
    type: "text",
    value: "",
  },
};

export const useCarInfoForm = ({ onSubmit }: { onSubmit: (value: boolean) => void }) => {
  const [formData, setFormData] = useState(carInfoFormFields);
  const [formStatus, setFromStatus] = useState<"opened" | "closed" | "loading">("closed");

  ///////////////VALIDATION HOOK/////////////////////////////////////

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  /////////////////CUSTOM FUNCTIONS///////////////////////////////////////

  const updateFormData = (jsonData: Record<keyof typeof carInfoFormFields, any>) => {
    (Object.keys(jsonData) as Array<keyof typeof carInfoFormFields>).forEach(
      (field: keyof typeof carInfoFormFields) => {
        setFormData((prevState) => ({
          ...prevState,
          [field]: {
            ...prevState[field],
            value: jsonData[field],
          },
        }));
      }
    );
  };

  return {
    render: (
      <div
        className={`w-full h-full absolute flex items-center justify-center z-[5] ${
          formStatus === "closed" ? "hidden" : ""
        }`}
      >
        <div className="absolute h-full w-full bg-presetgray opacity-50 z-[-1]"></div>
        {formStatus === "opened" ? (
          <div className="w-[100vw] sm:w-[80vw] md:w-[70vw] lg:w-[50vw] rounded-md bg-white shadow-lg">
            <div className="text-primary py-3 flex justify-between items-center border-b px-6">
              <div className="h4 font-semibold">CAR INFORMATION</div>
              <div
                onClick={() => {
                  setFromStatus("closed");
                }}
                className="cursor-pointer text-white bg-primary rounded-full hover:bg-primarysub"
              >
                <Suspense fallback={<div style={{ width: "25", height: "25" }}></div>}>
                  <IoClose size={"25"} />
                </Suspense>
              </div>
            </div>
            <div className="px-6">
              <FormBody>
                <FormRow>
                  <FormDisclaimer
                    style={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
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
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    <span className="w-fit">Te dhenat e mjetit kane ardhur nga AMF dhe nuk mund te ndryshohen.</span>
                  </FormDisclaimer>
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formData.licence.name}
                    placeholder={formData.licence.placeholder as string}
                    value={formData.licence.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.vin.name}
                    placeholder={formData.vin.placeholder as string}
                    value={formData.vin.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formData.type.name}
                    placeholder={formData.type.placeholder as string}
                    value={formData.type.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.model.name}
                    placeholder={formData.model.placeholder as string}
                    value={formData.model.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.power.name}
                    placeholder={formData.power.placeholder as string}
                    value={formData.power.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formData.color.name}
                    placeholder={formData.color.placeholder as string}
                    value={formData.color.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.year.name}
                    placeholder={formData.year.placeholder as string}
                    value={formData.year.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                </FormRow>
                <FormRow>
                  <TextInput
                    name={formData.peoplecapacity.name}
                    placeholder={formData.peoplecapacity.placeholder as string}
                    value={formData.peoplecapacity.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.weightcapacity.name}
                    placeholder={formData.weightcapacity.placeholder as string}
                    value={formData.weightcapacity.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                  <TextInput
                    name={formData.category.name}
                    placeholder={formData.category.placeholder as string}
                    value={formData.category.value}
                    isValid={true}
                    onChange={() => {}}
                    errors={[]}
                  />
                </FormRow>
              </FormBody>
            </div>
            <div className="flex-grow flex items-center justify-center pb-6">
              <div className="w-fit">
                <Button
                  buttonType="secondary"
                  disabled={false}
                  icon={{
                    type: "lottie",
                    animationData: require("../../../../../assets/lottie/icons/checkIconWhite.json"),
                    style: { height: 25, width: 25 },
                    placement: "before",
                  }}
                  onClick={() => {
                    onSubmit(true);
                    setFromStatus("closed");
                  }}
                >
                  Konfirmo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {formStatus === "loading" ? (
          <div className="text-white border border-white rounded-md font-semibold flex flex-col items-center justify-center backdrop-blur-sm p-5">
            <div className="mb-3">
              <Loader />
            </div>
            <div className="font-bold text-lg">Duke pergatitur te dhenat tuaja</div>
            <div className="text-gray-200 font-semibold text-sm text-center">
              Ju lutem prisni teksa te dhenat tuaja procesohen nga sistemi. Faleminderit!
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    ),
    updateFormData: updateFormData,
    setFromStatus: setFromStatus,
  };
};
