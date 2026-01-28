import { ScrollRestoration } from "react-router-dom";
import NavBar from "../../components/ui/navBar/navBar";
import { LoginPageContainer } from "../../components/loginPage/loginPageContainer";
import { PageContainer } from "../../components/containers/pageContainer";

export default function EmailVerification() {
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
        activeKey={"login"}
      />
      <main className="animate-[fadein_1s] bgGradientCustom">
        <LoginPageContainer type="email-verification" />
      </main>
    </PageContainer>
  );
}
