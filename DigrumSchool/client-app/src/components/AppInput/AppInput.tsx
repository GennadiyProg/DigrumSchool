import React, {FC, HTMLInputTypeAttribute, ReactNode} from 'react';
import {FormControl, Icon, InputAdornment, InputLabel, OutlinedInput, SvgIcon} from "@mui/material";

interface AppInputProps {
  sx?: object,
  type?: HTMLInputTypeAttribute,
  id: string,
  label: string,
  icon?: ReactNode,
  required?: boolean,
  children?: ReactNode,
  handler: Function,
  value?: string,
}

export const AppInput: FC<AppInputProps> = (props) => {
  return (
    <FormControl variant="outlined" fullWidth required={props.required} sx={{
      ...props.sx
    }}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        value={props.value}
        onChange={(e) => props.handler(e.target.value)}
        type={props.type || 'text'}
        label={props.label}
        id={props.id}
        endAdornment={
          props.icon ?
            (
              <InputAdornment position="end">
               {props.icon}
              </InputAdornment>
            )
            : null
        }/>
    </FormControl>
  );
};