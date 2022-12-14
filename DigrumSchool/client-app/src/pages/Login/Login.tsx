import React, {FormEvent, useEffect, useReducer} from 'react';
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password"
import LoginIcon from "@mui/icons-material/Login"
import {AppInput} from "../../components/AppInput";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {AuthStatus} from "../../utils/consts";
import {Reducer, TextAction, User} from "../../utils/types";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {login} from "../../api/Auth";
import {FormFiledsWrapper, LoginFormContainer} from "./Login.styled";
import {userStore} from "../../stores/UserStore";

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

export const Login = () => {
  const {setStatus} = useOutletContext<any>()
  const navigate = useNavigate()
  const [formControls, dispatch] = useReducer(reducer, initialForm)
  const {isLoading, LoaderFetch} = useLoaderFetch(login)

  useEffect(() => setStatus(AuthStatus.none), [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await LoaderFetch(formControls)

    if (!response.ok) {
      setStatus(AuthStatus.error)
      return
    }

    const data = await response.json().then((v: User) => v)
    userStore.setUser(data)
    console.log(data)
    setStatus(AuthStatus.success)
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  return (
    <LoginFormContainer>
      <Typography variant="h2" gutterBottom sx={{
        fontSize: '30px',
        textAlign: 'center',
      }}>?????????? ?? ??????????????</Typography>
      <form onSubmit={submit}>
        <FormFiledsWrapper>
          <AppInput
            value={formControls.UserName}
            handler={(payload: string) => dispatch(handleUserName(payload))}
            id="username"
            label="username"
            required
            icon={<LoginIcon/>}
          />
          <AppInput
            value={formControls.Password}
            handler={(payload: string) => dispatch(handlePassword(payload))}
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
            {isLoading ? <CircularProgress /> : <Button type="submit" variant="outlined">??????????</Button>}
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            margin: '10px 0',
            gap: '20px',
          }}>
            ?? ?????? ?????? ?????? ????????????????? <Link to={'/registration'}> ????????????????????????????????????</Link>
          </Box>
        </FormFiledsWrapper>
      </form>
    </LoginFormContainer>
  );
};