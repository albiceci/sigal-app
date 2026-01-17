import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";
import { AuthContainer } from "../../util/authContainer";

const FileClaim = lazy(() => import("./fileClaimPage"));

export const fileClaimRoutes = [
  {
    path: "/file-claim",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={true} redirect="/login">
          <FileClaim />
        </AuthContainer>
      </Suspense>
    ),
  },
];
