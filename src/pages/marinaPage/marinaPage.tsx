import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";
import ProductListSection from "../../components/marinaPage/productListSection/productListSection";
import MainSection from "../../components/marinaPage/mainSection/mainSection";
import Footer from "../../components/common/footer/footer";
import ContactSection from "../../components/common/contactSection/contactSection";

export default function Marina() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=marina",
        }}
        activeKey={"marina"}
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
