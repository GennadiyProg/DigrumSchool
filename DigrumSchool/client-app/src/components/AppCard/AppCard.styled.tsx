import styled from "styled-components";

interface CancelProps {
  color: string,
  colorHover: string,
}

interface TestCardWrapperProps {
  background: string,
  shadowColor: string,
}

export const TestCardWrapper = styled.div<TestCardWrapperProps>`
  position: relative;
  display: flex;
  border-radius: 10px;
  padding: 20px 60px;
  width: 100%;
  box-shadow: 0 0 8px ${({shadowColor}) => shadowColor};
  justify-content: space-between;
  background: ${({background}) => background};
  &:hover {
    box-shadow: 0 0 20px ${({shadowColor}) => shadowColor};
  }
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

export const AppCardAdditionalInfo = styled.p<{color: string}>`
  padding: 0;
  margin: 0;
  color: ${({color}) => color}
  display: flex;
  align-items: center;
`