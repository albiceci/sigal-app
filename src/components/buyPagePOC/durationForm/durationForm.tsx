import { formFields } from "./durationFormTypes";
import { fieldsValidationObject } from "./durationFormTypes";

import { FormRow } from "../../ui/form/formContainers/formRow";
import { useContext, useEffect, useState } from "react";
import { useValidator } from "../../ui/form/validator/useValidator";
import { DateInput } from "../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";
import { PRODUCT_DATA_TYPE } from "../formConstants";
import { tplContext } from "../carType/tplType/tplContext";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";

export const useDurationForm = ({ product }: { product: PRODUCT_DATA_TYPE }) => {
  const { formData, setFormData } = useContext(
    //@ts-ignore
    product.context as typeof tplContext
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const [durations, setDurations] = useState(null);

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
    validationRules: fieldsValidationObject,
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
    if (e.target.name === "begDate") {
      calculateEndDate(formData.durationId.value, e.target.value);
    }
  };

  const onSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name as keyof typeof formFields],
          value: value,
        },
      };
    });
    validateField(name as keyof typeof formFields, value, true);

    calculateEndDate(value, formData.begDate.value);
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    getDurations();
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

  ///////////CUSTOM FUNCTIONS/////////////////////////////////////////////

  const getDurations = async () => {
    const jsonData = await customFetch(`/form/durations?id=${product.productId}`, {
      method: "GET",
    });

    if (jsonData.status !== 200) {
      alerter.alertMessage({ description: null, message: jsonData.message, type: "error" });
    } else {
      setDurations(jsonData.data);
    }
  };

  const createOption = (): { id: string; text: string }[] => {
    if (durations) {
      //@ts-ignore
      return durations.map((duration) => {
        var text = "";

        if (duration.years > 0) {
          text = `${duration.years} Vjecare`;
        } else if (duration.months > 0) {
          text = `${duration.months} Mujore`;
        } else if (duration.days > 0) {
          text = `${duration.days} Ditore`;
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
    if (begDateValue !== "" && durationIdValue !== "" && durations) {
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

      setFormData((prev) => {
        return {
          ...prev,
          endDate: {
            ...prev["endDate"],
            value: endDate,
          },
        };
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
            placeholder="Periudha e sigurimit"
            name={formData.durationId.name}
            value={formData.durationId.value}
            helper="Zgjidhni kohezgjatjen e sigurimit"
            isValid={formFieldsState["durationId"].isValid}
            options={createOption()}
            onOptionChange={onSelectChange}
            errors={formFieldsState["durationId"].errors}
          />
        </FormRow>
        <FormRow>
          <DateInput
            name={formFields.begDate.name}
            value={formData.begDate.value}
            helper="Ketu duhet te vendosni daten e fillimit"
            placeholder={formData.begDate.placeholder as string}
            isValid={formFieldsState["begDate"].isValid}
            onChange={(e) => {
              handleChange(e);
            }}
            errors={formFieldsState["begDate"].errors}
          />
          <DateInput
            name={formFields.endDate.name}
            value={formData.endDate.value}
            placeholder={formData.endDate.placeholder as string}
            isValid={formFieldsState["begDate"].isValid}
            readOnly
          />
        </FormRow>
      </>
    ),
    runValidation,
    isValid,
  };
};
