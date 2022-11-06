import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {AppInput} from "../components/AppInput";
import LoginIcon from "@mui/icons-material/Login";
import PasswordIcon from "@mui/icons-material/Password";
import {LoginLayout} from "../layouts/LoginLayout";

export const Registration = () => {
  return (
    <LoginLayout>
      <Typography variant="h2" gutterBottom sx={{
        fontSize: '30px',
        textAlign: 'center',
      }}>Регистрация</Typography>
      <AppInput id="login" label="login" required icon={<LoginIcon/>}/>
      <AppInput id="password" label="password" type="password" required icon={<PasswordIcon/>}/>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
      }}>
        <Button variant="outlined">Зарегистрироваться</Button>
      </Box>
    </LoginLayout>
  );
};