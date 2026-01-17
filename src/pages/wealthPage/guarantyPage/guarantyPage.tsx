import NavBar from "../../../components/ui/navBar/navBar";

import { PageContainer } from "../../../components/containers/pageContainer";
import Footer from "../../../components/common/footer/footer";
import ContactSection from "../../../components/common/contactSection/contactSection";
import ProductListSection from "../../../components/wealthPage/guarantyPage/productListSection/productListSection";

export default function Guaranty() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: false,
          link: "/buy?type=wealth",
        }}
        activeKey={""}
      />
      <main className="animate-[fadein_1s]">
        <ProductListSection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
