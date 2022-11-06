import React, {FC} from 'react';
import {AppNavbarContainer} from "./AppNavbar.styled";
import {AppBar, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {MenuOpen} from "@mui/icons-material"
import {CustomTheme} from "../../themes/BasicTheme";

export const AppNavbar:FC = () => {
  const theme: CustomTheme = useTheme()
  return (
    <AppNavbarContainer style={{background: theme.customPalette.backgroundPrimary.main}}>
      <AppBar color={'transparent'}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit">
            <MenuOpen />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            DigrumSchool
          </Typography>
        </Toolbar>
      </AppBar>
    </AppNavbarContainer>
  );
};