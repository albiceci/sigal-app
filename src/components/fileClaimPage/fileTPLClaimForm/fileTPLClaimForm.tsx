import { useEffect, useState } from "react";
import { useValidator } from "../../ui/form/validator/useValidator";
import { FormBody } from "../../ui/form/formContainers/formBody";
import { FormRow } from "../../ui/form/formContainers/formRow";
import { TextInput } from "../../ui/form/inputs/textInput/textInput";
import { Reveal } from "../../../util/reveal";
import { formFields, fieldsValidationObject } from "./fileTPLClaimFormTypes";
import { Button } from "../../ui/button/button";
import { useForm } from "../../ui/form/useForm";
import FileInput from "../../ui/form/inputs/fileInput/fileInput";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../helper/getErrorMessage";

export const FileTPLClaimForm = () => {
  const [formData, setFormData] = useState(formFields);
  const [isSent, setIsSent] = useState(false);

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

  async function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // reads file and encodes as Base64
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const onSubmit = async () => {
    const body = {
      ...formData,
      fileUploads: {
        ...formData.fileUploads,
        value: await Promise.all(
          formData.fileUploads.value.map(async (file) => ({
            name: file.name,
            type: file.type,
            size: file.size,
            data: await convertFileToBase64(file), // base64 string
          }))
        ),
      },
    };

    loadingOverlay.open("Please wait", "Filing your claim...");

    const jsonData = await customFetch("/claim/file", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      alerter.alertMessage({ description: null, message: "Claim filed successfully.", type: "success" });
      setIsSent(true);
    }
  };

  return (
    <>
      <Reveal height="100%" width="100%">
        {loadingOverlay.render}
        {alerter.render}
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.name.name}
              value={formData.name.value}
              placeholder={formData.name.placeholder as string}
              isValid={formData.name.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.name.state.errors}
            />
            <TextInput
              name={formFields.surname.name}
              value={formData.surname.value}
              placeholder={formData.surname.placeholder as string}
              isValid={formData.surname.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.surname.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.phone.name}
              value={formData.phone.value}
              placeholder={formData.phone.placeholder as string}
              isValid={formData.phone.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
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
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.email.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.guiltyLicense.name}
              value={formData.guiltyLicense.value}
              placeholder={formData.guiltyLicense.placeholder as string}
              isValid={formData.guiltyLicense.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.guiltyLicense.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.beneficiaryLicense.name}
              value={formData.beneficiaryLicense.value}
              placeholder={formData.beneficiaryLicense.placeholder as string}
              isValid={formData.beneficiaryLicense.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.beneficiaryLicense.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.city.name}
              value={formData.city.value}
              placeholder={formData.city.placeholder as string}
              isValid={formData.city.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.city.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.location.name}
              value={formData.location.value}
              placeholder={formData.location.placeholder as string}
              isValid={formData.location.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.location.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.date.name}
              value={formData.date.value}
              placeholder={formData.date.placeholder as string}
              isValid={formData.date.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.date.state.errors}
            />
            <TextInput
              name={formFields.time.name}
              value={formData.time.value}
              placeholder={formData.time.placeholder as string}
              isValid={formData.time.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.time.state.errors}
            />
          </FormRow>
          <FormRow>
            <TextInput
              name={formFields.description.name}
              value={formData.description.value}
              placeholder={formData.description.placeholder as string}
              isValid={formData.description.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.description.state.errors}
            />
          </FormRow>
          <FormRow>
            <FileInput
              name={formFields.fileUploads.name}
              value={formData.fileUploads.value}
              label="Kliko per te bashkengjitur fotot ne vendngjarje, Raportin Europian te Aksidenteve(REA) dhe/ose procesverbalin e policise."
              onChange={(name: string, value: File[]) => {
                formHook.changeFieldValue({
                  name: "fileUploads",
                  value: value,
                });
              }}
              metadata={{
                MAX_FILES: 7,
              }}
              errors={formData.fileUploads.state.errors}
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
                disabled={!formHook.isValid || isSent}
                onClick={() => {
                  if (formHook.isValid) {
                    onSubmit();
                  } else formHook.validateForm(true);
                }}
              >
                {isSent ? "U dergua" : "Dergo"}
              </Button>
            </div>
          </FormRow>
        </FormBody>
      </Reveal>
    </>
  );
};
