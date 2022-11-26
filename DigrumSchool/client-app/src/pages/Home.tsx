import React, {FC} from 'react';
import {Button} from "@mui/material";
import {themeStore} from "../stores/ThemeStore";
import {observer} from "mobx-react-lite";

export const Home:FC = observer(() => {
  return (
    <>
      <Button variant={'contained'} onClick={() => themeStore.changeThemeMode()}>Change theme</Button>
    </>
  );
})
