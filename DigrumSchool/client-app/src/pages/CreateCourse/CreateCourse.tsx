import React, {useEffect, useState} from 'react';
import {AppInput} from "../../components/AppInput";
import {CreateCourseContainer, HalfPart, HalfPartItem} from "./CreateCourse.styled";
import {AppSearch} from "../../components/AppSearch";
import {AppSimpleTable} from "../../components/AppSimpleTable";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getAllByUser, getTestById} from "../../api/Test";
import {Test} from "../../utils/types";
import {Typography} from "@mui/material";
import {getUserByUsername} from "../../api/User";

interface SuggestedTest {
  id: number,
  category: string,
  language: string,
  title: string
}

interface AddedUser {
  username: ''
}

const initialTest: SuggestedTest = {
  id: 0,
  title: '',
  language:  '',
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

  useEffect(() => {
    getTests()
  }, [])

  const getTests = async () => {
    const response = await LoaderFetch()
    if (!response.ok) {
      return
    }
    const data = await response.json().then((v:Test[]) => v)
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
    const user: AddedUser = await response.json().then((v: AddedUser) => v)
    students.filter(st => st.username !== username) && setStudents([...students, user])
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

  return (
    <CreateCourseContainer>
      <Typography variant="h3" sx={{margin: '15px 0'}}>Создание курса</Typography>
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
    </CreateCourseContainer>
  );
};