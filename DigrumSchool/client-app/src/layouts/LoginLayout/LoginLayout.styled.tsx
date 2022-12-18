import styled from "styled-components";
import {themeStore} from "../../stores/ThemeStore";
import {AuthStatus} from "../../utils/consts";

interface LoginWrapperProps {
  status: AuthStatus
}

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${() => themeStore.theme.customPalette.backgroundPrimary.main}
`

const colors = {
  [AuthStatus.none]: 'transparent',
  [AuthStatus.success]: 'green',
  [AuthStatus.error]: 'red',
}

export const LoginWrapper = styled.div<LoginWrapperProps>`
  padding: 30px 20px;
  background: ${() => themeStore.theme.customPalette.backgroundPrimary.light};
  border-radius: ${() => themeStore.theme.border.radius};
  border: 1px solid ${({status}) => colors[status]};
  width: 80%;
  max-width: 700px;
`