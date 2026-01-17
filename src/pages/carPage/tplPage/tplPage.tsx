import NavBar from "../../../components/ui/navBar/navBar";
import MainSection from "../../../components/carPage/tplPage/mainSection/mainSection";

import { PageContainer } from "../../../components/containers/pageContainer";
import Footer from "../../../components/common/footer/footer";
import ContactSection from "../../../components/common/contactSection/contactSection";
import QnASection from "../../../components/common/QnASection/QnASection";
import ProductOffers from "../../../components/common/productOffers/productOffers";

export default function TPL() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=form&subtype=tpl",
        }}
      />
      <main className="animate-[fadein_1s]">
        <MainSection />
        <ProductOffers />
        <QnASection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
