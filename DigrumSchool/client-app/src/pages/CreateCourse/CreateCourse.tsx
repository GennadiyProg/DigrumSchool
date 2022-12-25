import React, {useEffect, useState} from 'react';
import {AppInput} from "../../components/AppInput";
import {CreateCourseContainer, HalfPart, HalfPartItem} from "./CreateCourse.styled";
import {AppSearch} from "../../components/AppSearch";
import {AppSimpleTable} from "../../components/AppSimpleTable";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getAllByUser} from "../../api/Test";
import {Course, Test, User} from "../../utils/types";
import {Alert, Button, CircularProgress, Typography, Zoom} from "@mui/material";
import {getUserByUsername} from "../../api/User";
import {createCourse, getCourseById, updateCourse} from "../../api/Course";
import {useAlert} from "../../hooks/useAlert";
import {PageHeader} from "../../components/PageHeader";
import {useQuery} from "../../hooks/useQuery";

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
  const {isLoading: isCourseLoading, LoaderFetch: fetchCourse} = useLoaderFetch(getCourseById)
  const {isLoading: isUserLoading, LoaderFetch: getUser} = useLoaderFetch(getUserByUsername)
  const {isLoading: isLoadingCourseCreate, LoaderFetch: reqCreateCourse} = useLoaderFetch(createCourse)
  const {isLoading: isUpdateLoading, LoaderFetch: fetchUpdateCourse} = useLoaderFetch(updateCourse)
  const [isUpdateMode, setIsUpdateMode] = useState(false)
  const {alertData, setAlertData} = useAlert()
  const search = useQuery()

  const fillCourse = async (id: number) => {
    const response = await fetchCourse(id)
    const data: Course = await response.json() as Course
    setStudents([...data.participants.map(p => ({username: p.username}))])
    setGroupName(data.groupName)
    // падает потому что сейчас category & language приходят null
    const sugTests: SuggestedTest[] = data.tests.map(test => ({
      id: test.id,
      title: test.title,
      category: test.category.name,
      language: test.language.name,
    }))
    setAddedTests(sugTests)
    setIsUpdateMode(true)
  }

  useEffect(() => {
    getTests()
    const testId = search.get('id')
    if (testId) {
      fillCourse(+testId)
    }
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
  const courseUpdate = async () => {
    const response = await fetchUpdateCourse({
      id: search.get('id'),
      groupName: groupName,
      tests: addedTests.map(test => test.id),
      participants: students.map(st => st.username)
    })
    if (!response.ok) {
      setAlertData({type: 'error', isShow: true, message: 'Простите, курс не был обновлен, попробуйте позднее :('})
      return
    }
    setAlertData({type: 'success', isShow: true, message: 'Курс успешно обновлен'})
  }

  return (
    <CreateCourseContainer>
      <PageHeader>Создание курса</PageHeader>
      {alertData.isShow && (
        <Zoom in={alertData.isShow}>
          <Alert color={alertData.type}>{alertData.message}</Alert>
        </Zoom>
      )}
      <AppInput id="groupName" value={groupName} label="group name" handler={(v: string) => setGroupName(v)}/>
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
                  onClick={isUpdateMode ? courseUpdate : courseCreate}
                  variant="contained"
                  color="success"
                  sx={{padding: '10px 0'}}>{isUpdateMode ? 'Обновить курс' : 'Создать курс'}</Button>
      }
    </CreateCourseContainer>
  );
};