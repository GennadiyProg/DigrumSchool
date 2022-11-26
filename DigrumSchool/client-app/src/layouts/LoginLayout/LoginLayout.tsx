import React, {FC, ReactNode} from 'react';
import {LoginContainer, LoginWrapper} from "./LoginLayout.styled";
import {Outlet} from "react-router-dom";

interface LoginLayoutProps {
  children?: ReactNode,
}

export const LoginLayout:FC<LoginLayoutProps> = ({children}) => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Outlet/>
      </LoginWrapper>
    </LoginContainer>
  );
};