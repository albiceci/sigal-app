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

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  taxNumber: InputField<"text">;
  gender: InputField<"text">;
  phoneNumber: InputField<"text">;
  email: InputField<"text">;
  password: InputField<"text">;
  repeatPassword: InputField<"text">;
}> = {
  name: {
    name: "name",
    placeholder: "Emri",
    type: "text",
    value: "",
  },
  surname: {
    name: "surname",
    placeholder: "Mbiemri",
    type: "text",
    value: "",
  },
  birthday: {
    name: "birthday",
    placeholder: "Datelindja",
    type: "text",
    value: "",
  },
  taxNumber: {
    name: "taxNumber",
    placeholder: "Nr. personal",
    type: "text",
    value: "",
  },
  gender: {
    name: "gender",
    placeholder: "Gjinia",
    type: "text",
    value: "",
  },
  phoneNumber: {
    name: "phoneNumber",
    placeholder: "Nr. i telefonit",
    type: "text",
    value: "",
  },
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
  name: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Emri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Emri nuk mund te jete bosh",
    },
  ],
  surname: [
    {
      type: "REGEX",
      value: /^.{2}/g,
      error: "Mbiemri duhet te kete me shume se 2 karaktere",
    },
    {
      type: "NOT_EMPTY",
      error: "Mbiemri nuk mund te jete bosh",
    },
  ],
  birthday: [
    {
      type: "NOT_EMPTY",
      error: "Datelindja nuk mund te jete bosh",
    },
  ],
  taxNumber: [
    {
      type: "REGEX",
      value: /[A-Z]\d{8}[A-Z]/g,
      error: "Nr. personal nuk esht ne formatin e duhur",
    },
    {
      type: "NOT_EMPTY",
      error: "Nr. personal nuk mund te jete bosh",
    },
  ],
  gender: [
    {
      type: "NOT_EMPTY",
      error: "Gjinia nuk mund te jete bosh",
    },
  ],
  phoneNumber: [
    {
      type: "REGEX",
      value: /\d+/g,
      error: "Nr. i telefonit duhet te permbaje vetem numra",
    },
    {
      type: "NOT_EMPTY",
      error: "Nr. i telefonit nuk mund te jete bosh",
    },
  ],
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
      name: formData.name.value,
      surname: formData.surname.value,
      gender: formData.gender.value,
      birthday: formData.birthday.value,
      taxNumber: formData.taxNumber.value,
      phoneNumber: formData.phoneNumber.value,
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
              name={formFields.name.name}
              value={formData.name.value}
              placeholder={formData.name.placeholder as string}
              isValid={formFieldsState["name"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["name"].errors}
            />
            <TextInput
              name={formFields.surname.name}
              value={formData.surname.value}
              placeholder={formData.surname.placeholder as string}
              isValid={formFieldsState["surname"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["surname"].errors}
            />
          </FormRow>
          <FormRow>
            <SelectInput
              placeholder={formData.gender.placeholder as string}
              name={formData.gender.name}
              value={formData.gender.value}
              isValid={formFieldsState["gender"].isValid}
              options={[
                { id: "Male", text: "Mashkull" },
                { id: "Female", text: "Femer" },
              ]}
              onOptionChange={onSelectChange}
              errors={formFieldsState["gender"].errors}
            />
            <DateInput
              name={formFields.birthday.name}
              value={formData.birthday.value}
              placeholder={formData.birthday.placeholder as string}
              isValid={formFieldsState["birthday"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["birthday"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.taxNumber.name}
              value={formData.taxNumber.value}
              placeholder={formData.taxNumber.placeholder as string}
              isValid={formFieldsState["taxNumber"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["taxNumber"].errors}
            />
            <TextInput
              name={formFields.phoneNumber.name}
              value={formData.phoneNumber.value}
              placeholder={formData.phoneNumber.placeholder as string}
              isValid={formFieldsState["phoneNumber"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["phoneNumber"].errors}
            />
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
