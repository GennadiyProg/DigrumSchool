import React, {ReactNode} from "react";
import {LOGIN_LAYOUT, MAIN_LAYOUT, paths} from "../utils/consts";
import {Home, Login, Registration} from "../pages";
import {MainLayout} from "../layouts/MainLayout";
import {LoginLayout} from "../layouts/LoginLayout";
import {Courses} from "../pages/Courses";
import {Test} from "../pages/Test";

interface Route {
  path: string,
  component: ReactNode
}

export const authRoutes = [

]

export const routes = {
  MainLayout: {
    path: MAIN_LAYOUT,
    component: <MainLayout/>,
    routes: [
      {
        path: paths.HOME_ROUTE,
        component: <Home />
      },
      {
        path: paths.COURSES_ROUTE,
        component: <Courses />
      },
      {
        path: paths.TEST_ROUTE,
        component: <Test />
      },
    ] as Route[]
  },
  LoginLayout: {
    path: LOGIN_LAYOUT,
    component: <LoginLayout/>,
    routes: [
      {
        path: paths.LOGIN_ROUTE,
        component: <Login />
      },
      {
        path: paths.REGISTRATION_ROUTE,
        component: <Registration />
      },
    ] as Route[]
  }
}