import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Home from "./pages/homePage/homePage";
// //import Car from "./pages/carPage/carPage";
// import Property from "./pages/propertyPage/propertyPage";
// import Life from "./pages/lifePage/lifePage";
// import Travel from "./pages/travelPage/travelPage";
// import Health from "./pages/healthPage/healthPage";
// import Login from "./pages/loginPage/loginPage";
// import Buy from "./pages/buyPage/buyPage";
import { LoadingWithNavBar } from "./components/fallback/loadingWithNavBar";
import { BuyPageFallback } from "./components/fallback/buyPageFallback";
import { SessionContextProvider } from "./util/sessionContainer";
import { AuthContainer } from "./util/authContainer";
import PasswordChange from "./pages/passwordChangePage/passwordChangePage";

const Home = lazy(() => import("./pages/homePage/homePage"));
const Car = lazy(() => import("./pages/carPage/carPage"));
const TPL = lazy(() => import("./pages/carPage/tplPage/tplPage"));
const Property = lazy(() => import("./pages/propertyPage/propertyPage"));
const Life = lazy(() => import("./pages/lifePage/lifePage"));
const Travel = lazy(() => import("./pages/travelPage/travelPage"));
const Health = lazy(() => import("./pages/healthPage/healthPage"));
const Login = lazy(() => import("./pages/loginPage/loginPage"));
const Register = lazy(() => import("./pages/registerPage/registerPage"));
const Recovery = lazy(() => import("./pages/recoveryPage/recoveryPage"));
const Buy = lazy(() => import("./pages/buyPage/buyPage"));
const Account = lazy(() => import("./pages/accountPage/accountPage"));
const FileClaim = lazy(() => import("./pages/fileClaimPage/fileClaimPage"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Home />
      </Suspense>
    ),
  },
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
    path: "/property",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Property />
      </Suspense>
    ),
  },
  {
    path: "/Life",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Life />
      </Suspense>
    ),
  },
  {
    path: "/travel",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Travel />
      </Suspense>
    ),
  },
  {
    path: "/health",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <Health />
      </Suspense>
    ),
  },
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
  {
    path: "/recovery",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <Recovery />
        </AuthContainer>
      </Suspense>
    ),
  },
  {
    path: "/password-change",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={false} redirect="/account">
          <PasswordChange />
        </AuthContainer>
      </Suspense>
    ),
  },
  {
    path: "/buy",
    element: (
      <Suspense fallback={<BuyPageFallback />}>
        <Buy />
      </Suspense>
    ),
  },
  {
    path: "/account",
    element: (
      <Suspense fallback={<LoadingWithNavBar />}>
        <AuthContainer isLoggedIn={true} redirect="/login">
          <Account />
        </AuthContainer>
      </Suspense>
    ),
  },
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
]);

root.render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
