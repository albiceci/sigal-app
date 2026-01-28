import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";
import { useValidator } from "../../ui/form/validator/useValidator";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Link } from "react-router-dom";
import { Reveal } from "../../../util/reveal";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { FormDisclaimer } from "../../ui/form/formContainers/formDisclaimer";
import { Button } from "../../ui/button/button";
import { useForm } from "../../ui/form/useForm";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../../helper/getErrorMessage";
import { commonFieldRules } from "../../ui/form/validator/commonRules";

export const formFields: FormInputs<{
  email: InputField<"text">;
}> = {
  email: {
    name: "email",
    placeholder: "form.placeholder.email",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  email: commonFieldRules.email,
};

export const RecoveryForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isValid, setIsValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const { t } = useTranslation();

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

  const onSubmit = async () => {
    const body = {
      email: formData.email.value,
    };

    loadingOverlay.open("Please wait", "Sending a recovery link to your email address.");

    const jsonData = await customFetch("/user/recovery", {
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
      setEmailSent((prev) => {
        return true;
      });
    }
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
            <div className="font-boldFamily text-4xl text-center text-primary pb-4">{t("account.recovery.title")}</div>
          </FormRow>
          <FormDisclaimer>{t("account.recovery.disclaimer")}</FormDisclaimer>
          <FormRow>
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              placeholder={formData.email.placeholder as string}
              isValid={formData.email.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.email.state.errors}
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
                disabled={!formHook.isValid || emailSent}
                onClick={() => {
                  if (formHook.isValid && !emailSent) {
                    onSubmit();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {emailSent ? t("account.recovery.sent") : t("account.recovery.send")}
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
