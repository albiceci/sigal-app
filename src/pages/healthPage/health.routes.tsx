import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Health = lazy(() => import("./healthPage"));

export const healthRoutes = [
  {
    path: "/health",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Health />
      </Suspense>
    ),
  },
];
