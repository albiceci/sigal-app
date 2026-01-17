import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const Recovery = lazy(() => import("./recoveryPage"));

export const recoveryRoutes = [
  {
    path: "/recovery",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <Recovery />
        </AuthContainer>
      </Suspense>
    ),
  },
];
