import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";
import Footer from "../../components/common/footer/footer";
import ContactSection from "../../components/common/contactSection/contactSection";
import ProductListSection from "../../components/wealthPage/productListSection/productListSection";
import MainSection from "../../components/wealthPage/mainSection/mainSection";

export default function Wealth() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=wealth",
        }}
        activeKey={"wealth"}
      />
      <main className="animate-[fadein_1s]">
        <MainSection />
        <ProductListSection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
