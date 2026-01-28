import { EmailVerificationForm } from "./emailVerificationForm/emailVerificationForm";
import { LoginForm } from "./loginForm/loginForm";
import { PasswordChangeForm } from "./passwordChangeForm/passwordChangeForm";
import { RecoveryForm } from "./recoveryForm/recoveryForm";
import { RegisterForm } from "./registerForm/registerForm";

function switchRender(type: "login" | "register" | "recovery" | "password-change" | "email-verification") {
  switch (type) {
    case "login":
      return <LoginForm />;
    case "register":
      return <RegisterForm />;
    case "recovery":
      return <RecoveryForm />;
    case "password-change":
      return <PasswordChangeForm />;
    case "email-verification":
      return <EmailVerificationForm />;
  }
}

export const LoginPageContainer = ({
  type,
}: {
  type: "login" | "register" | "recovery" | "password-change" | "email-verification";
}) => {
  return (
    //BottomBar padding
    <div className="w-[100vw] min-h-[100dvh] flex justify-center items-center pt-[100px] pb-[100px]">
      <div className="w-[350px] sm:w-[400px] h-fit bg-white rounded-md shadow-lg border p-6">{switchRender(type)}</div>
    </div>
  );
};
