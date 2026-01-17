import { Reveal } from "../../../util/reveal";
import info from "./info.svg";

export function InfoNotes({ text }: { text: string }) {
  return (
    <Reveal width="100%" height="100%">
      <div className="bg-blue-100 border border-blue-200 rounded-md px-5 py-3 flex gap-5 items-center">
        <div className="w-6 h-6 min-w-6 min-h-6">
          <img src={info} alt="" />
        </div>
        <div className="font-normal text-[#1C274C]">{text}</div>
      </div>
    </Reveal>
  );
}
