import React, {FC} from 'react';
import {TestsListContainer} from "../Course.styled";
import {AppCard} from "../../../components/AppCard";
import {Test} from "../../../utils/types";
import {Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {AppCardBtns} from "../../../components/AppCard/AppCard.styled";

interface TestsListProps {
  tests: Test[],
  isCreator: boolean,
  removeTest: (testId: number) => void,
}

export const TestsList:FC<TestsListProps> = ({tests, isCreator, removeTest}) => {
  const navigate = useNavigate()
  const params = useParams()
  const startTest = (id: number) => {
    navigate({
      pathname: `/test/${id}`,
      search: `?courseId=${params.id}`,
    })
  }
  const preview = (id: number) => {
    navigate(`/view/${id}`)
  }
  return (
    <TestsListContainer>
      {tests.map(test => (
        <AppCard canceled={isCreator} handleCancel={() => removeTest(test.id)} key={test.id}>
          <Typography variant='h6'>{test.title}</Typography>
          <AppCardBtns>
            <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
            <Button variant="contained" color="warning" onClick={() => preview(test.id)}>Учить</Button>
          </AppCardBtns>
        </AppCard>
      ))}
    </TestsListContainer>
  );
};