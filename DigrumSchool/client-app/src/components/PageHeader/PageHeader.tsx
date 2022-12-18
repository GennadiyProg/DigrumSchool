import React, {FC, ReactNode} from 'react';
import {Typography} from "@mui/material";

interface PageHeaderProps {
  children: ReactNode,
}

export const PageHeader:FC<PageHeaderProps> = ({children}) => {
  return (
    <>
      <Typography variant="h3" sx={{margin: '15px 0'}}>
        {children}
      </Typography>
    </>
  );
};