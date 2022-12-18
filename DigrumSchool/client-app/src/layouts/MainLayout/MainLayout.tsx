import React, {useState} from 'react';
import {MainContentStyled, MainLayoutContainer, MainLayoutGrid} from "./MainLayout.styled";
import {AppNavbar} from "../../components/AppNavbar";
import {MainMenu} from "../../components/MainMenu";
import {Outlet} from "react-router-dom";
import {useTheme} from "@mui/material";

export const MainLayout = () => {
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