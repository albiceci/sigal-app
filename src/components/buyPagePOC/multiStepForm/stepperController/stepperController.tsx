import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/button/button";

export const StepperController = ({
  handleClick,
  isNextValid,
  isNextSubmit,
  isBackValid,
}: {
  handleClick: (type: "back" | "next") => void;
  isNextValid: boolean;
  isNextSubmit: boolean;
  isBackValid: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-3 w-full md:w-fit">
      <div className="flex-grow">
        <Button
          buttonType="secondaryAlt"
          padding="py-3 px-4 md:px-8"
          onClick={() => {
            if (isBackValid) handleClick("back");
          }}
          disabled={!isBackValid}
          icon={{
            type: "lottie",
            animationData: require("../../../../assets/lottie/icons/leftArrowIconPrimary.json"),
            style: {
              height: 25,
              width: 30,
            },
            placement: "before",
          }}
        >
          {t("form.controller.back")}
        </Button>
      </div>
      <div className="flex-grow">
        <Button
          buttonType="secondary"
          padding="py-3 px-4 md:px-8"
          onClick={() => {
            handleClick("next");
          }}
          icon={{
            type: "lottie",
            animationData: require("../../../../assets/lottie/icons/rightArrowIconWhite.json"),
            style: {
              height: 25,
              width: 30,
            },
            placement: "after",
          }}
          disabled={!isNextValid}
          // style={{
          //   paddingRight: 10,
          //   paddingLeft: 10,
          // }}
        >
          {isNextSubmit ? t("form.controller.submit") : t("form.controller.next")}
        </Button>
      </div>
    </div>
  );
};
