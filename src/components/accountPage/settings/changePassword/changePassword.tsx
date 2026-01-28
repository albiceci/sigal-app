import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { FormBody } from "../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";

import { Button } from "../../../ui/button/button";
import { useForm } from "../../../ui/form/useForm";
import { getErrorMessage } from "../../../../helper/getErrorMessage";
import { commonFieldRules } from "../../../ui/form/validator/commonRules";
import { useTranslation } from "react-i18next";

export const formFields: FormInputs<{
  password: InputField<"text">;
  newPassword: InputField<"text">;
  repeatPassword: InputField<"text">;
}> = {
  password: {
    name: "password",
    placeholder: "form.placeholder.oldPassword",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  newPassword: {
    name: "newPassword",
    placeholder: "form.placeholder.newPassword",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
  repeatPassword: {
    name: "repeatPassword",
    placeholder: "form.placeholder.repeatPassword",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  password: commonFieldRules.password,
  newPassword: commonFieldRules.password,
  repeatPassword: [],
};

export function ChangePassword() {
  const [isOldPasswordPresent, setIsOldPasswordPresent] = useState(true);

  const [formData, setFormData] = useState(formFields);
  const [isSubmited, setIsSubmited] = useState(false);

  const { t } = useTranslation();

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: { ...fieldsValidationObject, ...(isOldPasswordPresent ? {} : { password: [] }) },
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  //////////////////////////CUSTOM FUCTIONS//////////////////////////////////

  const changePassword = async () => {
    const body = {
      password: isOldPasswordPresent ? formData.password?.value : undefined,
      newPassword: formData.newPassword.value,
      repeatPassword: formData.repeatPassword.value,
    };

    loadingOverlay.open("Please wait", "Updating account information.");

    const jsonData = await customFetch("/user/settings/change-password", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      if (jsonData.field) {
        formHook.changeFieldValue({ name: jsonData.field, value: "", showErrors: false });
      }
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      //window.location.href = "/";
      alerter.alertMessage({ description: null, message: "Password updated successfully", type: "success" });
      setIsSubmited(true);
    }
  };

  const checkCurrentPassword = async () => {
    const jsonData = await customFetch("/user/settings/check-password", {
      method: "GET",
      headers: {},
      body: undefined,
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setIsOldPasswordPresent(jsonData.data);
    }
  };

  useEffect(() => {
    checkCurrentPassword();
  }, []);

  useEffect(() => {
    formHook.validateForm(false);
  }, [isOldPasswordPresent]);

  const isPasswordValid = () => {
    return formData.newPassword.value === formData.repeatPassword.value;
  };

  const isFormValid = () => {
    return formHook.isValid && isPasswordValid();
  };

  return (
    <div>
      {loadingOverlay.render}
      {alerter.render}
      <div className="font-semibold text-lg text-presetgray">
        {isOldPasswordPresent
          ? t("account.settings.changePassword.title")
          : t("account.settings.changePassword.title2")}
      </div>
      {isOldPasswordPresent && (
        <div className="font-medium text-presetgray flex items-center justify-center w-fit gap-1">
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
          <span className="leading-5">{t("account.settings.changePassword.disclaimer")}</span>
        </div>
      )}

      <div className="px-3">
        <FormBody>
          {isOldPasswordPresent && (
            <FormRow>
              <TextInput
                name={formFields.password.name}
                value={formData.password.value}
                placeholder={formData.password.placeholder as string}
                isValid={formData.password.state.isValid}
                type="password"
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.password.state.errors}
              />
            </FormRow>
          )}

          <FormRow>
            <TextInput
              name={formFields.newPassword.name}
              value={formData.newPassword.value}
              placeholder={formData.newPassword.placeholder as string}
              isValid={formData.newPassword.state.isValid}
              type="password"
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.newPassword.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.repeatPassword.name}
              value={formData.repeatPassword.value}
              placeholder={formData.repeatPassword.placeholder as string}
              type="password"
              isValid={formData.repeatPassword.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={(() => {
                if (isPasswordValid()) {
                  return;
                } else {
                  return [...formData.repeatPassword.state.errors, "form.error.repeatPassword.notCorrect"];
                }
              })()}
            />
          </FormRow>
          <FormRow>
            <div className="">
              <Button
                buttonType="secondary"
                padding="px-10 py-2"
                disabled={!(isFormValid() && !isSubmited)}
                onClick={() => {
                  if (isFormValid() && !isSubmited) {
                    changePassword();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {t("account.settings.changePassword.submit")}
              </Button>
            </div>
          </FormRow>
        </FormBody>
      </div>
    </div>
  );
}
