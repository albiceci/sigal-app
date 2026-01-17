import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const Register = lazy(() => import("./registerPage"));

export const registerRoutes = [
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <Register />
        </AuthContainer>
      </Suspense>
    ),
  },
];
