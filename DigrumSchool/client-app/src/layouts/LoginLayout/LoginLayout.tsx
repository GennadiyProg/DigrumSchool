import React, {FC, ReactNode, useState} from 'react';
import {LoginContainer, LoginWrapper} from "./LoginLayout.styled";
import {Outlet} from "react-router-dom";
import {AuthStatus} from "../../utils/consts";

interface LoginLayoutProps {
  children?: ReactNode,
}

export const LoginLayout:FC<LoginLayoutProps> = ({children}) => {
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.none)

  return (
    <LoginContainer>
      <LoginWrapper status={status}>
        <Outlet context={{setStatus: (st: AuthStatus) => setStatus(st)}}/>
      </LoginWrapper>
    </LoginContainer>
  );
};