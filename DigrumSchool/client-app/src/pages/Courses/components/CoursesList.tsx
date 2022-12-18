import React, {FC} from 'react';
import {Course} from "../../../utils/types";
import {CoursesListWrapper} from "../Courses.styled";
import {AppCard} from "../../../components/AppCard";
import {Button, Typography, useTheme} from "@mui/material";
import {AppCardAdditionalInfo} from "../../../components/AppCard/AppCard.styled";
import {CustomTheme} from "../../../themes/BasicTheme";
import {useNavigate, useNavigation} from "react-router-dom";

interface CoursesListProps {
  courses: Course[],
  removeCourse: (id: number) => void
}

export const CoursesList:FC<CoursesListProps> = ({courses, removeCourse}) => {
  const theme: CustomTheme = useTheme()
  const navigate = useNavigate()

  const redirectToCourse = (id: number) => {
    navigate(`/course/${id}`)
  }

  return (
    <CoursesListWrapper>
      {courses.map((course) => (
        <AppCard key={course.id} handleCancel={() => removeCourse(course.id)}>
          <Typography variant="h6">{course.groupName}</Typography>
          <AppCardAdditionalInfo color={theme.customPalette.appCard.additionalText}>
            Участников: {course.participants.length}
          </AppCardAdditionalInfo>
          <AppCardAdditionalInfo color={theme.customPalette.appCard.additionalText}>
            Тестов: {course.tests.length}
          </AppCardAdditionalInfo>
          <Button onClick={() => redirectToCourse(course.id)} variant="contained">Открыть</Button>
        </AppCard>
      ))}
    </CoursesListWrapper>
  );
};