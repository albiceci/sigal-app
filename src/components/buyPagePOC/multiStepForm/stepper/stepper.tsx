import { Reveal } from "../../../../util/reveal";
import { FORM_TYPE, PRODUCT_DATA_TYPE } from "../../formConstants";
import { StepItem } from "./stepItem/stepItem";

type stepperProps = {
  stepsData: (FORM_TYPE & {
    element: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<{
        product: PRODUCT_DATA_TYPE;
      }> &
        React.RefAttributes<unknown>
    >;
    product: PRODUCT_DATA_TYPE;
    position: number;
  })[];
  currStep: number;
  onClick: (stepNumber: number) => void;
};

export const Stepper = ({ stepsData, currStep, onClick }: stepperProps) => {
  return (
    <div className="h-fit flex justify-between sm:flex-col sm:h-full sm:min-h-[500px]">
      {stepsData.map((item, index) => {
        return (
          <Reveal key={item.id} width="100%" height="100%" delay={0.1 * index}>
            <div className="w-full h-full">
              <StepItem
                id={item.position}
                description={item.name}
                isCompleted={item.position < currStep}
                isCurrent={item.position === currStep}
                isPending={item.position > currStep}
                onClick={onClick}
              />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
};
