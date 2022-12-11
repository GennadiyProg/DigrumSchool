import React, {FC, useState} from 'react';
import {InputTestWordContainer, InputTestWordItem, TranslateWrapper, WordWrapper} from "../CreateTest.styled";
import {AppInput} from "../../../components/AppInput";
import {Button} from "@mui/material";
import {WordPrepare} from "../../../utils/types";

interface InputTestWordProps {
  createWord: (word: WordPrepare) => void
}

export const InputTestWord:FC<InputTestWordProps> = ({createWord}) => {
  const [word, setWord] = useState('')
  const [translations, setTranslations] = useState([''])

  const addTranslate = () => {
    setTranslations([...translations, ''])
  }

  const translationsHandler = (value: string, idx: number) => {
    setTranslations(translations.map((t, i) => {
      return i === idx ? value : t
    }))
  }

  const prepareWord = () => {
    createWord({
      name: word,
      translations,
    })
  }

  return (
    <>
      <InputTestWordItem>
        <WordWrapper>
          <AppInput
            id={'word-1'}
            label={'Word'}
            value={word}
            handler={(v: string) => setWord(v)}
          />
        </WordWrapper>

        {translations.map((t, i) => (
          <TranslateWrapper key={i}>
            <AppInput id={`i`}
                      label={'Translate'}
                      handler={(v: string) => translationsHandler(v, i)}
            />
          </TranslateWrapper>
        ))}

        <Button onClick={addTranslate}>+ перевод</Button>
      </InputTestWordItem>

      <Button onClick={prepareWord} sx={{
        margin: '10px 0',
      }}>Создать</Button>
    </>
  );
};