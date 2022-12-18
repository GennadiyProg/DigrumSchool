import React, {FC} from 'react';
import {TestsListContainer} from "../Course.styled";
import {AppCard} from "../../../components/AppCard";
import {Test} from "../../../utils/types";
import {Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

interface TestsListProps {
  tests: Test[],
  isCreator: boolean,
}

export const TestsList:FC<TestsListProps> = ({tests, isCreator}) => {
  const navigate = useNavigate()
  const params = useParams()
  const startTest = (id: number) => {
    navigate({
      pathname: `/test/${id}`,
      search: `?courseId=${params.id}`,
    })
  }
  return (
    <TestsListContainer>
      {tests.map(test => (
        <AppCard canceled={isCreator} key={test.id}>
          <Typography variant='h6'>{test.title}</Typography>
          <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
        </AppCard>
      ))}
    </TestsListContainer>
  );
};