import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password"
import LoginIcon from "@mui/icons-material/Login"
import {AppInput} from "../components/AppInput";
import {LoginLayout} from "../layouts/LoginLayout";

export const Login = () => {

  return (
    <LoginLayout>
      <Typography variant="h2" gutterBottom sx={{
        fontSize: '30px',
        textAlign: 'center',
      }}>Войти в систему</Typography>
      <AppInput id="login" label="login" required icon={<LoginIcon/>}/>
      <AppInput id="password" label="password" type="password" required icon={<PasswordIcon/>}/>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0',
      }}>
        <Button variant="outlined">Войти</Button>
      </Box>
    </LoginLayout>
  );
};