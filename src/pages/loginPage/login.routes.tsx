import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const Login = lazy(() => import("./loginPage"));

export const loginRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <Login />
        </AuthContainer>
      </Suspense>
    ),
  },
];
