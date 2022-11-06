import React, {FC, ReactNode} from 'react';
import {LoginContainer, LoginWrapper} from "./LoginLayout.styled";

interface LoginLayoutProps {
  children: ReactNode,
}

export const LoginLayout:FC<LoginLayoutProps> = ({children}) => {
  return (
    <LoginContainer>
      <LoginWrapper>
        {children}
      </LoginWrapper>
    </LoginContainer>
  );
};