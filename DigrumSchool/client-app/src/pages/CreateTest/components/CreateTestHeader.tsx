import React, {FC, ReactNode, useState} from 'react';
import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CreateTestHeaderContainer} from "../CreateTest.styled";
import {SelectControl} from "../CreateTest.types";

interface CreateTestHeaderProps {
  SelectControls: SelectControl[]
  children?: ReactNode,
}

export const CreateTestHeader:FC<CreateTestHeaderProps> = ({SelectControls, children}) => {
  return (
    <CreateTestHeaderContainer>
      {children}
      {SelectControls.map(select => (
        <Box key={select.label} sx={{
          flexGrow: 1,
        }}>
          <FormControl sx={{
            width: '100%'
          }}>
            <InputLabel id={select.label}>{select.label}</InputLabel>
            <Select
              labelId={select.label}
              id={select.label}
              value={select.value}
              label={select.label}
              onChange={select.onChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {select.MenuItems.map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
            <FormHelperText>{select.helperText}</FormHelperText>
          </FormControl>
        </Box>
      ))}
    </CreateTestHeaderContainer>
  );
};