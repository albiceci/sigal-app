import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { PackageOption } from "../../../packages/packageOption";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import option1 from "./option1.svg";
import option1Selected from "./option1Selected.svg";
import option2 from "./option2.svg";
import option2Selected from "./option2Selected.svg";

import { useServer } from "../../../../../util/useServer";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { Premium } from "../../../premium/premium";
import { travelALContext } from "../travelALContext";
import { PackageList } from "../../../packages/packageList";
import { getErrorMessage } from "../../../../../helper/getErrorMessage";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  value: "b27b1c33-4c40-ef11-b9a8-00505692fbbd" | "9c499509-4c40-ef11-b9a8-00505692fbbd";
}[] = [
  {
    name: "Mbulimi 10000 €",
    value: "b27b1c33-4c40-ef11-b9a8-00505692fbbd",
    icon: <img className="h-full" src={option2} alt="" />,
    selectedIcon: <img className="h-full" src={option2Selected} alt="" />,
  },
  {
    name: "Mbulimi 5000 €",
    value: "9c499509-4c40-ef11-b9a8-00505692fbbd",
    icon: <img className="h-full" src={option1} alt="" />,
    selectedIcon: <img className="h-full" src={option1Selected} alt="" />,
  },
];

const SecondForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof travelALContext);

    const hasMounted = useRef(false);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const customFetch = useServer();
    const loadingOverlay = useLoadingOverlay();
    const alerter = useAlerter();

    ///////////////VALIDATION HOOK/////////////////////////////////////

    //////////////////////ON CHANGE///////////////////////////////

    ////////////FORM VALIDATION TRIGGERS//////////////////////////////////

    useImperativeHandle(ref, () => ({
      runValidation: formHook.validateForm,
      isValid: formHook.isValid,
    }));

    const getPremium = async () => {
      const body = {
        data: formData,
        productId: props.product.productId,
      };

      loadingOverlay.open("Please wait", "Calculation premium...");

      const jsonData = await customFetch("/form/premium", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      loadingOverlay.close();

      if (jsonData.status !== 200) {
        alerter.alertMessage(getErrorMessage(jsonData.message));
      } else {
        setFormData((prev) => {
          return {
            ...prev,
            premium: {
              ...prev.premium,
              value: jsonData.data.premiumGross,
            },
            premiumCurrency: {
              ...prev.premiumCurrency,
              value: jsonData.data.premiumCurrency,
            },
          };
        });
      }
    };

    useEffect(() => {
      if (hasMounted.current) {
        if (formData.templateId.value && formData.begDate.state.isValid && formData.endDate.state.isValid) {
          getPremium();
        }
      } else {
        hasMounted.current = true; // Skip the first run
      }
    }, [formData.templateId.value, formData.begDate.value, formData.endDate.value]);

    return (
      <div>
        {loadingOverlay.render}
        {alerter.render}
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
