import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";
import { useAdditionalPeopleForm } from "../../../additionalPeopleForm/additionalPeopleForm";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { Premium } from "../../../premium/premium";
import { accidentContext } from "../accidentContext";

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof accidentContext);
    let includeAdditionalFields = false;
    if (formData.templateId.value === "4eae98a8-db9d-ef11-b9ab-00505692fbbd") {
      includeAdditionalFields = true;
    }

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,

      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: {
        ...fieldsValidationObject,
        ...(includeAdditionalFields ? {} : { coverage: [], profession: [] }),
      },
    });

    const additionalPeopleForm = useAdditionalPeopleForm({
      product: props.product,
      metadata: { limit: 4, ...(includeAdditionalFields ? { includeCoverage: true, includeProffesion: true } : {}) },
    });

    ///////////////VALIDATION HOOK/////////////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    const checkTaxNumberUniqueness = (taxNumber: string) => {
      return !formData.additionalPeople.value.filter((person) => person.taxNumber.value === taxNumber).length
        ? true
        : false;
    };

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid && checkTaxNumberUniqueness(formData.taxNumber.value),
    }));

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormRow>
              <TextInput
                name={formFields.name.name}
                value={formData.name.value}
                //helper="Ketu duhet te vendosni siperfaqen e prones"
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
                //helper="Ketu duhet te vendosni siperfaqen e prones"
                placeholder={formData.surname.placeholder as string}
                isValid={formData.surname.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
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
                  { id: "Male", text: "Mashkull" },
                  { id: "Female", text: "Femer" },
                ]}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "gender",
                    value: value,
                    showErrors: true,
                  });
                }}
                errors={formData.gender.state.errors}
              />
              <DateInput
                name={formFields.birthday.name}
                value={formData.birthday.value}
                placeholder={formData.birthday.placeholder as string}
                isValid={formData.birthday.state.isValid}
                selfState={true}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.birthday.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.taxNumber.name}
                value={formData.taxNumber.value}
                //helper="Ketu duhet te vendosni siperfaqen e prones"
                placeholder={formData.taxNumber.placeholder as string}
                isValid={formData.taxNumber.state.isValid && checkTaxNumberUniqueness(formData.taxNumber.value)}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={(() => {
                  if (!checkTaxNumberUniqueness(formData.taxNumber.value)) {
                    return [...formData.taxNumber.state.errors, "Numri personal eshte ne perdorim."];
                  }
                  return formData.taxNumber.state.errors;
                })()}
              />
            </FormRow>
            {includeAdditionalFields ? (
              <FormRow>
                <TextInput
                  name={formFields.coverage.name}
                  value={formData.coverage.value}
                  //helper="Ketu duhet te vendosni siperfaqen e prones"
                  placeholder={formData.coverage.placeholder as string}
                  selfState={true}
                  isValid={formData.coverage.state.isValid}
                  onChange={(e) => {
                    formHook.handleInputChange(e);
                  }}
                  errors={formData.coverage.state.errors}
                />
                <SelectInput
                  placeholder={formData.profession.placeholder as string}
                  name={formData.profession.name}
                  value={formData.profession.value}
                  isValid={formData.profession.state.isValid}
                  options={[
                    { id: "Administrate", text: "Administrate" },
                    { id: "Ndertim", text: "Ndertim" },
                    { id: "Manual", text: "Manual" },
                    { id: "Ekzekutive", text: "Ekzekutive" },
                  ]}
                  onOptionChange={(name: string, value: string) => {
                    formHook.changeFieldValue({
                      name: "profession",
                      value: value,
                      showErrors: true,
                    });
                  }}
                  errors={formData.profession.state.errors}
                />
              </FormRow>
            ) : undefined}

            <FormRow>
              <TextInput
                name={formFields.email.name}
                value={formData.email.value}
                //helper="Ketu duhet te vendosni siperfaqen e prones"
                placeholder={formData.email.placeholder as string}
                isValid={formData.email.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.email.state.errors}
              />
              <TextInput
                name={formFields.phone.name}
                value={formData.phone.value}
                //helper="Ketu duhet te vendosni siperfaqen e prones"
                placeholder={formData.phone.placeholder as string}
                isValid={formData.phone.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.phone.state.errors}
              />
            </FormRow>
            {additionalPeopleForm.render}
            <FormRow>
              <Premium value={formData.premium.value} currency={formData.premiumCurrency.value} />
            </FormRow>
          </FormBody>
        </Reveal>
      </div>
    );
  }
);

export default FirstForm;
