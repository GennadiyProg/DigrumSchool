import React, {FC, ReactNode} from 'react';
import {observer} from "mobx-react-lite";
import {useAuth} from "../hooks/useAuth";
import {Navigate, useNavigate} from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode,
}

const ProtectedRouteComponent:FC<ProtectedRouteProps> = ({children}) => {
  const isAuth = useAuth()

  if (!isAuth) {
    return <Navigate to="/login"/>
  }

  return (<>{children}</>)

};

export const ProtectedRoute = observer(ProtectedRouteComponent);