import {PaletteColor, PaletteMode, Theme} from "@mui/material";
import {blue} from "@mui/material/colors";

export interface CustomTheme extends Theme {
  customPalette: {
    backgroundPrimary: PaletteColor,
    backgroundGlobal: PaletteColor,
    secondary: PaletteColor,
    appCard: {
      main: string,
      contrastText: string,
      additionalText: string,
      shadowColor: string,
    },
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
      },
      ul: {
        padding: '0',
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
            main: '#464646'
          },
          appCard: {
            main: '#fff',
            contrastText: '#000',
            additionalText: '#2A3238',
            shadowColor: 'rgba(0, 0, 0, .12)'
          },
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
          appCard: {
            main: '#222626',
            contrastText: '#fff',
            additionalText: '#7a7c83',
            shadowColor: 'rgba(0, 0, 0, 1)'
          }
        }
    ),
  },
  border: {
    radius: '4px',
  }
})