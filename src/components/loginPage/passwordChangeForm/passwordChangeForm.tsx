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

export const formFields: FormInputs<{
  password: InputField<"text">;
  repeatPassword: InputField<"text">;
}> = {
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

export const PasswordChangeForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isValid, setIsValid] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();
  const [searchParams] = useSearchParams();

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
        updateForm(jsonData.field, "", true);
      }
      alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    checkInstance(searchParams.get("id"));
  }, [searchParams]);

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
            <div className="font-boldFamily text-4xl text-center text-primary pb-4">Change Password</div>
          </FormRow>
          <FormDisclaimer>Enter your new password</FormDisclaimer>
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
                Confirm
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
                Don't have an account?{" "}
                {
                  <span className="text-primary">
                    <Link to="/register">Sign up</Link>
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
