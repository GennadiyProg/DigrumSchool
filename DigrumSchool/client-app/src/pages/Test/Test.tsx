import React, {useEffect, useState} from 'react';
import {TestContainer, TestWrapper} from "./Test.styled";
import {Box, CircularProgress, LinearProgress, Typography, useTheme, Zoom} from "@mui/material";
import {Answer} from "./components/Answer";
import {AnswerControls} from "./components/AnswerControls";
import {Test} from "../../utils/types";
import {TestPreStart} from "./components/TestPreStart";
import {TestFinish} from "./components/TestFinish";
import {CustomTheme} from "../../themes/BasicTheme";
import {useParams} from "react-router-dom";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getTestById} from "../../api/Test";

const errorBackground = 'rgba(239,143,143,0.63)'
const successBackground = 'rgba(109,199,111,0.66)'
const initialTest: Test = {
  id: 0,
  title: '',
  isGeneral: false,
  creator: {username: ''},
  language: {id: 0, name: ''},
  category: {id: 0, name: ''},
  words: [],
}


export const TestPage = () => {
  const [test, setTest] = useState<Test>(initialTest)
  const [index, setIndex] = useState(-1)
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [normalizedTranslations, setNormalizedTranslations] = useState('')
  const [score, setScore] = useState(0)
  const [componentIs, setComponentIs] = useState(<CircularProgress/>)
  const [background, setBackground] = useState('')
  const theme: CustomTheme = useTheme()
  const params = useParams()
  const {isLoading, LoaderFetch} = useLoaderFetch(getTestById)

  useEffect(() => {
    getTest()
  }, [])

  useEffect(() => {
    setNormalizedTranslations(getTranslations(index).join(' / '))

    if (index < 0 || index >= test.words.length) {
      index < 0
        ? setComponentIs(<TestPreStart start={start}/>)
        : setComponentIs(
          <TestFinish testId={test.id} maxScore={test.words.length} score={score} restart={restart}/>
        )
    }
  }, [index])

  const getTranslations = (index: number): string[] => {
    if (index < 0 || index > test.words.length - 1) return []

    return test.words[index]?.translations.map(obj => obj.value)
  }

  const next = (_answer: string) => {
    const isCorrect = getTranslations(index).includes(_answer.trim().toLowerCase())
    if (isCorrect && !isShowAnswer) {
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
  const getTest = async () => {
    if (!params.id) return

    const response = await LoaderFetch(params.id)
    response.json().then((res: Test) => setTest(res))

  }
  return (
    <TestContainer background={background}>
      {
        (isLoading || !test.words)
          ? <CircularProgress/>
          : (
            <>
              <Box sx={{
                width: '100%',
              }}>
                <LinearProgress variant="determinate" color='warning' sx={{height: '6px'}}
                                value={index / test.words.length * 100}/>
              </Box>
              <TestWrapper>
                {index < 0 || index > (test.words.length - 1) ? componentIs : (
                  <>
                    {score}
                    <Typography variant='h3' sx={{marginBottom: '10%'}}>{test.words[index].name}</Typography>
                    <Answer next={next}/>
                    <AnswerControls skip={skip} isShowAnswer={isShowAnswer}
                                    toggleShowAnswer={toggleShowAnswer}/>

                    <Zoom in={isShowAnswer}>
                      <Typography variant='h5' sx={{marginTop: '10%'}}>{normalizedTranslations}</Typography>
                    </Zoom>
                  </>
                )}
              </TestWrapper>
            </>
          )
      }
    </TestContainer>
  );
};