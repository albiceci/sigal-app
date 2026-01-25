import error from "./assets/errorWhite.svg";

export const ErrorMessage = ({ description, message }: { description: string; message: string }) => {
  return (
    <div className="w-full bg-red-500 flex gap-3 px-3 py-2 items-center rounded-md">
      <img className="w-7 h-7" src={error} alt="Error Icon" />
      <div className="flex flex-col text-white">
        <span className="text-lg font-bold">{message}</span>
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
};
