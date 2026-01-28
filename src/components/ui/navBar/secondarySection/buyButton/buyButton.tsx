import { useNavigate } from "react-router-dom";
import { ScrollPosition } from "../../../../../util/scrollPosition";
import { WindowDimensions } from "../../../../../util/windowDimensions";
import { Button } from "../../../button/button";
import { useTranslation } from "react-i18next";

export const BuyButton = ({ isVisible, isActive, link }: { isVisible: boolean; isActive: boolean; link: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  var scrollPosition: number = ScrollPosition();
  var windowDimensions = WindowDimensions();
  return (
    <div
      className={`flex h-full py-2 items-center justify-center ${
        (scrollPosition > 500 || isVisible) && isActive
          ? "-translate-y-0 transition-transform duration-300"
          : "-translate-y-24 transition-transform duration-300"
      }`}
    >
      <div
        className={`${(scrollPosition > 500 || isVisible) && isActive ? "animate-[bounce2_4s_ease_infinite] uppercase" : ""}`}
      >
        <Button
          buttonType="primary"
          padding="px-6 py-2"
          style={
            windowDimensions.width < 1200
              ? {
                  padding: "12px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }
              : { fontSize: "14px", textTransform: "uppercase" }
          }
          onClick={() => {
            navigate(link);
          }}
        >
          {windowDimensions.width > 1200 ? t("button.insure.long") : t("button.insure.short")}
        </Button>
      </div>
    </div>
  );
};
