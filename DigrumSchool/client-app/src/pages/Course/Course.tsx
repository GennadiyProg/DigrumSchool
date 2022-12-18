import React, {useEffect, useMemo, useState} from 'react';
import {CourseContainer, CourseContent, SideMenuContainer, TestContainer} from "./Course.styled";
import {CircularProgress, Typography} from "@mui/material";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getCourseById, getUserCompletedTestsByCourse} from "../../api/Course";
import {useParams} from "react-router-dom";
import {TestsList} from "./components/TestsList";
import {CompletedTest, Course, Test} from "../../utils/types";
import {SideMenu} from "./components/SideMenu";
import {CourseMenuItem} from "./Courses.typed";
import {userStore} from "../../stores/UserStore";
import {observer} from "mobx-react-lite";
import {PageHeader} from "../../components/PageHeader";

const initialCourse: Course = {
  tests: [],
  groupName: '',
  creator: {username: ''},
  participants: [],
  id: 0
}

const AppCourseComponent = () => {
  const {isLoading, LoaderFetch: fetchCourse} = useLoaderFetch(getCourseById)
  const {isLoading: isLoadingCompletedTests, LoaderFetch: fetchCompletedTests} = useLoaderFetch(getUserCompletedTestsByCourse)
  const [course, setCourse] = useState<Course>(initialCourse)
  const [allCompletedTests, setAllCompletedTests] = useState<CompletedTest[]>([])
  const params = useParams()
  const isCreator = useMemo(() => {
    return userStore.user?.username === course.creator.username
  }, [userStore.user, course.creator.username])

  useEffect(() => {
    getTests()
    getCompletedTests()
  }, [])
  const getTests = async () => {
    if (params.id) {
      const response = await fetchCourse(+params.id)
      if (!response.ok) {
        return
      }
      const data = await response.json()
      setCourse(data)
    }
  }
  const getCompletedTests = async () => {
    if (params.id) {
      const response = await fetchCompletedTests(+params.id)
      if (!response.ok) {
        return
      }
      const data = await response.json()
      setAllCompletedTests(data)
    }
  }
  const menuItems: CourseMenuItem[] = [
    {
      title: 'Участники',
      content: course.participants.map(student => ({id: student.id, username: student.username})),
    },
    {
      title: 'Пройденные тесты',
      content: allCompletedTests.map(test => ({
        id: test.id,
        title: test.test.title,
        score: test.score,
        date: new Date(test.date).toLocaleDateString()
      }))
    }
  ]

  return (
    <CourseContainer>
      {
        isLoading
          ? <CircularProgress/>
          : (
            <>
              <PageHeader>{course.groupName}</PageHeader>
              <CourseContent>
                <TestContainer>
                  <TestsList isCreator={isCreator} tests={course.tests}/>
                </TestContainer>
                <SideMenuContainer>
                  <SideMenu menuItems={menuItems}/>
                </SideMenuContainer>
              </CourseContent>
            </>
          )
      }
    </CourseContainer>
  );
};

export const AppCourse = observer(AppCourseComponent)