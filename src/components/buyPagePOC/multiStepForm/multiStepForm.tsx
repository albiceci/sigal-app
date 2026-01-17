import { useEffect, useRef, useState } from "react";
import { Stepper } from "./stepper/stepper";
import { StepperController } from "./stepperController/stepperController";
import { Reveal } from "../../../util/reveal";
import React from "react";
import { DATA_SHARING_TYPE, FORM_TYPE, PRODUCT_DATA_TYPE } from "../formConstants";
import { useTranslation } from "react-i18next";
import { PRODUCT_SITE_ID } from "../productConstants";

// Props definition for MultiStepForm component
type multiStepFormProps = {
  title: string;
  stepsData: (FORM_TYPE & {
    element: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<{
        product: PRODUCT_DATA_TYPE;
        parentProduct?: PRODUCT_DATA_TYPE;
      }> &
        React.RefAttributes<unknown>
    >; // Component for the form step. Must follow a defined interface.
    product: PRODUCT_DATA_TYPE; // Product context passed to each step, supporting form reuse across products.
    position: number;
  })[];
  onSubmit: () => Promise<void>;
};

export const MultiStepForm = React.memo(({ title, stepsData, onSubmit }: multiStepFormProps) => {
  const [currStep, setcurrStep] = useState<number>(1);

  const { t } = useTranslation();

  // Tracks the validation state of each form step.
  const [stepState, setStepState] = useState(stepsData.reduce((acc, step) => ({ ...acc, [step.id]: false }), {}));

  // Forces re-render when needed (e.g., after step state updates).
  const [, setRerender] = useState(false);

  // Holds a reference to the current form step's validation methods and state.
  const currentChildRef = useRef<{
    runValidation: (showErrors: boolean) => void;
    isValid: boolean;
  }>(null);

  // Ref to the form title element used for scrolling.
  const formTitleRef = React.useRef(null);

  // Scrolls to the top of the form when navigating steps.
  const scrollToStart = () => {
    if (formTitleRef !== null) {
      //@ts-ignore
      formTitleRef.current.scrollIntoView();
    }
  };

  // Triggers validation logic on the current form step.
  const runCurrentValidation = (showErrors: boolean) => {
    if (currentChildRef.current) {
      currentChildRef.current.runValidation(showErrors);
    }
  };

  /**
   * Handles step transitions.
   * Iterates through steps until the target step is reached or a validation error is encountered.
   */
  const changeCurrentStep = (stepNumber: number, showErrors: boolean = true) => {
    //Iteration update: The user won't be able to skip steps even if they are valid
    if (stepNumber > currStep + 1) {
      stepNumber = currStep + 1;
    }
    let index = 1;
    while (true) {
      if (index === stepsData.length + 1) {
        onSubmit();
        break;
      } else if (index === stepNumber) {
        setcurrStep(index);
        break;
        //@ts-ignore
      } else if (!stepState[stepsData[index - 1].id]) {
        //Checks if the state of the step is valid, or if we have a state saved for the current step.
        //The steps of new products added through bundle don't have states initially.
        setcurrStep(index);
        runCurrentValidation(showErrors);
        break;
      }

      index++;
    }
  };

  // Handles navigation via stepper controller (back/next).
  const handleControllerClick = (type: "back" | "next") => {
    scrollToStart();
    if (type === "back") changeCurrentStep(currStep - 1);
    else if (type === "next") {
      changeCurrentStep(currStep + 1);
    }
  };

  const getParentProduct = (product: PRODUCT_DATA_TYPE) => {
    let parentProduct: PRODUCT_DATA_TYPE | undefined;

    if (product.type === "bundle") {
      parentProduct = stepsData.filter(
        (step) => step.product.category === product.category && step.product.type === "product"
      )[0].product;
    } else if (product.config && product.config.dataSharing) {
      for (var i = 0; i < stepsData.length; i++) {
        if (stepsData[i].product.productSiteId === product.productSiteId) {
          break;
        }

        if (
          Object.keys(product.config?.dataSharing as Partial<Record<PRODUCT_SITE_ID, DATA_SHARING_TYPE>>).includes(
            stepsData[i].product.productSiteId
          )
        ) {
          parentProduct = stepsData[i].product;
        }
      }
    }
    return parentProduct;
  };

  /**
   * Updates step validation state whenever the current step changes
   * or its validation result updates. Also forces a component re-render.
   */
  useEffect(() => {
    setRerender((prev) => !prev);

    //Updates the step validation state, or create a step validation state if it doesn't exist.
    //For example when the current step is from a new product added through bundle
    setStepState((prev) => {
      //@ts-ignore
      prev[stepsData[currStep - 1].id] = currentChildRef.current?.isValid ?? false;
      return prev;
    });
  }, [currStep, currentChildRef.current?.isValid]);

  /**
   * When the step data changes (e.g., new products are added),
   * re-evaluate all steps up to the current one.
   */
  useEffect(() => {
    changeCurrentStep(currStep, false);
  }, [stepsData.length]);

  return (
    <div className="w-full min-h-full flex flex-col items-center md::items-start">
      {stepsData[currStep - 1] ? (
        <>
          <Reveal type="x" width="100%" delay={0}>
            <div ref={formTitleRef} className="h2 text-primary pb-6 text-center w-full">
              {title}
            </div>
          </Reveal>
          <div className="flex-grow flex flex-col w-full md:flex-row">
            <div className="border-b-2 border-gray-200 p-4 md:p-6 md:border-r-2 md:border-b-0">
              <Stepper stepsData={stepsData} currStep={currStep} onClick={changeCurrentStep} />
            </div>
            <div className="flex-grow py-6 sm:p-6">
              <Reveal height="100%" width="100%" type={null} delay={0}>
                <div className="flex flex-col h-full">
                  <div className="border-b-2 border-gray-200">
                    <div className="hidden md:block text-sm text-gray-500 font-semibold mb-3">
                      {`${t("form.multiStep.step")} ${currStep}/${stepsData.length}`}
                    </div>
                    <div className="h3 text-primary mb-3 text-center md:text-left">
                      {t(stepsData[currStep - 1].subTitle)}
                    </div>
                  </div>
                  <div className="flex-grow z-[2]">
                    {React.createElement(stepsData[currStep - 1].element, {
                      ref: currentChildRef,
                      product: stepsData[currStep - 1].product,
                      parentProduct: getParentProduct(stepsData[currStep - 1].product),
                    })}
                  </div>
                  <div className="z-[1] flex items-center justify-center mt-8 md:mt-0 md:justify-end">
                    <StepperController
                      handleClick={handleControllerClick}
                      isNextValid={currentChildRef.current?.isValid ?? false}
                      isNextSubmit={currStep === stepsData.length}
                      isBackValid={currStep - 1 > 0}
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
});
