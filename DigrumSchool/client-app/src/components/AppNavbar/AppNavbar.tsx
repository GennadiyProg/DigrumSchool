import React, {Dispatch, FC, SetStateAction} from 'react';
import {AppNavbarContainer} from "./AppNavbar.styled";
import {AppBar, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";
import MenuIcon from '@mui/icons-material/Menu';

interface AppNavbarProps {
  toggle: () => void
}

export const AppNavbar:FC<AppNavbarProps> = ({toggle}) => {
  const theme: CustomTheme = useTheme()
  return (
    <AppNavbarContainer style={{background: theme.customPalette.backgroundPrimary.main}}>
      <AppBar color={'transparent'}>
        <Toolbar variant="dense">
          <IconButton onClick={() => toggle()} edge="start" color="default">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="white" component="div">
            DigrumSchool
          </Typography>
        </Toolbar>
      </AppBar>
    </AppNavbarContainer>
  );
};