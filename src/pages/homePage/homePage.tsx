import NavBar from "../../components/ui/navBar/navBar";
import MainSection from "../../components/homePage/mainSection/mainSection";
import PseSigalSection from "../../components/homePage/pseSigalSection/pseSigalSection";

import { PageContainer } from "../../components/containers/pageContainer";
import ContactSection from "../../components/common/contactSection/contactSection";
import InsuranceTypes from "../../components/common/insuranceTypes/insuranceTypes";
import Footer from "../../components/common/footer/footer";
import carCategory from "../../assets/sigal/category/car.svg";
import wealthCategory from "../../assets/sigal/category/wealth.svg";
import lifeCategory from "../../assets/sigal/category/life.svg";
import healthCategory from "../../assets/sigal/category/health.svg";
import marinaCategory from "../../assets/sigal/category/marina.svg";
import { ScrollPosition } from "../../util/scrollPosition";

export default function Home() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy",
        }}
        theme="white"
        activeKey={"home"}
      />

      <main className="animate-[fadein_1s]">
        <MainSection />
        <InsuranceTypes
          insuranceTypes={[
            {
              title: "category.car.name",
              subTitle: "category.car.subTitle",
              link: "/car",
              image: <img className="h-full" src={carCategory} alt="" />,
            },
            {
              title: "category.wealth.name",
              subTitle: "category.wealth.subTitle",
              link: "/wealth",
              image: <img className="h-full" src={wealthCategory} alt="" />,
            },
            {
              title: "category.health.name",
              subTitle: "category.health.subTitle",
              link: "/health",
              image: <img className="h-full" src={healthCategory} alt="" />,
            },

            {
              title: "category.marina.name",
              subTitle: "category.marina.subTitle",
              link: "/marina",
              image: <img className="h-full" src={marinaCategory} alt="" />,
            },
            {
              title: "category.life.name",
              subTitle: "category.life.subTitle",
              link: "/life",
              image: <img className="h-full" src={lifeCategory} alt="" />,
            },
          ]}
        />
        <PseSigalSection />
        {/* <InfoSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
