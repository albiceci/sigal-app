import { forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { Reveal } from "../../../../../../util/reveal";

import { FormBody } from "../../../../../ui/form/formContainers/formBody";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { PRODUCT_DATA_TYPE } from "../../../../formConstants";

import { Premium } from "../../../../premium/premium";
import { FormRow } from "../../../../../ui/form/formContainers/formRow";
import { useForm } from "../../../../../ui/form/useForm";
import { autososContext } from "../../autososContext";

import { useDurationForm } from "../../../../durationForm/durationForm";
import { tplContext } from "../../../tplType/tplContext";
import { PackageList } from "../../../../packages/packageList";
import { packageOptionsData } from "../../packageConstants";

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
      parentProduct: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof autososContext);
    const parentContext = useContext(props.parentProduct.context as typeof tplContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const durationForm = useDurationForm({
      product: props.product,
    });

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    const runValidation = (showErrors: boolean) => {
      formHook.validateForm(showErrors);
      durationForm.runValidation(showErrors);
    };

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid,
    }));

    useEffect(() => {
      runValidation(false);
    }, []);

    useEffect(() => {
      setFormData((prev) => {
        return {
          ...prev,
          ...Object.fromEntries(
            Object.entries(parentContext.formData).filter(
              ([key]) =>
                key in formData &&
                !(key in formFields) &&
                key !== "durationId" &&
                key !== "begDate" &&
                key !== "endDate" &&
                key !== "templateId"
            )
          ),
        };
      });
    }, [parentContext.formData]);

    useEffect(() => {
      formHook.changeFieldValue({
        name: "durationCompleted",
        value: durationForm.isValid,
        showErrors: false,
      });
    }, [durationForm.isValid]);

    //////////////////////CUSTOM FUNCTIONS/////////////////////////////////////

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            {durationForm.render}
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
