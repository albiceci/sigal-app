export const PackageOption = ({
  name,
  icon,
  isSelected = false,
  onClick,
}: {
  name: string;
  icon: JSX.Element;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`h-full w-48 sm:w-32 md:w-40 lg:w-48 shadow-md flex flex-col hover:scale-110 cursor-pointer transition-[transform] ${
        isSelected ? "shadow-primary bg-blue-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-end p-2 pb-0">
        <div className="w-5 h-5 border text-primary border-primary flex items-center justify-center">
          {isSelected ? <span className="font-extrabold">&#10003;</span> : ""}
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="h-1/5 p-2 pb-5 flex items-center justify-center">
        <span className="text-base font-semibold text-primary text-center">
          {name}
        </span>
      </div>
    </div>
  );
};
