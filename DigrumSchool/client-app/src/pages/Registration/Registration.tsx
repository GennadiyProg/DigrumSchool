import React, {FormEvent, useEffect, useReducer, useState} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {AppInput} from "../../components/AppInput";
import LoginIcon from "@mui/icons-material/Login";
import PasswordIcon from "@mui/icons-material/Password";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {AuthStatus} from "../../utils/consts";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {register} from "../../api/Auth";
import {Reducer, TextAction} from "../../utils/types";
import {FormFiledsWrapper, LoginFormContainer} from "../Login/Login.styled";

enum ActionKind {
  handleUserName ='handleUserName',
  handlePassword ='handlePassword',
}

type State = {
  UserName: string,
  Password: string,
}

const initialForm: State = {
  UserName: '',
  Password: ''
}

const handleUserName = (payload: string): TextAction<ActionKind> => ({
  type: ActionKind.handleUserName,
  payload
})

const handlePassword = (payload: string): TextAction<ActionKind> => ({
  type: ActionKind.handlePassword,
  payload
})

const reducer:Reducer<State, TextAction<ActionKind>> = (state, action) => {
  switch (action.type) {
    case 'handleUserName':
      return {
        ...state,
        UserName: action.payload
      }
    case 'handlePassword':
      return {
        ...state,
        Password: action.payload
      }
    default:
      return state
  }
}

export const Registration = () => {
  const [formControls, dispatch] = useReducer(reducer, initialForm)
  const {setStatus} = useOutletContext<any>()
  const navigate = useNavigate()
  const {isLoading, LoaderFetch} = useLoaderFetch(register)
  useEffect(() => setStatus(AuthStatus.none), [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await LoaderFetch(formControls)

    if (!response.ok) {
      return setStatus(AuthStatus.error);
    }

    setStatus(AuthStatus.success)
    setTimeout(() => {
      navigate('/login')
    }, 500)

  }
  return (
    <LoginFormContainer>
      <Typography variant="h2" gutterBottom sx={{
        fontSize: '30px',
        textAlign: 'center',
      }}>Регистрация</Typography>
      <form onSubmit={submit}>
        <FormFiledsWrapper>
          <AppInput
            handler={(payload: string) => dispatch(handleUserName(payload))}
            value={formControls.UserName}
            id="username"
            label="username"
            required
            icon={<LoginIcon/>}
          />
          <AppInput
            handler={(payload: string) => dispatch(handlePassword(payload))}
            value={formControls.Password}
            id="password"
            label="password"
            type="password"
            required
            icon={<PasswordIcon/>}
          />
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0',
          }}>
            { isLoading
              ? <CircularProgress />
              : <Button type="submit" variant="outlined">Зарегистрироваться</Button>
            }
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            margin: '10px 0',
            gap: '20px',
          }}>
            Уже есть аккаунт? <Link to={'/login'}>Войти</Link>
          </Box>
        </FormFiledsWrapper>
      </form>
    </LoginFormContainer>
  );
};