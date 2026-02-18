import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

export const APP_ROUTES = Object.freeze({
  root: "/",
  frontend: "/frontend",
});

const FRONTEND_SEGMENT = APP_ROUTES.frontend.replace(/^\//, "");

const MainPage = lazy(() => import("../pages/MainPage"));
const FrontendPage = lazy(() => import("../pages/FrontendPage"));

export const appRouter = createHashRouter([
  {
    path: APP_ROUTES.root,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: FRONTEND_SEGMENT,
        element: <FrontendPage />,
      },
    ],
  },
]);
