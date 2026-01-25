import { formFields } from "./vehicleFormTypes";
import { fieldsValidationObject } from "./vehicleFormTypes";

import { useContext } from "react";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { useForm } from "../../../../ui/form/useForm";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { borderContext } from "../borderContext";

export const useVehicleForm = ({
  product,
  metadata,
}: {
  product: PRODUCT_DATA_TYPE;
  keyword?: string;
  metadata?: {};
}) => {
  const { formData, setFormData } = useContext(
    //@ts-ignore
    product.context as typeof borderContext,
  );

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

  return {
    render: (
      <>
        {loadingOverlay.render}
        {alerter.render}

        <div className="bg-gray-50 px-4 rounded-md border">
          <FormBody>
            <FormRow>
              <SelectInput
                placeholder={formData.category.placeholder as string}
                name={formData.category.name}
                value={formData.category.value}
                options={[
                  { id: "A/1", text: "form.option.category.cars" },
                  { id: "B/1", text: "form.option.category.motorbike" },
                  { id: "B/2", text: "form.option.category.motorizedTricycle" },
                  { id: "C/1", text: "form.option.category.truck1" },
                  { id: "C/2", text: "form.option.category.truck2" },
                  { id: "D/1", text: "form.option.category.moped" },
                  { id: "E/1", text: "form.option.category.bus" },
                  { id: "F/1", text: "form.option.category.truckTrailer" },
                  { id: "F/2", text: "form.option.category.busTrailer" },
                  { id: "F/3", text: "form.option.category.otherTrailers" },
                ]}
                isValid={formData.category.state.isValid}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "category",
                    value: value,
                  });
                }}
                errors={formData.category.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.licence.name}
                value={formData.licence.value}
                placeholder={formData.licence.placeholder as string}
                isValid={formData.licence.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.licence.state.errors}
              />
              <TextInput
                name={formFields.vin.name}
                value={formData.vin.value}
                placeholder={formData.vin.placeholder as string}
                isValid={formData.vin.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.vin.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.make.name}
                value={formData.make.value}
                placeholder={formData.make.placeholder as string}
                isValid={formData.make.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.make.state.errors}
              />
              <TextInput
                name={formFields.model.name}
                value={formData.model.value}
                placeholder={formData.model.placeholder as string}
                isValid={formData.model.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.model.state.errors}
              />
            </FormRow>

            <FormRow>
              <TextInput
                name={formFields.year.name}
                value={formData.year.value}
                placeholder={formData.year.placeholder as string}
                isValid={formData.year.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.year.state.errors}
              />
              <TextInput
                name={formFields.peoplecapacity.name}
                value={formData.peoplecapacity.value}
                placeholder={formData.peoplecapacity.placeholder as string}
                isValid={formData.peoplecapacity.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.peoplecapacity.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.power.name}
                value={formData.power.value}
                placeholder={formData.power.placeholder as string}
                isValid={formData.power.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.power.state.errors}
              />
              <TextInput
                name={formFields.weightcapacity.name}
                value={formData.weightcapacity.value}
                placeholder={formData.weightcapacity.placeholder as string}
                isValid={formData.weightcapacity.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.weightcapacity.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.color.name}
                value={formData.color.value}
                placeholder={formData.color.placeholder as string}
                isValid={formData.color.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.color.state.errors}
              />
              <TextInput
                name={formFields.region.name}
                value={formData.region.value}
                placeholder={formData.region.placeholder as string}
                isValid={formData.region.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.region.state.errors}
              />
            </FormRow>
          </FormBody>
        </div>
      </>
    ),
    runValidation: formHook.validateForm,
    isValid: formHook.isValid,
  };
};
