import { useEffect, useState } from "react";
import { useValidator } from "../../ui/form/validator/useValidator";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Reveal } from "../../../util/reveal";
import { formFields, cardFromFieldValidationRules } from "./fileTPLClaimFormTypes";
import { Button } from "../../ui/button/button";

export const FileTPLClaimForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isValid, setIsValid] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof typeof formFields],
          value: e.target.value,
        },
      };
    });
    validateField(e.target.name as keyof typeof formFields, e.target.value, true);
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

  return (
    <>
      <Reveal height="100%" width="100%">
        <FormBody>
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
            <TextInput
              name={formFields.phone.name}
              value={formData.phone.value}
              placeholder={formData.phone.placeholder as string}
              isValid={formFieldsState["phone"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["phone"].errors}
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
              name={formFields.guiltyLicense.name}
              value={formData.guiltyLicense.value}
              placeholder={formData.guiltyLicense.placeholder as string}
              isValid={formFieldsState["guiltyLicense"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["guiltyLicense"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.beneficiaryLicense.name}
              value={formData.beneficiaryLicense.value}
              placeholder={formData.beneficiaryLicense.placeholder as string}
              isValid={formFieldsState["beneficiaryLicense"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["beneficiaryLicense"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.city.name}
              value={formData.city.value}
              placeholder={formData.city.placeholder as string}
              isValid={formFieldsState["city"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["city"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.location.name}
              value={formData.location.value}
              placeholder={formData.location.placeholder as string}
              isValid={formFieldsState["location"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["location"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.date.name}
              value={formData.date.value}
              placeholder={formData.date.placeholder as string}
              isValid={formFieldsState["date"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["date"].errors}
            />
            <TextInput
              name={formFields.time.name}
              value={formData.time.value}
              placeholder={formData.time.placeholder as string}
              isValid={formFieldsState["time"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["time"].errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.description.name}
              value={formData.description.value}
              placeholder={formData.description.placeholder as string}
              isValid={formFieldsState["description"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["description"].errors}
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
                icon={{
                  type: "lottie",
                  animationData: require("../../../assets/lottie/icons/paperplaneIconWhite.json"),
                  style: { height: 25, width: 25 },
                  placement: "before",
                }}
                disabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    //Send Claim
                  } else runValidation(true);
                }}
              >
                Send
              </Button>
            </div>
          </FormRow>
        </FormBody>
      </Reveal>
    </>
  );
};
