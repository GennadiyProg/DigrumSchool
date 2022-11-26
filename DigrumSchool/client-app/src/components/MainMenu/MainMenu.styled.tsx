import styled from "styled-components";
import {CustomTheme} from "../../themes/BasicTheme";

interface MainMenuStyledProps {
  isOpen: boolean,
  theme: CustomTheme
}

export const MainMenuStyled = styled.aside<MainMenuStyledProps>`
  grid-column: ${({isOpen}) => isOpen ? '1 / 3' : 1};
  grid-row: 2;
  background: ${({theme}) => theme.customPalette.backgroundPrimary.main};

  ${({theme}) => theme.breakpoints.down('sm')} {
    ${({isOpen}) => isOpen 
      ? {
        display: 'none'
      }
      : {
        'grid-column': '1 / -1'
      }
    };
  }
`