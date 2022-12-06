import styled from "styled-components";
import {CustomTheme} from "../../themes/BasicTheme";

interface MainContentStyledProps {
  isMenuOpen: boolean,
  theme: CustomTheme,
}

const MainLayoutGrid = styled.main`
  display: grid;
  grid-template: 50px 1fr / 70px 200px 1fr;
  grid-auto-columns: 0;
  grid-auto-rows: 0;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`

const MainContentStyled = styled.div<MainContentStyledProps>`
  grid-column: ${({isMenuOpen}) => isMenuOpen ? '3 / -1' : '2 / -1'};
  grid-row: 2;
  overflow-y: auto;

  ${({theme}) => theme.breakpoints.down('sm')} {
    ${({isMenuOpen}) => !isMenuOpen // почему-то при инвертировании все работает, но по логике не правильно
      ? {
        display: 'none'
      }
      : {
        'grid-column': '1 / -1'
      }
}
  }
`

const MainLayoutContainer = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`

export {
  MainLayoutGrid,
  MainContentStyled,
  MainLayoutContainer,
}