import { useState } from "react";
import { FileTPLClaimForm } from "./fileTPLClaimForm/fileTPLClaimForm";
import { SelectInput } from "../ui/form/inputs/selectInput/selectInput";

function renderSwitch(param: string | null) {
  switch (param) {
    case "":
      return (
        <div className="flex items-center justify-center px-3 py-10">
          <div className="font-semibold text-presetgray">
            Ju lutem zgjidhni llojin e demit
          </div>
        </div>
      );
    case "tpl":
      return <FileTPLClaimForm />;
  }
}

export const FileClaimPageContainer = () => {
  const [selectedType, setSelectedType] = useState<string>("");

  const onSelectChange = (name: string, value: string) => {
    setSelectedType((prev) => {
      return value;
    });
  };

  return (
    //BottomBar padding
    <div className="w-[100vw] min-h-[100dvh] flex items-center justify-center pt-[100px] pb-[100px] lg:py-0">
      <div className="w-[100vw] sm:w-[450px] bg-white rounded-md shadow-lg border p-6">
        <div className="w-full flex items-center justify-center">
          <div className="h2 text-primary pb-4">RAPORTO DEM</div>
        </div>
        <SelectInput
          placeholder={"Lloji i demit"}
          name={"claimType"}
          value={selectedType}
          isValid={selectedType !== ""}
          options={[
            { id: "tpl", text: "TPL" },
            //{ id: "vile", text: "Vilë" },
          ]}
          onOptionChange={onSelectChange}
        />
        <div className="w-full flex items-center justify-center mt-4">
          <div className="bg-gray-50 px-3 rounded-md border w-full">
            {renderSwitch(selectedType)}
          </div>
        </div>
      </div>
    </div>
  );
};
