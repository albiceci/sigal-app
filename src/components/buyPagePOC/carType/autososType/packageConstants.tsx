import albania from "./albania.svg";
import europe from "./europe.svg";
import albaniaSelected from "./albaniaSelected.svg";
import europeSelected from "./europeSelected.svg";
export const packageOptionsData: {
  name: string;
  icon: JSX.Element;
  selectedIcon: JSX.Element;
  value: "84249ec5-997c-ee11-b98f-00505692fbbd" | "a1ef554e-cb16-f011-b9ae-00505692fbbd";
}[] = [
  {
    name: "Shqiperi",
    value: "84249ec5-997c-ee11-b98f-00505692fbbd",
    icon: <img className="h-full" src={albania} alt="" />,
    selectedIcon: <img className="h-full" src={albaniaSelected} alt="" />,
  },
  {
    name: "Europe",
    value: "a1ef554e-cb16-f011-b9ae-00505692fbbd",
    icon: <img className="h-full" src={europe} alt="" />,
    selectedIcon: <img className="h-full" src={europeSelected} alt="" />,
  },
];
