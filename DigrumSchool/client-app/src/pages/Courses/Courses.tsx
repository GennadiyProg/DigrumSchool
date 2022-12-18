import React, {useEffect, useState} from 'react';
import {Course} from "../../utils/types";
import {CoursesContainer} from "./Courses.styled";
import {CoursesList} from "./components/CoursesList";
import {PageHeader} from "../../components/PageHeader";
import {useLoaderFetch} from "../../hooks/useLoaderFetch";
import {getCoursesByCreator, getCoursesByParticipant} from "../../api/Course";

const initialState: Course[] = [
  {
    id: 0,
    creator: {username: ''},
    groupName: '',
    participants: [{id: 0, username: '', role: {id: 0, name: 'User'}, languages: []}],
    tests: []
  }
]

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(initialState)
  const [participantCourses, setParticipantCourses] = useState<Course[]>([])
  const {isLoading, LoaderFetch: getUserCourses} = useLoaderFetch(getCoursesByCreator)
  const {isLoading: isLoadingParticipantCourses, LoaderFetch: fetchParticipantCourses} = useLoaderFetch(getCoursesByParticipant)
  const removeCourse = (id: number) => {
    setCourses([...courses.filter(c => c.id !== id)])
    // Дергать апишку на удаление
  }
  const getCourses = async () => {
    const response = await getUserCourses()
    if (!response.ok) return

    const data = await response.json()
    setCourses(data)
  }

  const getParticipantCourses = async () => {
    const response = await fetchParticipantCourses()
    if (!response.ok) return

    const data = await response.json()
    setParticipantCourses(data)
  }

  useEffect(() => {
    getCourses()
    getParticipantCourses()
  }, [])

  return (
    <CoursesContainer>
      <PageHeader>Ваши курсы</PageHeader>
      <CoursesList removeCourse={removeCourse} courses={courses}/>
      <PageHeader>Продолжить прходить</PageHeader>
      <CoursesList courses={participantCourses}/>
    </CoursesContainer>
  );
};