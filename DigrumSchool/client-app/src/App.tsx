import React from 'react';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRouter} from "./router";
import {themeStore} from './stores/ThemeStore';
import {observer} from "mobx-react-lite";

export const App = observer(() => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeStore.theme}>
        <CssBaseline>
          <AppRouter/>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
})
