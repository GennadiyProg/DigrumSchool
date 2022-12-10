import React, {useState} from 'react';
import {Alert, Box, Button, SelectChangeEvent, Typography, Zoom} from "@mui/material";
import {CreateTestHeader} from "./components/CreateTestHeader";
import {InputTestWord} from "./components/InputTestWord";
import {
  CreateTestContainer,
  InputTestWordContainer
} from "./CreateTest.styled";
import {CreateTestPreview} from "./components/CreateTestPreview";
import {AppAlert, Test, Word, WordPrepare} from "../../utils/types";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {testCreate} from "../../api/Test"
import {SelectControl} from "./CreateTest.types";
import {AppInput} from "../../components/AppInput";
import {useAlert} from "../../hooks/useAlert";

export const CreateTest = () => {
  const [words, setWords] = useState<WordPrepare[]>([])
  const {isLoading, LoaderFetch} = useLoaderFetch(testCreate)
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('')
  const [title, setTitle] = useState('')
  const {alertData, setAlertData} = useAlert()

  const handleCategory = (e: SelectChangeEvent) => {
    setCategory(e.target.value)
  }

  const handleLanguage = (e: SelectChangeEvent) => {
    setLanguage(e.target.value)
  }

  const selects: SelectControl[] = [
    {
      label: 'Category',
      value: category,
      onChange: handleCategory,
      MenuItems: ['Colors', 'Base', 'Home', 'Games', 'Other', 'TestCategory'],
      helperText: 'Выберите категорию',
    },
    {
      label: 'Language',
      value: language,
      onChange: handleLanguage,
      MenuItems: ['English', 'Germany', 'French', 'Italy', 'Spain'],
      helperText: 'Выберите язык',
    },
  ]

  const createWord = (word: WordPrepare) => {
    console.log(word)
    setWords([...words, word])
  }

  const create = async () => {
    const response = await LoaderFetch({
      Title: title,
      Category: category,
      Language: language,
      Words: words,
      IsGeneral: false,
    })
    response.ok
      ? setAlertData({type: 'success', message: 'Тест успешно добавлен', isShow: true})
      : setAlertData({
        type: 'error',
        message: 'Приносим свои изменения, мы не смогли добавить ваш тест, проверьте правильность введенных данных или попробуйте попозже',
        isShow: true
      })
  }

  return (
    <CreateTestContainer>
      <Typography variant="h3">Создание теста</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Zoom in={alertData.isShow}>
          <Alert severity={alertData.type}>{alertData.message}</Alert>
        </Zoom>
        <CreateTestHeader SelectControls={selects}>
          <AppInput
            id='title'
            label='title'
            value={title}
            handler={(v: string) => setTitle(v)}
            sx={{
              width: 'auto'
            }}
          />
        </CreateTestHeader>
        <CreateTestPreview words={words}/>
        <InputTestWordContainer>
          <InputTestWord createWord={createWord}/>
        </InputTestWordContainer>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          margin: '20px 0',
        }}>
          <Button onClick={create}>Создать тест</Button>
        </Box>
      </Box>
    </CreateTestContainer>
  );
};