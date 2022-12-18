import React, {FC, ReactNode} from 'react';
import {Cansel, AppCardWrapper} from "./AppCard.styled";
import {useTheme} from "@mui/material";
import {CustomTheme} from "../../themes/BasicTheme";
import CancelIcon from '@mui/icons-material/Cancel';

interface TestCardProps {
  handleCancel?: () => void,
  children?: ReactNode,
  canceled?: boolean,
  padding?: 'none' | 'small' | 'large',
  category?: boolean,
  onClick?: Function
}

export const AppCard:FC<TestCardProps> = ({handleCancel,
                                            children,
                                            canceled= true,
                                            padding = 'large',
                                            category = false,
                                            onClick,
}) => {
  const theme: CustomTheme = useTheme()
  const cancelColor = {
    color: theme.customPalette.secondary.main,
    colorHover: theme.palette.error.main,
  }
  const TestCardWrapperColor = {
    background: theme.customPalette.appCard.main,
    shadowColor: theme.customPalette.appCard.shadowColor,
    padding: padding,
    category,
  }
  return (
    <AppCardWrapper onClick={() => onClick && onClick()} {...TestCardWrapperColor}>
      {canceled && !category && (
        <Cansel onClick={handleCancel} {...cancelColor}>
          <CancelIcon sx={{
            width: '100%',
            height: '100%',
          }}/>
        </Cansel>
      )}
      {children}
    </AppCardWrapper>
  );
};