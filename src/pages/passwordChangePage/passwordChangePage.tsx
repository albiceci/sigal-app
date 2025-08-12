import { ScrollRestoration } from "react-router-dom";
import NavBar from "../../components/ui/navBar/navBar";
import { LoginPageContainer } from "../../components/loginPage/loginPageContainer";
import { PageContainer } from "../../components/containers/pageContainer";

export default function PasswordChange() {
  return (
    <PageContainer>
      <div className="bgGradientCustom">
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
        <div className="animate-[fadein_1s]">
          <LoginPageContainer type="password-change" />
        </div>
      </div>
    </PageContainer>
  );
}
