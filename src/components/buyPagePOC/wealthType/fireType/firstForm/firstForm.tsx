import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { useValidator } from "../../../../ui/form/validator/useValidator";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { fireContext } from "../../fireType/fireContext";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";

const FirstForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(fireContext);

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
    validateField(
      e.target.name as keyof typeof formFields,
      e.target.value,
      true
    );
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
  };

  ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

  const runValidation = (showErrors: boolean) => {
    validateForm(showErrors);
  };

  useEffect(() => {
    runValidation(false);
  }, []);

  useImperativeHandle(ref, () => ({
    runValidation: runValidation,
    isValid: (
      Object.keys(formFieldsState) as Array<keyof typeof formFieldsState>
    ).filter((field) => !formFieldsState[field].isValid).length
      ? false
      : true,
  }));

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.area.name}
              value={formData.area.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.area.placeholder as string}
              isValid={formFieldsState["area"].isValid}
              onChange={(e) => {
                handleChange(e);
              }}
              errors={formFieldsState["area"].errors}
            />
            <SelectInput
              placeholder={formData.type.placeholder as string}
              name={formData.type.name}
              value={formData.type.value}
              isValid={formFieldsState["type"].isValid}
              options={[
                { id: "apartament", text: "Apartament" },
                { id: "vile", text: "Vilë" },
              ]}
              onOptionChange={onSelectChange}
              errors={formFieldsState["type"].errors}
            />
          </FormRow>

          <FormRow>
            <SelectInput
              placeholder={formData.region.placeholder as string}
              name={formData.region.name}
              value={formData.region.value}
              isValid={formFieldsState["region"].isValid}
              options={[
                { id: "tirane", text: "Tirane" },
                { id: "durres", text: "Durres" },
              ]}
              onOptionChange={onSelectChange}
              errors={formFieldsState["region"].errors}
            />
          </FormRow>
          <FormRow>
            <SelectInput
              placeholder={formData.subregion.placeholder as string}
              name={formData.subregion.name}
              value={formData.subregion.value}
              isValid={formFieldsState["subregion"].isValid}
              options={[
                { id: "kamez", text: "Kamez" },
                { id: "laprak", text: "Laprak" },
              ]}
              onOptionChange={onSelectChange}
              errors={formFieldsState["subregion"].errors}
            />
          </FormRow>
        </FormBody>
      </Reveal>
    </div>
  );
});

export default FirstForm;
