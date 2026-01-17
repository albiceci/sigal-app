import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { Reveal } from "../../../../../util/reveal";
import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { formFields, fieldsValidationObject } from "./secondFormTypes";
import { teleHealthContext } from "../teleHealthContext";
import { DateInput } from "../../../../ui/form/inputs/dateInput/dateInput";
import { PackageOption } from "../../../packages/packageOption";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useForm } from "../../../../ui/form/useForm";

import silver from "./silver.svg";
import silverSelected from "./silverSelected.svg";

import { useServer } from "../../../../../util/useServer";
import { useLoadingOverlay } from "../../../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { Premium } from "../../../premium/premium";
import { useDurationForm } from "../../../durationForm/durationForm";
import { PackageList } from "../../../packages/packageList";
import { getErrorMessage } from "../../../../../helper/getErrorMessage";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  coverages?: string[];
  priceEstimateText?: string;
  value:
    | "e0bcc8d1-e05b-f011-b9b4-00505692fbbd"
    | "b135c1cb-e05b-f011-b9b4-00505692fbbd"
    | "1d657166-5f61-f011-b9b4-00505692fbbd"
    | "a235c1cb-e05b-f011-b9b4-00505692fbbd";
}[] = [
  {
    name: "Executive",
    value: "e0bcc8d1-e05b-f011-b9b4-00505692fbbd",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
  {
    name: "Premium",
    value: "b135c1cb-e05b-f011-b9b4-00505692fbbd",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
  {
    name: "Comfort 2",
    value: "1d657166-5f61-f011-b9b4-00505692fbbd",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    coverages: ["Mbulimi 1", "Mbulimi 2", "Mbulimi 3", "Mbulimi 4"],
    priceEstimateText: "Duke filluar nga 20000L",
  },
  {
    name: "Comfort 1",
    value: "a235c1cb-e05b-f011-b9b4-00505692fbbd",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
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
    const { formData, setFormData } = useContext(props.product.context as typeof teleHealthContext);

    const hasMounted = useRef(false);

    const formHook = useForm<typeof formData, keyof typeof formFields>({
      formData: formData,
      formFields: formFields,
      setFormData: setFormData,
      fieldsValidationObject: fieldsValidationObject,
    });

    const durationForm = useDurationForm({
      product: props.product,
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
        if (formData.templateId.value && formData.begDate.value && formData.durationId.value) {
          getPremium();
        }
      } else {
        hasMounted.current = true; // Skip the first run
      }
    }, [formData.templateId.value, formData.begDate.value, formData.durationId.value]);

    return (
      <div>
        {loadingOverlay.render}
        {alerter.render}
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
