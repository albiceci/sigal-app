import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";
import { useValidator } from "../../ui/form/validator/useValidator";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Link, useSearchParams } from "react-router-dom";
import { Reveal } from "../../../util/reveal";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { FormDisclaimer } from "../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../ui/button/button";
import { useForm } from "../../ui/form/useForm";
import { getErrorMessage } from "../../../helper/getErrorMessage";
import { commonFieldRules } from "../../ui/form/validator/commonRules";
import { useTranslation } from "react-i18next";

export const formFields: FormInputs<{
  password: InputField<"text">;
  repeatPassword: InputField<"text">;
}> = {
  password: {
    name: "password",
    placeholder: "form.placeholder.password",
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
  repeatPassword: [],
};

export const PasswordChangeForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isActive, setIsActive] = useState(false);

  const { t } = useTranslation();

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();
  const [searchParams] = useSearchParams();

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  //////////////////////////CUSTOM FUCTIONS//////////////////////////////////

  const checkInstance = async (id: string | null) => {
    const body = {
      id: id,
    };

    loadingOverlay.open("Loading", "Getting your password change instance");

    const jsonData = await customFetch("/user/recovery/check", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      window.location.href = "/login";
    } else {
      setIsActive((prev) => {
        return true;
      });
    }
  };

  const onSubmit = async () => {
    const body = {
      password: formData.password.value,
      id: searchParams.get("id"),
    };

    loadingOverlay.open("Please wait", "Changing your password");

    const jsonData = await customFetch("/user/recovery/changePassword", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      if (jsonData.field) {
        formHook.changeFieldValue({
          name: jsonData.field as keyof typeof formFields,
          value: "",
          showErrors: true,
        });
      }
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    checkInstance(searchParams.get("id"));
  }, [searchParams]);

  const isPasswordValid = () => {
    return formData.password.value === formData.repeatPassword.value;
  };

  const isFormValid = () => {
    return formHook.isValid && isPasswordValid;
  };

  return (
    <>
      {loadingOverlay.render}
      {alerter.render}
      <Reveal height="100%" width="100%">
        <FormBody>
          <FormRow
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="font-boldFamily text-4xl text-center text-primary pb-4">
              {t("account.passwordChange.title")}
            </div>
          </FormRow>
          <FormDisclaimer>{t("account.passwordChange.disclaimer")}</FormDisclaimer>
          <FormRow>
            <TextInput
              name={formFields.password.name}
              value={formData.password.value}
              placeholder={formData.password.placeholder as string}
              isValid={formData.password.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.password.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.repeatPassword.name}
              value={formData.repeatPassword.value}
              placeholder={formData.repeatPassword.placeholder as string}
              isValid={formData.repeatPassword.state.isValid && isPasswordValid()}
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
          <FormRow
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="py-4">
              <Button
                buttonType="secondary"
                disabled={!isFormValid()}
                onClick={() => {
                  if (isFormValid()) {
                    onSubmit();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {t("account.passwordChange.submit")}
              </Button>
            </div>
          </FormRow>
          <FormRow
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <div>
                {t("account.login.noAccount")}{" "}
                {
                  <span className="text-primary">
                    <Link to="/register">{t("account.register.title")}</Link>
                  </span>
                }
              </div>
            </div>
          </FormRow>
        </FormBody>
      </Reveal>
    </>
  );
};
