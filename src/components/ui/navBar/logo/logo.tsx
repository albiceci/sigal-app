import { Link } from "react-router-dom";
import { ScrollPosition } from "../../../../util/scrollPosition";
import { LogoImage } from "./logoImage";
import { ReactComponent as LogoWhite } from "../../../../assets/sigal/logo/logoSigalWhite.svg";
import { ReactComponent as LogoPrimary } from "../../../../assets/sigal/logo/logoSigalPrimary.svg";

export const Logo = ({ isMovable, theme }: { isMovable: boolean; theme: "primary" | "white" }) => {
  var scrollPosition: number = ScrollPosition();
  return (
    <div
      className={`flex items-center justify-center absolute left-1/2 h-full -translate-x-2/4 w-[150px] ${
        scrollPosition >= 50 || !isMovable ? "xl:w-[150px]" : "xl:w-[175px]"
      }`}
    >
      <Link
        className={`w-full self-center transition-transform duration-[.2s]  ${
          scrollPosition >= 50 || !isMovable ? "translate-y-0 scale-[.8]" : "translate-y-8 scale-[1]"
        }`}
        to="/"
      >
        {theme === "white" ? <LogoPrimary fill={"#000"} /> : <LogoWhite fill={"#000"} />}
      </Link>
    </div>
  );
};
