import NavBar from "../../components/ui/navBar/navBar";
import MainSection from "../../components/lifePage/mainSection/mainSection";

import { PageContainer } from "../../components/containers/pageContainer";

export default function Life() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=life",
        }}
        activeKey="life"
      />
      <div className="animate-[fadein_1s]">
        <MainSection />
      </div>
    </PageContainer>
  );
}
