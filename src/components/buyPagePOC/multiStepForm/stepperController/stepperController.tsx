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
  return (
    <div className="flex gap-3">
      <div>
        <Button
          buttonType="secondaryAlt"
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
          Back
        </Button>
      </div>
      <div>
        <Button
          buttonType="secondary"
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
          {isNextSubmit ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};
