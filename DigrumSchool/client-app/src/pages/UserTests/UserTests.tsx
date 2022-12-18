import React, {useEffect, useState} from 'react';
import {UserTestsContainer} from "./UserTests.styled";
import {Alert, CircularProgress, Typography, Zoom} from "@mui/material";
import {UserTestsList} from "./components/UserTestsList";
import {Test} from "../../utils/types";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {deleteTestById, getAllByUser} from "../../api/Test";
import {useAlert} from "../../hooks/useAlert";
import {PageHeader} from "../../components/PageHeader";

export const UserTests = () => {
  const {isLoading, LoaderFetch} = useLoaderFetch(getAllByUser)
  const {isLoading: isDelLoading, LoaderFetch: LoaderDelete} = useLoaderFetch(deleteTestById)
  const [tests, setTests] = useState<Test[]>([])
  const {alertData, setAlertData} = useAlert()

  useEffect(() => {
    getTests()
  }, [])

  const getTests = async () => {
    const response = await LoaderFetch()
    const data = await response.json()
    setTests(data)
  }

  const removeTest = async (id: number) => {
    setAlertData({...alertData, isShow: true, message: 'Удаляем...'})
    const response = await LoaderDelete(id)
    response.ok
      ? setAlertData({isShow: true, message: 'Успешно удалили!', type: 'success'})
      : setAlertData({
        isShow: true,
        message: 'Произошла непредвиденная ошибка. Приносим свои извинения :(',
        type: 'error'
      })
    const newTests = tests.filter(t => t.id !== id)
    setTests(newTests)
  }

  return (
    <UserTestsContainer>
      {
        isLoading
          ? <CircularProgress/>
          : (
            <>
              <PageHeader>Мои тесты</PageHeader>
              {alertData.isShow && (
                <Zoom in={isDelLoading && alertData.isShow}>
                  <Alert severity={alertData.type}>{alertData.message}</Alert>
                </Zoom>
              )}
              <UserTestsList tests={tests} removeTest={removeTest}/>
            </>
          )
      }
    </UserTestsContainer>
  );
};