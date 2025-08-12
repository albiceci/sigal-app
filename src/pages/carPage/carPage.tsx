import NavBar from "../../components/ui/navBar/navBar";
import MainSection from "../../components/carPage/mainSection/mainSection";

import { PageContainer } from "../../components/containers/pageContainer";
import BannerSwipper from "../../components/common/bannerSwipper/bannerSwipper";
import InsuranceTypes from "../../components/common/insuranceTypes/insuranceTypes";
import Footer from "../../components/common/footer/footer";

export default function Car() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=car",
        }}
        activeKey={"car"}
      />
      <div className="animate-[fadein_1s]">
        <MainSection />
        <InsuranceTypes
          insuranceTypes={[
            {
              title: "TPL",
              subTitle: "subTitle per TPL",
              link: "/car/tpl",
              image: (
                <img
                  className="imgBlur"
                  src={require("./../../assets/freepik/buyPage/carCategory.jpg")}
                  alt=""
                />
              ),
            },
            {
              title: "Casco",
              subTitle: "subTitle per Casco",
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
              title: "Mini Casco",
              subTitle: "subTitle per Mini Casco",
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
              title: "Karton Jeshil",
              subTitle: "subTitle per Karton Jeshil",
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
              title: "Auto SOS",
              subTitle: "subTitle per Auto SOS",
              link: "/",
              image: (
                <img
                  className="imgBlur"
                  src={require("./../../assets/freepik/buyPage/carCategory.jpg")}
                  alt=""
                />
              ),
            },
          ]}
        />
        <Footer />
      </div>
    </PageContainer>
  );
}
