import { useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../ui/form/types";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Link } from "react-router-dom";
import { Reveal } from "../../../util/reveal";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { Button } from "../../ui/button/button";

import { Socials } from "../socials/socials";
import { useForm } from "../../ui/form/useForm";
import { useTranslation } from "react-i18next";
import React from "react";
import { getErrorMessage } from "../../../helper/getErrorMessage";

export const formFields: FormInputs<{
  email: InputField<"text">;
  password: InputField<"text">;
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
};

const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  email: [
    {
      type: "NOT_EMPTY",
      error: "Email nuk mund te jete bosh",
    },
  ],
  password: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
  ],
};

const REDIRECT_URI = window.location.href;

export const LoginForm = () => {
  const [formData, setFormData] = useState(formFields);

  const { t } = useTranslation();

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

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
      password: formData.password.value,
    };

    loadingOverlay.open("Ju lutem prisni.", "Duke kerkuar llogarin tuaj");

    const jsonData = await customFetch("/user/login", {
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
      window.location.href = "/";
    }
  };

  const Forgot = React.memo(() => {
    return (
      <div className="flex justify-end text-primary text-sm">
        <Link to="/recovery">Forgot</Link>
      </div>
    );
  });

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
            <div className="font-boldFamily text-4xl text-primary pb-4">{t("account.login.title")}</div>
          </FormRow>
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
              flexFlow: "column",
              gap: "0",
            }}
          >
            <TextInput
              name={formFields.password.name}
              value={formData.password.value}
              type={"password"}
              placeholder={formData.password.placeholder as string}
              isValid={formData.password.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.password.state.errors}
            />
            <div className="flex justify-end text-primary text-sm">
              <Link to={"/recovery"}>{t("account.login.forgotPassword")}</Link>
            </div>
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
                disabled={!formHook.isValid}
                onClick={() => {
                  if (formHook.isValid) {
                    onSubmit();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {t("account.login.submit")}
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
            <div className="flex w-full items-center justify-center">
              <hr className="flex-grow text-primary" />
              <span className="px-2 text-primary font-semibold">{t("account.login.or")}</span>
              <hr className="flex-grow text-primary" />
            </div>
          </FormRow>
          <FormRow
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Socials
              type="login"
              onSuccess={() => {
                window.location.href = "/";
              }}
            />
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
