import React, {FC} from 'react';
import {MainLayoutGrid} from "./MainLayout.styled";
import {AppNavbar} from "../../components/AppNavbar";
import {MainMenu} from "../../components/MainMenu";

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
  return (
    <MainLayoutGrid>
      <AppNavbar></AppNavbar>
      <MainMenu></MainMenu>
      {children}
    </MainLayoutGrid>
  );
};