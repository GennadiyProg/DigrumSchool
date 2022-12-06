import {createGlobalStyle} from "styled-components";
import {CustomTheme} from "../themes/BasicTheme";

interface GlobalStylesProps {
  theme: CustomTheme,
}

export const GlobalStyle = createGlobalStyle<GlobalStylesProps>`
  ::-webkit-scrollbar {
    background: transparent;
    width: 5px;
    height: 5px;
    &-thumb {
      background: ${({theme}) => theme.palette.mode === 'dark' ? '#3d3d3d' : theme.palette.primary.main};
      border-radius: 100px;
    }
  }
`