import React, {useEffect, useState} from 'react';
import {Test} from "../../utils/types";
import {useNavigate, useParams} from "react-router-dom";
import {AppCard} from "../../components/AppCard";
import {Button, Typography} from "@mui/material";
import {PageHeader} from "../../components/PageHeader";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getGlobalTestsByCategory} from "../../api/Test";
import {CategoryTestsWrapper} from "./CategoryTests.styled";

export const CategoryTests = () => {
  const [tests, setTests] = useState<Test[]>([])
  const navigate = useNavigate()
  const params = useParams()
  const {isLoading, LoaderFetch: requestTests} = useLoaderFetch(getGlobalTestsByCategory)
  const startTest = (id: number) => {
    navigate(`/test/${id}`)
  }

  useEffect(() => {
    getTests()
  }, [])

  const getTests = async () => {
    const response = await requestTests(params.category || '')
    if (!response.ok) return

    const data = await response.json()
    setTests(data)
  }

  return (
    <CategoryTestsWrapper>
      <PageHeader>Тесты в категории {params.category}</PageHeader>
      {tests.map(test => (
        <AppCard key={test.id} canceled={false}>
          <Typography variant='h6'>{test.title}</Typography>
          <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
        </AppCard>
      ))}
    </CategoryTestsWrapper>
  );
};