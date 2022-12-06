import React, {FC} from 'react';
import {UserTestsListWrapper} from "../UserTests.styled";
import {Test} from "../../../utils/types";
import {TestCard} from "../../../components/TestCard";
import {useNavigate} from "react-router-dom";

interface UserTestsListProps {
  tests: Test[]
}

export const UserTestsList:FC<UserTestsListProps> = ({tests}) => {
  const navigate = useNavigate()
  const startTest = () => {
    navigate('/test')
  }

  return (
    <UserTestsListWrapper>
      {tests.map(test => (
        <TestCard key={test.id} test={test} handleStart={startTest}/>
      ))}
    </UserTestsListWrapper>
  );
};