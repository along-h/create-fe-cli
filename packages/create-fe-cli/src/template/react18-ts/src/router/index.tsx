import { RouteObject } from "react-router-dom";
import { lazy, ReactElement } from "react";
import PageHelloWorld from "../pages/hello-world";

const NotFound = lazy(() => import("@/pages/not-found"));
const Demo = lazy(() => import("@/pages/demo"));

export type TRoute = RouteObject & {
  label?: string;
  icon?: ReactElement;
  type?: "group" | "item";
  children?: TRoute[];
};

const routes: TRoute[] = [
  {
    path: "/",
    element: <PageHelloWorld />,
  },
  {
    path: "demo",
    element: <Demo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
