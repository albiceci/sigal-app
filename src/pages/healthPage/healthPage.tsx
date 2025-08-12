import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";

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
      <div className="animate-[fadein_1s]"></div>
    </PageContainer>
  );
}
