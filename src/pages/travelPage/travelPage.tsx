import NavBar from "../../components/ui/navBar/navBar";

import { PageContainer } from "../../components/containers/pageContainer";

export default function Travel() {
  return (
    <PageContainer>
      <NavBar
        buyButton={{
          isVisible: false,
          isActive: true,
          link: "/buy?type=travel",
        }}
        activeKey={"travel"}
      />
      <div className="animate-[fadein_1s]"></div>
    </PageContainer>
  );
}
