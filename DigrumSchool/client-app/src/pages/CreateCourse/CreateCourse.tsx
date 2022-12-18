import React, {useEffect, useState} from 'react';
import {AppInput} from "../../components/AppInput";
import {CreateCourseContainer, HalfPart, HalfPartItem} from "./CreateCourse.styled";
import {AppSearch} from "../../components/AppSearch";
import {AppSimpleTable} from "../../components/AppSimpleTable";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getAllByUser, getTestById} from "../../api/Test";
import {Test, User} from "../../utils/types";
import {Alert, Button, CircularProgress, Typography, Zoom} from "@mui/material";
import {getUserByUsername} from "../../api/User";
import {createCourse} from "../../api/Course";
import {useAlert} from "../../hooks/useAlert";
import {PageHeader} from "../../components/PageHeader";

interface SuggestedTest {
  id: number,
  category: string,
  language: string,
  title: string
}

interface AddedUser {
  username: string,
}

const initialTest: SuggestedTest = {
  id: 0,
  title: '',
  language: '',
  category: '',
}

export const CreateCourse = () => {
  const [groupName, setGroupName] = useState('')
  const [students, setStudents] = useState<AddedUser[]>([])
  const [allTests, setAllTests] = useState<SuggestedTest[]>([initialTest])
  const [suggestedTests, setSuggestedTests] = useState<SuggestedTest[]>([])
  const [addedTests, setAddedTests] = useState<SuggestedTest[]>([])
  const {isLoading, LoaderFetch} = useLoaderFetch(getAllByUser)
  const {isLoading: isUserLoading, LoaderFetch: getUser} = useLoaderFetch(getUserByUsername)
  const {isLoading: isLoadingCourseCreate, LoaderFetch: reqCreateCourse} = useLoaderFetch(createCourse)
  const {alertData, setAlertData} = useAlert()

  useEffect(() => {
    getTests()
  }, [])
  const getTests = async () => {
    const response = await LoaderFetch()
    if (!response.ok) {
      return
    }
    const data = await response.json().then((v: Test[]) => v)
    const suggestedTests: SuggestedTest[] = data.map(test => {
      return {
        id: test.id,
        title: test.title,
        category: test.category.name,
        language: test.language.name,
      }
    })
    setAllTests(suggestedTests)
  }
  const addStudent = async (username: string) => {
    const response = await getUser(username)
    if (!response.ok) {
      return
    }
    const user: AddedUser = await response.json().then((v: User) => ({username: v.username}))
    !students.find(st => st.username === username) && setStudents([...students, user])
  }
  const removeStudent = (student: AddedUser) => {
    setStudents([...students.filter(st => st.username !== student.username)])
  }
  const removeTest = (test: SuggestedTest) => {
    setAddedTests([...addedTests.filter(t => t.id !== test.id)])
  }
  const addTest = (test: SuggestedTest) => {
    setAddedTests([...addedTests, test])
    setSuggestedTests([...suggestedTests.filter(t => t.id !== test.id)])
  }
  const updateSuggestedTests = (searchName: string) => {
    const newTests = allTests.filter(test => test.title.includes(searchName) && !addedTests.includes(test))
    setSuggestedTests(newTests)
  }

  const courseCreate = async () => {
    const response = await reqCreateCourse({
      groupName: groupName,
      tests: addedTests.map(test => test.id),
      participants: students.map(st => st.username)
    })
    if (!response.ok) {
      setAlertData({type: 'error', isShow: true, message: 'Простите, курс не был создан, попробуйте позднее :('})
      return
    }
    setAlertData({type: 'success', isShow: true, message: 'Курс успешно создан'})
  }

  return (
    <CreateCourseContainer>
      <PageHeader>Создание курса</PageHeader>
      {alertData.isShow && (
        <Zoom in={alertData.isShow}>
          <Alert color={alertData.type}>{alertData.message}</Alert>
        </Zoom>
      )}
      <AppInput id="groupName" label="group name" handler={(v: string) => setGroupName(v)}/>
      <HalfPart>
        <HalfPartItem>
          <Typography variant="h5">Пригласите людей</Typography>
          <AppSearch immediate={false} showSearchButton={true} trigger={addStudent}/>
          <AppSimpleTable deleteHandler={removeStudent} deletable={true} data={students}/>
        </HalfPartItem>
        <HalfPartItem>
          <Typography variant="h5">Добавьте тесты</Typography>
          <AppSearch itemChosen={addTest} body={suggestedTests} trigger={updateSuggestedTests}/>
          <AppSimpleTable deleteHandler={removeTest} deletable={true} data={addedTests}/>
        </HalfPartItem>
      </HalfPart>
      {isLoadingCourseCreate
        ? <CircularProgress/>
        : <Button disabled={!groupName}
                  onClick={courseCreate}
                  variant="contained"
                  color="success"
                  sx={{padding: '10px 0'}}>Создать курс</Button>
      }
    </CreateCourseContainer>
  );
};