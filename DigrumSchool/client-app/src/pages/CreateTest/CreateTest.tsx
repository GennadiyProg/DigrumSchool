import React, {useState} from 'react';
import {Alert, Box, Button, FormControlLabel, SelectChangeEvent, Switch, Typography, Zoom} from "@mui/material";
import {CreateTestHeader} from "./components/CreateTestHeader";
import {InputTestWord} from "./components/InputTestWord";
import {
  CreateTestContainer,
  InputTestWordContainer
} from "./CreateTest.styled";
import {CreateTestPreview} from "./components/CreateTestPreview";
import {WordPrepare} from "../../utils/types";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {testCreate} from "../../api/Test"
import {SelectControl} from "./CreateTest.types";
import {AppInput} from "../../components/AppInput";
import {useAlert} from "../../hooks/useAlert";
import {categories, languages} from "../../utils/consts";
import {PageHeader} from "../../components/PageHeader";
import {userStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";

const CreateTestComponent = () => {
  const [words, setWords] = useState<WordPrepare[]>([])
  const {isLoading, LoaderFetch} = useLoaderFetch(testCreate)
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('')
  const [title, setTitle] = useState('')
  const [word, setWord] = useState('')
  const [translations, setTranslations] = useState([''])
  const [isGeneral, setIsGeneral] = useState(false)
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
      MenuItems: categories,
      helperText: 'Выберите категорию',
    },
    {
      label: 'Language',
      value: language,
      onChange: handleLanguage,
      MenuItems: languages,
      helperText: 'Выберите язык',
    },
  ]

  const createWord = (word: WordPrepare) => {
    setWords([...words, word])
    setWord('')
    setTranslations([''])
  }

  const create = async () => {
    const response = await LoaderFetch({
      Title: title,
      Category: category,
      Language: language,
      Words: words,
      IsGeneral: isGeneral,
    })
    if (!response.ok) {
      setAlertData({
        type: 'error',
        message: 'Приносим свои изменения, мы не смогли добавить ваш тест, проверьте правильность введенных данных или попробуйте попозже',
        isShow: true
      })
      return
    }
    setAlertData({type: 'success', message: 'Тест успешно добавлен', isShow: true})
    cleanFields()
  }

  const cleanFields = () => {
    setLanguage('')
    setTitle('')
    setCategory('')
    setWords([])
    setWord('')
    setTranslations([])
    setIsGeneral(false)
    setTimeout(() => {
      setAlertData({...alertData, isShow: false})
    }, 2000)
  }

  return (
    <CreateTestContainer>
      <PageHeader>Создание теста</PageHeader>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {alertData.isShow && (
          <Zoom in={alertData.isShow}>
            <Alert severity={alertData.type}>{alertData.message}</Alert>
          </Zoom>
        )}
        <CreateTestHeader SelectControls={selects}>
          {userStore.user && userStore.user.role.name === 'Admin' &&
              <FormControlLabel sx={{marginLeft: '10px'}} control={
                <Switch value={isGeneral} onChange={(e) => setIsGeneral(e.target.checked)} />
              } label="Сделать глобальным?"
              />
          }
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
          <InputTestWord word={word}
                         setWord={setWord}
                         translations={translations}
                         setTranslations={setTranslations}
                         createWord={createWord}
          />
        </InputTestWordContainer>
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          margin: '20px 0',
        }}>
          <Button variant="contained" color="success" onClick={create}>Создать тест</Button>
        </Box>
      </Box>
    </CreateTestContainer>
  );
};

export const CreateTest = observer(CreateTestComponent)