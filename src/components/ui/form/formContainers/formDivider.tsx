import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

export const FormDivider = ({ text, style = {} }: { text: string; style?: CSSProperties }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full text-gray-500 flex items-center justify-center gap-6">
      <hr className="flex-grow bg-gray-300 h-[1px] border-none" />
      <div className="text-base font-bold" style={{ ...style }}>
        {t(text)}
      </div>
      <hr className="flex-grow bg-gray-300 h-[1px] border-none" />
    </div>
  );
};
