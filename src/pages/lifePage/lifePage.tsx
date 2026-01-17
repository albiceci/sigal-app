import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";
import ProductListSection from "../../components/lifePage/productListSection/productListSection";
import MainSection from "../../components/lifePage/mainSection/mainSection";

import Footer from "../../components/common/footer/footer";
import ContactSection from "../../components/common/contactSection/contactSection";

export default function Marina() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: false,
          link: "/buy?type=life",
        }}
        activeKey={"life"}
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
