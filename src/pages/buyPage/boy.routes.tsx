import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Buy = lazy(() => import("./buyPage"));

export const buyRoutes = [
  {
    path: "/buy",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Buy />
      </Suspense>
    ),
  },
];
