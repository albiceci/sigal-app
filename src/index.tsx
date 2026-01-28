import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

import { SessionContextProvider } from "./util/sessionContainer";
import { wealthRoutes } from "./pages/wealthPage/wealth.routes";
import { homeRoutes } from "./pages/homePage/home.routes";
import { carRoutes } from "./pages/carPage/car.routes";
import { lifeRoutes } from "./pages/lifePage/life.routes";
import { healthRoutes } from "./pages/healthPage/health.routes";
import { loginRoutes } from "./pages/loginPage/login.routes";
import { marinaRoutes } from "./pages/marinaPage/marina.routes";
import { registerRoutes } from "./pages/registerPage/register.routes";
import { passwordChangeRoutes } from "./pages/passwordChangePage/passwordChange.routes";
import { recoveryRoutes } from "./pages/recoveryPage/recovery.routes";
import { buyRoutes } from "./pages/buyPage/boy.routes";
import { accountRoutes } from "./pages/accountPage/account.routes";
import { fileClaimRoutes } from "./pages/fileClaimPage/fileClaim.routes";
import { emailVerificationRoutes } from "./pages/emailVerificationPage/emailVerification.routes";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  ...homeRoutes,
  ...wealthRoutes,
  ...carRoutes,
  ...lifeRoutes,
  ...healthRoutes,
  ...loginRoutes,
  ...marinaRoutes,
  ...registerRoutes,
  ...recoveryRoutes,
  ...emailVerificationRoutes,
  ...passwordChangeRoutes,
  ...buyRoutes,
  ...accountRoutes,
  ...fileClaimRoutes,
]);

root.render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
    ,
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
