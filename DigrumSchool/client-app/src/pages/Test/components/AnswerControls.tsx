import React, {FC} from 'react';
import {AnswerControl, AnswerControlsContainer} from "../Test.styled";
import {useTheme} from "@mui/material";

interface AnswerControlsProps {
  toggleShowAnswer: () => void,
  skip: () => void,
  isShowAnswer: boolean,
}

export const AnswerControls:FC<AnswerControlsProps> = ({toggleShowAnswer, isShowAnswer, skip}) => {
  const theme = useTheme()

  return (
    <AnswerControlsContainer>
      <AnswerControl onClick={skip}>Пропустить</AnswerControl>
      { !isShowAnswer && <AnswerControl onClick={toggleShowAnswer}>Показать ответ</AnswerControl> }
    </AnswerControlsContainer>
  );
};