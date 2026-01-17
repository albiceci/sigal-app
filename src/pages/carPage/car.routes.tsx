import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Car = lazy(() => import("./carPage"));
const TPL = lazy(() => import("./tplPage/tplPage"));
const AutoSOS = lazy(() => import("./autososPage/autososPage"));

export const carRoutes = [
  {
    path: "/car",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Car />
      </Suspense>
    ),
  },
  {
    path: "/car/tpl",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <TPL />
      </Suspense>
    ),
  },
  {
    path: "/car/autosos",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AutoSOS />
      </Suspense>
    ),
  },
];
