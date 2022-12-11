import React, {FC, useEffect} from 'react';
import {Button, CircularProgress, Typography} from "@mui/material";
import {useLoaderFetch} from "../../../hooks/useLoaderFetch";
import {complete} from "../../../api/Test";

interface TestFinishProps {
  restart: () => void
  score: number,
  maxScore: number,
  testId: number,
}

export const TestFinish:FC<TestFinishProps> = ({restart, score, maxScore, testId}) => {
  const {isLoading, LoaderFetch} = useLoaderFetch(complete)

  const PercentageScore = Math.floor(score / maxScore * 100)

  const completeTest = () => {
    LoaderFetch({
      TestId: testId,
      Score: PercentageScore,
      CourseId: null,
    })
  }
  useEffect(() => {
    completeTest()
  }, [])
  return (
    <>
      {isLoading ? <CircularProgress/> : (
        <>
          <Typography variant='h4'>Ваш счет: {score} / {maxScore} ({PercentageScore})</Typography>
          <Button onClick={restart}>Пройти еще раз</Button>
        </>
      )}
    </>
  );
};