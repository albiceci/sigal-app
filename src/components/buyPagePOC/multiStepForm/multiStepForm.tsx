import { useEffect, useRef, useState } from "react";
import { Stepper } from "./stepper/stepper";
import { StepperController } from "./stepperController/stepperController";
import { Reveal } from "../../../util/reveal";
import React from "react";
import { FORM_TYPE, PRODUCT_DATA_TYPE } from "../formConstants";

// Props definition for MultiStepForm component
type multiStepFormProps = {
  title: string;
  stepsData: (FORM_TYPE & {
    element: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<{
        product: PRODUCT_DATA_TYPE;
      }> &
        React.RefAttributes<unknown>
    >; // Component for the form step. Must follow a defined interface.
    product: PRODUCT_DATA_TYPE; // Product context passed to each step, supporting form reuse across products.
    position: number;
  })[];
  onSubmit: () => Promise<void>;
};

export default function MultiStepForm({ title, stepsData, onSubmit }: multiStepFormProps) {
  const [currStep, setcurrStep] = useState<number>(1);

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
    let index = 1;
    while (true) {
      if (index === stepNumber) {
        setcurrStep(index);
        break;
        //@ts-ignore
      } else if (!stepState[stepsData[index - 1].id]) {
        //Checks if the state of the step is valid, or if we have a state saved for the current step. The steps of new products added through bundle don't have states initially.
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
      if (currStep === stepsData.length) onSubmit();
      else changeCurrentStep(currStep + 1);
    }
  };

  /**
   * Updates step validation state whenever the current step changes
   * or its validation result updates. Also forces a component re-render.
   */
  useEffect(() => {
    setRerender((prev) => !prev);

    //Updates the step validation state, or create a step validation state if it doesn't exist. For example when the current step is from a new product added through bundle
    setStepState((prev) => {
      //@ts-ignore
      prev[stepsData[currStep - 1].id] = currentChildRef.current?.isValid ?? false;
      return prev;
    });
  }, [currStep, currentChildRef.current?.isValid]);

  /**
   * When the step data changes (e.g., new products are added),
   * re-evaluate all steps up to the last one.
   */
  useEffect(() => {
    changeCurrentStep(stepsData.length, false);
  }, [stepsData.length]);

  return (
    <div className="w-full min-h-full flex flex-col items-center sm:items-start">
      {stepsData[currStep - 1] ? (
        <>
          <Reveal type="x" width="100%" delay={0}>
            <div ref={formTitleRef} className="h2 text-primary pb-6 text-center w-full">
              {title}
            </div>
          </Reveal>
          <div className="flex-grow flex flex-col w-full sm:flex-row">
            <div className="border-b-2 border-gray-200 p-4 sm:p-6 sm:border-r-2 sm:border-b-0">
              <Stepper stepsData={stepsData} currStep={currStep} onClick={changeCurrentStep} />
            </div>

            <div className="flex-grow py-6 sm:p-6">
              <Reveal height="100%" width="100%" type={null} delay={0}>
                <div className="flex flex-col h-full">
                  <div className="border-b-2 border-gray-200">
                    <div className="hidden sm:block text-sm text-gray-500 font-semibold mb-3">
                      {`Step ${currStep}/${stepsData.length}`}
                    </div>
                    <div className="h3 text-primary mb-3 text-center sm:text-left">
                      {stepsData[currStep - 1].subTitle}
                    </div>
                  </div>
                  <div className="flex-grow z-[2]">
                    {React.createElement(stepsData[currStep - 1].element, {
                      ref: currentChildRef,
                      product: stepsData[currStep - 1].product,
                    })}
                  </div>
                  <div className="z-[1] flex items-center justify-center mt-8 sm:mt-0 sm:justify-end">
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
}
