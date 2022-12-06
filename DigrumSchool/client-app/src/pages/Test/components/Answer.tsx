import React, {FC, useState} from 'react';
import {AnswerContainer} from "../Test.styled";
import {AppInput} from "../../../components/AppInput";
import {Button} from "@mui/material";

interface AnswerProps {
  next: (answer: string) => void,
}

export const Answer:FC<AnswerProps> = ({next}) => {
  const [answer, setAnswer] = useState('')

  const emitAnswer = () => {
    next(answer)
    setAnswer('')
  }

  return (
    <AnswerContainer>
      <AppInput id='answer' label='answer' value={answer} handler={(v: string) => setAnswer(v)} sx={{
        flexGrow: 1,
      }}/>
      <Button onClick={emitAnswer} color='success'>Send</Button>
    </AnswerContainer>
  );
};