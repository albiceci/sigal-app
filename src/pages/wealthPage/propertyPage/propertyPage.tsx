import NavBar from "../../../components/ui/navBar/navBar";
import MainSection from "../../../components/wealthPage/propertyPage/mainSection/mainSection";
import { PackageSection } from "../../../components/wealthPage/propertyPage/packageSection/packageSection";
import InfoSection1 from "../../../components/wealthPage/propertyPage/infoSection1/infoSection1";

import { PageContainer } from "../../../components/containers/pageContainer";
import Footer from "../../../components/common/footer/footer";
import ContactSection from "../../../components/common/contactSection/contactSection";
import QnASection from "../../../components/common/QnASection/QnASection";

export default function Property() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=form&subtype=fire",
        }}
      />
      <main className="animate-[fadein_1s]">
        <MainSection />
        <PackageSection />
        <InfoSection1 />
        <QnASection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
