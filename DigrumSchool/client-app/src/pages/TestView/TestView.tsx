import React, {useEffect, useMemo, useState} from 'react';
import {TestViewContainer} from "./TestView.styled";
import {PageHeader} from "../../components/PageHeader";
import {useParams} from "react-router-dom";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getTestById} from "../../api/Test";
import {Test} from "../../utils/types";
import {AppSimpleTable} from "../../components/AppSimpleTable";

const initialTest: Test = {
  id: 0,
  title: '',
  isGeneral: false,
  creator: {username: ''},
  language: {id: 0, name: ''},
  category: {id: 0, name: ''},
  words: [],
}

const findMaxTranslations = (test: Test) => {
  let max = 0
  test.words.forEach(word => {
    if (word.translations.length > max) {
      max = word.translations.length
    }
  })
  return max
}

export const TestView = () => {
  const params = useParams()
  const {isLoading, LoaderFetch} = useLoaderFetch(getTestById)
  const [test, setTest] = useState<Test>(initialTest)

  const getTest = async () => {
    if (params.id) {
      const response = await LoaderFetch(params.id)
      if (!response.ok) {
        return
      }
      const data = await response.json()
      setTest(data)
    }
  }

  useEffect(() => {
    getTest()
  }, [])

  const previewWords = useMemo(() => {
    const max = findMaxTranslations(test)
    const newArr = test.words.map(word => {
      const obj: any = {word: word.name}
      for (let index = 0; index < max; index++) {
        let translation = word.translations[index] ? word.translations[index].value : '-'
        let key = `translation-${index + 1}`
        obj[key] = translation
      }
      return obj
    })
    console.log(newArr)
    return newArr
  }, [test])

  return (
    <TestViewContainer>
      <PageHeader>{test.title}</PageHeader>
      <AppSimpleTable data={previewWords}/>
    </TestViewContainer>
  );
};