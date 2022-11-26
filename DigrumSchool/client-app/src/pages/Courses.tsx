import React from 'react';
import {themeStore} from "../stores/ThemeStore";
import {Button} from "@mui/material";

export const Courses = () => {
  return (
    <div>
      courses page
      <Button variant={'contained'} onClick={() => themeStore.changeThemeMode()}>Change theme</Button>
      {themeStore.theme.customPalette.backgroundPrimary.main}
    </div>
  );
};