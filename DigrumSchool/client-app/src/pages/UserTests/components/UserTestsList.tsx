import React, {FC} from 'react';
import {UserTestsListWrapper} from "../UserTests.styled";
import {Test} from "../../../utils/types";
import {AppCard} from "../../../components/AppCard";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Typography, Zoom} from "@mui/material";
import {useLoaderFetch} from "../../../hooks/useLoaderFetch";
import {createApplication} from "../../../api/Application";
import {AppCardBtns} from "../../../components/AppCard/AppCard.styled";
import {useAlert} from "../../../hooks/useAlert";

interface UserTestsListProps {
  tests: Test[],
  removeTest: (id: number) => void
}

export const UserTestsList:FC<UserTestsListProps> = ({tests, removeTest}) => {
  const navigate = useNavigate()
  const {isLoading, LoaderFetch} = useLoaderFetch(createApplication)
  const {alertData, setAlertData} = useAlert()
  const startTest = (id: number) => {
    navigate(`/test/${id}`)
  }

  const reqCreateApplication = async (id: number) => {
    const response = await LoaderFetch(id)
    if (!response.ok) {
      return setAlertData({isShow: true, message: 'Ошибка!', type: 'error'})
    }
    setAlertData({isShow: true, message: 'Заявка успешно создана!', type: 'success'})
  }

  const preview = (id: number) => {
    navigate(`/view/${id}`)
  }

  return (
    <UserTestsListWrapper>
      {alertData.isShow && (
        <Zoom in={alertData.isShow}>
          <Alert severity={alertData.type}>{alertData.message}</Alert>
        </Zoom>
      )}
      {tests.map(test => (
        <AppCard key={test.id} handleCancel={() => removeTest(test.id)}>
          <Typography variant='h6'>{test.title}</Typography>
          <AppCardBtns>
            {!test.isGeneral && (
              <Button variant="contained" onClick={() => reqCreateApplication(test.id)}>Предложить глобальным</Button>
            )}
            <Button variant="contained" onClick={() => startTest(test.id)}>Пройти</Button>
            <Button variant="contained" color="warning" onClick={() => preview(test.id)}>Учить</Button>
          </AppCardBtns>
        </AppCard>
      ))}
    </UserTestsListWrapper>
  );
};