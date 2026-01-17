import { useState } from "react";
import { formFieldStateType, InputField } from "../../types";
import { TextInput } from "../textInput/textInput";
import { Button } from "../../../button/button";

export const SwitchInput = ({
  fields,
  states,
  onChange,
  onSubmit,
}: {
  fields: InputField<any>[];
  states: formFieldStateType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (name: string, value: string) => void;
}) => {
  const [selectedField, setSelectedField] = useState<number>(0);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex gap-3 z-[2] translate-y-[1px]">
        {fields.map((x, index) => {
          return (
            <div
              className={` border w-32 sm:w-36 md:w-40 lg:w-44 xl:w-52 py-1 text-center text-gray-400 cursor-pointer font-bold ${
                index === selectedField ? "border-b-0 bg-gray-50" : "bg-gray-100"
              }`}
              onClick={() => {
                setSelectedField(index);
              }}
              style={{
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              {x.placeholder}
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-50 p-4 border rounded-md z-[1] flex flex-col items-center justify-center gap-1">
        <div className="w-full">
          <TextInput
            name={fields[selectedField].name}
            value={fields[selectedField].value}
            placeholder={""}
            onChange={(e) => {
              onChange(e);
            }}
            isValid={states[selectedField].isValid}
            errors={states[selectedField].errors}
          />
        </div>
        {onSubmit ? (
          <div>
            <Button
              buttonType="secondary"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
              }}
              icon={{
                type: "lottie",
                animationData: require("../../../../../assets/lottie/icons/searchIconWhite.json"),
                style: { height: 20, width: 20 },
                placement: "before",
              }}
              disabled={!states[selectedField].isValid}
              onClick={() => {
                if (states[selectedField].isValid) {
                  onSubmit(fields[selectedField].name, fields[selectedField].value);
                }
              }}
            >
              Kerko
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
