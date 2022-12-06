import React, {FC} from 'react';
import {Test} from "../../utils/types";
import {Cansel, TestCardWrapper} from "./TestCard.styled";
import {Button, Typography, useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";
import CancelIcon from '@mui/icons-material/Cancel';

interface TestCardProps {
  test: Test,
  handleStart: () => void,
}

export const TestCard:FC<TestCardProps> = ({test, handleStart}) => {
  const theme: CustomTheme = useTheme()
  const cancelColor = {
    color: theme.customPalette.secondary.main,
    colorHover: theme.palette.error.main,
  }
  return (
    <TestCardWrapper colors={theme.customPalette.testCard}>
      <Cansel {...cancelColor}>
        <CancelIcon sx={{
          width: '100%',
          height: '100%',
        }}/>
      </Cansel>
      <Typography variant='h6'>{test.title}</Typography>
      <Button onClick={handleStart}>Пройти</Button>
    </TestCardWrapper>
  );
};