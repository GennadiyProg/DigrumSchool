import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes";

export const AppRouter = () => {
  return (
    <Routes>
      {
        Object.entries(routes).map(([, value]) => (
          <Route
            key={value.path}
            path={value.path}
            element={value.component}
          >
            {value.routes.map((route) => <Route key={route.path} path={route.path} element={route.component}/>)}
          </Route>
        ))
      }
    </Routes>
  )
}