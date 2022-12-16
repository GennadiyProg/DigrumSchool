import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";
import {Course} from "../../utils/types";
import {CoursesContainer} from "./Courses.styled";
import {CoursesList} from "./components/CoursesList";

const initialState: Course[] = [
  {
    id: 1,
    creator: {username: 'denis'},
    groupName: 'PRI-120',
    participants: [{id: 1, username: 'user-1', courses: [], createdCourses: [], role: [], languages: []}],
    tests: []
  },
  {
    id: 2,
    creator: {username: 'denis'},
    groupName: 'PRI-120',
    participants: [{id: 1, username: 'user-1', courses: [], createdCourses: [], role: [], languages: []}],
    tests: []
  },
  {
    id: 3,
    creator: {username: 'denis'},
    groupName: 'PRI-120',
    participants: [{id: 1, username: 'user-1', courses: [], createdCourses: [], role: [], languages: []}],
    tests: []
  },
]

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>(initialState)
  const removeCourse = (id: number) => {
    setCourses([...courses.filter(c => c.id !== id)])
    // Дергать апишку на удаление
  }
  return (
    <CoursesContainer>
      <Typography variant="h3">Ваши курсы</Typography>
      <CoursesList removeCourse={removeCourse} courses={courses}/>
    </CoursesContainer>
  );
};