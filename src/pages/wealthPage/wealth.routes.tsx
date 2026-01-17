import { lazy, Suspense } from "react";
import { LoadingWithNavBar } from "../../components/fallback/loadingWithNavBar";

const Wealth = lazy(() => import("./wealthPage"));
const Property = lazy(() => import("./propertyPage/propertyPage"));
const Liability = lazy(() => import("./liabilityPage/liabilityPage"));
const Guaranty = lazy(() => import("./guarantyPage/guarantyPage"));

export const wealthRoutes = [
  {
    path: "/wealth",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Wealth />
      </Suspense>
    ),
  },
  {
    path: "/wealth/property",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Property />
      </Suspense>
    ),
  },
  {
    path: "/wealth/liability",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Liability />
      </Suspense>
    ),
  },
  {
    path: "/wealth/guaranty",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Guaranty />
      </Suspense>
    ),
  },
];
