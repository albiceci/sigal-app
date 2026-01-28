import { formFields } from "./durationFormTypes";
import { fieldsValidationObject } from "./durationFormTypes";

import { FormRow } from "../../ui/form/formContainers/formRow";
import { useCallback, useContext, useEffect, useState } from "react";
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
import { getMinDateInLocalTime } from "../../../helper/getMinimumDate";

export const useDurationForm = ({
  product,
  showEndDate = true,
}: {
  product: PRODUCT_DATA_TYPE;
  showEndDate?: boolean;
}) => {
  const { formData, setFormData } = useContext(
    //@ts-ignore
    product.context as typeof tplContext,
  );
  const [durations, setDurations] = useState(null);
  const [isDurationLoading, setIsDurationLoading] = useState(true);
  const [isDurationError, setIsDurationError] = useState(false);

  const { t } = useTranslation();

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  ///////////////FORM HOOK/////////////////////////////////////
  const { changeFieldValue, handleInputChange, validateForm, isValid } = useForm<
    typeof formData,
    keyof typeof formFields
  >({
    formData: formData,
    formFields: formFields,
    setFormData: setFormData,
    fieldsValidationObject: fieldsValidationObject,
  });

  //////////////////////ON CHANGE///////////////////////////////

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const handleDurationIdChange = (value: string) => {
    changeFieldValue({
      name: "durationId",
      value: value,
    });
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  useEffect(() => {
    getDurations();
  }, []);

  ///////////CUSTOM FUNCTIONS/////////////////////////////////////////////

  const getDurations = async () => {
    setIsDurationLoading(true);
    const jsonData = await customFetch(`/form/durations?productSiteId=${product.productSiteId}`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      setIsDurationError(true);
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      setIsDurationError(false);
      setDurations(jsonData.data);
      setIsDurationLoading(false);

      if (jsonData.data.length === 1) {
        handleDurationIdChange(jsonData.data[0].id);
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

  const calculateEndDate = useCallback(() => {
    if (formData.begDate.value && formData.durationId.value && durations) {
      var begDate = new Date(formData.begDate.value);
      //@ts-ignore
      const selectedDuration = durations.filter(
        //@ts-ignore
        (x) => x.id === formData.durationId.value,
      )[0];

      begDate.setUTCDate(begDate.getUTCDate() + selectedDuration.days);
      begDate.setUTCMonth(begDate.getUTCMonth() + selectedDuration.months);
      begDate.setUTCFullYear(begDate.getUTCFullYear() + selectedDuration.years);

      const endDate = `${begDate.getUTCFullYear()}-${String(begDate.getUTCMonth() + 1).padStart(2, "0")}-${String(
        begDate.getUTCDate(),
      ).padStart(2, "0")}`;

      changeFieldValue({
        name: "endDate",
        value: endDate,
      });
    }
  }, [formData.begDate.value, formData.durationId.value, durations]);

  useEffect(() => {
    calculateEndDate();
  }, [calculateEndDate]);

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
            options={durations ? createOption() : undefined}
            onOptionChange={(name: string, value: string) => {
              handleDurationIdChange(value);
            }}
            errors={formData.durationId.state.errors}
            isLoading={isDurationLoading}
            isError={isDurationError}
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
            min={getMinDateInLocalTime({
              offset: product.config?.beginDate?.minValue,
            })}
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
    runValidation: validateForm,
    isValid: isValid,
  };
};
