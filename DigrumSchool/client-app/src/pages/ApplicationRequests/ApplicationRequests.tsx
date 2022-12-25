import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {ApplicationRequestsContainer} from "./ApplicationRequests.styled";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {
  getAllApprovedApplication,
  getAllCreatedApplication,
  processApplication,
  rejectApplication
} from "../../api/Application";
import {userStore} from "../../stores/UserStore";
import {AppCard} from "../../components/AppCard";
import {Alert, Button, CircularProgress, Typography, Zoom} from "@mui/material";
import {Application, Test} from "../../utils/types";
import {useAlert} from "../../hooks/useAlert";
import {PageHeader} from "../../components/PageHeader";
import {AppCardBtns} from "../../components/AppCard/AppCard.styled";

type ActionsType = {
  "Admin": Function,
  "Teacher": Function,
}

const ApplicationRequestsComponent = () => {
  const {isLoading: isCreatedLoading, LoaderFetch: fetchCreated} = useLoaderFetch(getAllCreatedApplication)
  const {isLoading: isApprovedLoading, LoaderFetch: fetchApproved} = useLoaderFetch(getAllApprovedApplication)
  const {isLoading: isProcessLoading, LoaderFetch: fetchProcess} = useLoaderFetch(processApplication)
  const {isLoading: isRejectLoading, LoaderFetch: fetchReject} = useLoaderFetch(rejectApplication)
  const {alertData, setAlertData} = useAlert()
  const [applications, setApplications] = useState<Test[]>([])

  const actions: ActionsType = {
    "Admin": fetchApproved,
    "Teacher": fetchCreated,
  }

  useEffect(() => {
    getApplications()
  }, [])

  const getApplications = async () => {
    if (userStore.user && userStore.user?.role.name !== "User") {
      const role: "Admin" | "Teacher" = userStore.user.role.name
      const response = await actions[role]()
      if (!response.ok) return

      const data = await response.json()
      setApplications(data)
    }
  }
  const approve = async (id?: number) => {
    if (!id) return
    const response = await fetchProcess(id)
    if (!response.ok) {
      setAlertData({isShow: true, message: 'Ошибка!', type: 'error'})
      return
    }
    setAlertData({isShow: true, message: 'Успешно!', type: 'success'})
    filterWithout(id)
  }
  const reject = async (id: number) => {
    if (!id) return
    const response = await fetchReject(id)
    if (!response.ok) {
      setAlertData({isShow: true, message: 'Ошибка!', type: 'error'})
      return
    }
    setAlertData({isShow: true, message: 'Успешно!', type: 'success'})
    filterWithout(id)
  }
  const filterWithout = (id: number) => {
    setApplications([...applications.filter(item => item.id !== id)])
  }

  return (
    <ApplicationRequestsContainer>
      <PageHeader>Заявки</PageHeader>
      {alertData.isShow && (
        <Zoom in={alertData.isShow}>
          <Alert severity={alertData.type}>{alertData.message}</Alert>
        </Zoom>
      )}
      {(isCreatedLoading || isApprovedLoading)
        ? (
          <CircularProgress/>
        )
        : (
          <>
            {
              applications.map(application => (
                <AppCard canceled={false}>
                  <Typography variant="h6">{application.title}</Typography>
                  <AppCardBtns>
                    <Button variant="contained" onClick={() => approve(application.id)}>Одобрить</Button>
                    <Button variant="contained" onClick={() => reject(application.id)}>Отклонить</Button>
                  </AppCardBtns>
                </AppCard>
              ))
            }
          </>
        )}
    </ApplicationRequestsContainer>
  );
};

export const ApplicationRequests = observer(ApplicationRequestsComponent)