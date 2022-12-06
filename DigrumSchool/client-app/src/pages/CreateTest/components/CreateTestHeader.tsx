import React, {useState} from 'react';
import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {CreateTestHeaderContainer} from "../CreateTest.styled";

export const CreateTestHeader = () => {
  const [category, setCategory] = useState('')
  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value)
  }

  const SelectInputs = [
    {
      label: 'category-1',
      value: category,
      onChange: handleChange,
      MenuItems: ['Color', 'Home', 'Other'],
      helperText: 'Выберите категорию',
    },
    {
      label: 'category-2',
      value: category,
      onChange: handleChange,
      MenuItems: ['Color', 'Home', 'Other'],
      helperText: 'Выберите категорию',
    },
    {
      label: 'category-3',
      value: category,
      onChange: handleChange,
      MenuItems: ['Color', 'Home', 'Other'],
      helperText: 'Выберите категорию',
    }
  ]

  return (
    <CreateTestHeaderContainer>
      {SelectInputs.map(select => (
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