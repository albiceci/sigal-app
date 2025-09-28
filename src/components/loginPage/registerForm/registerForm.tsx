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
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";
import { DateInput } from "../../ui/form/inputs/dateInput/dateInput";
import { Button } from "../../ui/button/button";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IResolveParams, LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { Socials } from "../socials/socials";

export const formFields: FormInputs<{
  email: InputField<"text">;
  password: InputField<"text">;
  repeatPassword: InputField<"text">;
}> = {
  email: {
    name: "email",
    placeholder: "Email",
    type: "text",
    value: "",
  },
  password: {
    name: "password",
    placeholder: "Password",
    type: "text",
    value: "",
  },
  repeatPassword: {
    name: "repeatPassword",
    placeholder: "Repeat Password",
    type: "text",
    value: "",
  },
};

const cardFromFieldValidationRules: fieldValidationRules<keyof typeof formFields> = {
  email: [
    {
      type: "REGEX",
      value: /\w+@\w+/g,
      error: "Email nuk esht ne formatin e duhur",
    },
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
  repeatPassword: [
    {
      type: "NOT_EMPTY",
      error: "Password nuk mund te jete bosh",
    },
    {
      type: "SAME_AS",
      value: "password",
      error: "Password doesn't match",
    },
  ],
};

export const RegisterForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isValid, setIsValid] = useState(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  ///////////////VALIDATION HOOK/////////////////////////////////////
  const { formFieldsState, validateField, validateForm } = useValidator({
    fields: (Object.keys(formFields) as Array<keyof typeof formFields>).reduce(
      (a, v) => ({
        ...a,
        [v]: { ...formFields[v], value: formData[v].value },
      }),
      {}
    ) as typeof formFields,
    validationRules: cardFromFieldValidationRules,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const updateForm = (name: any, value: any, showErrors = false) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name as keyof typeof formFields],
          value: value,
        },
      };
    });
    validateField(name as keyof typeof formFields, value, showErrors);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm(e.target.name, e.target.value, true);
  };

  const onSelectChange = (name: string, value: string) => {
    updateForm(name, value, true);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  useEffect(() => {
    setIsValid((prev) => {
      return (Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>).filter(
        (field) => !formFieldsState[field].isValid
      ).length
        ? false
        : true;
    });
  }, [formFieldsState]);

  //////////////////////////CUSTOM FUCTIONS//////////////////////////////////

  const onSubmit = async () => {
    const body = {
      email: formData.email.value,
      password: formData.password.value,
    };

    loadingOverlay.open("Please wait", "Creating your account");

    const jsonData = await customFetch("/user/create", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      if (jsonData.field) {
        updateForm(jsonData.field, "", true);
      }
      alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
    } else {
      window.location.href = "/";
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
            <div className="font-boldFamily text-4xl text-primary pb-4">Sign up</div>
          </FormRow>

          <FormRow>
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              placeholder={formData.email.placeholder as string}
              isValid={formFieldsState["email"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["email"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.password.name}
              value={formData.password.value}
              placeholder={formData.password.placeholder as string}
              isValid={formFieldsState["password"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["password"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.repeatPassword.name}
              value={formData.repeatPassword.value}
              placeholder={formData.repeatPassword.placeholder as string}
              isValid={formFieldsState["repeatPassword"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["repeatPassword"].errors}
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
                disabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    onSubmit();
                  } else {
                    runValidation(true);
                  }
                }}
              >
                Sign up
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
              <span className="px-2 text-primary font-semibold">or</span>
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
              type="register"
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
                Already have an account?{" "}
                {
                  <span className="text-primary">
                    <Link to="/login">Login</Link>
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
