import { Suspense, useState } from "react";
import { FormInputs, InputField } from "../../../../ui/form/types";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import React from "react";
import { FormDisclaimer } from "../../../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../../../ui/button/button";
import { useTranslation } from "react-i18next";
import { PopUp } from "../../../../ui/popUp/popUp";

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
    placeholder: "form.placeholder.licence",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  vin: {
    name: "vin",
    placeholder: "form.placeholder.vin",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  type: {
    name: "type",
    placeholder: "form.placeholder.type",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  model: {
    name: "model",
    placeholder: "form.placeholder.model",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  power: {
    name: "power",
    placeholder: "form.placeholder.power",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  year: {
    name: "year",
    placeholder: "form.placeholder.year",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  weightcapacity: {
    name: "weightcapacity",
    placeholder: "form.placeholder.weightcapacity",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  peoplecapacity: {
    name: "peoplecapacity",
    placeholder: "form.placeholder.peoplecapacity",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  color: {
    name: "color",
    placeholder: "form.placeholder.color",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  category: {
    name: "category",
    placeholder: "form.placeholder.category",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

export const useCarInfoForm = ({ onSubmit, onClose }: { onSubmit: (value: boolean) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState(carInfoFormFields);
  const { t } = useTranslation();

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
      <PopUp
        title={t("form.carSearchForm.popUp.title")}
        onClose={onClose}
        bottomSection={
          <div className="w-full flex items-center justify-center">
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
                  onClose();
                }}
              >
                {t("form.carSearchForm.popUp.confirm")}
              </Button>
            </div>
          </div>
        }
      >
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
              <span className="w-fit">{t("form.carSearchForm.popUp.disclaimer")}</span>
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
      </PopUp>
    ),
    updateFormData: updateFormData,
  };
};
