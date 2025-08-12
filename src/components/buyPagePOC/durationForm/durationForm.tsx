import { formFields } from "./durationFormTypes";
import { fieldsValidationObject } from "./durationFormTypes";

import { FormRow } from "../../ui/form/formContainers/formRow";
import { useContext, useEffect, useState } from "react";
import { useValidator } from "../../ui/form/validator/useValidator";
import { productIDtoContextDict } from "../productIDtoContextDict";
import { DateInput } from "../../ui/form/inputs/dateInput/dateInput";
import { SelectInput } from "../../ui/form/inputs/selectInput/selectInput";

type allowedProductIDs = "00000000-e1fe-43e2-85cd-439ac4c6a857";

export const useDurationForm = ({ productID }: { productID: allowedProductIDs }) => {
  const { formData, setFormData } = useContext(
    //@ts-ignore
    productIDtoContextDict[productID]
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const [durations, setDurations] = useState(null);

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

  const doFetch = async (url: string) => {
    var r = await fetch(url);
    return await r.json();
  };

  const getDurations = async () => {
    const jsonData = await doFetch(`https://6ccc290cd143.ngrok.app/${productID}/durations`);

    setDurations(jsonData.data);
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
