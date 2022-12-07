import React from 'react';
import {UserTestsContainer} from "./UserTests.styled";
import {Typography} from "@mui/material";
import {UserTestsList} from "./components/UserTestsList";
import {Test} from "../../utils/types";

const initialTest: Test[] = [
  {
    id: '1',
    title: 'colors',
    creator: '143',
    isGeneral: false,
    words: [
      {
        id: '1',
        title: 'red',
        translates: ['красный', 'рыжий']
      },
      {
        id: '2',
        title: 'green',
        translates: ['зеленый']
      },
      {
        id: '3',
        title: 'yellow',
        translates: ['желтый']
      },
    ]
  },
  {
    id: '2',
    title: 'colors',
    creator: '143',
    isGeneral: false,
    words: [
      {
        id: '1',
        title: 'red',
        translates: ['красный', 'рыжий']
      },
      {
        id: '2',
        title: 'green',
        translates: ['зеленый']
      },
      {
        id: '3',
        title: 'yellow',
        translates: ['желтый']
      },
    ]
  }, {
    id: '3',
    title: 'colors',
    creator: '143',
    isGeneral: false,
    words: [
      {
        id: '1',
        title: 'red',
        translates: ['красный', 'рыжий']
      },
      {
        id: '2',
        title: 'green',
        translates: ['зеленый']
      },
      {
        id: '3',
        title: 'yellow',
        translates: ['желтый']
      },
    ]
  }
]

export const UserTests = () => {
  return (
    <UserTestsContainer>
      <Typography variant='h4'>Мои тесты</Typography>
      <UserTestsList tests={initialTest}/>
    </UserTestsContainer>
  );
};