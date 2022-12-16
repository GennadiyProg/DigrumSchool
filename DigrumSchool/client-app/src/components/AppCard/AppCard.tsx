import React, {FC, ReactNode} from 'react';
import {Cansel, TestCardWrapper} from "./AppCard.styled";
import {useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";
import CancelIcon from '@mui/icons-material/Cancel';

interface TestCardProps {
  handleCancel: () => void,
  children?: ReactNode,
}

export const AppCard:FC<TestCardProps> = ({handleCancel, children}) => {
  const theme: CustomTheme = useTheme()
  const cancelColor = {
    color: theme.customPalette.secondary.main,
    colorHover: theme.palette.error.main,
  }
  const TestCardWrapperColor = {
    background: theme.customPalette.appCard.main,
    shadowColor: theme.customPalette.appCard.shadowColor,
  }
  return (
    <TestCardWrapper {...TestCardWrapperColor}>
      <Cansel onClick={handleCancel} {...cancelColor}>
        <CancelIcon sx={{
          width: '100%',
          height: '100%',
        }}/>
      </Cansel>
      {children}
    </TestCardWrapper>
  );
};