import NavBar from "../../components/ui/navBar/navBar";
import MainSection from "../../components/homePage/mainSection/mainSection";
import PseSigalSection from "../../components/homePage/pseSigalSection/pseSigalSection";

import { PageContainer } from "../../components/containers/pageContainer";
import ContactSection from "../../components/common/contactSection/contactSection";
import InsuranceTypes from "../../components/common/insuranceTypes/insuranceTypes";
import InfoSection from "../../components/homePage/infoSection/infoSection";
import Footer from "../../components/common/footer/footer";

export default function Home() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy",
        }}
        theme="primary"
        activeKey={"home"}
      />

      <div className="animate-[fadein_1s]">
        <MainSection />
        <InsuranceTypes
          insuranceTypes={[
            {
              title: "MAKINA",
              subTitle: "subTitle per Makinen",
              link: "/",
              image: (
                <img
                  className="imgBlur"
                  src={require("./../../assets/freepik/buyPage/carCategory.jpg")}
                  alt=""
                />
              ),
            },
            {
              title: "PRONA",
              subTitle: "subTitle per Pronen",
              link: "/",
              image: (
                <img
                  className="imgBlur"
                  src={require("./../../assets/freepik/buyPage/propertyCategory.jpg")}
                  alt=""
                />
              ),
            },
            {
              title: "JETA",
              subTitle: "subTitle per Jeten",
              link: "/",
              image: (
                <img
                  className="imgBlur scale-125 mt-[14px]"
                  src={require("./../../assets/freepik/buyPage/lifeCategory.jpg")}
                  alt=""
                />
              ),
            },
            {
              title: "UDHETIMI",
              subTitle: "subTitle per Udhetimin",
              link: "/",
              image: (
                <img
                  className="imgBlur scale-[.8]"
                  src={require("./../../assets/freepik/buyPage/healthCategory.jpg")}
                  alt=""
                />
              ),
            },
            {
              title: "SHENDETI",
              subTitle: "subTitle per Shendetin",
              link: "/",
              image: (
                <img
                  className="imgBlur scale-[.9]"
                  src={require("./../../assets/freepik/buyPage/travelCategory.jpg")}
                  alt=""
                />
              ),
            },
          ]}
        />
        <PseSigalSection />
        <InfoSection />
        <ContactSection />
        <Footer />
      </div>
    </PageContainer>
  );
}
