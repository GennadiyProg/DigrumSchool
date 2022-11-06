import React from 'react';
import {Box, useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";

export const MainMenu = () => {
  const theme: CustomTheme = useTheme()
  return (
    <Box sx={{
      height: '100%',
      background: `${theme.customPalette.backgroundPrimary.main}`
    }}>
      MainMenu
    </Box>
  );
};