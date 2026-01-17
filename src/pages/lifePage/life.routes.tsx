import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Life = lazy(() => import("./lifePage"));

export const lifeRoutes = [
  {
    path: "/life",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Life />
      </Suspense>
    ),
  },
];
