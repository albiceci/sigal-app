import { ScrollRestoration } from "react-router-dom";
import NavBar from "../../components/ui/navBar/navBar";
import { LoginPageContainer } from "../../components/loginPage/loginPageContainer";
import { PageContainer } from "../../components/containers/pageContainer";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Register() {
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
        <LoginPageContainer type="register" />
      </main>
    </PageContainer>
  );
}
