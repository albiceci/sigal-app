import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Home = lazy(() => import("./homePage"));

export const homeRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Home />
      </Suspense>
    ),
  },
];
