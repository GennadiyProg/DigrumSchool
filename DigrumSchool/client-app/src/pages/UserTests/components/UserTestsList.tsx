import React, {FC} from 'react';
import {UserTestsListWrapper} from "../UserTests.styled";
import {Test} from "../../../utils/types";
import {AppCard} from "../../../components/AppCard";
import {useNavigate} from "react-router-dom";
import {Button, Typography} from "@mui/material";

interface UserTestsListProps {
  tests: Test[],
  removeTest: (id: number) => void
}

export const UserTestsList:FC<UserTestsListProps> = ({tests, removeTest}) => {
  const navigate = useNavigate()
  const startTest = (id: number) => {
    navigate(`/test/${id}`)
  }

  return (
    <UserTestsListWrapper>
      {tests.map(test => (
        <AppCard key={test.id} handleCancel={() => removeTest(test.id)}>
          <Typography variant='h6'>{test.title}</Typography>
          <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
        </AppCard>
      ))}
    </UserTestsListWrapper>
  );
};