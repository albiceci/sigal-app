import { forwardRef, useContext, useImperativeHandle } from "react";
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
import { PackageOption } from "../../../packages/packageOption";
import { PackageList } from "../../../packages/packageList";

const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  colorTheme?: string;
  coverages?: string[];
  priceEstimateText?: string;
  value:
    | "d44434c6-bc22-4fda-8d6b-5fdd1e8e948c"
    | "eb4aceca-d9fc-4245-8206-5c1a7ac55ca7"
    | "eb4aceca-d9fc-4245-8206-5c1a2c55ca7"
    | "eb4aceca-d9fc-4245-8206-5c1a355ca7";
}[] = [
  {
    name: "Standard",
    value: "d44434c6-bc22-4fda-8d6b-5fdd1e8e948c",
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
    value: "eb4aceca-d9fc-4245-8206-5c1a7ac55ca7",
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
    value: "eb4aceca-d9fc-4245-8206-5c1a2c55ca7",
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
    name: "Platinium",
    value: "eb4aceca-d9fc-4245-8206-5c1a355ca7",
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
];

const FirstForm = forwardRef((_, ref) => {
  const { formData, setFormData } = useContext(propertyContext);

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

  return (
    <div>
      <Reveal width="100%" delay={0}>
        <FormBody>
          <FormRow>
            <TextInput
              name={formFields.area.name}
              value={formData.area.value}
              helper="Ketu duhet te vendosni siperfaqen e prones"
              placeholder={formData.area.placeholder as string}
              isValid={formData.area.state.isValid}
              onChange={(e) => {
                formHook.handleInputChange(e);
              }}
              errors={formData.area.state.errors}
            />
            <SelectInput
              placeholder={formData.type.placeholder as string}
              name={formData.type.name}
              value={formData.type.value}
              isValid={formData.type.state.isValid}
              options={[
                { id: "apartament", text: "Apartament" },
                { id: "vile", text: "Vilë" },
              ]}
              onOptionChange={(name: string, value: string) => {
                formHook.changeFieldValue({
                  name: "type",
                  value: value,
                });
              }}
              errors={formData.type.state.errors}
            />
          </FormRow>

          <FormRow>
            <SelectInput
              placeholder={formData.region.placeholder as string}
              name={formData.region.name}
              value={formData.region.value}
              isValid={formData.region.state.isValid}
              options={[
                { id: "tirane", text: "Tirane" },
                { id: "durres", text: "Durres" },
              ]}
              onOptionChange={(name: string, value: string) => {
                formHook.changeFieldValue({
                  name: "region",
                  value: value,
                });
              }}
              errors={formData.region.state.errors}
            />
          </FormRow>
          <FormRow>
            <SelectInput
              placeholder={formData.subregion.placeholder as string}
              name={formData.subregion.name}
              value={formData.subregion.value}
              isValid={formData.subregion.state.isValid}
              options={[
                { id: "kamez", text: "Kamez" },
                { id: "laprak", text: "Laprak" },
              ]}
              onOptionChange={(name: string, value: string) => {
                formHook.changeFieldValue({
                  name: "subregion",
                  value: value,
                });
              }}
              errors={formData.subregion.state.errors}
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
        </FormBody>
      </Reveal>
    </div>
  );
});

export default FirstForm;
