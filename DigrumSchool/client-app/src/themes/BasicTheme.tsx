import {PaletteColor, PaletteMode, Theme} from "@mui/material";
import {amber, blue, orange, purple} from "@mui/material/colors";

export interface CustomTheme extends Theme {
  customPalette: {
    backgroundPrimary: PaletteColor,
    backgroundGlobal: PaletteColor,
  },
  border: {
    radius: string
  }
}

export const getThemeByMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    ? {
      // Light mode

    }
    : {
      // Dark mode
        primary: blue,
      }
    )
  },
  customPalette: {
    ...(mode === 'light'
        ? {
          // Light mode
          backgroundPrimary: {
            main: '#51629E',
            light: '#EBECE7'
          },
          backgroundGlobal: {
            main: '#ffffff'
          }
        }
        : {
          // Dark mode
          backgroundPrimary: {
            main: '#222626',
            light: '#EBECE7'
          },
          backgroundGlobal: {
            main: '#17181A'
          }
        }
    ),
  },
  border: {
    radius: '4px',
  }
})