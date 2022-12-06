import styled from "styled-components";
import {PaletteColor} from "@mui/material";

interface TestCardWrapperProps {
  colors: PaletteColor,
}

interface CancelProps {
  color: string,
  colorHover: string,
}

export const TestCardWrapper = styled.div<TestCardWrapperProps>`
  position: relative;
  display: flex;
  border-radius: 10px;
  padding: 20px 10px;
  width: 100%;
  background: ${({colors}) => colors.main};
  color: ${({colors}) => colors.contrastText};
  box-shadow: 0 0 8px rgba(0, 0, 0, .12);
`

export const Cansel = styled.div<CancelProps>`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: ${({color}) => color};
  &:hover {
    color: ${({colorHover}) => colorHover};
  }
`