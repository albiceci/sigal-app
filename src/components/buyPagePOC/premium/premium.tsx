import { useTranslation } from "react-i18next";
import { AnimatedNumber } from "../../../util/animatedNumber";

export const Premium = ({ value, currency }: { value: string; currency: string }) => {
  const { t } = useTranslation();
  const currencyMap = {
    ALL: "Lek",
    EUR: "Euro",
  };
  return (
    <div className="w-full flex items-center justify-center">
      {value && value !== "" ? (
        <div className="text-primary bg-blue-50 px-10 pt-1 rounded-lg border border-primary flex flex-col items-center justify-center">
          <div className="h4 text-white bg-primary px-2 py-1 rounded-full">{t("form.premium")}</div>
          <div className="h2">
            <AnimatedNumber value={Number(value).toFixed(2)} />{" "}
            <span>
              {Object.keys(currencyMap).includes(currency)
                ? currencyMap[currency as keyof typeof currencyMap]
                : currency}
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
