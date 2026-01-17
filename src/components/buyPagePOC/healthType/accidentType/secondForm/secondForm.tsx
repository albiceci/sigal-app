import { forwardRef, useContext, useImperativeHandle } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { PackageOption } from "../../../packages/packageOption";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import silver from "./silver.svg";
import silverSelected from "./silverSelected.svg";
import standard from "./standard.svg";
import standardSelected from "./standardSelected.svg";
import { Premium } from "../../../premium/premium";
import { accidentContext } from "../accidentContext";
import { PackageList } from "../../../packages/packageList";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  value:
    | "4eae98a8-db9d-ef11-b9ab-00505692fbbd"
    | "dfc12b35-b0a5-ef11-b9ad-00505692fbbd"
    | "ff1cfff4-b0a5-ef11-b9ad-00505692fbbd";
}[] = [
  {
    name: "Standard",
    value: "4eae98a8-db9d-ef11-b9ab-00505692fbbd",
    icon: <img className="h-full" src={standard} alt="" />,
    selectedIcon: <img className="h-full" src={standardSelected} alt="" />,
  },
  // {
  //   name: "Minatore",
  //   value: "dfc12b35-b0a5-ef11-b9ad-00505692fbbd",
  //   icon: <img className="h-full" src={silver} alt="" />,
  //   selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
  // },
  // {
  //   name: "Zjarrfikes",
  //   value: "ff1cfff4-b0a5-ef11-b9ad-00505692fbbd",
  //   icon: <img className="h-full" src={silver} alt="" />,
  //   selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
  // },
];

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof accidentContext);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    ///////////////VALIDATION HOOK/////////////////////////////////////

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid,
    }));

    return (
      <div>
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormRow>
              <DateInput
                name={formFields.begDate.name}
                value={formData.begDate.value}
                helper="Ketu duhet te vendosni daten e fillimit te udhetimit"
                placeholder={formData.begDate.placeholder as string}
                isValid={formData.begDate.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.begDate.state.errors}
              />
              <DateInput
                name={formFields.endDate.name}
                value={formData.endDate.value}
                helper="Ketu duhet te vendosni daten e mbarimit te udhetimit"
                placeholder={formData.endDate.placeholder as string}
                isValid={formData.endDate.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.endDate.state.errors}
              />
            </FormRow>
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
                    colorTheme: packageData.colorTheme,
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
