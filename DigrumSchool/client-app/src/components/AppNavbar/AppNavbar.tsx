import React, {FC} from 'react';
import {AppNavbarContainer, AppNavbarLeftItems, AppNavbarRightItems} from "./AppNavbar.styled";
import {IconButton, Typography, useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeToggle} from "../ThemeToggle";

interface AppNavbarProps {
  toggle: () => void
}

export const AppNavbar: FC<AppNavbarProps> = ({toggle}) => {
  const theme: CustomTheme = useTheme()
  return (
    <AppNavbarContainer style={{background: theme.customPalette.backgroundPrimary.main}}>
      <AppNavbarLeftItems>
        <IconButton onClick={() => toggle()} edge="start" color="default">
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" color="white" component="div">
          DigrumSchool
        </Typography>
      </AppNavbarLeftItems>
      <AppNavbarRightItems>
        <ThemeToggle />
      </AppNavbarRightItems>
    </AppNavbarContainer>
  );
};