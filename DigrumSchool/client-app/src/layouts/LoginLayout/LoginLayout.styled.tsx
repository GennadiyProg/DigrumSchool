import styled from "styled-components";
import {themeStore} from "../../stores/ThemeStore";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${() => themeStore.theme.customPalette.backgroundPrimary.main}
`

export const LoginWrapper = styled.div`
  padding: 30px 20px;
  background: ${() => themeStore.theme.customPalette.backgroundPrimary.light};
  border-radius: ${() => themeStore.theme.border.radius};
`