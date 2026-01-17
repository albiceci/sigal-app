import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const Account = lazy(() => import("./accountPage"));

export const accountRoutes = [
  {
    path: "/account",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={true} redirect="/login">
          <Account />
        </AuthContainer>
      </Suspense>
    ),
  },
];
