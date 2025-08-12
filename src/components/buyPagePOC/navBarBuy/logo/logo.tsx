import { Link } from "react-router-dom";
import { ReactComponent as LogoPrimary } from "../../../../assets/sigal/logo/logoSigalPrimary.svg";

export const Logo = () => {
  return (
    <div
      className={`flex items-center justify-center absolute left-1/2 h-[70px] lg:h-[100px] -translate-x-2/4 w-[150px] lg:w-[175px]`}
    >
      <Link
        className={`w-full self-center transition-transform duration-[.2s] translate-y-8 scale-[1]`}
        to="/"
      >
        <LogoPrimary />
      </Link>
    </div>
  );
};
