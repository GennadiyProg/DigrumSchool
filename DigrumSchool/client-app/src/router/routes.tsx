import React, {ReactNode} from "react";
import {LOGIN_LAYOUT, MAIN_LAYOUT, paths} from "../utils/consts";
import {MainLayout} from "../layouts/MainLayout";
import {LoginLayout} from "../layouts/LoginLayout";
import {Courses} from "../pages/Courses";
import {TestPage} from "../pages/Test";
import {CreateTest} from "../pages/CreateTest";
import {UserTests} from "../pages/UserTests";
import {TestsHistory} from "../pages/TestsHistory";
import {CreateCourse} from "../pages/CreateCourse";
import {AppCourse} from "../pages/Course";
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {Registration} from "../pages/Registration";
import {CategoryTests} from "../pages/CategoryTests";
import {ProtectedRoute} from "../hocks/ProtectedRoute";

interface Route {
  path: string,
  component: ReactNode
  routes?: Route[]
}

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
        component: <ProtectedRoute><Courses /></ProtectedRoute>
      },
      {
        path: paths.TEST_ROUTE,
        component: <TestPage />
      },
      {
        path: paths.CREATE_TEST_ROUTE,
        component: <ProtectedRoute><CreateTest /></ProtectedRoute>
      },
      {
        path: paths.MY_TESTS_ROUTE,
        component: <ProtectedRoute><UserTests/></ProtectedRoute>
      },
      {
        path: paths.HISTORY_ROUTE,
        component: <TestsHistory/>
      },
      {
        path: paths.CREATE_COURSE_ROUTE,
        component: <ProtectedRoute><CreateCourse/></ProtectedRoute>
      },
      {
        path: paths.COURSE_ROUTE,
        component: <ProtectedRoute><AppCourse/></ProtectedRoute>
      },
      {
        path: paths.CATEGORY_ROUTE,
        component: <CategoryTests/>
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