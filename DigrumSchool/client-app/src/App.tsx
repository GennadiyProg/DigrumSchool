import React from 'react';
import {MainLayout} from './layouts/MainLayout';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router";
import {themeStore} from './stores/ThemeStore';
import {observer} from "mobx-react-lite";

const WITHOUT_MAIN_LAYOUT = ['/registration', '/login']

export const App = observer(() => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeStore.theme}>
        <CssBaseline>
          {WITHOUT_MAIN_LAYOUT.includes(window.location.pathname)
            ? (<AppRouter></AppRouter>)
            : (
              <MainLayout>
                <AppRouter></AppRouter>
              </MainLayout>
            )
          }
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
})
