import { AnimatedNumber } from "../../../util/animatedNumber";

export const Premium = ({ value }: { value: string }) => {
  return (
    <div className="w-full flex items-center justify-center">
      {value && value !== "" ? (
        <div className="text-primary bg-blue-50 px-10 pt-1 rounded-lg border border-primary flex flex-col items-center justify-center">
          <div className="h4 text-white bg-primary px-2 py-1 rounded-full">Premium</div>
          <div className="h2">
            <span>L</span>
            <AnimatedNumber value={Number(value)} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
