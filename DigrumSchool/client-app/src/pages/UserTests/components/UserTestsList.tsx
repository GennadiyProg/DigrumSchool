import React, {FC} from 'react';
import {UserTestsListWrapper} from "../UserTests.styled";
import {Test} from "../../../utils/types";
import {TestCard} from "../../../components/TestCard";
import {useNavigate} from "react-router-dom";

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
        <TestCard key={test.id}
                  test={test}
                  handleStart={() => startTest(test.id)}
                  handleCancel={() => removeTest(test.id)}
        />
      ))}
    </UserTestsListWrapper>
  );
};