import { ScrollRestoration } from "react-router-dom";
import NavBar from "../../components/ui/navBar/navBar";
import { FileClaimPageContainer } from "../../components/fileClaimPage/fileClaimContainer";
import { PageContainer } from "../../components/containers/pageContainer";

export default function FileClaim() {
  return (
    <PageContainer>
      <ScrollRestoration />
      <NavBar
        buyButton={{
          isVisible: true,
          isActive: true,
          link: "/buy",
        }}
        logo={{
          isMovable: false,
        }}
        activeKey={"file-claim"}
      />
      <main className="animate-[fadein_1s] bgGradientCustom">
        <FileClaimPageContainer />
      </main>
    </PageContainer>
  );
}
