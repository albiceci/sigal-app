import { formFields } from "./additionalPeopleFormTypes";
import { fieldsValidationObject } from "./additionalPeopleFormTypes";

import { useContext, useEffect, useState } from "react";
import { PRODUCT_DATA_TYPE } from "../formConstants";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { useForm } from "../../ui/form/useForm";
import { privateHealthContext } from "../healthType/privateHealthType/privateHealthContext";
import { personalInfoFormFields, usePersonalInfoForm } from "./personalInfoForm/personalInfoForm";
import { Button } from "../../ui/button/button";
import { Person } from "./person";
import { useTranslation } from "react-i18next";

export const useAdditionalPeopleForm = ({
  product,
  keyword = "form.additionalPeople.family",
  metadata,
}: {
  product: PRODUCT_DATA_TYPE;
  keyword?: string;
  metadata: {
    limit: number;
    includeCoverage?: boolean;
    includeProffesion?: boolean;
  };
}) => {
  const { t } = useTranslation();

  const { formData, setFormData } = useContext(
    //@ts-ignore
    product.context as typeof privateHealthContext
  );

  const [, setReRender] = useState<boolean>(false);

  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  ///////////////FORM HOOK/////////////////////////////////////
  const formHook = useForm<typeof formData, keyof typeof formFields>({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  ///////////CUSTOM FUNCTIONS/////////////////////////////////////////////

  const checkTaxNumberUniqueness = (taxNumber: string) => {
    return !formData.additionalPeople.value.filter((person) => person.taxNumber.value === taxNumber).length
      ? true
      : false;
  };

  const onPersonalInfoFormSubmit = (personalInfo: typeof personalInfoFormFields, submitType: "add" | "edit") => {
    let operationResult = true;
    if (submitType === "add") {
      if (formData.additionalPeople.value.length === metadata.limit) {
        alerter.alertMessage({
          type: "error",
          message: "Limit i personave eshte arritur.",
          description: `Ju nuk mund te shtoni me shume se ${metadata.limit} persona.`,
        });
        operationResult = false;
      } else if (
        (!checkTaxNumberUniqueness(personalInfo.taxNumber.value) ||
          personalInfo.taxNumber.value === formData.taxNumber?.value) &&
        !personalInfo.metadata.value.isOwner
      ) {
        alerter.alertMessage({
          type: "error",
          message: "Numri personal ekziston!",
          description: "Ky number personal eshte ne perdorim. Ju lutem kontrolloni listen e personave.",
        });
        operationResult = false;
      } else {
        setFormData((prev) => {
          return {
            ...prev,
            additionalPeople: {
              ...prev["additionalPeople"],
              value: [...prev.additionalPeople.value, personalInfo],
            },
          };
        });
      }
    } else if (submitType === "edit") {
      setFormData((prev) => {
        return {
          ...prev,
          additionalPeople: {
            ...prev["additionalPeople"],
            value: prev.additionalPeople.value.map((person) => {
              if (person.taxNumber.value === personalInfo.taxNumber.value) {
                return personalInfo;
              } else {
                return person;
              }
            }),
          },
        };
      });
    }
    personalInfoForm.closeForm();
    return operationResult;
  };

  const onPersonRemove = (personalInfo: typeof personalInfoFormFields) => {
    setFormData((prev) => {
      return {
        ...prev,
        additionalPeople: {
          ...prev["additionalPeople"],
          value: prev.additionalPeople.value.filter(
            (person) => person.taxNumber.value !== personalInfo.taxNumber.value
          ),
        },
      };
    });

    setReRender((prev) => {
      return !prev;
    });

    return true;
  };

  const onPersonEdit = (personalInfo: typeof personalInfoFormFields) => {
    personalInfoForm.openForm(personalInfo);
  };

  const personalInfoForm = usePersonalInfoForm({
    onSubmit: onPersonalInfoFormSubmit,
    metadata: {
      includeCoverage: metadata.includeCoverage,
      includeProffesion: metadata.includeProffesion,
    },
  });

  return {
    render: (
      <>
        {loadingOverlay.render}
        {alerter.render}
        {personalInfoForm.render}

        <div className="w-full bg-blue-50 py-6 border border-blue-100 rounded-md flex flex-col items-center justify-center">
          {formData.additionalPeople.value.length ? (
            <>
              <div className="flex gap-1 justify-center text-gray-400 pb-4">
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
                <span className="text-sm font-semibold">{t("form.additionalPeople.clickToChange")}</span>
              </div>
              <div className="mb-6 px-3 w-full flex flex-col gap-4">
                {formData.additionalPeople.value.map((personalInfo) => {
                  return (
                    <Person
                      personalInfo={personalInfo}
                      onRemove={personalInfo.metadata.value.isOwner ? undefined : onPersonRemove}
                      onEdit={personalInfo.metadata.value.isOwner ? undefined : onPersonEdit}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}

          <div>
            <Button
              buttonType="secondary"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
              }}
              onClick={() => {
                if (formData.additionalPeople.value.length === metadata.limit) {
                  alerter.alertMessage({
                    type: "error",
                    message: "Limit i personave eshte arritur.",
                    description: `Ju nuk mund te shtoni me shume se ${metadata.limit} persona.`,
                  });
                } else {
                  personalInfoForm.openForm();
                }
              }}
            >
              {t("form.additionalPeople.add")} {t(keyword)}
            </Button>
          </div>
        </div>
      </>
    ),
    runValidation: formHook.validateForm,
    isValid: formHook.isValid,
    onPersonalInfoFormSubmit,
    onPersonRemove,
  };
};
