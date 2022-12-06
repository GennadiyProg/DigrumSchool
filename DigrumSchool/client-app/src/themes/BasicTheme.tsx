import {PaletteColor, PaletteMode, Theme} from "@mui/material";
import {amber, blue, orange, purple} from "@mui/material/colors";

export interface CustomTheme extends Theme {
  customPalette: {
    backgroundPrimary: PaletteColor,
    backgroundGlobal: PaletteColor,
    secondary: PaletteColor,
    testCard: PaletteColor,
  },
  border: {
    radius: string
  }
}

export const getThemeByMode = (mode: PaletteMode) => ({
  overrides: {
    MuiCssBaseline: {
      body: {
        "::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: '5px',
        },
        "::-webkit-scrollbar-thumb": {
          borderRadius: '50%',
          backgroundColor: 'red',
        },
      }
    }
  },
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
          },
          secondary: {
            main: '#ffffff'
          },
          testCard: {
            main: '#fff',
            contrastText: '#000'
          }
        }
        : {
          // Dark mode
          backgroundPrimary: {
            main: '#222626',
            light: '#1e1e1e'
          },
          backgroundGlobal: {
            main: '#17181A'
          },
          secondary: {
            main: '#464646'
          },
          testCard: {
            main: '#222626',
            contrastText: '#fff'
          }
        }
    ),
  },
  border: {
    radius: '4px',
  }
})