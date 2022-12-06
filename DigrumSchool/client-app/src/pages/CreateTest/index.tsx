import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {CreateTestHeader} from "./components/CreateTestHeader";
import {InputTestWord} from "./components/InputTestWord";
import {
  CreateTestContainer,
  CreateTestHeaderContainer,
  CreateTestPreviewContainer,
  InputTestWordContainer
} from "./CreateTest.styled";
import {CreateTestPreview} from "./components/CreateTestPreview";
import {Word} from "../../utils/types";

const initialWords: Word[] = [
  {
    id: '1',
    title: 'some',
    translates: ['color', 'red']
  },
  {
    id: '2',
    title: 'some',
    translates: ['color', 'red', 'color', 'red', 'color', 'red', 'color', 'red']
  },
  {
    id: '3',
    title: 'some',
    translates: ['color', 'red', 'color', 'red', 'color']
  },
  {
    id: '4',
    title: 'some',
    translates: ['color', 'red']
  },
  {
    id: '5',
    title: 'some',
    translates: ['color', 'red', 'color', 'red', 'color', 'red', 'color', 'red']
  },
  {
    id: '6',
    title: 'some',
    translates: ['color', 'red', 'color', 'red', 'color']
  },
]

export const CreateTest = () => {
  const [words, setWords] = useState(initialWords)

  const createWord = (word: Word) => {
    setWords([...words, word])
  }

  return (
    <CreateTestContainer>
      <Typography variant="h3">Создание теста</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CreateTestHeader/>
        <CreateTestPreview words={words}/>
        <InputTestWordContainer>
          <InputTestWord createWord={createWord}/>
        </InputTestWordContainer>
      </Box>
    </CreateTestContainer>
  );
};