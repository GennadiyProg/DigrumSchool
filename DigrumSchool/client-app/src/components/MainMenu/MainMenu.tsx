import React, {FC, ReactNode} from 'react';
import {Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import FlagIcon from '@mui/icons-material/Flag';
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {MainMenuStyled} from "./MainMenu.styled";
import {History} from "@mui/icons-material";

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
    icon: <RoofingOutlinedIcon/>,
    title: "Home",
    path: "/"
  },
  {
    icon: <SchoolOutlinedIcon/>,
    title: "Cousres",
    path: "/courses"
  },
  {
    icon: <LogoutOutlinedIcon/>,
    title: "Logout",
    path: "/login"
  },
  {
    icon: <AddCircleOutlineIcon/>,
    title: "Create test",
    path: "/create",
  },
  {
    icon: <FlagIcon/>,
    title: "My tests",
    path: "/my-tests",
  },
  {
    icon: <History/>,
    title: "History",
    path: "/history",
  },
  {
    icon: <DomainAddIcon/>,
    title: "Add course",
    path: "/create-course",
  },
]

export const MainMenu: FC<MainMenuProps> = observer(({isOpen}) => {
  const theme = useTheme()

  return (
    <MainMenuStyled isOpen={isOpen} theme={theme}>
      <List>
        {menuItems.map(item => (
          <Link style={{
            textDecoration: 'none',
          }} key={item.title} to={item.path}>
            <ListItemButton sx={{
              minHeight: '48px',
              textDecoration: 'none',
              color: '#fff'
            }}>
              <ListItemIcon sx={{
                minWidth: '50px',
                color: '#fff',
              }}>{item.icon}</ListItemIcon>
              {isOpen && <ListItemText>{item.title}</ListItemText>}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </MainMenuStyled>
  );
})