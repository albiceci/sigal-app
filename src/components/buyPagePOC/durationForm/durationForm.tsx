import { formFields } from "./durationFormTypes";
import { fieldsValidationObject } from "./durationFormTypes";

import { FormRow } from "../../ui/form/formContainers/formRow";
import { useContext, useEffect, useState } from "react";
import { DateInput } from "../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";
import { PRODUCT_DATA_TYPE } from "../formConstants";
import { tplContext } from "../carType/tplType/tplContext";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { useForm } from "../../ui/form/useForm";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../../../helper/getErrorMessage";

export const useDurationForm = ({
  product,
  showEndDate = true,
}: {
  product: PRODUCT_DATA_TYPE;
  showEndDate?: boolean;
}) => {
  const { formData, setFormData } = useContext(
    //@ts-ignore
    product.context as typeof tplContext
  );
  const [durations, setDurations] = useState(null);

  const { t } = useTranslation();

  const customFetch = useServer();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formHook.handleInputChange(e);
    if (e.target.name === "begDate") {
      calculateEndDate(formData.durationId.value, e.target.value);
    }
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useEffect(() => {
    getDurations();
  }, []);

  ///////////CUSTOM FUNCTIONS/////////////////////////////////////////////

  const getDurations = async () => {
    const jsonData = await customFetch(`/form/durations?productSiteId=${product.productSiteId}`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setDurations(jsonData.data);

      if (jsonData.data.length === 1) {
        formHook.changeFieldValue({
          name: "durationId",
          value: jsonData.data[0].id,
        });
      }
    }
  };

  const createOption = (): { id: string; text: string }[] => {
    if (durations) {
      //@ts-ignore
      return durations.map((duration) => {
        var text = "";

        if (duration.years > 0) {
          text = `${duration.years} ${t("form.duration.year")}`;
        } else if (duration.months > 0) {
          text = `${duration.months} ${t("form.duration.month")}`;
        } else if (duration.days > 0) {
          text = `${duration.days} ${t("form.duration.day")}`;
        }

        return {
          id: duration.id,
          text: text,
        };
      });
    } else {
      return [
        {
          id: "",
          text: "",
        },
      ];
    }
  };

  const calculateEndDate = (durationIdValue: string, begDateValue: string) => {
    if (begDateValue && durationIdValue && durations) {
      var begDate = new Date(begDateValue);
      //@ts-ignore
      const selectedDuration = durations.filter(
        //@ts-ignore
        (x) => x.id === durationIdValue
      )[0];

      begDate.setDate(begDate.getDate() + selectedDuration.days);
      begDate.setMonth(begDate.getMonth() + selectedDuration.months);
      begDate.setFullYear(begDate.getFullYear() + selectedDuration.years);

      const endDate = `${begDate.getFullYear()}-${String(begDate.getMonth() + 1).padStart(2, "0")}-${String(
        begDate.getDate()
      ).padStart(2, "0")}`;

      formHook.changeFieldValue({
        name: "endDate",
        value: endDate,
      });
    }
  };

  return {
    render: (
      <>
        {loadingOverlay.render}
        {alerter.render}
        <FormRow>
          <SelectInput
            placeholder={formData.durationId.placeholder as string}
            name={formData.durationId.name}
            value={formData.durationId.value}
            isValid={formData.durationId.state.isValid}
            options={createOption()}
            onOptionChange={(name: string, value: string) => {
              formHook.changeFieldValue({
                name: "durationId",
                value: value,
                showErrors: true,
              });
              calculateEndDate(value, formData.begDate.value);
            }}
            errors={formData.durationId.state.errors}
          />
        </FormRow>
        <FormRow>
          <DateInput
            name={formFields.begDate.name}
            value={formData.begDate.value}
            placeholder={formData.begDate.placeholder as string}
            isValid={formData.begDate.state.isValid}
            onChange={(e) => {
              handleChange(e);
            }}
            errors={formData.begDate.state.errors}
            min={(() => {
              if (product.config && product.config.beginDate && product.config.beginDate.minValue !== undefined) {
                const currentDate = new Date();

                currentDate.setDate(currentDate.getDate() + product.config.beginDate.minValue);

                return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(
                  currentDate.getDate()
                ).padStart(2, "0")}`;
              }
              return undefined;
            })()}
          />
          {showEndDate ? (
            <DateInput
              name={formFields.endDate.name}
              value={formData.endDate.value}
              placeholder={formData.endDate.placeholder as string}
              isValid={formData.endDate.state.isValid}
              readOnly
            />
          ) : (
            false
          )}
        </FormRow>
      </>
    ),
    runValidation: formHook.validateForm,
    isValid: formHook.isValid,
  };
};
