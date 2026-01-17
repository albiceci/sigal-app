import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";
import ProductListSection from "../../components/healthPage/productListSection/productListSection";
import Footer from "../../components/common/footer/footer";
import ContactSection from "../../components/common/contactSection/contactSection";
import MainSection from "../../components/healthPage/mainSection/mainSection";

export default function Health() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=health",
        }}
        activeKey={"health"}
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
