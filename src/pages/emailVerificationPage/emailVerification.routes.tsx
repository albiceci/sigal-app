import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const EmailVerification = lazy(() => import("./emailVerificationPage"));

export const emailVerificationRoutes = [
  {
    path: "/email-verification",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <EmailVerification />
        </AuthContainer>
      </Suspense>
    ),
  },
];
