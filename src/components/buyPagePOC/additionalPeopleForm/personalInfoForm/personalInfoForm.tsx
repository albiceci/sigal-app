import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";
import { FormBody } from "../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";
import React from "react";
import { FormDisclaimer } from "../../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../../ui/button/button";
import { useForm } from "../../../ui/form/useForm";
import { DateInput } from "../../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../../ui/form/inputs/selectInput/selectInput";
import { useTranslation } from "react-i18next";
import { PopUp } from "../../../ui/popUp/popUp";

export const personalInfoFormFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  gender: InputField<"text">;
  taxNumber: InputField<"text">;
  metadata: InputField<"object", Record<string, any>>;
}> = {
  name: {
    name: "name",
    placeholder: "form.placeholder.name",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  surname: {
    name: "surname",
    placeholder: "form.placeholder.surname",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  birthday: {
    name: "birthday",
    placeholder: "form.placeholder.birthday",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  gender: {
    name: "gender",
    placeholder: "form.placeholder.gender",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  taxNumber: {
    name: "taxNumber",
    placeholder: "form.placeholder.taxNumber",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  metadata: {
    name: "metadata",
    type: "object",
    value: {},
    state: {
      isValid: false,
      errors: [],
    },
  },
};

export const optionalFormFields: FormInputs<{
  coverage: InputField<"text">;
  profession: InputField<"text">;
}> = {
  coverage: {
    name: "coverage",
    placeholder: "form.placeholder.coverageAmount",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  profession: {
    name: "profession",
    placeholder: "form.placeholder.profession",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

const optionalFormFieldsValidationObject: fieldValidationRules<keyof typeof optionalFormFields> = {
  coverage: [
    {
      type: "NOT_EMPTY",
      error: "form.error.coverageInt.notEmpty",
    },
    {
      type: "REGEX",
      value: /^\d+$/g,
      error: "form.error.coverageInt.wrongFormat",
    },
  ],
  profession: [
    {
      type: "NOT_EMPTY",
      error: "form.error.profession.notEmpty",
    },
  ],
};

///////////VALIDATION RULES/////////////////////////
export const personalInfoFormFieldsValidationObject: fieldValidationRules<keyof typeof personalInfoFormFields> = {
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.name.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.name.notEmpty",
    },
  ],
  surname: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "form.error.surname.moreThan2Character",
    },
    {
      type: "NOT_EMPTY",
      error: "form.error.surname.notEmpty",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "form.error.birthday.notEmpty",
    },
  ],
  gender: [
    {
      type: "NOT_EMPTY",
      error: "form.error.gender.notEmpty",
    },
  ],
  taxNumber: [
    {
      type: "NOT_EMPTY",
      error: "form.error.taxNumber.notEmpty",
    },
    {
      type: "REGEX",
      value: /[A-Z]\d{8}[A-Z]/g,
      error: "form.error.taxNumber.wrongFormat",
    },
  ],
  metadata: [],
};

export const usePersonalInfoForm = ({
  onSubmit,
  metadata,
}: {
  onSubmit: (personalInfo: typeof personalInfoFormFields, submitType: "add" | "edit") => void;
  metadata: {
    includeCoverage?: boolean;
    includeProffesion?: boolean;
  };
}) => {
  const getInitialState = () => {
    return {
      ...personalInfoFormFields,
      ...(metadata.includeCoverage ? { coverage: optionalFormFields.coverage } : {}),
      ...(metadata.includeProffesion ? { profession: optionalFormFields.profession } : {}),
    };
  };

  const { t } = useTranslation();

  const [formData, setFormData] = useState(getInitialState());
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof personalInfoFormFields>({
    formData: formData,
    formFields: getInitialState(),
    setFormData: setFormData,
    fieldsValidationObject: {
      ...personalInfoFormFieldsValidationObject,
      ...(metadata.includeCoverage ? { coverage: optionalFormFieldsValidationObject.coverage } : {}),
      ...(metadata.includeProffesion ? { profession: optionalFormFieldsValidationObject.profession } : {}),
    },
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useEffect(() => {
    formHook.validateForm(false);
  }, [isOpen]);

  ////////////CUSTOM FUNCTIONS////////////////////////////////////////////

  const openForm = (initialState: typeof personalInfoFormFields | undefined = undefined) => {
    if (initialState) {
      setFormData((prev) => {
        return initialState;
      });
      setFormType("edit");
    } else {
      setFormType("add");
    }

    setIsOpen((prev) => {
      return true;
    });
  };

  const closeForm = () => {
    setFormData((prev) => {
      return getInitialState();
    });
    setIsOpen((prev) => {
      return false;
    });
  };

  return {
    render: isOpen ? (
      <PopUp
        title="form.additionalPeople.personalInfoPopUp.title"
        onClose={closeForm}
        bottomSection={
          <div className="w-full flex items-center justify-center">
            <div className="w-fit">
              <Button
                buttonType="secondary"
                disabled={formHook.isValid ? false : true}
                onClick={() => {
                  if (formHook.isValid) {
                    onSubmit(formData, formType);
                    //closeForm();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {t("form.additionalPeople.personalInfoPopUp.confirm")}
              </Button>
            </div>
          </div>
        }
      >
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
              <span className="w-fit">{t("form.additionalPeople.personalInfoPopUp.disclaimer")}</span>
            </FormDisclaimer>
          </FormRow>
          <FormRow>
            <TextInput
              name={personalInfoFormFields.name.name}
              placeholder={personalInfoFormFields.name.placeholder as string}
              value={formData.name.value}
              isValid={formData.name.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.name.state.errors}
            />
            <TextInput
              name={personalInfoFormFields.surname.name}
              placeholder={personalInfoFormFields.surname.placeholder as string}
              value={formData.surname.value}
              isValid={formData.surname.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.surname.state.errors}
            />
          </FormRow>
          <FormRow>
            <SelectInput
              placeholder={formData.gender.placeholder as string}
              name={formData.gender.name}
              value={formData.gender.value}
              isValid={formData.gender.state.isValid}
              options={[
                { id: "Male", text: "form.option.gender.male" },
                { id: "Female", text: "form.option.gender.female" },
              ]}
              onOptionChange={(name: string, value: string) => {
                formHook.changeFieldValue({
                  name: "gender",
                  value: value,
                  showErrors: true,
                });
              }}
              errors={formData.gender.state.errors}
            />
            <DateInput
              name={personalInfoFormFields.birthday.name}
              value={formData.birthday.value}
              placeholder={formData.birthday.placeholder as string}
              isValid={formData.birthday.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.birthday.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={personalInfoFormFields.taxNumber.name}
              placeholder={personalInfoFormFields.taxNumber.placeholder as string}
              value={formData.taxNumber.value}
              isValid={formData.taxNumber.state.isValid}
              onChange={(e) => {
                if (formType === "add") {
                  formHook.handleInputChange(e);
                }
              }}
              errors={formData.taxNumber.state.errors}
            />
          </FormRow>
          <FormRow>
            {metadata.includeCoverage ? (
              <TextInput
                name={optionalFormFields.coverage.name}
                placeholder={optionalFormFields.coverage.placeholder as string}
                prefixElement={<span className="font-semibold text-presetgray px-1">Lek</span>}
                value={formData.coverage!.value}
                isValid={formData.coverage!.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.coverage!.state.errors}
              />
            ) : undefined}
            {metadata.includeProffesion ? (
              <SelectInput
                placeholder={formData.profession!.placeholder as string}
                name={formData.profession!.name}
                value={formData.profession!.value}
                isValid={formData.profession!.state.isValid}
                options={[
                  { id: "Administrate", text: "Administrate" },
                  { id: "Ndertim", text: "Ndertim" },
                  { id: "Manual", text: "Manual" },
                  { id: "Ekzekutive", text: "Ekzekutive" },
                ]}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    //@ts-ignore
                    name: "profession",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData.profession!.state.errors}
              />
            ) : undefined}
          </FormRow>
        </FormBody>
      </PopUp>
    ) : (
      <></>
    ),
    openForm,
    closeForm,
    validateForm: formHook.validateForm,
  };
};
