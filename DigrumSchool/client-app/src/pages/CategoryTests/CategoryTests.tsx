import React, {useEffect, useState} from 'react';
import {Test} from "../../utils/types";
import {useNavigate} from "react-router-dom";
import {UserTestsListWrapper} from "../UserTests/UserTests.styled";
import {AppCard} from "../../components/AppCard";
import {Button, Typography} from "@mui/material";
import {PageHeader} from "../../components/PageHeader";
import {useQuery} from "../../hooks/useQuery";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getGlobalTestsByCategory} from "../../api/Test";

export const CategoryTests = () => {
  const [tests, setTests] = useState<Test[]>([])
  const navigate = useNavigate()
  const query = useQuery()
  const {isLoading, LoaderFetch: requestTests} = useLoaderFetch(getGlobalTestsByCategory)
  const startTest = (id: number) => {
    navigate(`/test/${id}`)
  }

  useEffect(() => {
    // getTests()
  }, [])

  const getTests = async () => {
    const response = await requestTests(query.get('category') || '')
    if (!response.ok) return

    const data = await response.json()
    setTests(data)
  }

  return (
    <UserTestsListWrapper>
      <PageHeader>Тесты в категории {query.get('category')}</PageHeader>
      {tests.map(test => (
        <AppCard key={test.id} canceled={false}>
          <Typography variant='h6'>{test.title}</Typography>
          <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
        </AppCard>
      ))}
    </UserTestsListWrapper>
  );
};