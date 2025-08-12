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

export const formFields: FormInputs<{
  email: InputField<"text">;
}> = {
  email: {
    name: "email",
    placeholder: "Email",
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
};

export const RecoveryForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isValid, setIsValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
        updateForm(jsonData.field, "", true);
      }
      alerter.alertMessage(jsonData.message);
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
            <div className="font-boldFamily text-4xl text-center text-primary pb-4">Password Recovery</div>
          </FormRow>
          <FormDisclaimer>Enter your email and we will send you a recovery link</FormDisclaimer>
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
                disabled={!isValid || emailSent}
                onClick={() => {
                  if (isValid && !emailSent) {
                    onSubmit();
                  } else {
                    runValidation(true);
                  }
                }}
              >
                {emailSent ? "Email sent" : "Send"}
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
