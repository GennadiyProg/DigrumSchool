import React, {FC, useEffect, useState} from 'react';
import {MainContentStyled, MainLayoutGrid} from "./MainLayout.styled";
import {AppNavbar} from "../../components/AppNavbar";
import {MainMenu} from "../../components/MainMenu";
import {Outlet} from "react-router-dom";
import {useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({children}) => {
  const [isOpen, setIsOpen] = useState(true)

  const theme = useTheme()

  const toggleMainMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }

  return (
    <MainLayoutGrid>
      <AppNavbar toggle={toggleMainMenu}/>
      <MainMenu isOpen={isOpen}></MainMenu>
      <MainContentStyled theme={theme} isMenuOpen={isOpen}>
        <Outlet />
      </MainContentStyled>
    </MainLayoutGrid>
  );
};