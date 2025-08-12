import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";

export default function Property() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=property",
        }}
        activeKey={"property"}
      />
      <div className="animate-[fadein_1s]"></div>
    </PageContainer>
  );
}
