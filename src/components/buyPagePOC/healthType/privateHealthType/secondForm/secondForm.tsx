import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { privateHealthContext } from "../privateHealthContext";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { PackageOption } from "../../../packages/packageOption";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import gold from "./gold.svg";
import goldSelected from "./goldSelected.svg";
import silver from "./silver.svg";
import silverSelected from "./silverSelected.svg";
import standard from "./standard.svg";
import standardSelected from "./standardSelected.svg";
import { Premium } from "../../../premium/premium";
import { PackageList } from "../../../packages/packageList";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  coverages?: string[];
  priceEstimateText?: string;
  value:
    | "fa0739e4-11ef-ed11-b989-00505692fbbd"
    | "ce2f9003-3448-ef11-b9a8-00505692fbbd"
    | "42878124-3448-ef11-b9a8-00505692fbbd";
}[] = [
  {
    name: "Standard",
    value: "42878124-3448-ef11-b9a8-00505692fbbd",
    icon: <img className="h-full" src={standard} alt="" />,
    selectedIcon: <img className="h-full" src={standardSelected} alt="" />,
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
  {
    name: "Silver",
    value: "ce2f9003-3448-ef11-b9a8-00505692fbbd",
    icon: <img className="h-full" src={silver} alt="" />,
    colorTheme: "60,60,60",
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
  {
    name: "Gold",
    value: "fa0739e4-11ef-ed11-b989-00505692fbbd",
    icon: <img className="h-full" src={gold} alt="" />,
    selectedIcon: <img className="h-full" src={goldSelected} alt="" />,
    colorTheme: "239,191,4",
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
];

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof privateHealthContext);

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
                selfState={true}
                errors={formData.begDate.state.errors}
                min={(() => {
                  if (
                    props.product.config &&
                    props.product.config.beginDate &&
                    props.product.config.beginDate.minValue !== undefined
                  ) {
                    const currentDate = new Date();

                    currentDate.setDate(currentDate.getDate() + props.product.config.beginDate.minValue);

                    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    )}-${String(currentDate.getDate()).padStart(2, "0")}`;
                  }
                  return undefined;
                })()}
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
                selfState={true}
                min={(() => {
                  if (formData.begDate.value) {
                    const currentDate = new Date(formData.begDate.value);

                    currentDate.setDate(currentDate.getDate() + 1);

                    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    )}-${String(currentDate.getDate()).padStart(2, "0")}`;
                  }
                  return undefined;
                })()}
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
                    coverages: packageData.coverages,
                    priceEstimateText: packageData.priceEstimateText,
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
