import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const PasswordChange = lazy(() => import("./passwordChangePage"));

export const passwordChangeRoutes = [
  {
    path: "/password-change",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <PasswordChange />
        </AuthContainer>
      </Suspense>
    ),
  },
];
