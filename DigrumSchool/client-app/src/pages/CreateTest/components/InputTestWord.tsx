import React, {FC, useState} from 'react';
import {InputTestWordContainer, InputTestWordItem, TranslateWrapper, WordWrapper} from "../CreateTest.styled";
import {AppInput} from "../../../components/AppInput";
import {Button} from "@mui/material";
import {Word} from "../../../utils/types";

interface InputTestWordProps {
  createWord: (word: Word) => void
}

export const InputTestWord:FC<InputTestWordProps> = ({createWord}) => {
  const [word, setWord] = useState('')
  const [translates, setTranslates] = useState([''])

  const addTranslate = () => {
    console.log(translates)
    setTranslates([...translates, ''])
  }

  const translatesHandler = (value: string, idx: number) => {
    setTranslates(translates.map((t, i) => {
      return i === idx ? value : t
    }))
  }

  const prepareWord = () => {
    createWord({
     title: word,
     translates,
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

        {translates.map((t, i) => (
          <TranslateWrapper key={i}>
            <AppInput id={`i`}
                      label={'Translate'}
                      handler={(v: string) => translatesHandler(v, i)}
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