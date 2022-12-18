import styled from "styled-components";

interface AppSearchBodyProps {
  borderColor?: string
}

export const AppSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const AppSearchHeader = styled.div`
  display: flex;
`

export const AppSearchBody = styled.div<AppSearchBodyProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow: auto;
  border: 2px solid ${({borderColor}) => borderColor};
  border-radius: 4px;
  border-top: none;
  z-index: 10;
`