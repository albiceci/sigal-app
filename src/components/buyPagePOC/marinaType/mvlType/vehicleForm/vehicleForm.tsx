import { formFields } from "./vehicleFormTypes";
import { fieldsValidationObject } from "./vehicleFormTypes";

import { useContext } from "react";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { useForm } from "../../../../ui/form/useForm";
import { mvlContext } from "../mvlContext";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";

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
    product.context as typeof mvlContext,
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
              <TextInput
                name={formFields.objectName.name}
                value={formData.objectName.value}
                placeholder={formData.objectName.placeholder as string}
                isValid={formData.objectName.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.objectName.state.errors}
              />
              <SelectInput
                placeholder={formData.objectFlag.placeholder as string}
                name={formData.objectFlag.name}
                value={formData.objectFlag.value}
                isValid={formData.objectFlag.state.isValid}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "objectFlag",
                    value: value,
                  });
                }}
                errors={formData.objectFlag.state.errors}
                enumKey="VesselOriginFlag"
              />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.objectType.placeholder as string}
                name={formData.objectType.name}
                value={formData.objectType.value}
                isValid={formData.objectType.state.isValid}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "objectType",
                    value: value,
                  });
                }}
                errors={formData.objectType.state.errors}
                enumKey="VesselCategoryType"
              />
            </FormRow>

            <FormRow>
              <TextInput
                name={formFields.regNumber.name}
                value={formData.regNumber.value}
                placeholder={formData.regNumber.placeholder as string}
                isValid={formData.regNumber.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.regNumber.state.errors}
              />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.objectMaterialType.placeholder as string}
                name={formData.objectMaterialType.name}
                value={formData.objectMaterialType.value}
                isValid={formData.objectMaterialType.state.isValid}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "objectMaterialType",
                    value: value,
                  });
                }}
                errors={formData.objectMaterialType.state.errors}
                enumKey="VesselMaterial"
              />
              <TextInput
                name={formFields.objectProdYear.name}
                value={formData.objectProdYear.value}
                placeholder={formData.objectProdYear.placeholder as string}
                isValid={formData.objectProdYear.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.objectProdYear.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.objectPower.name}
                value={formData.objectPower.value}
                prefixElement={<span className="font-semibold text-presetgray px-1">KW</span>}
                placeholder={formData.objectPower.placeholder as string}
                isValid={formData.objectPower.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.objectPower.state.errors}
              />
              <TextInput
                name={formFields.objectDimensions.name}
                value={formData.objectDimensions.value}
                placeholder={formData.objectDimensions.placeholder as string}
                isValid={formData.objectDimensions.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.objectDimensions.state.errors}
              />
            </FormRow>
            <FormRow>
              <TextInput
                name={formFields.objectNavigationArea.name}
                value={formData.objectNavigationArea.value}
                placeholder={formData.objectNavigationArea.placeholder as string}
                isValid={formData.objectNavigationArea.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.objectNavigationArea.state.errors}
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
