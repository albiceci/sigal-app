import { useTranslation } from "react-i18next";

type stepItemProps = {
  id: number;
  description: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isPending: boolean;
  onClick: (stepNumber: number) => void;
};

export const StepItem = ({ id, description, isCompleted, isCurrent, isPending, onClick }: stepItemProps) => {
  const { t } = useTranslation();
  return (
    <div className={`h-full flex items-center justify-center md:flex-col md:justify-normal md:items-end`}>
      <div className="flex items-center gap-2 justify-center md:justify-end">
        <div
          className={`hidden md:block md:text-base lg:text-xl font-semibold transition duration-500 ease-in-out text-nowrap ${
            isPending ? "text-gray-200" : "text-primary"
          }`}
        >
          {t(description)}
        </div>
        <div
          className={`rounded-full h-8 w-8 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 bg-primary border-2 flex items-center justify-center transition duration-200 ease-in-out cursor-pointer hover:scale-110 ${
            isCompleted
              ? "bg-primary text-white border-transparent"
              : isCurrent
              ? "bg-white text-primary border-primary"
              : "bg-white text-gray-200 border-gray-200 hover:border-gray-400 hover:text-gray-400"
          }`}
          onClick={() => {
            onClick(id);
          }}
        >
          <div className=" font-semibold text-base sm:text-lg">
            {isCompleted ? <span className="w-fit">&#10003;</span> : id}
          </div>
        </div>
        <div
          className={`${
            isCurrent ? "visible" : "hidden"
          } md:hidden md:text-lg lg:text-xl font-semibold transition duration-500 ease-in-out text-nowrap ${
            isPending ? "text-gray-200" : "text-primary"
          }`}
        >
          {t(description)}
        </div>
        <div
          className={`absolute translate-y-[33px] h-4 w-4 border-2 rounded-full border-gray-200 transition duration-500 ease-in-out md:translate-x-[33px] md:translate-y-[0] ${
            isCurrent ? "bg-primary" : "bg-white"
          }`}
        ></div>
      </div>
      <div className="hidden flex-grow py-3 md:block md:w-[2px] md:mr-[25px] lg:mr-[31px]">
        <div
          className={`h-full w-full rounded-full transition duration-500 ease-in-out  md:min-h-4 lg:min-h-5 ${
            isCompleted ? "bg-primary" : "bg-gray-200"
          }`}
        ></div>
      </div>
    </div>
  );
};
