import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";

import Footer from "../../components/common/footer/footer";
import ContactSection from "../../components/common/contactSection/contactSection";
import ProductListSection from "../../components/carPage/productListSection/productListSection";
import MainSection from "../../components/carPage/mainSection/mainSection";

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
      <main className="animate-[fadein_1s]">
        <MainSection />
        <ProductListSection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
