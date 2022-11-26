import React, {FC, ReactNode} from 'react';
import {Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom";
import {MainMenuStyled} from "./MainMenu.styled";
import {observer} from "mobx-react-lite";

interface MainMenuProps {
  isOpen: boolean,
}

interface menuItem {
  icon: ReactNode,
  title: string,
  path: string,
}

const menuItems: menuItem[] = [
  {
    icon: <RoofingOutlinedIcon />,
    title: "Home",
    path: "/"
  },
  {
    icon: <SchoolOutlinedIcon />,
    title: "Cousres",
    path: "/courses"
  },
  {
    icon: <LogoutOutlinedIcon />,
    title: "Logout",
    path: "/login"
  }
]

export const MainMenu:FC<MainMenuProps> = observer(({isOpen}) => {
  const theme = useTheme()

  return (
    <MainMenuStyled isOpen={isOpen} theme={theme}>
        <List>
          {menuItems.map(item => (
            <Link key={item.title} to={item.path}>
              <ListItemButton sx={{
                minHeight: '48px'
              }}>
                <ListItemIcon sx={{
                  minWidth: '50px'
                }}>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText>{item.title + isOpen}</ListItemText>}
              </ListItemButton>
            </Link>
          ))}
        </List>
    </MainMenuStyled>
  );
})