import {SelectChangeEvent} from "@mui/material";

export interface SelectControl {
  label: string,
  value: string,
  onChange: (e: SelectChangeEvent) => void,
  MenuItems: string[],
  helperText?: string,
}