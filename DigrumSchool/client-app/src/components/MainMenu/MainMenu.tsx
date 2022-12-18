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
import {userStore} from "../../stores/UserStore";

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
    title: "Главная",
    path: "/"
  },
  {
    icon: <AddCircleOutlineIcon/>,
    title: "Создать тест",
    path: "/create",
  },
  {
    icon: <FlagIcon/>,
    title: "Мои тесты",
    path: "/my-tests",
  },
  {
    icon: <SchoolOutlinedIcon/>,
    title: "Курсы",
    path: "/courses"
  },
  {
    icon: <DomainAddIcon/>,
    title: "Создать курс",
    path: "/create-course",
  },
  {
    icon: <History/>,
    title: "История",
    path: "/history",
  },
  // document.cookie.split(';').find(el => (el.split('=')[0] === 'login' && el.split('=')[1]))
  {
    icon: <LogoutOutlinedIcon/>,
    title: "Выход",
    path: "/login"
  },
]

export const MainMenu: FC<MainMenuProps> = observer(({isOpen}) => {
  const theme = useTheme()

  const unsetCookie = () => {
    document.cookie = 'login=';
    userStore.setUser(null)
  }

  return (
    <MainMenuStyled isOpen={isOpen} theme={theme}>
      <List>
        {menuItems.map(item => (
          <Link style={{
                  textDecoration: 'none',
                }}
                key={item.title}
                to={item.path}
                onClick={() => item.path === '/login' && unsetCookie()}
          >
            <ListItemButton sx={{
              minHeight: '48px',
              textDecoration: 'none',
              color: '#fff'
            }}>
              <ListItemIcon sx={{
                minWidth: '50px',
                color: '#fff',
              }}>{item.icon}</ListItemIcon>
              {isOpen && <ListItemText>{item.path === '/login' ? (userStore.user ? "Выход" : "Вход") : item.title}</ListItemText>}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </MainMenuStyled>
  );
})