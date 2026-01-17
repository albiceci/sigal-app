import NavBar from "../../../components/ui/navBar/navBar";
import MainSection from "../../../components/carPage/autososPage/mainSection/mainSection";

import { PageContainer } from "../../../components/containers/pageContainer";
import Footer from "../../../components/common/footer/footer";
import ContactSection from "../../../components/common/contactSection/contactSection";
import QnASection from "../../../components/common/QnASection/QnASection";
import { CfareEshteAutoSOS } from "../../../components/carPage/autososPage/cfareEshteAutosos/cfareEshteAutosos";
import { AutoSOSFeatures } from "../../../components/carPage/autososPage/autososFeatures/autososFeatures";
import { AutoSOSPackages } from "../../../components/carPage/autososPage/autososPackages/autososPackages";

export default function AutoSOS() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=form&subtype=autosos",
        }}
      />
      <main className="animate-[fadein_1s]">
        <MainSection />
        <CfareEshteAutoSOS />
        <AutoSOSFeatures />
        <AutoSOSPackages />
        <QnASection />
        <ContactSection />
      </main>
      <Footer />
    </PageContainer>
  );
}
