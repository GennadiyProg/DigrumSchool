import React, {FC} from 'react';
import {Button, Typography} from "@mui/material";

interface TestFinishProps {
  restart: () => void
  score: number,
  maxScore: number,
}

export const TestFinish:FC<TestFinishProps> = ({restart, score, maxScore}) => {
  return (
    <>
      <Typography variant='h4'>Ваш счет: {score} / {maxScore}</Typography>
      <Button onClick={restart}>Пройти еще раз</Button>
    </>
  );
};