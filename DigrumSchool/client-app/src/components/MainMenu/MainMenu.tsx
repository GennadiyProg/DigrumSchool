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
import {useAuth} from "../../hooks/useAuth";
import DescriptionIcon from '@mui/icons-material/Description';

interface MainMenuProps {
  isOpen: boolean,
}

type RoleType = 'Admin' | 'Teacher' | 'User' | 'all' | undefined

interface menuItem {
  icon: ReactNode,
  title: string,
  path: string,
  protected: boolean,
  roles: RoleType[]
}

const menuItems: menuItem[] = [
  {
    icon: <RoofingOutlinedIcon/>,
    title: "Главная",
    path: "/",
    protected: false,
    roles: ['all'],
  },
  {
    icon: <AddCircleOutlineIcon/>,
    title: "Создать тест",
    path: "/create",
    protected: true,
    roles: ['User', 'Teacher', 'Admin'],
  },
  {
    icon: <FlagIcon/>,
    title: "Мои тесты",
    path: "/my-tests",
    protected: true,
    roles: ['User', 'Teacher', 'Admin'],
  },
  {
    icon: <SchoolOutlinedIcon/>,
    title: "Курсы",
    path: "/courses",
    protected: true,
    roles: ['User', 'Teacher', 'Admin'],
  },
  {
    icon: <DomainAddIcon/>,
    title: "Создать курс",
    path: "/create-course",
    protected: true,
    roles: ['User', 'Teacher', 'Admin'],
  },
  {
    icon: <History/>,
    title: "История",
    path: "/history",
    protected: false,
    roles: ['all'],
  },
  {
    icon: <DescriptionIcon/>,
    title: "Заявки",
    path: "/applications",
    protected: true,
    roles: ['Admin', 'Teacher'],
  },
  {
    icon: <LogoutOutlinedIcon/>,
    title: "Выход",
    path: "/login",
    protected: false,
    roles: ['all'],

  },
]

export const MainMenu: FC<MainMenuProps> = observer(({isOpen}) => {
  const theme = useTheme()
  const isAuth = useAuth()

  const unsetCookie = () => {
    document.cookie = 'login=';
    userStore.setUser(null)
  }

  return (
    <MainMenuStyled isOpen={isOpen} theme={theme}>
      <List>
        {menuItems.filter(item => item.roles.includes('all') || item.roles.includes(userStore.user?.role.name)).map(item => (
          <Link style={{
            textDecoration: 'none',
            pointerEvents: item.protected && !isAuth ? 'none' : 'auto'
          }}
                key={item.title}
                to={item.path}
                onClick={() => item.path === '/login' && unsetCookie()}
          >
            <ListItemButton sx={{
              minHeight: '48px',
              textDecoration: 'none',
              color: '#fff'
            }} disabled={item.protected && !isAuth}>
              <ListItemIcon sx={{
                minWidth: '50px',
                color: '#fff',
              }}>{item.icon}</ListItemIcon>
              {isOpen &&
                  <ListItemText>{item.path === '/login' ? (userStore.user ? "Выход" : "Вход") : item.title}</ListItemText>}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </MainMenuStyled>
  );
})