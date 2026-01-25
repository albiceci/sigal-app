import { useContext } from "react";
import { PRODUCT_DATA_TYPE } from "../formConstants";
import { Overlay } from "../../../util/overlay";
import { FormInputs, InputField } from "../../ui/form/types";
import { Button } from "../../ui/button/button";
import { useTranslation } from "react-i18next";

import info from "./info.svg";

export const formFields: FormInputs<{
  dataSharing: InputField<"checkbox">;
}> = {
  dataSharing: {
    name: "dataSharing",
    type: "checkbox",
    value: true,
    state: {
      isValid: false,
      errors: [],
    },
  },
};
export const useDataSharing = ({
  product,
  parentProduct,
  formHookValidation,
}: {
  product: PRODUCT_DATA_TYPE;
  parentProduct: PRODUCT_DATA_TYPE | undefined;
  formHookValidation: (name: string, value: any, showErrors: boolean) => void;
}) => {
  const { t } = useTranslation();

  const { formData, setFormData } = useContext(product.context);
  const parentContext = useContext(parentProduct?.context || product.context);

  const sharedFields =
    parentProduct &&
    product.config?.dataSharing &&
    Object.keys(product.config.dataSharing).includes(parentProduct.productSiteId)
      ? product.config.dataSharing[parentProduct.productSiteId]?.fields
      : undefined;

  const disabledDataSharing = () => {
    setFormData((prev: any) => {
      return {
        ...prev,

        dataSharing: {
          ...prev["dataSharing"],
          value: false,
        },
      };
    });
  };

  const triggerDataSharing = () => {
    let sharedObject = {};

    if (sharedFields) {
      sharedFields.forEach((field) => {
        if (Object.keys(formData).includes(field) && Object.keys(parentContext.formData).includes(field)) {
          sharedObject = {
            ...sharedObject,
            [field]: {
              ...formData[field],
              value: parentContext.formData[field].value,
              state: formHookValidation(field, parentContext.formData[field].value, true),
            },
          };
        }
      });
    }

    setFormData((prev: any) => {
      return {
        ...prev,
        ...sharedObject,
        dataSharing: {
          ...prev["dataSharing"],
          value: false,
        },
      };
    });
  };

  const render = () => {
    return (
      <>
        <Overlay>
          <div className="flex items-center justify-center">
            <div className="py-2 px-4 bg-white rounded-md flex flex-col items-center justify-center max-w-[95%]">
              <div className="w-full flex justify-end h-fit">
                <span onClick={disabledDataSharing} className="text-xl p-1 cursor-pointer text-presetblack">
                  x
                </span>
              </div>
              <div className="pb-6 px-4 flex flex-col items-center justify-center gap-6">
                <div className=" bg-blue-50 p-3 rounded-full">
                  <img src={info} alt={"info"} className="w-[30px]"></img>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                  <span className="text-xl font-bold text-presetblack">Do you want to reuse your data?</span>
                  <span className="text-sm font-bold text-presetgray text-center">
                    Ju do te jeni ne gjendje ti ndryshoni te dhenat ne cdo kohe.
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="w-fit">
                    <Button
                      buttonType="secondary"
                      onClick={triggerDataSharing}
                      padding="py-1 px-10"

                      // style={{
                      //   paddingRight: 10,
                      //   paddingLeft: 10,
                      // }}
                    >
                      {t("Po")}
                    </Button>
                  </div>
                  <div className="w-fit">
                    <Button
                      buttonType="secondaryAlt"
                      onClick={disabledDataSharing}
                      padding="py-1 px-10"

                      // style={{
                      //   paddingRight: 10,
                      //   paddingLeft: 10,
                      // }}
                    >
                      {t("Jo")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Overlay>
      </>
    );
  };

  return {
    render: formData.dataSharing && formData.dataSharing.value && sharedFields && render(),
  };
};
