import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { PRODUCT_DATA_TYPE } from "../formConstants";
import { sessionContext } from "../../../util/sessionContainer";
import { useServer } from "../../../util/useServer";
import { useLoadingOverlay } from "../../ui/loadingOverlay/loadingOverlay";
import { useAlerter } from "../../ui/alerter/useAlerter";
import { Button } from "../../ui/button/button";
import { getErrorMessage } from "../../../helper/getErrorMessage";

const PERSONAL_INFO_MAP: Record<string, string> = {
  birthday: "birthday",
  email: "email",
  gender: "gender",
  name: "name",
  surname: "surname",
  phone: "phone",
  taxNumber: "taxNumber",
};

export const useAccountDataSharing = ({
  product,
  formHookValidation,
}: {
  product: PRODUCT_DATA_TYPE;
  formHookValidation: (name: string, value: any, showErrors: boolean) => void;
}) => {
  const { t } = useTranslation();

  const { formData, setFormData } = useContext(product.context);

  const customFetch = useServer();
  const loadingOverlay = useLoadingOverlay();
  const alerter = useAlerter();

  const getPersonalInfo = async () => {
    loadingOverlay.open(t("form.accountDataSharing.loading.title"), t("form.accountDataSharing.loading.subTitle"));

    const jsonData = await customFetch("/user/general/personalInfo", {
      method: "GET",
      headers: {},
      body: undefined,
    });

    loadingOverlay.close();

    if (jsonData.status !== 200) {
      alerter.alertMessage(getErrorMessage(jsonData.message));
    } else {
      return jsonData.data;
    }
  };

  const triggerDataSharing = async () => {
    const personalInfo = await getPersonalInfo();

    let sharedObject = {};

    Object.keys(personalInfo).forEach((field) => {
      if (Object.keys(PERSONAL_INFO_MAP).includes(field) && formData[PERSONAL_INFO_MAP[field]]) {
        let value;
        if (field === "birthday") {
          const date = new Date(personalInfo[field]);
          const year = date.getUTCFullYear();
          const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
          const day = date.getUTCDate().toString().padStart(2, "0");
          value = `${year}-${month}-${day}`;
        } else {
          value = personalInfo[field];
        }
        sharedObject = {
          ...sharedObject,
          [PERSONAL_INFO_MAP[field]]: {
            ...formData[PERSONAL_INFO_MAP[field]],
            value: value,
            state: formHookValidation(PERSONAL_INFO_MAP[field], value, true),
          },
        };
      }
    });

    setFormData((prev: any) => {
      return {
        ...prev,
        ...sharedObject,
      };
    });
  };

  const { sessionData } = useContext(sessionContext);

  const render = () => {
    return (
      <div className="w-full">
        {loadingOverlay.render}
        {alerter.render}
        <div className="w-full flex items-center justify-center">
          <div className="w-fit">
            <Button
              buttonType="secondaryAlt"
              onClick={triggerDataSharing}
              padding="py-1 px-10"

              // style={{
              //   paddingRight: 10,
              //   paddingLeft: 10,
              // }}
            >
              {t("Use Account info")}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return {
    render: sessionData.userId && render(),
  };
};
