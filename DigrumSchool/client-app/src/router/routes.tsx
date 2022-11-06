import React, {ReactNode} from "react";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Home, Login, Registration} from "../pages";

interface Route {
  path: string,
  component: ReactNode
}

export const authRoutes = [

]

export const publicRoutes: Route[] = [
  {
    path: LOGIN_ROUTE,
    component: <Login />
  },
  {
    path: REGISTRATION_ROUTE,
    component: <Registration />
  },
  {
    path: HOME_ROUTE,
    component: <Home />
  }
]