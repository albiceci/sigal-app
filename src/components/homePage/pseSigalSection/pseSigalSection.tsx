import { ContentContainer } from "../../containers/contentContainer";
import { ItemComponent } from "./itemComponent/itemComponent";
import { AnimatedNumber } from "../../../util/animatedNumber";

import workersSvg from "./icons/workers.svg";
import clientsSvg from "./icons/clients.svg";
import statesSVG from "./icons/states.svg";
import { useTranslation } from "react-i18next";

const ITEM_DATA = [
  {
    icon: <img className="h-full" src={workersSvg} alt="" />,
    mainTitle: <AnimatedNumber value={2400} marginBottom="-30" />,
    subTitle: "whySigal.employees",
  },
  {
    icon: <img className="h-full" src={clientsSvg} alt="" />,
    mainTitle: <AnimatedNumber value={1.5} marginBottom="-30" />,
    subTitle: "whySigal.clients",
  },
  {
    icon: <img className="h-full" src={statesSVG} alt="" />,
    mainTitle: (
      <>
        <AnimatedNumber value={3} marginBottom="-30" />
      </>
    ),
    subTitle: "whySigal.countries",
  },
];

function PseSigalSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary py-24">
      <div className={`flex align-middle justify-center text-presetblack`}>
        <ContentContainer>
          <div className="flex flex-col items-center">
            <div>
              <h2 className="h2">{t("whySigal.title")}</h2>
            </div>
            <div className="mt-6 flex flex-col w-full p-2 md:mt-8 md:flex-row sm:px-20">
              {ITEM_DATA.map((item, index) => {
                return (
                  <ItemComponent key={index} icon={item.icon} mainTitle={item.mainTitle} subTitle={item.subTitle} />
                );
              })}
            </div>
          </div>
          <div className="mt-6 text-center">{t("whySigal.description")}</div>
        </ContentContainer>
      </div>
    </section>
  );
}

export default PseSigalSection;
