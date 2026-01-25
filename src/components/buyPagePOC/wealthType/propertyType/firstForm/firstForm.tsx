import { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from "react";
import { Reveal } from "../../../../../util/reveal";

import { FormBody } from "../../../../ui/form/formContainers/formBody";
import { FormRow } from "../../../../ui/form/formContainers/formRow";
import { TextInput } from "../../../../ui/form/inputs/textInput/textInput";
import { formFields, fieldsValidationObject } from "./firstFormTypes";
import { propertyContext } from "../propertyContext";
import { SelectInput } from "../../../../ui/form/inputs/selectInput/selectInput";
import { useForm } from "../../../../ui/form/useForm";

import silver from "./silver.svg";
import silverSelected from "./silverSelected.svg";
import standard from "./standard.svg";
import standardSelected from "./standardSelected.svg";
import { PackageList } from "../../../packages/packageList";
import { PRODUCT_DATA_TYPE } from "../../../formConstants";
import { useServer } from "../../../../../util/useServer";
import { useAlerter } from "../../../../ui/alerter/useAlerter";
import { getErrorMessage } from "../../../../../helper/getErrorMessage";
import { Premium } from "../../../premium/premium";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  coverages?: string[];
  priceEstimateText?: string;
  value:
    | "8a13b62d-659e-4dc7-9f06-9cfb76bad379"
    | "618ed7d0-4f32-490c-9dc3-4befc1f5af4f"
    | "427a81de-7f4c-4146-a6f1-2c17bb6d4831";
}[] = [
  {
    name: "Standard",
    value: "8a13b62d-659e-4dc7-9f06-9cfb76bad379",
    icon: <img className="h-full" src={standard} alt="" />,
    selectedIcon: <img className="h-full" src={standardSelected} alt="" />,
    priceEstimateText: "Duke filluar nga 20000L",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Tërmeti",
    ],
  },
  {
    name: "Silver",
    value: "618ed7d0-4f32-490c-9dc3-4befc1f5af4f",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    priceEstimateText: "Duke filluar nga 25000L",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Tërmeti",
      "Permbytje",
    ],
  },
  {
    name: "Gold",
    value: "427a81de-7f4c-4146-a6f1-2c17bb6d4831",
    icon: <img className="h-full" src={silver} alt="" />,
    selectedIcon: <img className="h-full" src={silverSelected} alt="" />,
    priceEstimateText: "Duke filluar nga 25000L",
    coverages: [
      "Zjarri",
      "Rrufe",
      "Eksplozion",
      "Përplasjes ose rënies së një avioni, pjesëve ose ngarkesës së tij",
      "Tërmeti",
      "Permbytje",
      "Stuhia",
    ],
  },
];

const FirstForm = forwardRef(
  (
    props: {
      product: PRODUCT_DATA_TYPE;
    },
    ref,
  ) => {
    const { formData, setFormData } = useContext(props.product.context as typeof propertyContext);
    const [cities, setCities] = useState<{ id: string; displayName: string }[] | null>(null);
    const [cadastralZones, setCadastralZones] = useState<{ id: string; displayName: string; number: string }[] | null>(
      null,
    );
    const [isCitiesLoading, setIsCitiesLoading] = useState(true);
    const [isCitiesError, setIsCitiesError] = useState(false);
    const [isCadastralZoneLoading, setIsCadastralZoneLoading] = useState(false);
    const [isCadastralZoneError, setIsCadastralZoneError] = useState(false);

    const customFetch = useServer();
    const { alertMessage, render } = useAlerter();

    ///////////////VALIDATION HOOK/////////////////////////////////////
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

    const getCities = useCallback(async () => {
      setIsCitiesLoading(true);
      const jsonData = await customFetch(`/form/cities`, {
        method: "POST",
        body: {},
      });

      if (jsonData.status !== 200) {
        setIsCitiesError(true);
        alertMessage(getErrorMessage(jsonData.message));
      } else {
        setIsCitiesLoading(false);
        setCities(jsonData.data);
        setIsCitiesError(false);
      }
    }, [alertMessage, customFetch]);

    const getCadastralZone = useCallback(
      async (cityName: string) => {
        if (!cities) return;

        setIsCadastralZoneLoading(true);

        if (!cityName) {
          setIsCadastralZoneError(true);
        } else {
          const jsonData = await customFetch(`/form/cities/cadastralzone`, {
            method: "POST",
            body: {
              city: cityName,
            },
          });

          if (jsonData.status !== 200) {
            setIsCadastralZoneError(true);
            alertMessage(getErrorMessage(jsonData.message));
          } else {
            setIsCadastralZoneLoading(false);
            setCadastralZones(jsonData.data);
            setIsCadastralZoneError(false);
          }
        }
      },
      [alertMessage, customFetch, cities],
    );

    useEffect(() => {
      getCities();
    }, [getCities]);

    useEffect(() => {
      if (formData.region.value) getCadastralZone(formData.region.value);
    }, [formData.region.value, getCadastralZone]);

    return (
      <div>
        {render}
        <Reveal width="100%" delay={0}>
          <FormBody>
            <FormRow>
              <TextInput
                name={formFields.insuredSum.name}
                value={formData.insuredSum.value}
                placeholder={formData.insuredSum.placeholder as string}
                prefixElement={<span className="font-semibold text-presetgray px-1">Lek</span>}
                valueType="number"
                isValid={formData.insuredSum.state.isValid}
                onValueChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "insuredSum",
                    value: value,
                  });
                }}
                errors={formData.insuredSum.state.errors}
                selfState={true}
              />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.type.placeholder as string}
                name={formData.type.name}
                value={formData.type.value}
                containerStyle={{ minWidth: "240px" }}
                isValid={formData.type.state.isValid}
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "type",
                    value: value,
                  });
                }}
                errors={formData.type.state.errors}
                enumKey="PropertyType"
              />
              <TextInput
                name={formFields.area.name}
                value={formData.area.value}
                placeholder={formData.area.placeholder as string}
                prefixElement={
                  <span className="font-semibold text-presetgray px-1">
                    m<sup>2</sup>
                  </span>
                }
                isValid={formData.area.state.isValid}
                onChange={(e) => {
                  formHook.handleInputChange(e);
                }}
                errors={formData.area.state.errors}
              />
            </FormRow>

            <FormRow>
              <SelectInput
                placeholder={formData.region.placeholder as string}
                name={formData.region.name}
                value={formData.region.value}
                isValid={formData.region.state.isValid}
                options={
                  cities
                    ? cities
                        .sort((a, b) => {
                          return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
                        })
                        .map((city) => {
                          return {
                            id: city.displayName,
                            text: city.displayName,
                          };
                        })
                    : []
                }
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "region",
                    value: value,
                  });
                  formHook.changeFieldValue({
                    name: "subregion",
                    value: "",
                    showErrors: false,
                  });
                }}
                errors={formData.region.state.errors}
                isLoading={isCitiesLoading}
                isError={isCitiesError}
              />
            </FormRow>
            <FormRow>
              <SelectInput
                placeholder={formData.subregion.placeholder as string}
                name={formData.subregion.name}
                value={formData.subregion.value}
                isValid={formData.subregion.state.isValid}
                options={
                  cadastralZones
                    ? cadastralZones
                        .sort((a, b) => {
                          return a.number.toLowerCase().localeCompare(b.number.toLowerCase());
                        })
                        .map((city) => {
                          return {
                            id: city.number,
                            text: city.number,
                          };
                        })
                    : []
                }
                onOptionChange={(name: string, value: string) => {
                  formHook.changeFieldValue({
                    name: "subregion",
                    value: value,
                  });
                }}
                errors={formData.subregion.state.errors}
                isLoading={isCadastralZoneLoading}
                isError={isCadastralZoneError}
              />
            </FormRow>
            <FormRow>
              <PackageList
                packageList={packageOptionsData.map((packageData, index) => {
                  return {
                    name: packageData.name,
                    isSelected: formData.customTemplateId.value === packageData.value,
                    focus:
                      formData.customTemplateId.value !== null
                        ? formData.customTemplateId.value === packageData.value
                        : undefined,
                    icon: packageData.icon,
                    selectedIcon: packageData.selectedIcon,
                    colorTheme: packageData.colorTheme,
                    coverages: packageData.coverages,
                    priceEstimateText: packageData.priceEstimateText,
                    onClick: () => {
                      formHook.changeFieldValue({
                        name: "customTemplateId",
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
  },
);

export default FirstForm;
