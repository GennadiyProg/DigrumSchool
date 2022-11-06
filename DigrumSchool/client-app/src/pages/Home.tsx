import React from 'react';
import {Button} from "@mui/material";
import {themeStore} from "../stores/ThemeStore";

export const Home = () => {
  return (
    <>
      <Button variant={'contained'} onClick={() => themeStore.changeThemeMode()}>Change theme</Button>
    </>
  );
};