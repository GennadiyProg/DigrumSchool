import {makeAutoObservable} from "mobx";
import {createTheme, PaletteMode} from "@mui/material";
import {CustomTheme, getThemeByMode} from "../themes/BasicTheme";

class ThemeStore {
  mode: PaletteMode = 'dark'
  theme: CustomTheme

  constructor() {
    makeAutoObservable(this)
    this.theme = createTheme(getThemeByMode(this.mode)) as CustomTheme
  }

  changeThemeMode() {
    this.mode = this.mode === 'light' ? 'dark' : 'light'
    this.theme = createTheme(getThemeByMode(this.mode)) as CustomTheme
  }

}

export const themeStore = new ThemeStore()