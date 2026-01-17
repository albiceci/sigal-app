import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";

import { Premium } from "../../../premium/premium";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { useForm } from "../../../../ui/form/useForm";
import { autososContext } from "../autososContext";
import { PackageList } from "../../../packages/packageList";
import { packageOptionsData } from "../packageConstants";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof autososContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid,
    }));

    //////////////////////CUSTOM FUNCTIONS/////////////////////////////////////

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormRow>
              <PackageList
                packageList={packageOptionsData.map((packageData, index) => {
                  return {
                    name: packageData.name,
                    isSelected: formData.templateId.value === packageData.value,
                    focus:
                      formData.templateId.value !== null ? formData.templateId.value === packageData.value : undefined,
                    icon: packageData.icon,
                    selectedIcon: packageData.selectedIcon,

                    onClick: () => {
                      formHook.changeFieldValue({
                        name: "templateId",
                        value: packageData.value,
                      });
                    },
                  };
                })}
              />
            </FormRow>
            <FormRow>
              <></>
            </FormRow>
            <FormRow>
              <Premium value={formData.premium.value} currency={formData.premiumCurrency.value} />
            </FormRow>
          </FormBody>
        </Reveal>
      </div>
    );
  }
);

export default SecondForm;
