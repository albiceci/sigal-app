import { useEffect, useState } from "react";
import { fieldValidationRules, FormInputs, InputField } from "../../../ui/form/types";
import { useServer } from "../../../../util/useServer";
import { useLoadingOverlay } from "../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../ui/alerter/useAlerter";
import { FormBody } from "../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../ui/form/inputs/textInput/textInput";
import { DateInput } from "../../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../../ui/form/inputs/selectInput/selectInput";
import { Button } from "../../../ui/button/button";
import { useForm } from "../../../ui/form/useForm";
import { getErrorMessage } from "../../../../helper/getErrorMessage";
import { commonFieldRules } from "../../../ui/form/validator/commonRules";
import { useTranslation } from "react-i18next";

export const formFields: FormInputs<{
  name: InputField<"text">;
  surname: InputField<"text">;
  birthday: InputField<"text">;
  gender: InputField<"text">;
  taxNumber: InputField<"text">;
  email: InputField<"text">;
  phone: InputField<"text">;
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
  phone: {
    name: "phone",
    placeholder: "form.placeholder.phone",
    type: "text",
    value: "",
    state: {
      isValid: false,
      errors: [],
    },
  },
};

const fieldsValidationObject: fieldValidationRules<keyof typeof formFields> = {
  name: commonFieldRules.name,
  surname: commonFieldRules.surname,
  birthday: commonFieldRules.birthday,
  gender: commonFieldRules.gender,
  taxNumber: commonFieldRules.taxNumber,
  email: commonFieldRules.email,
  phone: commonFieldRules.phone,
};

export function PersonalInfo() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(formFields);
  const [isChanged, setIsChanged] = useState(false);

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

  const updateForm = (name: any, value: any, showErrors = false) => {
    formHook.changeFieldValue({ name: name as keyof typeof formFields, value, showErrors });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm(e.target.name, e.target.value, true);
    setIsChanged(true);
  };

  const onSelectChange = (name: string, value: string) => {
    updateForm(name, value, true);
    setIsChanged(true);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  //////////////////////////CUSTOM FUCTIONS//////////////////////////////////

  const getPersonalInfo = async () => {
    const jsonData = await customFetch("/user/general/personalInfo", {
      method: "GET",
      headers: {},
      body: undefined,
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      Object.keys(jsonData.data).forEach((key) => {
        if (key === "birthday") {
          const date = new Date(jsonData.data[key]);
          const year = date.getUTCFullYear();
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
          const day = date.getUTCDate().toString().padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;
          updateForm(key, formattedDate, true);
        } else if (Object.keys(formFields).includes(key)) {
          updateForm(key, jsonData.data[key], true);
        }
      });
    }
  };

  const savePersonalInfo = async () => {
    const body = {
      name: formData.name.value,
      surname: formData.surname.value,
      gender: formData.gender.value,
      birthday: formData.birthday.value,
      taxNumber: formData.taxNumber.value,
      phone: formData.phone.value,
      email: formData.email.value,
    };

    loadingOverlay.open("Please wait", "Updating account information.");

    const jsonData = await customFetch("/user/general/personalInfo", {
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
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      //window.location.href = "/";
      alerter.alertMessage({ description: null, message: "Information updated successfully", type: "success" });
      setIsChanged(false);
    }
  };

  useEffect(() => {
    getPersonalInfo();
  }, []);
  return (
    <div>
      {loadingOverlay.render}
      {alerter.render}
      <div className="font-semibold text-lg text-presetgray">{t("account.general.personalInfo.title")}</div>
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
        <span className="leading-5">{t("account.general.personalInfo.disclaimer")}</span>
      </div>
      <div className="px-3">
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.name.name}
              value={formData.name.value}
              placeholder={formData.name.placeholder as string}
              isValid={formData.name.state.isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formData.name.state.errors}
            />
            <TextInput
              name={formFields.surname.name}
              value={formData.surname.value}
              placeholder={formData.surname.placeholder as string}
              isValid={formData.surname.state.isValid}
              onChange={(e) => {
                handleChange(e);
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
              onOptionChange={onSelectChange}
              errors={formData.gender.state.errors}
            />
            <DateInput
              name={formFields.birthday.name}
              value={formData.birthday.value}
              placeholder={formData.birthday.placeholder as string}
              isValid={formData.birthday.state.isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formData.birthday.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.taxNumber.name}
              value={formData.taxNumber.value}
              placeholder={formData.taxNumber.placeholder as string}
              isValid={formData.taxNumber.state.isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formData.taxNumber.state.errors}
            />
            <TextInput
              name={formFields.phone.name}
              value={formData.phone.value}
              placeholder={formData.phone.placeholder as string}
              isValid={formData.phone.state.isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formData.phone.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.email.name}
              value={formData.email.value}
              placeholder={formData.email.placeholder as string}
              isValid={formData.email.state.isValid}
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
            <div className="">
              <Button
                buttonType="secondary"
                padding="px-10 py-2"
                disabled={!(formHook.isValid && isChanged)}
                onClick={() => {
                  if (formHook.isValid && isChanged) {
                    savePersonalInfo();
                  } else {
                    formHook.validateForm(true);
                  }
                }}
              >
                {t("account.general.personalInfo.submit")}
              </Button>
            </div>
          </FormRow>
        </FormBody>
      </div>
    </div>
  );
}
