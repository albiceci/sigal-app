import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Marina = lazy(() => import("./marinaPage"));

export const marinaRoutes = [
  {
    path: "/marina",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Marina />
      </Suspense>
    ),
  },
];
