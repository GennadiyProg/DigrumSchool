import React, {useEffect, useState} from 'react';
import {TestContainer, TestWrapper} from "./Test.styled";
import {Box, CircularProgress, LinearProgress, Typography, useTheme, Zoom} from "@mui/material";
import {Answer} from "./components/Answer";
import {AnswerControls} from "./components/AnswerControls";
import {Test} from "../../utils/types";
import {TestPreStart} from "./components/TestPreStart";
import {TestFinish} from "./components/TestFinish";
import {CustomTheme} from "../../themes/BasicTheme";

const errorBackground = 'rgba(239,143,143,0.63)'
const successBackground = 'rgba(109,199,111,0.66)'

const initialTest: Test = {
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
}

export const TestPage = () => {
  const [test, setTest] = useState(initialTest)
  const [index, setIndex] = useState(-1)
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [normalizedTranslates, setNormalizedTranslates] = useState('')
  const [score, setScore] = useState(0)
  const [componentIs, setComponentIs] = useState(<CircularProgress/>)
  const [background, setBackground] = useState('')
  const theme: CustomTheme = useTheme()

  useEffect(() => {
    setNormalizedTranslates(test.words[index]?.translates.join(' / '))

    if (index < 0 || index >= test.words.length) {
      index < 0
        ? setComponentIs(<TestPreStart start={start}/>)
        : setComponentIs(
          <TestFinish maxScore={test.words.length} score={score} restart={restart}/>
        )
    }
  }, [index])

  const next = (_answer: string) => {
    const isCorrect = test.words[index]?.translates.includes(_answer.toLowerCase())
    if (isCorrect) {
      setScore(score + 1)
    }

    isCorrect && !isShowAnswer ? setBackground(successBackground) : setBackground(errorBackground)
    setIndex(index + 1)
    isShowAnswer && setIsShowAnswer(false)
  }
  const start = () => {
    setIndex(0)
  }
  const skip = () => {
    isShowAnswer && setIsShowAnswer(false)
    setIndex(index + 1)
    setBackground(errorBackground)
  }
  const restart = () => {
    setScore(0)
    setIndex(0)
    setBackground(theme.customPalette.backgroundGlobal.main)
  }
  const toggleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer)
    setBackground(errorBackground)
  }

  return (
    <TestContainer background={background}>
      <Box sx={{
        width: '100%',
      }}>
        <LinearProgress variant="determinate" color='warning' sx={{height: '6px'}} value={index / test.words.length * 100} />
      </Box>
      <TestWrapper>
        {index < 0 || index > (test.words.length - 1) ? componentIs : (
          <>
            {score}
            <Typography variant='h3' sx={{marginBottom: '10%'}}>{test.words[index].title}</Typography>
            <Answer next={next}/>
            <AnswerControls skip={skip} isShowAnswer={isShowAnswer}
                            toggleShowAnswer={toggleShowAnswer}/>

            <Zoom in={isShowAnswer}>
              <Typography variant='h5' sx={{marginTop: '10%'}}>{normalizedTranslates}</Typography>
            </Zoom>
          </>
        )}
      </TestWrapper>
    </TestContainer>
  );
};